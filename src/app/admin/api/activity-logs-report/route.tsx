// File: src/app/admin/api/activity-logs-report/route.tsx
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import React from "react";
import { renderToStream, DocumentProps } from "@react-pdf/renderer";
import ActivityLogsReport from "@/lib/ActivityLogsReport";

export const runtime = "nodejs";

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

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Activity Logs PDF generation request received");

    // 1) Verify JWT
    let payload;
    try {
      payload = await verifyAndGetPayload(request);
      console.log("✅ JWT verified for user:", {
        user_id: payload.user_id,
        role: payload.role,
        email: payload.email,
      });
    } catch (err: any) {
      console.log("❌ JWT verification failed:", err.message);
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2) Only allow admin/staff roles
    const allowedRoles = ["ADMIN", "ADMIN_ASSISTANT", "LIBRARIAN"];
    if (!allowedRoles.includes(payload.role)) {
      console.log("❌ Access denied for role:", payload.role);
      return new NextResponse("Forbidden", { status: 403 });
    }

    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // 3) Parse query params (same as get-logs route)
    const userIdParam = searchParams.get("userId") || "all";
    const activityTypesParam = searchParams.get("activityTypes") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const download = searchParams.get("download") === "1";
    const skip = (page - 1) * limit;

    console.log("📋 Query parameters:", {
      userIdParam,
      activityTypesParam,
      page,
      limit,
      download,
      skip,
    });

    // 4) Build Prisma where-clause (same as get-logs route)
    const where: any = {};
    if (userIdParam !== "all") {
      where.user_id = Number(userIdParam);
    }

    if (activityTypesParam !== "all") {
      const typesArray = activityTypesParam.split(",").map((t) => t.trim());
      where.activity_type = { in: typesArray };
    }

    console.log("🔍 Database where clause:", where);

    // 5) Fetch logs and total count
    const [total, logs] = await Promise.all([
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
        },
      }),
    ]);

    console.log("✅ Data fetched successfully:", {
      totalLogs: total,
      currentPageLogs: logs.length,
    });

    // 6) Format logs for PDF
    const formattedLogs = logs.map((log) => ({
      name: log.name,
      activity: log.activity,
      created_at: log.created_at.toISOString(),
      ip_address: log.ip_address,
      activity_type: log.activity_type,
      status: log.status,
    }));

    // 7) Prepare filter info for PDF
    const filters = {
      userId: userIdParam,
      activityTypes: activityTypesParam,
      userCount: logs.length,
      dateRange: "Current filters applied",
    };

    // 8) Create PDF element
    const pdfElement = (
      <ActivityLogsReport
        logs={formattedLogs}
        filters={filters}
        total={total}
        page={page}
        limit={limit}
      />
    ) as React.ReactElement<DocumentProps>;

    // 9) Render to stream and buffer
    const pdfStream = await renderToStream(pdfElement);
    const buffers: Uint8Array[] = [];
    for await (const chunk of pdfStream) {
      buffers.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    const pdfBuffer = Buffer.concat(buffers);

    // 10) Return PDF
    const headers: Record<string, string> = {
      "Content-Type": "application/pdf",
      "Content-Disposition": download
        ? `attachment; filename="activity-logs-report-${new Date().getTime()}.pdf"`
        : `inline; filename="activity-logs-report-${new Date().getTime()}.pdf"`,
    };

    console.log("✅ PDF generated successfully");
    return new NextResponse(pdfBuffer, { status: 200, headers });
  } catch (error) {
    console.error("💥 Activity Logs PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate activity logs PDF" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
