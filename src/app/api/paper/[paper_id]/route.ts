import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { paper_id: string } }
) {
  const { paper_id } = params;

  try {
    const paper = await prisma.papers.findUnique({
      where: { paper_id: Number(paper_id) },
    });

    if (!paper) {
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }

    return NextResponse.json(paper);
  } catch (error) {
    console.error('[GET PAPER ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
