// src/app/api/back-up/history/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1] || req.cookies.get('authToken')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = jwt.verify(token, SECRET_KEY) as any;
    if (payload.role !== 'ADMIN' && payload.role !== 'LIBRARIAN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const backups = await prisma.backup_jobs.findMany({
      orderBy: { created_at: 'desc' },
      take: 50,
    });

    return NextResponse.json({ backups });

  } catch (error) {
    console.error('Failed to fetch backup history:', error);
    return NextResponse.json({ error: 'Failed to fetch backup history' }, { status: 500 });
  }
}