import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params } : { params: Promise<{ paper_id: string }> }
) {
  const { paper_id } = await params;

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

export async function PUT(
  req: NextRequest,
  { params } : { params: Promise<{ paper_id: string }> }
) {
  const { paper_id } = await params;

  try {
    const body = await req.json();
    const { title, author, abstract, course, department, year, keywords } = body;

    // Validate required fields
    if (!title || !author || !abstract || !course || !department || !year) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Check if paper exists
    const existingPaper = await prisma.papers.findUnique({
      where: { paper_id: Number(paper_id) },
    });

    if (!existingPaper) {
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }

    // Process keywords - ensure it's an array
    let processedKeywords = [];
    if (keywords) {
      if (Array.isArray(keywords)) {
        processedKeywords = keywords.filter(k => k.trim() !== '');
      } else if (typeof keywords === 'string') {
        processedKeywords = keywords.split(',').map(k => k.trim()).filter(k => k !== '');
      }
    }

    // Update the paper
    const updatedPaper = await prisma.papers.update({
      where: { paper_id: Number(paper_id) },
      data: {
        title: title.trim(),
        author: author.trim(),
        abstract: abstract.trim(),
        course: course.trim(),
        department: department.trim(),
        year: Number(year),
        keywords: processedKeywords,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      message: 'Paper updated successfully',
      paper: updatedPaper
    });

  } catch (error) {
    console.error('[UPDATE PAPER ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}