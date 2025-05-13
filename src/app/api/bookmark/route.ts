import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken'; // Your custom token verify logic

export async function POST(req: NextRequest) {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;

    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.split(' ')[1];
        const payload = await jwt.verify(token, SECRET_KEY); // Extract user_id

        const { paper_id } = await req.json();
        if (!paper_id || !payload?.user_id) {
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        // Check if bookmark already exists
        const existingBookmark = await prisma.user_bookmarks.findFirst({
            where: {
                user_id: payload.user_id,
                paper_id: Number(paper_id)
            }
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
