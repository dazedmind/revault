// src/app/api/back-up/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import JSZip from 'jszip';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Use your existing GCP setup
let storage: any = null;

async function initializeStorage() {
  if (storage) return storage;
  
  try {
    const { Storage } = require('@google-cloud/storage');
    const path = require('path');
    const fs = require('fs');
    
    // Use your existing authentication logic
    const isDevelopment = process.env.NODE_ENV === 'development';
    const serviceAccountPath = path.join(process.cwd(), "gcp-service-key.json");
    
    console.log("🔍 Environment:", process.env.NODE_ENV);
    console.log("📁 Service account file exists:", fs.existsSync(serviceAccountPath));
    
    if (isDevelopment && fs.existsSync(serviceAccountPath)) {
      // Development: Use service account file
      console.log("✅ Using service account file for authentication (Development)");
      storage = new Storage({
        keyFilename: serviceAccountPath,
        projectId: "revault-system",
      });
    } else if (process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64) {
      // Production: Use base64 encoded credentials
      console.log("✅ Using base64 encoded credentials (Production)");
      const credentialsJSON = Buffer.from(
        process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64,
        'base64'
      ).toString('utf-8');
      const credentials = JSON.parse(credentialsJSON);
      
      storage = new Storage({
        projectId: credentials.project_id || "revault-system",
        credentials,
      });
    } else if (process.env.GOOGLE_CLOUD_PROJECT_ID && process.env.GOOGLE_CLOUD_CLIENT_EMAIL && process.env.GOOGLE_CLOUD_PRIVATE_KEY) {
      // Production: Use individual environment variables
      console.log("✅ Using individual environment variables (Production)");
      storage = new Storage({
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
        credentials: {
          client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
      });
    } else {
      console.error("❌ No Google Cloud credentials found!");
      throw new Error("Google Cloud Storage credentials not configured");
    }
    
    return storage;
  } catch (error) {
    console.error("❌ Failed to initialize Google Cloud Storage:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1] || req.cookies.get('authToken')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = jwt.verify(token, SECRET_KEY) as any;
    if (payload.role !== 'ADMIN' && payload.role !== 'LIBRARIAN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { type } = await req.json();
    
    // Only allow 'full' and 'documents' backup types
    if (!['full', 'documents'].includes(type)) {
      return NextResponse.json({ error: 'Invalid backup type. Only "full" and "documents" are supported.' }, { status: 400 });
    }

    // Create backup job record
    const backupJob = await prisma.backup_jobs.create({
      data: {
        id: uuidv4(),
        type,
        status: 'pending',
        created_by: payload.user_id,
        created_at: new Date(),
        file_count: 0,
        total_size: '0',
      },
    });

    // Start backup process asynchronously
    processBackup(backupJob.id, type).catch(console.error);

    return NextResponse.json({
      success: true,
      backup_id: backupJob.id,
      message: 'Backup job created successfully',
    });

  } catch (error) {
    console.error('Backup creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create backup' },
      { status: 500 }
    );
  }
}

async function processBackup(backupId: string, type: string) {
  try {
    // Initialize storage with your existing setup
    const gcsStorage = await initializeStorage();
    
    // Update status to running
    await prisma.backup_jobs.update({
      where: { id: backupId },
      data: { status: 'running' },
    });

    let files: any[] = [];
    let totalSize = 0;

    switch (type) {
      case 'full':
        files = await getFullBackupFiles();
        break;
      case 'documents':
        files = await getDocumentFiles();
        break;
    }

    // Create ZIP archive
    const zip = new JSZip();
    
    for (const file of files) {
      try {
        if (file.data) {
          // For JSON data files
          zip.file(file.name, file.data);
          totalSize += file.size;
        } else {
          // For files from GCS
          const fileData = await downloadFileFromGCS(file.path, gcsStorage);
          zip.file(file.name, fileData);
          totalSize += fileData.length;
        }
      } catch (error) {
        console.error(`Failed to add file ${file.name} to backup:`, error);
      }
    }

    // Add metadata file
    const metadata = {
      backup_id: backupId,
      type,
      created_at: new Date().toISOString(),
      file_count: files.length,
      total_size: formatBytes(totalSize),
      files: files.map(f => ({ name: f.name, size: f.size || 0, type: f.type })),
    };
    
    zip.file('backup_metadata.json', JSON.stringify(metadata, null, 2));

    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // Upload to GCS using your existing bucket
    const backupFileName = `backups/${backupId}.zip`;
    const bucket = gcsStorage.bucket('revault-files');
    const file = bucket.file(backupFileName);

    await file.save(zipBuffer, {
      metadata: {
        contentType: 'application/zip',
        cacheControl: 'private, max-age=86400',
      },
    });

    const downloadUrl = `https://storage.googleapis.com/revault-files/${backupFileName}`;

    // Update backup job with completion
    await prisma.backup_jobs.update({
      where: { id: backupId },
      data: {
        status: 'completed',
        completed_at: new Date(),
        file_count: files.length,
        total_size: formatBytes(totalSize),
        download_url: downloadUrl,
      },
    });

    console.log(`✅ Backup ${backupId} completed successfully`);

  } catch (error) {
    console.error(`❌ Backup ${backupId} failed:`, error);
    
    await prisma.backup_jobs.update({
      where: { id: backupId },
      data: {
        status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
        completed_at: new Date(),
      },
    });
  }
}

async function getFullBackupFiles() {
  const files = [];

  // Get all papers and their files
  const papers = await prisma.papers.findMany({
    select: {
      paper_id: true,
      title: true,
      paper_url: true,
    },
  });

  for (const paper of papers) {
    if (paper.paper_url) {
      const fileName = `documents/${paper.paper_id}-${sanitizeFileName(paper.title)}.pdf`;
      files.push({
        name: fileName,
        path: paper.paper_url,
        size: await getFileSize(paper.paper_url),
        type: 'document',
      });
    }
  }

  // Add user profile pictures
  const users = await prisma.users.findMany({
    select: {
      user_id: true,
      first_name: true,
      last_name: true,
      profile_picture: true,
    },
  });

  for (const user of users) {
    if (user.profile_picture) {
      const fileName = `profiles/${user.user_id}-${user.first_name || 'unknown'}_${user.last_name || 'user'}.jpg`;
      files.push({
        name: fileName,
        path: user.profile_picture,
        size: await getFileSize(user.profile_picture),
        type: 'profile',
      });
    }
  }

  // Add database exports for full backup
  const allUsers = await prisma.users.findMany();
  const allLibrarians = await prisma.librarian.findMany();
  
  files.push({
    name: 'database/users.json',
    data: JSON.stringify(allUsers, null, 2),
    size: JSON.stringify(allUsers).length,
    type: 'data',
  });

  files.push({
    name: 'database/librarians.json',
    data: JSON.stringify(allLibrarians, null, 2),
    size: JSON.stringify(allLibrarians).length,
    type: 'data',
  });

  return files;
}

async function getDocumentFiles() {
  const papers = await prisma.papers.findMany({
    select: {
      paper_id: true,
      title: true,
      paper_url: true,
    },
  });

  const files = [];
  
  for (const paper of papers) {
    if (paper.paper_url) {
      const fileName = `${paper.paper_id}-${sanitizeFileName(paper.title)}.pdf`;
      files.push({
        name: fileName,
        path: paper.paper_url,
        size: await getFileSize(paper.paper_url),
        type: 'document',
      });
    }
  }

  return files;
}

async function downloadFileFromGCS(filePath: string, gcsStorage: any): Promise<Buffer> {
  try {
    // Extract bucket and file path from URL
    const url = new URL(filePath);
    const pathParts = url.pathname.split('/');
    const bucketName = pathParts[1];
    const fileName = pathParts.slice(2).join('/');

    const bucket = gcsStorage.bucket(bucketName);
    const file = bucket.file(fileName);

    const [fileBuffer] = await file.download();
    return fileBuffer;
  } catch (error) {
    console.error(`Failed to download file ${filePath}:`, error);
    throw error;
  }
}

async function getFileSize(filePath: string): Promise<number> {
  try {
    const gcsStorage = await initializeStorage();
    const url = new URL(filePath);
    const pathParts = url.pathname.split('/');
    const bucketName = pathParts[1];
    const fileName = pathParts.slice(2).join('/');

    const bucket = gcsStorage.bucket(bucketName);
    const file = bucket.file(fileName);
    
    const [metadata] = await file.getMetadata();
    return parseInt(String(metadata.size || '0'));
  } catch (error) {
    console.error(`Failed to get file size for ${filePath}:`, error);
    return 0;
  }
}

function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 50);
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}