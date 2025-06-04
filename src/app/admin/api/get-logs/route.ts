// File: app/admin/api/get-logs/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

async function verifyAndGetPayload(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
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
  console.log("🔍 Get logs request received");

  // 1) Verify JWT
  let payload;
  try {
    payload = await verifyAndGetPayload(req);
    console.log("✅ JWT verified for user:", {
      user_id: payload.user_id,
      role: payload.role,
      email: payload.email,
    });
  } catch (err: any) {
    console.log("❌ JWT verification failed:", err.message);
    return new NextResponse(
      JSON.stringify({ success: false, message: err.message }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  // 2) Only allow admin/staff roles (updated to match new enum values)
  const allowedRoles = ["ADMIN", "ASSISTANT", "LIBRARIAN"];
  if (!allowedRoles.includes(payload.role)) {
    console.log("❌ Access denied for role:", payload.role);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: `Access denied. Required roles: ${allowedRoles.join(", ")}`,
      }),
      { status: 403, headers: { "Content-Type": "application/json" } },
    );
  }

  console.log("✅ Role access granted:", payload.role);

  // 3) Parse query params
  const { searchParams } = new URL(req.url);
  const userIdParam = searchParams.get("userId") || "all";
  const activityTypesParam = searchParams.get("activityTypes") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const skip = (page - 1) * limit;

  console.log("📋 Query parameters:", {
    userIdParam,
    activityTypesParam,
    page,
    limit,
    skip,
  });

  // 4) Build Prisma where-clause
  const where: any = {};
  if (userIdParam !== "all") {
    // Filter by user_id in activity_logs
    where.user_id = Number(userIdParam);
  }

  if (activityTypesParam !== "all") {
    // Split comma-separated values into array
    const typesArray = activityTypesParam.split(",").map((t) => t.trim());
    where.activity_type = { in: typesArray };
  }

  console.log("🔍 Database where clause:", where);

  // 5) Fetch admin/staff users for dropdown/filtering
  try {
    console.log("📊 Fetching admin/staff users and activity logs...");

    const [adminStaffUsers, total, logs] = await prisma.$transaction([
      // Get all admin/staff users with their librarian details
      prisma.users.findMany({
        where: {
          role: {
            in: ["ADMIN", "ASSISTANT", "LIBRARIAN"],
          },
        },
        select: {
          user_id: true,
          first_name: true,
          last_name: true,
          email: true,
          role: true,
          librarian: {
            select: {
              employee_id: true,
              position: true,
            },
          },
        },
        orderBy: [{ role: "asc" }, { first_name: "asc" }],
      }),

      // Count total logs matching criteria
      prisma.activity_logs.count({ where }),

      // Fetch paginated logs with user and librarian details
      prisma.activity_logs.findMany({
        where,
        orderBy: { created_at: "desc" },
        skip,
        take: limit,
        select: {
          act_id: true,
          name: true,
          activity: true,
          created_at: true,
          ip_address: true,
          activity_type: true,
          status: true,
          user_agent: true,
          user_id: true,
          employee_id: true,
          // Include user and librarian details
          users: {
            select: {
              first_name: true,
              last_name: true,
              email: true,
              role: true,
            },
          },
          librarian: {
            select: {
              employee_id: true,
              position: true,
            },
          },
        },
      }),
    ]);

    console.log("✅ Data fetched successfully:", {
      adminStaffUsers: adminStaffUsers.length,
      totalLogs: total,
      currentPageLogs: logs.length,
    });

    // Format admin/staff users for frontend
    const formattedUsers = adminStaffUsers.map((user) => ({
      user_id: user.user_id,
      name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
      email: user.email,
      role: user.role,
      employee_id: user.librarian?.employee_id?.toString() || "",
      position: user.librarian?.position || "",
    }));

    // Format logs with enhanced user information
    const formattedLogs = logs.map((log) => ({
      act_id: log.act_id,
      name: log.name,
      activity: log.activity,
      created_at: log.created_at,
      ip_address: log.ip_address,
      activity_type: log.activity_type,
      status: log.status,
      user_agent: log.user_agent,
      user_id: log.user_id,
      employee_id: log.employee_id,
      // Enhanced user info
      user_details: log.users
        ? {
            name: `${log.users.first_name || ""} ${log.users.last_name || ""}`.trim(),
            email: log.users.email,
            role: log.users.role,
          }
        : null,
      librarian_details: log.librarian
        ? {
            employee_id: log.librarian.employee_id,
            position: log.librarian.position,
          }
        : null,
    }));

    return new NextResponse(
      JSON.stringify({
        success: true,
        total,
        page,
        limit,
        logs: formattedLogs,
        users: formattedUsers, // Admin/staff users for filtering
        summary: {
          total_logs: total,
          total_admin_staff: formattedUsers.length,
          roles_breakdown: {
            ADMIN: formattedUsers.filter((u) => u.role === "ADMIN").length,
            ASSISTANT: formattedUsers.filter((u) => u.role === "ASSISTANT")
              .length,
            LIBRARIAN: formattedUsers.filter((u) => u.role === "LIBRARIAN")
              .length,
          },
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (dbErr) {
    console.error("💥 Failed to fetch logs:", dbErr);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Database error while fetching logs and users.",
        error: dbErr instanceof Error ? dbErr.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}
