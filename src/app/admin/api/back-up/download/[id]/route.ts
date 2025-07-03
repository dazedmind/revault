// src/app/api/back-up/download/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Storage } from '@google-cloud/storage';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Use your existing GCP setup
async function initializeStorage() {
  try {
    const { Storage } = require('@google-cloud/storage');
    const path = require('path');
    const fs = require('fs');
    
    const isDevelopment = process.env.NODE_ENV === 'development';
    const serviceAccountPath = path.join(process.cwd(), "gcp-service-key.json");
    
    if (isDevelopment && fs.existsSync(serviceAccountPath)) {
      return new Storage({
        keyFilename: serviceAccountPath,
        projectId: "revault-system",
      });
    } else if (process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64) {
      const credentialsJSON = Buffer.from(
        process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64,
        'base64'
      ).toString('utf-8');
      const credentials = JSON.parse(credentialsJSON);
      
      return new Storage({
        projectId: credentials.project_id || "revault-system",
        credentials,
      });
    } else if (process.env.GOOGLE_CLOUD_PROJECT_ID && process.env.GOOGLE_CLOUD_CLIENT_EMAIL && process.env.GOOGLE_CLOUD_PRIVATE_KEY) {
      return new Storage({
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
        credentials: {
          client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
      });
    } else {
      throw new Error("Google Cloud Storage credentials not configured");
    }
  } catch (error) {
    console.error("❌ Failed to initialize Google Cloud Storage:", error);
    throw error;
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
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

    const backup = await prisma.backup_jobs.findUnique({
      where: { id: params.id },
    });

    if (!backup || backup.status !== 'completed' || !backup.download_url) {
      return NextResponse.json({ error: 'Backup not available for download' }, { status: 404 });
    }

    // Download file from GCS and stream to client
    const storage = await initializeStorage();
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