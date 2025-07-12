// File: src/app/admin/api/create-user/route.ts

import { NextResponse } from "next/server";
import { saveAdminStaffInformation } from "../../../actions/saveAdminStaffInformation";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { activity_type } from "@prisma/client";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

// Type definition for the result from saveAdminStaffInformation
interface SaveAdminStaffResult {
  success: boolean;
  message: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
    employeeID: string;
    position: string;
  };
}

// Helper function to extract admin info from JWT token
async function getAdminInfo(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cookieHeader = request.headers.get("cookie");

    let token: string | null = null;

    // Try to get token from Authorization header first
    if (authHeader && authHeader.startsWith("Bearer ")) {
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
            position: true,
          },
        },
      },
    });

    return adminUser;
  } catch (error) {
    console.error("Error extracting admin info:", error);
    return null;
  }
}

function replacer(key: string, value: any) {
  return typeof value === "bigint" ? value.toString() : value;
}

function convertBigIntToString(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, convertBigIntToString(v)]),
    );
  } else if (typeof obj === "bigint") {
    return obj.toString();
  }
  return obj;
}

export async function POST(req: Request) {
  console.log("🚀 API Route called: /admin/api/create-user");

  try {
    const body = await req.json();
    console.log("📥 Raw request body:", JSON.stringify(body, null, 2));

    // Get admin info for activity logging
    const adminUser = await getAdminInfo(req);
    if (!adminUser) {
      console.log("❌ Could not identify admin user for activity logging");
    }

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
      status: "ACTIVE",
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
    const result = (await saveAdminStaffInformation(
      formData,
    )) as SaveAdminStaffResult;
    console.log("✅ Action completed successfully:", result);

    // 🚨 ADD ACTIVITY LOG for user creation by ADMIN
    if (adminUser && adminUser.role === "ADMIN" && result.success) {
      try {
        const newUserName =
          `${formData.firstName} ${formData.lastName}${formData.ext ? " " + formData.ext : ""}`.trim();
        const userDetails = [
          `Name: ${newUserName}`,
          `Email: ${formData.email}`,
          `Role: ${role}`,
          `Employee ID: ${formData.employeeID}`,
          formData.position && `Position: ${formData.position}`,
        ]
          .filter(Boolean)
          .join(", ");

        await prisma.activity_logs.create({
          data: {
            employee_id: Number(adminUser.librarian?.employee_id),
            user_id: Number(adminUser.user_id),
            name: `${adminUser.first_name} ${adminUser.last_name}`.trim(),
            activity: `Created new user account: ${userDetails}`,
            activity_type: activity_type.ADD_USER,
            user_agent: req.headers.get("user-agent") || "",
            ip_address:
              req.headers.get("x-forwarded-for") ||
              req.headers.get("x-real-ip") ||
              "unknown",
            status: "success",
            created_at: new Date(),
          },
        });

        console.log("✅ Activity log created for user creation");
      } catch (logError) {
        console.error("❌ Failed to create activity log:", logError);
        // Don't fail the request, just log the error
      }
    }

    return new NextResponse(
      JSON.stringify(
        {
          success: true,
          message: result.message,
          user: result.user,
        },
        replacer,
      ),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("💥 Error in create-user route:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack",
    );

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    // 🚨 ADD ACTIVITY LOG for failed user creation
    try {
      const adminUser = await getAdminInfo(req);
      if (adminUser && adminUser.role === "ADMIN") {
        await prisma.activity_logs.create({
          data: {
            employee_id: adminUser.librarian?.employee_id,
            user_id: adminUser.user_id,
            name: `${adminUser.first_name} ${adminUser.last_name}`.trim(),
            activity: `Failed to create user account: ${errorMessage}`,
            activity_type: activity_type.ADD_USER,
            user_agent: req.headers.get("user-agent") || "",
            ip_address:
              req.headers.get("x-forwarded-for") ||
              req.headers.get("x-real-ip") ||
              "unknown",
            status: "failed",
            created_at: new Date(),
          },
        });
        console.log("✅ Activity log created for failed user creation");
      }
    } catch (logError) {
      console.error("❌ Failed to create failure activity log:", logError);
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 },
    );
  }
}
