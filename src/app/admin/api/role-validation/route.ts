// src/app/admin/api/role-validation/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  validateNewUserRole,
  validateRoleChange,
  validateStatusChange,
  getAllRoleCounts,
  type RoleName,
} from "@/lib/roleValidation";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

async function verifyAndGetPayload(req: NextRequest) {
  // Try cookies first, then Authorization header
  let token = req.cookies.get("authToken")?.value;

  if (!token) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  if (!token) throw new Error("NO_TOKEN");

  try {
    return jwt.verify(token, SECRET_KEY) as {
      user_id: number;
      firstName: string;
      email: string;
      role: string;
      userNumber: string;
      iat?: number;
      exp?: number;
    };
  } catch {
    throw new Error("INVALID_TOKEN");
  }
}

export async function GET(req: NextRequest) {
  console.log("🔍 Role validation API request received");

  // Verify JWT
  let payload;
  try {
    payload = await verifyAndGetPayload(req);
    console.log("✅ JWT verified for user:", {
      user_id: payload.user_id,
      role: payload.role,
    });
  } catch (err: any) {
    console.log("❌ JWT verification failed:", err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 401 },
    );
  }

  // Only allow admin/staff roles
  const allowedRoles = ["ADMIN", "ASSISTANT", "LIBRARIAN"];
  if (!allowedRoles.includes(payload.role)) {
    console.log("❌ Access denied for role:", payload.role);
    return NextResponse.json(
      { success: false, message: "Access denied" },
      { status: 403 },
    );
  }

  try {
    console.log("📊 Fetching all role counts...");

    const roleCounts = await getAllRoleCounts();

    console.log("✅ Role counts retrieved:", roleCounts);

    return NextResponse.json({
      success: true,
      roleCounts,
    });
  } catch (error) {
    console.error("💥 Error fetching role counts:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch role counts",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  console.log("🔍 Role validation POST request received");

  // Verify JWT
  let payload;
  try {
    payload = await verifyAndGetPayload(req);
    console.log("✅ JWT verified for user:", {
      user_id: payload.user_id,
      role: payload.role,
    });
  } catch (err: any) {
    console.log("❌ JWT verification failed:", err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 401 },
    );
  }

  // Only allow admin/staff roles
  const allowedRoles = ["ADMIN", "ASSISTANT", "LIBRARIAN"];
  if (!allowedRoles.includes(payload.role)) {
    console.log("❌ Access denied for role:", payload.role);
    return NextResponse.json(
      { success: false, message: "Access denied" },
      { status: 403 },
    );
  }

  try {
    const body = await req.json();
    const { action, role, userId, newStatus } = body;

    console.log("📋 Validation request:", { action, role, userId, newStatus });

    let result;

    switch (action) {
      case "validateNewUser":
        result = await validateNewUserRole(role as RoleName);
        break;

      case "validateRoleChange":
        result = await validateRoleChange(role as RoleName, userId);
        break;

      case "validateStatusChange":
        result = await validateStatusChange(
          role as RoleName,
          newStatus,
          userId,
        );
        break;

      default:
        return NextResponse.json(
          { success: false, message: "Invalid action" },
          { status: 400 },
        );
    }

    console.log("✅ Validation result:", result);

    return NextResponse.json({
      success: true,
      validation: result,
    });
  } catch (error) {
    console.error("💥 Error in role validation:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to validate role",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
