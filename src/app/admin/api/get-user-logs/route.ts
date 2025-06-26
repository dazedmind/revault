// File: src/app/admin/api/get-user-logs/route.ts
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
  console.log("🔍 GET /admin/api/get-user-logs - Starting request");

  try {
    // 1) Verify JWT and get user info
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

    // 2) Check if user has admin access
    const allowedRoles = ["ADMIN", "ASSISTANT", "LIBRARIAN"];
    if (!allowedRoles.includes(payload.role)) {
      console.log(`❌ Access denied for role: ${payload.role}`);
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
    const userRoleParam = searchParams.get("userRole") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const skip = (page - 1) * limit;

    console.log("📋 Query parameters:", {
      userIdParam,
      activityTypesParam,
      userRoleParam,
      page,
      limit,
      skip,
    });

    // 3) Build Prisma where clause
    const where: any = {};

    if (userIdParam !== "all") {
      where.user_id = Number(userIdParam);
    }

    if (activityTypesParam !== "all") {
      const typesArray = activityTypesParam.split(",").map((t) => t.trim());
      where.activity_type = { in: typesArray };
    }

    // Filter by user role if specified
    if (userRoleParam !== "all") {
      if (userRoleParam === "STUDENT") {
        where.student_num = { not: BigInt(0) };
      } else if (userRoleParam === "FACULTY") {
        where.employee_id = { not: BigInt(0) };
        where.student_num = BigInt(0);
      }
    }

    console.log("🔍 Database where clause:", where);

    try {
      console.log("📊 Fetching regular users and their activity logs...");

      // 4) Get all regular users (students and faculty) for dropdown
      const [allUsers, total, logs] = await prisma.$transaction([
        // Get all users who are students or faculty
        prisma.users.findMany({
          where: {
            OR: [{ role: "STUDENT" }, { role: "FACULTY" }],
          },
          select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            role: true,
            students: {
              select: {
                student_num: true,
                program: true,
                college: true,
                year_level: true,
              },
            },
            faculty: {
              select: {
                employee_id: true,
                position: true,
                department: true,
              },
            },
          },
          orderBy: [{ role: "asc" }, { first_name: "asc" }],
        }),

        // Count total matching user activity logs
        prisma.user_activity_logs.count({ where }),

        // Get paginated user activity logs
        prisma.user_activity_logs.findMany({
          where,
          orderBy: { created_at: "desc" },
          skip,
          take: limit,
          select: {
            activity_id: true,
            name: true,
            activity: true,
            created_at: true,
            activity_type: true,
            status: true,
            user_agent: true,
            user_id: true,
            paper_id: true,
            employee_id: true,
            student_num: true,
            users: {
              select: {
                first_name: true,
                last_name: true,
                email: true,
                role: true,
              },
            },
            papers: {
              select: {
                title: true,
                author: true,
              },
            },
          },
        }),
      ]);

      console.log("✅ Data fetched successfully:", {
        totalUsers: allUsers.length,
        totalLogs: total,
        currentPageLogs: logs.length,
      });

      // 5) Format logs for frontend
      const formattedLogs = logs.map((log) => ({
        name: log.name || "Unknown User",
        activity: log.activity || "No activity description",
        created_at: log.created_at?.toISOString() || new Date().toISOString(),
        activity_type: log.activity_type || null,
        status: log.status || "success",
        paper_id: log.paper_id || 0,
        student_num: log.student_num?.toString() || "0",
        employee_id: log.employee_id?.toString() || "0",
        user_role: log.users?.role || "USER",
        paper_title: log.papers?.title || null,
        paper_author: log.papers?.author || null,
      }));

      // 6) Format users for dropdown
      const formattedUsers = allUsers.map((user) => ({
        userId: user.user_id,
        name:
          `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
          user.email,
        role: user.role,
        details:
          user.role === "STUDENT"
            ? `${user.students?.program || ""} - Year ${user.students?.year_level || "N/A"}`
            : user.role === "FACULTY"
              ? `${user.faculty?.department || ""} - ${user.faculty?.position || ""}`
              : "",
      }));

      console.log("📤 Sending response with", {
        users: formattedUsers.length,
        logs: formattedLogs.length,
        total,
        page,
        limit,
      });

      return new NextResponse(
        JSON.stringify({
          success: true,
          logs: formattedLogs,
          users: formattedUsers,
          total,
          page,
          limit,
          hasNext: page * limit < total,
          hasPrev: page > 1,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (dbError) {
      console.error("💥 Database error:", dbError);
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Database query failed",
          error:
            process.env.NODE_ENV === "development"
              ? (dbError as Error).message
              : "Internal server error",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  } catch (error) {
    console.error("💥 Error in get-user-logs API:", error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : "Something went wrong",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    if (process.env.NODE_ENV !== "development") {
      await prisma.$disconnect();
    }
  }
}
