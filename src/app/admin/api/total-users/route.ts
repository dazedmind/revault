// src/app/admin/api/total-users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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
  console.log("🔍 Total users count request received");

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
    console.log("📊 Counting total users...");
    
    // Just count all users
    const totalUsers = await prisma.users.count();
    
    console.log("✅ Total users counted:", totalUsers);

    return new NextResponse(
      JSON.stringify({
        success: true,
        total_users: totalUsers,
        message: "User count retrieved successfully"
      }),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        } 
      },
    );

  } catch (error) {
    console.error("💥 Error counting users:", error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Failed to count users",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}