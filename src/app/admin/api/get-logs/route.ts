// File: app/admin/api/get-logs/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { user_role } from "@prisma/client";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

// Helper function to convert BigInt values to strings for JSON serialization
function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "bigint") {
    return obj.toString();
  }

  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt);
  }

  if (typeof obj === "object") {
    const result: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = serializeBigInt(obj[key]);
      }
    }
    return result;
  }

  return obj;
}

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

  const where: any = {};
  if (userIdParam !== "all") {
    where.user_id = Number(userIdParam);
  }

  if (activityTypesParam !== "all") {
    const typesArray = activityTypesParam.split(",").map((t) => t.trim());
    where.activity_type = { in: typesArray };
  }

  console.log("🔍 Database where clause:", where);

  try {
    console.log("📊 Fetching admin/staff users and activity logs...");

    const [adminStaffUsers, total, logs] = await prisma.$transaction([
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

      prisma.activity_logs.count({ where }),

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

    const formattedUsers = adminStaffUsers.map((user) => ({
      user_id: user.user_id,
      name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
      email: user.email,
      role: user.role,
      employee_id: user.librarian?.employee_id?.toString() || "",
      position: user.librarian?.position || "",
    }));

    const formattedLogs = logs.map((log) => {
      const employeeId = log.employee_id as number | bigint | null;
      const librarianEmployeeId = log.librarian?.employee_id as number | bigint | null;

      return {
        act_id: log.act_id,
        name: log.name,
        activity: log.activity,
        created_at:
          log.created_at instanceof Date
            ? log.created_at.toISOString()
            : log.created_at,
        ip_address: log.ip_address,
        activity_type: log.activity_type,
        status: log.status,
        user_agent: log.user_agent,
        user_id: log.user_id,
        employee_id:
          employeeId != null
            ? typeof employeeId === "bigint"
              ? employeeId.toString()
              : String(employeeId)
            : null,
        user_details: log.users
          ? {
              name: `${log.users.first_name || ""} ${log.users.last_name || ""}`.trim(),
              email: log.users.email,
              role: log.users.role,
            }
          : null,
        librarian_details: log.librarian
          ? {
              employee_id:
                librarianEmployeeId != null
                  ? typeof librarianEmployeeId === "bigint"
                    ? librarianEmployeeId.toString()
                    : String(librarianEmployeeId)
                  : null,
              position: log.librarian.position,
            }
          : null,
      };
    });

    const responseData = serializeBigInt({
      success: true,
      total,
      page,
      limit,
      logs: formattedLogs,
      users: formattedUsers,
      summary: {
        total_logs: total,
        total_admin_staff: formattedUsers.length,
        roles_breakdown: {
          ADMIN: formattedUsers.filter((u) => u.role === "ADMIN").length,
          ASSISTANT: formattedUsers.filter((u) => u.role === "ASSISTANT").length,
          LIBRARIAN: formattedUsers.filter((u) => u.role === "LIBRARIAN").length,
        },
      },
    });

    return new NextResponse(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
