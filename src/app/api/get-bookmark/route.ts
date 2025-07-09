import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;

  try {
    // Get and verify token
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const payload = jwt.verify(token, SECRET_KEY) as any;

    if (!payload?.user_id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // ✅ No role check - any authenticated user can fetch their bookmarks
    const user = await prisma.users.findUnique({
      where: { user_id: payload.user_id },
      select: { role: true, user_id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(
      `✅ Fetching bookmarks for user ${payload.user_id} with role: ${user.role}`,
    );

    // Fetch bookmarks for the user
    const bookmarks = await prisma.user_bookmarks.findMany({
      where: { user_id: payload.user_id },
      include: {
        papers: {
          select: {
            paper_id: true,
            title: true,
            abstract: true,
            keywords: true,
            author: true,
            department: true,
            year: true,
            created_at: true,
          },
        },
      },
      orderBy: {
        created_at: "desc", // Most recent bookmarks first
      },
    });

    const formatted = bookmarks.map((b) => ({
      bookmark_id: b.bookmark_id,
      paper_id: b.paper_id,
      title: b.papers.title,
      abstract: b.papers.abstract,
      tags: b.papers.keywords,
      author: b.papers.author,
      department: b.papers.department,
      year: b.papers.year,
      created_at: b.created_at,
    }));

    console.log(
      `✅ Returning ${formatted.length} bookmarks for user ${payload.user_id}`,
    );
    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Fetch Bookmarks Error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
