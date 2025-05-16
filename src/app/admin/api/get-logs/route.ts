// app/api/get-logs/route.ts

import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const logs = await prisma.activity_logs.findMany({
      orderBy: { created_at: "desc" },
      take: 50, // limit to recent 50 logs
    });

    return NextResponse.json(logs, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch logs:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
