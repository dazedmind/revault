import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadFile, testConnection } from "@/app/utils/gcpUploader";
import jwt from "jsonwebtoken";
import { activity_type } from "@prisma/client";
import fs from 'fs';
import path from 'path';
import os from 'os';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function POST(req: NextRequest) {
  try {
    console.log("🔄 Processing chunk upload...");
    
    const formData = await req.formData();
    const chunk = formData.get("chunk") as File;
    const chunkIndex = parseInt(formData.get("chunkIndex") as string);
    const totalChunks = parseInt(formData.get("totalChunks") as string);
    const uploadId = formData.get("uploadId") as string;
    const fileName = formData.get("fileName") as string;

    if (!chunk || isNaN(chunkIndex) || isNaN(totalChunks) || !uploadId || !fileName) {
      return NextResponse.json({
        success: false,
        message: "Missing required chunk data"
      }, { status: 400 });
    }

    console.log(`📦 Processing chunk ${chunkIndex + 1}/${totalChunks} for ${fileName}`);

    // Create temporary directory for this upload
    const tempDir = path.join(os.tmpdir(), 'uploads', uploadId);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Save chunk to temporary file
    const chunkPath = path.join(tempDir, `chunk_${chunkIndex}`);
    const chunkBuffer = Buffer.from(await chunk.arrayBuffer());
    fs.writeFileSync(chunkPath, chunkBuffer);

    console.log(`✅ Chunk ${chunkIndex} saved to ${chunkPath}`);

    // If this is the last chunk, combine all chunks and upload
    if (chunkIndex === totalChunks - 1) {
      console.log("🔗 Last chunk received, combining all chunks...");
      
      try {
        // Combine all chunks
        const combinedBuffer = Buffer.alloc(0);
        const chunks: Buffer[] = [];
        
        for (let i = 0; i < totalChunks; i++) {
          const chunkFilePath = path.join(tempDir, `chunk_${i}`);
          if (fs.existsSync(chunkFilePath)) {
            const chunkData = fs.readFileSync(chunkFilePath);
            chunks.push(chunkData);
          } else {
            throw new Error(`Missing chunk ${i}`);
          }
        }

        const finalBuffer = Buffer.concat(chunks);
        console.log(`📄 Combined file size: ${finalBuffer.length} bytes`);

        // Test GCS connection
        const connectionTest = await testConnection();
        if (!connectionTest) {
          throw new Error("Google Cloud Storage connection failed");
        }

        // Upload to Google Cloud Storage
        console.log("📤 Uploading to Cloud Storage...");
        const uploadedUrl = await uploadFile(finalBuffer, fileName);
        console.log("✅ Upload completed! URL:", uploadedUrl);

        // Get metadata from first chunk (if available)
        const title = formData.get("title") as string;
        const author = formData.get("author") as string;
        const abstract = formData.get("abstract") as string;
        const course = formData.get("course") as string;
        const department = formData.get("department") as string;
        const year = formData.get("year") as string;
        const keywordsString = formData.get("keywords") as string;
        
        let keywords: string[] = [];
        if (keywordsString) {
          try {
            keywords = JSON.parse(keywordsString);
          } catch (e) {
            console.warn("Failed to parse keywords:", e);
          }
        }

        // Save to database if metadata is provided
        let paperRecord = null;
        if (title && author && abstract && course && department && year) {
          console.log("💾 Saving paper metadata to database...");
          
          const yearInt = parseInt(year);
          if (isNaN(yearInt)) {
            throw new Error("Invalid year provided");
          }

          paperRecord = await prisma.papers.create({
            data: {
              title: title.trim(),
              author: author.trim(),
              abstract: abstract.trim(),
              course: course.trim(),
              department: department.trim(),
              year: yearInt,
              keywords: keywords,
              paper_url: uploadedUrl,
              created_at: new Date(),
              updated_at: new Date()
            },
          });

          console.log("✅ Paper saved to database:", paperRecord.paper_id);

          // Activity logging
          try {
            const authHeader = req.headers.get('authorization');
            const token = authHeader?.split(' ')[1] || req.cookies.get('authToken')?.value;
            
            if (token) {
              const payload = jwt.verify(token, SECRET_KEY) as any;
              let employeeId = null;
              let userName = payload.firstName || 'Unknown User';

              if (payload.role === 'LIBRARIAN' || payload.role === 'ADMIN' || payload.role === 'ASSISTANT') {
                const librarian = await prisma.librarian.findFirst({
                  where: { user_id: parseInt(payload.user_id) },
                  include: { users: true }
                });
                
                if (librarian) {
                  employeeId = librarian.employee_id;
                  userName = librarian.users?.first_name || userName;
                }
              }

              await prisma.activity_logs.create({
                data: {
                  employee_id: employeeId,
                  user_id: parseInt(payload.user_id),
                  name: userName,
                  activity: `Uploaded research paper: "${title}"`,
                  activity_type: activity_type.UPLOAD_DOCUMENT,
                  user_agent: req.headers.get('user-agent') || '',
                  ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
                  status: "success",
                  created_at: new Date(),
                },
              });
            }
          } catch (logError) {
            console.warn("⚠️ Activity logging failed:", logError);
          }
        }

        // Clean up temporary files
        console.log("🧹 Cleaning up temporary files...");
        try {
          for (let i = 0; i < totalChunks; i++) {
            const chunkFilePath = path.join(tempDir, `chunk_${i}`);
            if (fs.existsSync(chunkFilePath)) {
              fs.unlinkSync(chunkFilePath);
            }
          }
          fs.rmdirSync(tempDir);
        } catch (cleanupError) {
          console.warn("Failed to cleanup temporary files:", cleanupError);
        }

        return NextResponse.json({
          success: true,
          message: "File uploaded successfully!",
          fileUrl: uploadedUrl,
          paper: paperRecord ? {
            id: paperRecord.paper_id,
            title: paperRecord.title,
            author: paperRecord.author,
            url: uploadedUrl
          } : null
        });

      } catch (combineError) {
        console.error("❌ Failed to combine chunks or upload:", combineError);
        
        // Clean up on error
        try {
          for (let i = 0; i < totalChunks; i++) {
            const chunkFilePath = path.join(tempDir, `chunk_${i}`);
            if (fs.existsSync(chunkFilePath)) {
              fs.unlinkSync(chunkFilePath);
            }
          }
          if (fs.existsSync(tempDir)) {
            fs.rmdirSync(tempDir);
          }
        } catch (cleanupError) {
          console.warn("Failed to cleanup after error:", cleanupError);
        }

        return NextResponse.json({
          success: false,
          message: combineError.message || "Failed to process file"
        }, { status: 500 });
      }
    }

    // Return success for intermediate chunks
    return NextResponse.json({
      success: true,
      message: `Chunk ${chunkIndex + 1}/${totalChunks} uploaded successfully`,
      progress: ((chunkIndex + 1) / totalChunks) * 100
    });

  } catch (error: any) {
    console.error("❌ Chunk upload error:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Chunk upload failed"
    }, { status: 500 });
  }
}