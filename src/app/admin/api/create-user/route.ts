// File: src/app/admin/api/create-user/route.ts

import { NextResponse } from "next/server";
import { saveAdminStaffInformation } from "../../../actions/saveAdminStaffInformation";

export async function POST(req: Request) {
  console.log("🚀 API Route called: /admin/api/create-user");

  try {
    const body = await req.json();
    console.log("📥 Raw request body:", JSON.stringify(body, null, 2));

    // Normalize the role
    const role = body.role?.toUpperCase();
    console.log("🔄 Normalized role:", role);

    if (!role) {
      console.log("❌ No role provided");
      return NextResponse.json(
        { success: false, message: "Role is required" },
        { status: 400 },
      );
    }

    // Only allow admin/staff roles in admin panel
    const allowedRoles = ["LIBRARIAN", "ADMIN", "ASSISTANT"];
    if (!allowedRoles.includes(role)) {
      console.log("❌ Invalid role:", role);
      return NextResponse.json(
        {
          success: false,
          message: `Invalid role for admin panel. Must be one of: ${allowedRoles.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Map the request body to match the action's expected format
    const formData = {
      firstName: body.fullName || body.firstName,
      middleName: body.midName || body.middleName,
      lastName: body.lastName,
      ext: body.extName || body.ext,
      email: body.email,
      password: body.password,
      confirmPassword: body.confirmPassword || body.password,
      role: role,

      // Staff-specific fields
      employeeID: body.employeeID,
      position: body.position,

      // Librarian-specific fields
      contactNum: body.contactNum,
    };

    console.log("🗂️ Mapped form data for role:", role);
    console.log("📋 Form data details:", {
      ...formData,
      password: formData.password ? "***" : "missing",
      confirmPassword: formData.confirmPassword ? "***" : "missing",
      employeeID: formData.employeeID,
      contactNum: formData.contactNum,
      hasEmployeeID: !!formData.employeeID,
      hasContactNum: !!formData.contactNum,
    });

    console.log("📞 Calling saveAdminStaffInformation action...");
    const result = await saveAdminStaffInformation(formData);
    console.log("✅ Action completed successfully:", result);

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        user: result.data,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("💥 Error in create-user route:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack",
    );

    const errorMessage =
      error instanceof Error ? error.message : "Failed to create user";

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 400 },
    );
  }
}

// Get endpoint for form requirements
export async function GET() {
  return NextResponse.json({
    validRoles: ["ADMIN", "ASSISTANT", "LIBRARIAN"], // Only admin panel roles
    requiredFields: {
      all: ["firstName", "lastName", "email", "role", "password"],
      librarian: ["employeeID", "contactNum"],
      admin: ["employeeID"], // Optional but recommended
      assistant: ["employeeID"], // Optional but recommended
      optional: ["middleName", "ext", "position"],
    },
    fieldMapping: {
      fullName: "firstName",
      midName: "middleName",
      extName: "ext",
    },
    note: "This endpoint is for admin panel user creation only. Students and faculty register through the public registration flow.",
  });
}
