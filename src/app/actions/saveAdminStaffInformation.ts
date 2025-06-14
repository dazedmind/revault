// src/app/actions/saveAdminStaffInformation.ts
"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { user_role } from "@prisma/client";

export async function saveAdminStaffInformation(formData: any) {
  console.log(
    "🔍 saveAdminStaffInformation called with formData:",
    JSON.stringify(formData, null, 2),
  );

  try {
    const {
      firstName,
      middleName,
      lastName,
      ext,
      email,
      password,
      confirmPassword,
      employeeID,
      position,
      role,
    } = formData;

    console.log("📝 Extracted fields:", {
      firstName,
      middleName,
      lastName,
      ext,
      email,
      role,
      employeeID,
      position,
      hasPassword: !!password,
      hasConfirmPassword: !!confirmPassword,
    });

    // Basic validation
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      console.log("❌ Basic validation failed");
      throw new Error(
        "Missing required fields: firstName, lastName, email, password, confirmPassword",
      );
    }

    if (password !== confirmPassword) {
      console.log("❌ Password mismatch");
      throw new Error("Passwords don't match.");
    }

    if (password.length < 6) {
      console.log("❌ Password too short");
      throw new Error("Password must be at least 6 characters long.");
    }

    // Role validation
    const validRoles = ["LIBRARIAN", "ADMIN", "ADMIN_ASSISTANT"];
    if (!validRoles.includes(role)) {
      console.log("❌ Invalid role:", role);
      throw new Error(
        `Invalid role. This action only supports: ${validRoles.join(", ")}`,
      );
    }

    // All admin/staff roles require employee ID
    if (!employeeID) {
      console.log("❌ Missing employee ID");
      throw new Error("Employee ID is required for admin/staff roles.");
    }

    // Validate employeeID is exactly 10 digits
    if (!/^\d{10}$/.test(employeeID)) {
      console.log("❌ Invalid employee ID format");
      throw new Error("Employee ID must be exactly 10 digits.");
    }

    const empId = parseInt(employeeID);

    // Additional check to ensure it's within valid range for 32-bit integer
    if (empId > 2147483647) {
      console.log("❌ Employee ID too large");
      throw new Error(
        "Employee ID is too large. Please use a 10-digit number starting with 1.",
      );
    }

    // Check if email already exists
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("❌ Email already exists");
      throw new Error("Email already exists.");
    }

    // Check if employee ID already exists in librarian table
    const existingLibrarian = await prisma.librarian.findUnique({
      where: { employee_id: empId },
    });
    if (existingLibrarian) {
      console.log("❌ Employee ID already exists");
      throw new Error("Employee ID already exists.");
    }

    console.log("✅ All validations passed, starting database operations...");

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed successfully");

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Create user record first
      console.log("📝 Creating user with data:", {
        first_name: firstName,
        mid_name: middleName || null,
        last_name: lastName,
        ext_name: ext || null,
        email,
        role: role as user_role,
        created_at: new Date(),
      });

      const user = await tx.users.create({
        data: {
          first_name: firstName,
          mid_name: middleName || null,
          last_name: lastName,
          ext_name: ext || null,
          email,
          password: hashedPassword,
          role: role as user_role,
          created_at: new Date(),
        },
      });

      console.log("✅ User created successfully:", {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
      });

      // ALL admin/staff roles go into the librarian table
      const librarianData = {
        employee_id: empId, // Regular number (Int)
        position: position || role, // Use role as default position if not provided
        contact_num: 0, // Always use 0 since we don't collect contact numbers
        user_id: user.user_id,
      };

      console.log("📝 Creating librarian record with data:", librarianData);

      const librarianRecord = await tx.librarian.create({
        data: librarianData,
      });

      console.log("✅ Librarian record created successfully:", librarianRecord);

      return {
        user,
        librarianRecord,
        type: role.toLowerCase(),
      };
    });

    console.log(`🎉 User and ${role} info saved in librarian table!`);

    return {
      success: true,
      message: `${role.toLowerCase()} created successfully`,
      data: {
        userId: result.user.user_id,
        email: result.user.email,
        role: result.user.role,
        type: result.type,
        employeeId: result.librarianRecord.employee_id, // Regular number
        position: result.librarianRecord.position,
      },
    };
  } catch (err) {
    console.error("💥 Save admin/staff error:", err);
    console.error("Error details:", {
      message: err instanceof Error ? err.message : "Unknown error",
      stack: err instanceof Error ? err.stack : "No stack trace",
    });

    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error(
        "An unexpected error occurred while saving admin/staff information.",
      );
    }
  }
}
