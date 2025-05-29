import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db"; // adjust if you use a different path 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      author,
      abstract,
      course,
      department,
      year,
      keywords,
    } = body;

    const created = await prisma.papers.create({
      data: {
        title,
        author,
        abstract,
        course,
        department, 
        year: parseInt(year),
        keywords, // assuming it's a string[] in your model
        created_at: new Date(),
        updated_at: new Date()
      },
    });

    return NextResponse.json({ success: true, id: created.paper_id });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
