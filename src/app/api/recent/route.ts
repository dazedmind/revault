// app/api/recent/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const recentPapers = await prisma.papers.findMany({
      orderBy: { created_at: "desc" },
      take: 5,
    });
    // return as JSON!
    return NextResponse.json(recentPapers);
  } catch (err) {
    console.error("API /recent error:", err);
    return NextResponse.json(
      { error: "Unable to fetch papers" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
