// src/app/admin/api/check-employee-id/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

async function verifyAndGetPayload(req: NextRequest) {
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

export async function POST(req: NextRequest) {
  console.log("🔍 Employee ID check request received");

  // 1) Verify JWT
  let payload;
  try {
    payload = await verifyAndGetPayload(req);
    console.log("✅ JWT verified for user:", {
      user_id: payload.user_id,
      role: payload.role,
    });
  } catch (err: any) {
    console.log("❌ JWT verification failed:", err.message);
    return new NextResponse(
      JSON.stringify({ success: false, message: err.message }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  // 2) Only allow admin/staff roles
  const allowedRoles = ["ADMIN", "ASSISTANT", "LIBRARIAN"];
  if (!allowedRoles.includes(payload.role)) {
    console.log("❌ Access denied for role:", payload.role);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Access denied",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const { employeeID, excludeUserId } = await req.json();
    console.log(
      "📝 Checking employee ID:",
      employeeID,
      "excluding user:",
      excludeUserId,
    );

    // Validate employee ID format
    if (!employeeID || !/^\d{10}$/.test(employeeID)) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          isUnique: true, // Return true for invalid format so frontend handles format validation
          message: "Invalid employee ID format. Must be exactly 10 digits.",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    // Convert string to number for database query
    const empId = parseInt(employeeID);

    // Check if employee ID already exists in librarian table
    const whereClause: any = {
      employee_id: empId,
    };

    // Exclude specific user if provided (for edit operations)
    if (excludeUserId) {
      whereClause.user_id = { not: excludeUserId };
    }

    const existingLibrarian = await prisma.librarian.findFirst({
      where: whereClause,
    });

    const isUnique = !existingLibrarian;

    console.log("📊 Employee ID check result:", {
      employeeID,
      exists: !isUnique,
      isUnique,
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        isUnique,
        message: isUnique
          ? "Employee ID is available"
          : "Employee ID already exists",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("💥 Error checking employee ID:", error);

    // Return true on error so the form doesn't get stuck
    return new NextResponse(
      JSON.stringify({
        success: true,
        isUnique: true,
        message: "Unable to verify employee ID. Please try again.",
        error: "Verification temporarily unavailable",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }
}
