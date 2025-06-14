import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadProfilePicture, testConnection } from "@/app/utils/gcpUploader";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Upload Profile API is running",
    timestamp: new Date().toISOString(),
    method: "GET"
  });
}

export async function POST(req: NextRequest) {
  try {
    console.log("🚀 Upload Profile API called");
    
    // Test GCS connection first
    console.log("🔍 Testing Google Cloud Storage connection...");
    const connectionTest = await testConnection();
    console.log("🔍 Connection test result:", connectionTest);
    
    if (!connectionTest) {
      return NextResponse.json({
        success: false,
        message: "Google Cloud Storage connection failed"
      }, { status: 500 });
    }
    
    const contentType = req.headers.get('content-type') || '';
    console.log("📋 Content-Type:", contentType);
    
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({
        success: false,
        message: "Content type must be multipart/form-data"
      }, { status: 400 });
    }

    console.log("📤 Processing multipart/form-data...");
    
    const formData = await req.formData();
    const file = formData.get("profile_picture") as File;
    const userId = formData.get("user_id") as string;
    
    if (!file || !userId) {
      console.log("❌ Missing file or user_id");
      return NextResponse.json({
        success: false,
        message: "Missing file or user_id"
      }, { status: 400 });
    }

    console.log("📄 File details:", {
      name: file.name,
      type: file.type,
      size: file.size
    });
    
    // Validate file type - allow common image formats
    const allowedTypes = [
      'image/jpeg', 
      'image/jpg', 
      'image/png', 
      'image/gif', 
      'image/webp'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      console.log("❌ Invalid file type:", file.type);
      return NextResponse.json({
        success: false,
        message: "Only image files (JPEG, PNG, GIF, WebP) are allowed"
      }, { status: 400 });
    }

    // Validate file size - 5MB max for profile pictures
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.log("❌ File too large:", file.size);
      return NextResponse.json({
        success: false,
        message: "File size must be less than 5MB"
      }, { status: 400 });
    }

    try {
      console.log("📤 Converting file to buffer...");
      const buffer = Buffer.from(await file.arrayBuffer());
      console.log("✅ Buffer created, size:", buffer.length);
      
      console.log("📤 Starting upload to Google Cloud Storage...");
      
      // Upload to profile folder instead of papers folder
      const uploadedUrl = await handleProfilePictureUpload(buffer, file.name, userId);
      console.log("✅ Upload completed! URL:", uploadedUrl);

      // Update user's profile picture in database
      console.log("💾 Updating user profile in database...");
      await prisma.users.update({
        where: { 
          user_id: parseInt(userId) 
        },
        data: { 
          profile_picture: uploadedUrl 
        }
      });
      console.log("✅ Database updated successfully!");

      return NextResponse.json({
        success: true,
        message: "Profile picture updated successfully!",
        fileUrl: uploadedUrl
      });

    } catch (uploadError) {
      console.error("❌ Upload failed:", uploadError);
      return NextResponse.json({
        success: false,
        message: "Failed to upload profile picture"
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error("❌ Upload Profile API Error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error: error.message
    }, { status: 500 });
  }
}

// Custom upload function for profile pictures
async function handleProfilePictureUpload(buffer: Buffer, originalFilename: string, userId: string): Promise<string> {
  try {
    const { Storage } = require("@google-cloud/storage");
    const { v4: uuidv4 } = require("uuid");
    const path = require("path");
    
    // Initialize Google Cloud Storage
    const storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
    });
    
    const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET || "";
    
    console.log("📤 Starting profile picture upload process...");
    console.log("📄 Original filename:", originalFilename);
    console.log("👤 User ID:", userId);
    console.log("📊 Buffer size:", buffer.length, "bytes");
    
    // Generate unique filename to avoid conflicts
    const fileExtension = path.extname(originalFilename);
    const baseName = path.basename(originalFilename, fileExtension);
    const uniqueFilename = `${baseName}-${uuidv4()}${fileExtension}`;
    
    // Create profile folder structure: profiles/userId/filename
    const filepath = `profiles/${userId}/${uniqueFilename}`;
    
    console.log("📁 Upload path:", filepath);

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filepath);

    console.log("⬆️ Uploading profile picture to Google Cloud Storage...");
    
    // Upload the file
    await file.save(buffer, {
      metadata: {
        contentType: file.type || "image/jpeg",
        cacheControl: "public, max-age=31536000",
        // Add custom metadata
        uploadedAt: new Date().toISOString(),
        originalName: originalFilename,
        userId: userId,
        fileType: "profile_picture"
      },
      resumable: false,
      validation: 'crc32c',
    });

    console.log("✅ Profile picture uploaded successfully!");
    
    // Generate the public URL
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${filepath}`;
    console.log("🔗 Public URL generated:", publicUrl);
    
    return publicUrl;
    
  } catch (error) {
    console.error("❌ Profile picture upload failed:", error);
    throw new Error(`Profile picture upload failed: ${error}`);
  }
}