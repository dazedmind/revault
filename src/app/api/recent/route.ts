// app/api/recent/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {
  try {
    const recentPapers = await prisma.papers.findMany({
      where: { is_deleted: false },
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
