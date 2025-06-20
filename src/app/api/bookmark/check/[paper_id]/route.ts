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
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    if (!paper_id || typeof payload !== 'object' || !("user_id" in payload)) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

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