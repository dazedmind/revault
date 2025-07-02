// src/app/api/back-up/download/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Storage } from '@google-cloud/storage';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || "revault-system",
});
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

    if (!backup || backup.status !== 'completed' || !backup.download_url) {
      return NextResponse.json({ error: 'Backup not available for download' }, { status: 404 });
    }

    const url = new URL(backup.download_url);
    const pathParts = url.pathname.split('/');
    const bucketName = pathParts[1];
    const fileName = pathParts.slice(2).join('/');

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);
    const [fileBuffer] = await file.download();

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="backup-${backup.id}-${backup.type}.zip"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Failed to download backup:', error);
    return NextResponse.json({ error: 'Failed to download backup' }, { status: 500 });
  }
}
