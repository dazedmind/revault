// File: src/app/admin/api/delete-user/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }, // Changed to Promise
) {
  const { id: idParam } = await params; // Await the params
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

    // Use transaction to ensure all related data is deleted properly
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
        },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("💥 Error deleting user:", err);

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
