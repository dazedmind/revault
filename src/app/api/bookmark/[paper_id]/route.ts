import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ paper_id: string }> },
) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const payload = (await jwt.verify(token, SECRET_KEY)) as any;
    const { paper_id } = await params;

    if (!paper_id || !payload?.user_id) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // ✅ No role check - any authenticated user can bookmark
    const existingBookmark = await prisma.user_bookmarks.findFirst({
      where: {
        user_id: payload.user_id,
        paper_id: Number(paper_id),
      },
    });

    if (existingBookmark) {
      return NextResponse.json(
        { message: "Paper already bookmarked" },
        { status: 200 },
      );
    }

    await prisma.user_bookmarks.create({
      data: {
        user_id: payload.user_id,
        paper_id: Number(paper_id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Paper bookmarked successfully",
    });
  } catch (err) {
    console.error("Bookmark API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ paper_id: string }> },
) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const payload = (await jwt.verify(token, SECRET_KEY)) as any;
    const { paper_id } = await params;

    if (!paper_id || !payload?.user_id) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // ✅ No role check - any authenticated user can remove bookmarks
    const result = await prisma.user_bookmarks.deleteMany({
      where: {
        user_id: payload.user_id,
        paper_id: Number(paper_id),
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { message: "Bookmark not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Bookmark removed successfully",
    });
  } catch (err) {
    console.error("Unbookmark API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
