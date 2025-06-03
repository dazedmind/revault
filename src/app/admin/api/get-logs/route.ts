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
  // 1) Verify JWT
  let payload;
  try {
    payload = await verifyAndGetPayload(req);
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ success: false, message: err.message }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  // 2) Only allow certain roles
  const role = payload.role.toLowerCase();
  if (!["admin", "adminassistant", "librarian"].includes(role)) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Forbidden" }),
      { status: 403, headers: { "Content-Type": "application/json" } },
    );
  }

  // 3) Parse query params
  const { searchParams } = new URL(req.url);
  const userIdParam = searchParams.get("userId") || "all";
  const activityTypesParam = searchParams.get("activityTypes") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const skip = (page - 1) * limit;

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

  // 5) Fetch count + paginated logs
  try {
    const [total, logs] = await prisma.$transaction([
      prisma.activity_logs.count({ where }),
      prisma.activity_logs.findMany({
        where,
        orderBy: { created_at: "desc" },
        skip,
        take: limit,
        select: {
          name: true,
          activity: true,
          created_at: true,
          ip_address: true,
          activity_type: true,
          status: true,
        },
      }),
    ]);

    return new NextResponse(
      JSON.stringify({
        success: true,
        total,
        page,
        limit,
        logs,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (dbErr) {
    console.error("Failed to fetch logs:", dbErr);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Database error." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}
