// /app/api/bookmark/check/[paper_id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY!; // ensure this is defined

export async function GET(
  req: NextRequest,
  context: { params: { paper_id: string } },
) {
  try {
    // 1) Extract paper_id from the “context” argument:
    const { paper_id } = context.params;

    // 2) Grab Bearer token from the Authorization header
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    // 3) If either paper_id or token is missing, return 400
    if (!paper_id || !token) {
      return NextResponse.json(
        { error: "Missing paper_id or token" },
        { status: 400 },
      );
    }

    // 4) Verify JWT
    const payload = await jwt.verify(token, SECRET_KEY);

    // 5) Make sure payload.user_id exists
    if (!payload || typeof (payload as any).user_id !== "number") {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 },
      );
    }
    const user_id = (payload as any).user_id;

    // 6) Check Prisma for an existing bookmark row
    const bookmark = await prisma.user_bookmarks.findFirst({
      where: {
        user_id,
        paper_id: Number(paper_id),
      },
    });

    return NextResponse.json({ isBookmarked: !!bookmark });
  } catch (err) {
    console.error("Check bookmark status error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
