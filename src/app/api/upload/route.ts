import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { activity_type } from "@prisma/client";
import jwt from "jsonwebtoken";
import { uploadFile, testConnection } from "@/app/utils/gcpUploader";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Upload API is running",
    timestamp: new Date().toISOString(),
    method: "GET"
  });
}

export async function POST(req: NextRequest) {
  try {
    console.log("🚀 Upload API called");
    
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
    
    let file: File | null = null;
    let uploadedUrl: string | null = null;
    let paperData: any = {};

    if (contentType.includes('multipart/form-data')) {
      console.log("📤 Processing multipart/form-data...");
      
      const formData = await req.formData();
      file = formData.get("file") as File;
      
      if (file) {
        console.log("📄 File details:", {
          name: file.name,
          type: file.type,
          size: file.size
        });
        
        // Validate file
        if (file.type !== 'application/pdf') {
          console.log("❌ Invalid file type:", file.type);
          return NextResponse.json({
            success: false,
            message: "Only PDF files are allowed"
          }, { status: 400 });
        }

        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
          console.log("❌ File too large:", file.size);
          return NextResponse.json({
            success: false,
            message: "File size must be less than 50MB"
          }, { status: 400 });
        }

        try {
          console.log("📤 Converting file to buffer...");
          const buffer = Buffer.from(await file.arrayBuffer());
          console.log("✅ Buffer created, size:", buffer.length);
          
          console.log("📤 Starting upload to Google Cloud Storage...");
          uploadedUrl = await uploadFile(buffer, file.name);
          console.log("✅ Upload completed! URL:", uploadedUrl);
          
        } catch (uploadError) {
          console.error("❌ Upload error details:", uploadError);
          
          return NextResponse.json({
            success: false,
            message: "Failed to upload file to cloud storage",
            error: uploadError.message,
            debug: {
              fileName: file.name,
              fileSize: file.size,
              fileType: file.type
            }
          }, { status: 500 });
        }
      } else {
        console.log("⚠️ No file found in form data");
      }

      // Get form fields
      paperData = {
        title: formData.get("title") as string,
        author: formData.get("author") as string,
        abstract: formData.get("abstract") as string,
        course: formData.get("course") as string,
        department: formData.get("department") as string,
        year: formData.get("year") as string,
        keywords: formData.get("keywords") ? JSON.parse(formData.get("keywords") as string) : [],
      };
      
      console.log("📋 Paper data:", paperData);
      
    } else {
      return NextResponse.json({
        success: false,
        message: "Expected multipart/form-data for file upload",
        receivedContentType: contentType
      }, { status: 400 });
    }

    const { title, author, abstract, course, department, year, keywords } = paperData;

    // Validate required fields
    if (!title || !author || !abstract || !course || !department || !year) {
      const missingFields = [];
      if (!title) missingFields.push('title');
      if (!author) missingFields.push('author');
      if (!abstract) missingFields.push('abstract');
      if (!course) missingFields.push('course');
      if (!department) missingFields.push('department');
      if (!year) missingFields.push('year');
      
      console.log("❌ Missing required fields:", missingFields);
      
      return NextResponse.json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields
      }, { status: 400 });
    }

    const yearInt = parseInt(year);
    if (isNaN(yearInt) || yearInt < 1900 || yearInt > new Date().getFullYear() + 10) {
      return NextResponse.json({
        success: false,
        message: "Invalid year provided"
      }, { status: 400 });
    }

    console.log("💾 Creating paper record in database...");
    
    // Create the paper record
    const created = await prisma.papers.create({
      data: {
        title: title.trim(),
        author: author.trim(),
        abstract: abstract.trim(),
        course: course.trim(),
        department: department.trim(),
        year: yearInt,
        keywords: Array.isArray(keywords) ? keywords : [],
        paper_url: uploadedUrl, // Store the GCS URL
        created_at: new Date(),
        updated_at: new Date()
      },
    });

    console.log("✅ Paper created successfully:", {
      id: created.paper_id,
      title: created.title,
      hasUrl: !!created.paper_url
    });

    // Activity logging
    try {
      const authHeader = req.headers.get('authorization');
      const token = authHeader?.split(' ')[1] || req.cookies.get('authToken')?.value;
      
      if (token) {
        try {
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
          
          console.log("✅ Activity logged for user:", userName);
        } catch (jwtError) {
          console.warn("⚠️ JWT decode failed:", jwtError);
        }
      }
    } catch (logError) {
      console.error("❌ Activity logging failed:", logError);
    }

    return NextResponse.json({
      success: true,
      id: created.paper_id,
      url: uploadedUrl,
      message: "Paper uploaded successfully to Google Cloud Storage and saved to database",
      paper: {
        id: created.paper_id,
        title: created.title,
        author: created.author,
        url: uploadedUrl
      },
      debug: {
        bucketUpload: !!uploadedUrl,
        databaseSave: !!created.paper_id,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error("❌ Upload API Error:", error);
    console.error("Error stack:", error.stack);
    
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Upload failed",
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack,
        name: error.constructor.name
      } : undefined
    }, { status: 500 });
  }
}