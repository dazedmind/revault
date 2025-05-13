import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const payload = await jwt.verify(token, SECRET_KEY);

    const { paper_id } = await req.json();
    if (!paper_id || !payload?.user_id) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    const existingBookmark = await prisma.user_bookmarks.findFirst({
      where: {
        user_id: payload.user_id,
        paper_id: Number(paper_id),
      },
    });

    if (existingBookmark) {
      return NextResponse.json({ message: 'Paper already bookmarked' }, { status: 200 });
    }

    await prisma.user_bookmarks.create({
      data: {
        user_id: payload.user_id,
        paper_id: Number(paper_id),
      },
    });

    return NextResponse.json({ success: true, message: 'Paper bookmarked successfully' });
  } catch (err) {
    console.error('Bookmark API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const payload = await jwt.verify(token, SECRET_KEY);

    const { paper_id } = params;
    if (!paper_id || !payload?.user_id) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    await prisma.user_bookmarks.deleteMany({
      where: {
        user_id: payload.user_id,
        paper_id: Number(paper_id),
      },
    });

    return NextResponse.json({ success: true, message: 'Bookmark removed successfully' });
  } catch (err) {
    console.error('Unbookmark API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
