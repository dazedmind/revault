// src/app/admin/api/update-user/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { activity_type } from "@prisma/client";
import {
  validateRoleChange,
  validateStatusChange,
  type RoleName,
} from "@/lib/roleValidation";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

// Helper function to get admin user info from token
async function getAdminInfo(request: Request) {
  try {
    let token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const cookies = request.headers.get("cookie");
      const authTokenMatch = cookies?.match(/authToken=([^;]+)/);
      token = authTokenMatch?.[1];
    }

    if (!token) return null;

    const payload = jwt.verify(token, SECRET_KEY) as any;

    const adminUser = await prisma.users.findUnique({
      where: { user_id: payload.user_id },
      include: {
        librarian: {
          select: {
            employee_id: true,
          },
        },
      },
    });

    return adminUser;
  } catch (error) {
    console.error("Error getting admin info:", error);
    return null;
  }
}

// Helper function to generate change description
function generateChangeDescription(original: any, updated: any): string {
  const changes: string[] = [];

  if (original.first_name !== updated.first_name) {
    changes.push(
      `first name from "${original.first_name}" to "${updated.first_name}"`,
    );
  }
  if (original.last_name !== updated.last_name) {
    changes.push(
      `last name from "${original.last_name}" to "${updated.last_name}"`,
    );
  }
  if (original.email !== updated.email) {
    changes.push(`email from "${original.email}" to "${updated.email}"`);
  }
  if (original.role !== updated.role) {
    changes.push(`role from "${original.role}" to "${updated.role}"`);
  }
  if ((original.status || "ACTIVE") !== (updated.status || "ACTIVE")) {
    changes.push(
      `status from "${original.status || "ACTIVE"}" to "${updated.status || "ACTIVE"}"`,
    );
  }
  if (updated.password) {
    changes.push("password changed");
  }

  return changes.length > 0 ? changes.join(", ") : "No changes detected";
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const userId = parseInt(id);
    console.log("🔄 Update request for user ID:", userId);

    if (isNaN(userId)) {
      console.log("❌ Invalid user ID:", id);
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 },
      );
    }

    const body = await request.json();
    console.log("📥 Update request body:", JSON.stringify(body, null, 2));

    const {
      fullName,
      middleName,
      lastName,
      extension,
      employeeID,
      email,
      userAccess,
      role,
      position,
      status,
      password,
    } = body;

    // Use userAccess if provided, otherwise fall back to role
    const finalUserAccess = userAccess || role;

    console.log("📋 Extracted fields:", {
      fullName,
      middleName,
      lastName,
      extension,
      employeeID,
      email,
      userAccess,
      role,
      finalUserAccess,
      position,
      status,
      hasPassword: !!password,
    });

    // Basic validation
    if (!fullName) {
      console.log("❌ Missing fullName");
      return NextResponse.json(
        { success: false, message: "Full name is required" },
        { status: 400 },
      );
    }

    if (!lastName) {
      console.log("❌ Missing lastName");
      return NextResponse.json(
        { success: false, message: "Last name is required" },
        { status: 400 },
      );
    }

    if (!email) {
      console.log("❌ Missing email");
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    if (!employeeID) {
      console.log("❌ Missing employeeID");
      return NextResponse.json(
        { success: false, message: "Employee ID is required" },
        { status: 400 },
      );
    }

    if (!finalUserAccess) {
      console.log("❌ Missing userAccess/role");
      return NextResponse.json(
        { success: false, message: "User access/role is required" },
        { status: 400 },
      );
    }

    // Validate employee ID format
    if (!/^\d{10}$/.test(employeeID)) {
      console.log("❌ Invalid employee ID format:", employeeID);
      return NextResponse.json(
        {
          success: false,
          message: "Employee ID must be exactly 10 digits.",
        },
        { status: 400 },
      );
    }

    // Validate password if provided
    if (password && password.length < 6) {
      console.log("❌ Password too short");
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters long.",
        },
        { status: 400 },
      );
    }

    console.log(
      "✅ All basic validations passed, getting original user data...",
    );

    // Get admin info for activity logging
    const adminUser = await getAdminInfo(request);
    if (!adminUser) {
      console.log("❌ Could not identify admin user for activity logging");
    }

    // Get original user data for comparison (before update)
    const originalUser = await prisma.users.findUnique({
      where: { user_id: userId },
      include: {
        librarian: {
          select: {
            employee_id: true,
            position: true,
          },
        },
      },
    });

    if (!originalUser) {
      console.log("❌ User not found:", userId);
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Map userAccess to role
    const accessToRoleMap: { [key: string]: string } = {
      Admin: "ADMIN",
      "Admin Assistant": "ASSISTANT",
      "Librarian-in-Charge": "LIBRARIAN",
    };

    const mappedRole = accessToRoleMap[finalUserAccess] || finalUserAccess;
    const empId = parseInt(employeeID);

    // 🆕 NEW: Role validation logic
    console.log("🔍 Checking role and status validations...");

    try {
      // Check if role is changing
      if (originalUser.role !== mappedRole) {
        console.log(
          `🔄 Role change detected: ${originalUser.role} → ${mappedRole}`,
        );

        const roleValidation = await validateRoleChange(
          mappedRole as RoleName,
          userId,
        );

        if (!roleValidation.isValid) {
          console.log(
            "❌ Role change validation failed:",
            roleValidation.message,
          );
          return NextResponse.json(
            { success: false, message: roleValidation.message },
            { status: 400 },
          );
        }

        console.log(
          "✅ Role change validation passed:",
          roleValidation.message,
        );
      }

      // Check if status is changing to ACTIVE
      const originalStatus = originalUser.status || "ACTIVE";
      const newStatus = status || "ACTIVE";

      if (originalStatus !== "ACTIVE" && newStatus === "ACTIVE") {
        console.log(
          `🔄 Status change to ACTIVE detected: ${originalStatus} → ${newStatus}`,
        );

        const statusValidation = await validateStatusChange(
          mappedRole as RoleName,
          newStatus,
          userId,
        );

        if (!statusValidation.isValid) {
          console.log(
            "❌ Status change validation failed:",
            statusValidation.message,
          );
          return NextResponse.json(
            { success: false, message: statusValidation.message },
            { status: 400 },
          );
        }

        console.log(
          "✅ Status change validation passed:",
          statusValidation.message,
        );
      }
    } catch (roleError) {
      console.error("❌ Role/status validation error:", roleError);
      if (roleError instanceof Error) {
        return NextResponse.json(
          {
            success: false,
            message: `Validation failed: ${roleError.message}`,
          },
          { status: 400 },
        );
      } else {
        return NextResponse.json(
          { success: false, message: "Validation failed: Unknown error" },
          { status: 500 },
        );
      }
    }

    // Check for existing user with same email or employee ID (excluding current user)
    const existingUser = await prisma.users.findFirst({
      where: {
        AND: [
          { user_id: { not: userId } },
          {
            OR: [
              { email },
              {
                librarian: {
                  employee_id: empId,
                },
              },
            ],
          },
        ],
      },
    });

    if (existingUser) {
      console.log("❌ Email or Employee ID already exists");
      return NextResponse.json(
        {
          success: false,
          message: "Email or Employee ID already exists for another user.",
        },
        { status: 400 },
      );
    }

    console.log("✅ All validations passed, starting update transaction...");

    // Use transaction to update both tables and log activity
    const result = await prisma.$transaction(async (tx) => {
      // Prepare user update data
      const userUpdateData: any = {
        first_name: fullName,
        mid_name: middleName || null,
        last_name: lastName,
        ext_name: extension || null,
        email,
        role: mappedRole,
        status: status || "",
      };

      // Add password if provided
      if (password && password.length >= 6) {
        userUpdateData.password = await bcrypt.hash(password, 10);
        console.log("🔐 Password will be updated");
      }

      console.log("📝 Updating user with data:", {
        ...userUpdateData,
        password: userUpdateData.password ? "***" : "unchanged",
        employeeID: empId,
      });

      // Update user record
      const updatedUser = await tx.users.update({
        where: { user_id: userId },
        data: userUpdateData,
      });

      console.log("✅ User record updated");

      // Update or create librarian record
      let updatedLibrarian;

      if (originalUser.librarian) {
        // Update existing librarian record
        console.log("📝 Updating existing librarian record");
        updatedLibrarian = await tx.librarian.update({
          where: { user_id: userId },
          data: {
            employee_id: empId,
            position: position || mappedRole,
            contact_num: 0, // Always 0 since we don't collect it
          },
        });
      } else {
        // Create new librarian record (shouldn't happen for admin users, but just in case)
        console.log("📝 Creating new librarian record");
        updatedLibrarian = await tx.librarian.create({
          data: {
            employee_id: empId,
            position: position || mappedRole,
            contact_num: 0,
            user_id: userId,
          },
        });
      }

      console.log("✅ Librarian record updated");

      // 🚨 ADD ACTIVITY LOG for user changes by ADMIN
      if (adminUser && adminUser.role === "ADMIN") {
        try {
          const targetUserName =
            `${fullName} ${lastName}${extension ? " " + extension : ""}`.trim();
          const changeDescription = generateChangeDescription(originalUser, {
            first_name: fullName,
            mid_name: middleName || null,
            last_name: lastName,
            ext_name: extension || null,
            email,
            role: mappedRole,
            employeeID,
            position: position || mappedRole,
            status: status || "",
            password: !!password,
          });

          await tx.activity_logs.create({
            data: {
              employee_id: adminUser.librarian?.employee_id,
              user_id: adminUser.user_id,
              name: `${adminUser.first_name} ${adminUser.last_name}`.trim(),
              activity: `Updated user profile for "${targetUserName}": ${changeDescription}`,
              activity_type: activity_type.MODIFY_USER,
              user_agent: request.headers.get("user-agent") || "",
              ip_address:
                request.headers.get("x-forwarded-for") ||
                request.headers.get("x-real-ip") ||
                "unknown",
              status: "success",
              created_at: new Date(),
            },
          });

          console.log("✅ Activity log created for user profile update");
        } catch (logError) {
          console.error("❌ Failed to create activity log:", logError);
          // Don't fail the transaction, just log the error
        }
      }

      return { user: updatedUser, librarian: updatedLibrarian };
    });

    console.log("🎉 Update transaction completed successfully");

    // Return updated user data
    const responseUser = {
      id: result.user.user_id,
      fullName: result.user.first_name || "",
      middleName: result.user.mid_name || "",
      lastName: result.user.last_name || "",
      extension: result.user.ext_name || "",
      employeeID: result.librarian.employee_id.toString(),
      email: result.user.email,
      role: result.user.role || "",
      status: status || "",
      userAccess: finalUserAccess,
      contactNum: result.librarian.contact_num.toString(),
      position: result.librarian.position || "",
      name: `${result.user.first_name || ""} ${result.user.last_name || ""}${result.user.ext_name ? " " + result.user.ext_name : ""}`.trim(),
    };

    console.log("📤 Returning response user:", responseUser);

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: responseUser,
    });
  } catch (error) {
    console.error("💥 Error updating user:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace",
    );

    if (error instanceof Error) {
      // Handle specific Prisma errors
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          {
            success: false,
            message: "Email or Employee ID already exists for another user.",
          },
          { status: 400 },
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while updating user.",
      },
      { status: 500 },
    );
  }
}
