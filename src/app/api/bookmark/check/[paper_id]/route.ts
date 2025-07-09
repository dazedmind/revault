import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

interface RouteParams {
  params: {
    paper_id: string;
  };
}

export async function GET(req: NextRequest, context: any) {
  const { paper_id } = context.params;

  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    // 🔧 FIX: Handle case when no token is provided (user not logged in)
    if (!token) {
      // Return not bookmarked for non-authenticated users
      return NextResponse.json({ isBookmarked: false });
    }

    let payload;
    try {
      payload = jwt.verify(token, SECRET_KEY!);
    } catch (error) {
      // Invalid token, return not bookmarked
      return NextResponse.json({ isBookmarked: false });
    }

    if (!paper_id || typeof payload !== "object" || !("user_id" in payload)) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // ✅ No role check - any authenticated user can check bookmark status
    const bookmark = await prisma.user_bookmarks.findFirst({
      where: {
        user_id: (payload as any).user_id,
        paper_id: Number(paper_id),
      },
    });

    return NextResponse.json({ isBookmarked: !!bookmark });
  } catch (err) {
    console.error("Check bookmark status error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
