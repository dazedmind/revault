// src/app/admin/api/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

async function verifyAndGetPayload(req: NextRequest) {
  // Try cookies first, then Authorization header (same pattern as your other APIs)
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

export async function GET(request: NextRequest) {
  console.log("🔍 Stats request received");

  // 1) Verify JWT using your existing pattern
  let payload;
  try {
    payload = await verifyAndGetPayload(request);
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

  // 2) Role check - only allow admin roles (same as your other APIs)
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
    // ✅ OPTIMIZED: Use database aggregation instead of fetching all data
    console.log("📊 Calculating stats using database aggregation...");

    // Parallel execution of all stat queries for better performance
    const [
      totalPapers,
      itPapers,
      csPapers,
      totalUsers,
      recentPapers, // Papers from last 30 days
    ] = await Promise.all([
      // Total papers count
      prisma.papers.count(),

      // Information Technology papers count
      prisma.papers.count({
        where: { department: "Information Technology" },
      }),

      // Computer Science papers count
      prisma.papers.count({
        where: { department: "Computer Science" },
      }),

      // Total users count
      prisma.users.count(),

      // Recent papers (last 30 days) - for additional insight
      prisma.papers.count({
        where: {
          created_at: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          },
        },
      }),
    ]);

    // ✅ FAST: Return calculated stats directly
    const stats = {
      success: true,
      data: {
        totalPapers,
        departments: {
          "Information Technology": itPapers,
          "Computer Science": csPapers,
        },
        totalUsers,
        recentPapers, // Bonus stat
        lastUpdated: new Date().toISOString(),
      },
      // Performance info for debugging
      meta: {
        calculatedAt: new Date().toISOString(),
        source: "database_aggregation",
      },
    };

    console.log("✅ Stats calculated successfully:", stats.data);

    return new NextResponse(JSON.stringify(stats), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("💥 Stats API error:", err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "Failed to calculate statistics",
        details: err instanceof Error ? err.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}
