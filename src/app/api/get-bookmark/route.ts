import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;

  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const payload = jwt.verify(token, SECRET_KEY) as any;

    if (!payload?.user_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookmarks = await prisma.user_bookmarks.findMany({
      where: { user_id: payload.user_id },
      include: { papers: true }, // assumes a relation user_bookmarks → papers
    });

    const formatted = bookmarks.map(b => ({
        bookmark_id: b.bookmark_id,
        paper_id: b.paper_id,
        title: b.papers.title,
        abstract: b.papers.abstract,
        tags: b.papers.keywords,
        author: b.papers.author,
        department: b.papers.department,
        year: b.papers.year,
      }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('Fetch Bookmarks Error:', err);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
