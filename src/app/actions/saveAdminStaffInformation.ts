// src/app/actions/saveAdminStaffInformation.ts
"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { user_role } from "@prisma/client";
import { validateNewUserRole, type RoleName } from "@/lib/roleValidation";

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
      status,
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
      status,
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
    const validRoles = ["LIBRARIAN", "ADMIN", "ASSISTANT"];
    if (!validRoles.includes(role)) {
      console.log("❌ Invalid role:", role);
      throw new Error(
        `Invalid role. This action only supports: ${validRoles.join(", ")}`,
      );
    }

    // 🆕 NEW: Role limit validation
    console.log("🔍 Checking role limits for:", role);
    try {
      const roleValidation = await validateNewUserRole(role as RoleName);

      if (!roleValidation.isValid) {
        console.log("❌ Role limit exceeded:", roleValidation.message);
        throw new Error(roleValidation.message);
      }

      console.log("✅ Role limit validation passed:", roleValidation.message);
    } catch (roleError) {
      console.error("❌ Role validation error:", roleError);
      if (roleError instanceof Error) {
        throw new Error(`Role validation failed: ${roleError.message}`);
      } else {
        throw new Error("Role validation failed: Unknown error");
      }
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Password hashed successfully");

    // Use transaction to create user and librarian records
    const result = await prisma.$transaction(async (tx) => {
      console.log("🏁 Starting transaction to create user and librarian...");

      // Create user record
      const newUser = await tx.users.create({
        data: {
          first_name: firstName,
          mid_name: middleName || null,
          last_name: lastName,
          ext_name: ext || null,
          email,
          password: hashedPassword,
          role: role as user_role,
          status: status || "ACTIVE", // Default to ACTIVE if not provided
          created_at: new Date(),
        },
      });

      console.log("✅ User created with ID:", newUser.user_id);

      // Create librarian record
      const newLibrarian = await tx.librarian.create({
        data: {
          employee_id: empId,
          position: position || role, // Use position if provided, otherwise use role
          contact_num: 0, // Default contact number - can be updated later
          user_id: newUser.user_id,
        },
      });

      console.log("✅ Librarian record created with employee_id:", empId);

      return { user: newUser, librarian: newLibrarian };
    });

    console.log("🎉 Transaction completed successfully");

    // Return success response with user info (excluding password)
    return {
      success: true,
      message: "Admin/Staff user created successfully",
      user: {
        id: result.user.user_id,
        firstName: result.user.first_name,
        lastName: result.user.last_name,
        email: result.user.email,
        role: result.user.role,
        status: result.user.status,
        employeeID: empId.toString(),
        position: result.librarian.position,
      },
    };
  } catch (err) {
    console.error("💥 Error in saveAdminStaffInformation:", {
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
