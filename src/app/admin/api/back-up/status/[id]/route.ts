// src/app/api/back-up/status/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1] || req.cookies.get('authToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = jwt.verify(token, SECRET_KEY) as any;
    if (payload.role !== 'ADMIN' && payload.role !== 'LIBRARIAN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const backup = await prisma.backup_jobs.findUnique({
      where: { id },
    });

    if (!backup) {
      return NextResponse.json({ error: 'Backup not found' }, { status: 404 });
    }

    return NextResponse.json(backup);

  } catch (error) {
    console.error('Failed to fetch backup status:', error);
    return NextResponse.json({ error: 'Failed to fetch backup status' }, { status: 500 });
  }
}
