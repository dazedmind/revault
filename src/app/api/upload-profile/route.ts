import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { testConnection } from "@/app/utils/gcpUploader";

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
    console.log("🔍 Testing Cloud Storage connection...");
    const connectionTest = await testConnection();
    console.log("🔍 Connection test result:", connectionTest);
    
    if (!connectionTest) {
      return NextResponse.json({
        success: false,
        message: "Cloud Storage connection failed"
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
      size: file.size,
      userId: userId
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
      
      console.log("📤 Starting upload to Cloud Storage...");
      
      // Upload to profile folder
      const uploadedUrl = await uploadProfilePicture(buffer, file.name, userId);
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
        message: "Failed to upload profile picture: " + (uploadError instanceof Error ? uploadError.message : "Unknown error")
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

// Upload function for profile pictures using your existing GCP setup
async function uploadProfilePicture(buffer: Buffer, originalFilename: string, userId: string): Promise<string> {
  try {
    const { Storage } = require("@google-cloud/storage");
    const { v4: uuidv4 } = require("uuid");
    const path = require("path");
    const fs = require("fs");
    
    console.log("📤 Starting profile picture upload process...");
    console.log("📄 Original filename:", originalFilename);
    console.log("👤 User ID:", userId);
    console.log("📊 Buffer size:", buffer.length, "bytes");
    
    // Initialize Google Cloud Storage using your existing environment setup
    let storage;
    
    const isDevelopment = process.env.NODE_ENV === 'development';
    const serviceAccountPath = path.join(process.cwd(), "gcp-service-key.json");
    
    if (isDevelopment && fs.existsSync(serviceAccountPath)) {
      // Development: Use service account file
      storage = new Storage({
        keyFilename: serviceAccountPath,
        projectId: "revault-system",
      });
    } else if (process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64) {
      // Production: Use base64 encoded credentials
      const credentialsJSON = Buffer.from(
        process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64,
        'base64'
      ).toString('utf-8');
      const credentials = JSON.parse(credentialsJSON);
      
      storage = new Storage({
        projectId: credentials.project_id || "revault-system",
        credentials,
      });
    } else {
      // Fallback
      storage = new Storage({
        projectId: "revault-system",
      });
    }
    
    const bucketName = "revault-files";
    
    // Generate unique filename to avoid conflicts
    const fileExtension = path.extname(originalFilename);
    const baseName = path.basename(originalFilename, fileExtension);
    const uniqueFilename = `${baseName}-${uuidv4()}${fileExtension}`;
    
    // Create profile folder structure: profiles/userId/filename
    const filepath = `profiles/${userId}/${uniqueFilename}`;
    
    console.log("📁 Upload path:", filepath);

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filepath);

    console.log("⬆️ Uploading profile picture to Cloud Storage...");
    
    // Determine content type based on file extension
    const getContentType = (filename: string): string => {
      const ext = path.extname(filename).toLowerCase();
      switch (ext) {
        case '.jpg':
        case '.jpeg':
          return 'image/jpeg';
        case '.png':
          return 'image/png';
        case '.gif':
          return 'image/gif';
        case '.webp':
          return 'image/webp';
        default:
          return 'image/jpeg';
      }
    };
    
    // Upload the file
    await file.save(buffer, {
      metadata: {
        contentType: getContentType(originalFilename),
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