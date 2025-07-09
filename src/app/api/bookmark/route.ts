import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;

  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const payload = (await jwt.verify(token, SECRET_KEY)) as any;

    if (!payload?.user_id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 🔧 FIX: Remove RBAC check - allow ALL authenticated users to bookmark
    const user = await prisma.users.findUnique({
      where: { user_id: payload.user_id },
      select: { role: true, user_id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ REMOVED: Role restriction - now all authenticated users can bookmark
    console.log(`✅ Bookmark creation allowed for role: ${user.role}`);

    const { paperId, paper_id } = await req.json();
    const finalPaperId = paperId || paper_id; // Support both field names

    if (!finalPaperId) {
      return NextResponse.json({ error: "Missing paper_id" }, { status: 400 });
    }

    // Check if bookmark already exists
    const existingBookmark = await prisma.user_bookmarks.findFirst({
      where: {
        user_id: payload.user_id,
        paper_id: Number(finalPaperId),
      },
    });

    if (existingBookmark) {
      return NextResponse.json(
        { message: "Paper already bookmarked" },
        { status: 200 },
      );
    }

    // Create the bookmark
    await prisma.user_bookmarks.create({
      data: {
        user_id: payload.user_id,
        paper_id: Number(finalPaperId),
      },
    });

    console.log(
      `✅ Bookmark created: User ${payload.user_id} bookmarked paper ${finalPaperId}`,
    );
    return NextResponse.json({
      success: true,
      message: "Paper bookmarked successfully",
    });
  } catch (err) {
    console.error("Bookmark API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
