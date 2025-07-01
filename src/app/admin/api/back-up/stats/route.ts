// src/app/api/back-up/stats/route.ts
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

    // Get total file count and size
    const paperCount = await prisma.papers.count();
    const userCount = await prisma.users.count();
    
    // Get last backup
    const lastBackup = await prisma.backup_jobs.findFirst({
      where: { status: 'completed' },
      orderBy: { completed_at: 'desc' },
    });

    // Get papers with URLs for size estimation
    const papersWithFiles = await prisma.papers.count({
      where: { paper_url: { not: null } },
    });

    // Estimate total size (rough calculation)
    const estimatedAvgFileSize = 2 * 1024 * 1024; // 2MB average per file
    const estimatedTotalSize = papersWithFiles * estimatedAvgFileSize;

    const stats = {
      total_files: paperCount + userCount,
      total_size: formatBytes(estimatedTotalSize),
      last_backup: lastBackup?.completed_at?.toISOString() || new Date(0).toISOString(),
      backup_frequency: 'Weekly',
      storage_used: formatBytes(estimatedTotalSize * 0.8), // Assume 80% compression
      next_scheduled: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Next week
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Failed to fetch backup stats:', error);
    return NextResponse.json({ error: 'Failed to fetch backup stats' }, { status: 500 });
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}