// src/app/admin/api/update-user/[userId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // Updated type for Next.js 15
) {
  try {
    const { id } = await params; // Await params for Next.js 15
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
      role, // Also accept role as fallback
      position,
      status,
      password, // Optional password update
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

    // Basic validation - this is likely where the 400 error is coming from
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
        { success: false, message: "Employee ID must be exactly 10 digits." },
        { status: 400 },
      );
    }

    const empId = parseInt(employeeID);
    if (empId > 2147483647) {
      console.log("❌ Employee ID too large:", empId);
      return NextResponse.json(
        {
          success: false,
          message:
            "Employee ID is too large. Please use a 10-digit number starting with 1.",
        },
        { status: 400 },
      );
    }

    // Map userAccess to role
    const roleMapping: { [key: string]: string } = {
      "Librarian-in-Charge": "LIBRARIAN",
      "Admin Assistant": "ASSISTANT",
      Admin: "ADMIN",
      // Also handle direct role values
      LIBRARIAN: "LIBRARIAN",
      ASSISTANT: "ASSISTANT",
      ADMIN: "ADMIN",
    };

    const mappedRole = roleMapping[finalUserAccess];
    if (!mappedRole) {
      console.log("❌ Invalid userAccess/role value:", finalUserAccess);
      return NextResponse.json(
        {
          success: false,
          message: `Invalid user access: ${finalUserAccess}. Must be one of: Librarian-in-Charge, Admin Assistant, Admin, or LIBRARIAN, ASSISTANT, ADMIN`,
        },
        { status: 400 },
      );
    }

    console.log("🔄 Role mapping:", finalUserAccess, "→", mappedRole);

    // Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { user_id: userId },
      include: { librarian: true },
    });

    if (!existingUser) {
      console.log("❌ User not found:", userId);
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    console.log("✅ Found existing user:", {
      user_id: existingUser.user_id,
      email: existingUser.email,
      has_librarian: !!existingUser.librarian,
    });

    // Check if employee ID already exists (for different user)
    const existingLibrarian = await prisma.librarian.findUnique({
      where: { employee_id: empId },
    });

    if (existingLibrarian && existingLibrarian.user_id !== userId) {
      console.log("❌ Employee ID already exists for different user:", {
        empId,
        existingUserId: existingLibrarian.user_id,
        currentUserId: userId,
      });
      return NextResponse.json(
        {
          success: false,
          message: "Employee ID already exists for another user.",
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

    console.log("✅ All validations passed, starting update...");

    // Use transaction to update both tables
    const result = await prisma.$transaction(async (tx) => {
      // Prepare user update data
      const userUpdateData: any = {
        first_name: fullName,
        mid_name: middleName || null,
        last_name: lastName,
        ext_name: extension || null,
        email,
        role: mappedRole,
      };

      // Add password if provided
      if (password && password.length >= 6) {
        userUpdateData.password = await bcrypt.hash(password, 10);
        console.log("🔐 Password will be updated");
      }

      console.log("📝 Updating user with data:", {
        ...userUpdateData,
        password: userUpdateData.password ? "***" : "unchanged",
      });

      // Update user record
      const updatedUser = await tx.users.update({
        where: { user_id: userId },
        data: userUpdateData,
      });

      console.log("✅ User record updated");

      // Update or create librarian record
      let updatedLibrarian;

      if (existingUser.librarian) {
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
      status: status || "Active",
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

      if (error.message.includes("Record to update not found")) {
        return NextResponse.json(
          {
            success: false,
            message: "User or associated record not found.",
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: `Update failed: ${error.message}`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user",
      },
      { status: 500 },
    );
  }
}
