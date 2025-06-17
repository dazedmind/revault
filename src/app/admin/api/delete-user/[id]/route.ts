// File: src/app/admin/api/delete-user/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from "jsonwebtoken";
import { activity_type } from "@prisma/client";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

// Helper function to extract admin info from JWT token
async function getAdminInfo(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const cookieHeader = request.headers.get('cookie');
    
    let token: string | null = null;

    // Try to get token from Authorization header first
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    // Fallback to cookie
    else if (cookieHeader) {
      const tokenMatch = cookieHeader.match(/authToken=([^;]+)/);
      if (tokenMatch) {
        token = tokenMatch[1];
      }
    }

    if (!token) {
      return null;
    }

    const payload = jwt.verify(token, SECRET_KEY) as any;
    
    // Get admin user details from database
    const adminUser = await prisma.users.findUnique({
      where: { user_id: payload.user_id },
      include: {
        librarian: {
          select: {
            employee_id: true,
            position: true
          }
        }
      }
    });

    return adminUser;
  } catch (error) {
    console.error("Error extracting admin info:", error);
    return null;
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: idParam } = await params;
  const userId = parseInt(idParam, 10);

  console.log("🗑️ Delete request for user ID:", userId);

  if (isNaN(userId)) {
    console.log("❌ Invalid user ID provided");
    return NextResponse.json(
      { success: false, message: "Invalid user ID" },
      { status: 400 },
    );
  }

  try {
    // Get admin info for activity logging
    const adminUser = await getAdminInfo(req);
    if (!adminUser) {
      console.log("❌ Could not identify admin user for activity logging");
    }

    // Check if user exists and get their details for logging
    const existingUser = await prisma.users.findUnique({
      where: { user_id: userId },
      include: {
        librarian: true,
        faculty: true,
        students: true,
        user_bookmarks: true,
        activity_logs: true,
      },
    });

    if (!existingUser) {
      console.log("❌ User not found:", userId);
      
      // Log failed deletion attempt
      if (adminUser && adminUser.role === "ADMIN") {
        try {
          await prisma.activity_logs.create({
            data: {
              employee_id: adminUser.librarian?.employee_id,
              user_id: adminUser.user_id,
              name: `${adminUser.first_name} ${adminUser.last_name}`.trim(),
              activity: `Failed to delete user: User ID ${userId} not found`,
              activity_type: activity_type.DELETE_USER,
              user_agent: req.headers.get('user-agent') || '',
              ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
              status: "failed",
              created_at: new Date(),
            },
          });
        } catch (logError) {
          console.error("❌ Failed to create failure activity log:", logError);
        }
      }

      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    console.log("📋 Found user to delete:", {
      user_id: existingUser.user_id,
      email: existingUser.email,
      role: existingUser.role,
      has_librarian: !!existingUser.librarian,
      has_faculty: !!existingUser.faculty,
      has_student: !!existingUser.students,
      bookmarks_count: existingUser.user_bookmarks.length,
      activity_logs_count: existingUser.activity_logs.length,
    });

    // Prepare user info for activity log
    const deletedUserName = `${existingUser.first_name || ""} ${existingUser.last_name || ""}${existingUser.ext_name ? " " + existingUser.ext_name : ""}`.trim();
    const deletedUserDetails = [
      `Name: ${deletedUserName}`,
      `Email: ${existingUser.email}`,
      `Role: ${existingUser.role}`,
      existingUser.librarian && `Employee ID: ${existingUser.librarian.employee_id}`,
      existingUser.librarian?.position && `Position: ${existingUser.librarian.position}`
    ].filter(Boolean).join(", ");

    // Use transaction to ensure all related data is deleted properly and log the action
    await prisma.$transaction(async (tx) => {
      console.log("🔄 Starting deletion transaction...");

      // Delete activity logs first (if any - they reference librarian.employee_id)
      if (existingUser.activity_logs.length > 0) {
        await tx.activity_logs.deleteMany({
          where: { user_id: userId },
        });
        console.log("✅ Deleted activity logs");
      }

      // Delete user bookmarks
      if (existingUser.user_bookmarks.length > 0) {
        await tx.user_bookmarks.deleteMany({
          where: { user_id: userId },
        });
        console.log("✅ Deleted user bookmarks");
      }

      // Delete role-specific records
      if (existingUser.librarian) {
        await tx.librarian.delete({
          where: { user_id: userId },
        });
        console.log("✅ Deleted librarian record");
      }

      if (existingUser.faculty) {
        await tx.faculty.delete({
          where: { user_id: userId },
        });
        console.log("✅ Deleted faculty record");
      }

      if (existingUser.students) {
        await tx.students.delete({
          where: { user_id: userId },
        });
        console.log("✅ Deleted student record");
      }

      // Finally, delete the user record
      await tx.users.delete({
        where: { user_id: userId },
      });
      console.log("✅ Deleted user record");

      // 🚨 ADD ACTIVITY LOG for user deletion by ADMIN
      if (adminUser && adminUser.role === "ADMIN") {
        try {
          await tx.activity_logs.create({
            data: {
              employee_id: adminUser.librarian?.employee_id,
              user_id: adminUser.user_id,
              name: `${adminUser.first_name} ${adminUser.last_name}`.trim(),
              activity: `Deleted user account: ${deletedUserDetails}`,
              activity_type: activity_type.DELETE_USER,
              user_agent: req.headers.get('user-agent') || '',
              ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
              status: "success",
              created_at: new Date(),
            },
          });

          console.log("✅ Activity log created for user deletion");
        } catch (logError) {
          console.error("❌ Failed to create activity log:", logError);
          // Don't fail the transaction, just log the error
        }
      }
    });

    console.log("🎉 User deletion completed successfully");

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
        deletedUser: {
          id: existingUser.user_id,
          email: existingUser.email,
          role: existingUser.role,
          name: deletedUserName,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("💥 Error deleting user:", err);

    // 🚨 ADD ACTIVITY LOG for failed user deletion
    try {
      const adminUser = await getAdminInfo(req);
      if (adminUser && adminUser.role === "ADMIN") {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        await prisma.activity_logs.create({
          data: {
            employee_id: adminUser.librarian?.employee_id,
            user_id: adminUser.user_id,
            name: `${adminUser.first_name} ${adminUser.last_name}`.trim(),
            activity: `Failed to delete user ID ${userId}: ${errorMessage}`,
            activity_type: activity_type.DELETE_USER,
            user_agent: req.headers.get('user-agent') || '',
            ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
            status: "failed",
            created_at: new Date(),
          },
        });
        console.log("✅ Activity log created for failed user deletion");
      }
    } catch (logError) {
      console.error("❌ Failed to create failure activity log:", logError);
    }

    // Handle specific database errors
    if (err instanceof Error) {
      if (err.message.includes("Foreign key constraint")) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Cannot delete user due to related data. Please contact system administrator.",
          },
          { status: 400 },
        );
      }
    }

    return NextResponse.json(
      { success: false, message: "Failed to delete user" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}