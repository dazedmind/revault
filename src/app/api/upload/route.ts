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
            message: "Only PDF files are allowed",
            code: "INVALID_FILE_TYPE"
          }, { status: 400 });
        }

        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
          console.log("❌ File too large:", file.size);
          return NextResponse.json({
            success: false,
            message: "File size must be less than 50MB",
            code: "FILE_TOO_LARGE"
          }, { status: 413 }); // Use 413 for payload too large
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
            code: "UPLOAD_FAILED",
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
        receivedContentType: contentType,
        code: "INVALID_CONTENT_TYPE"
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
        missingFields,
        code: "MISSING_FIELDS"
      }, { status: 400 });
    }

    const yearInt = parseInt(year);
    if (isNaN(yearInt) || yearInt < 1900 || yearInt > new Date().getFullYear() + 10) {
      return NextResponse.json({
        success: false,
        message: "Invalid year provided",
        code: "INVALID_YEAR"
      }, { status: 400 });
    }

    console.log("💾 Creating paper record in database...");
    
    // Create the paper record with proper error handling
    let created;
    try {
      created = await prisma.papers.create({
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

    } catch (dbError: any) {
      console.error("❌ Database error:", dbError);
      
      // Handle Prisma errors specifically
      if (dbError.code === 'P2002') {
        // Unique constraint violation
        const target = dbError.meta?.target || ['unknown field'];
        console.log("❌ Unique constraint violation on:", target);
        
        if (target.includes('title')) {
          return NextResponse.json({
            success: false,
            message: "A paper with this title already exists. Please use a different title.",
            code: "P2002",
            field: "title",
            constraint: "unique_title"
          }, { status: 409 }); // 409 Conflict for duplicate resource
        } else {
          return NextResponse.json({
            success: false,
            message: "A paper with similar information already exists.",
            code: "P2002",
            field: target[0] || "unknown",
            constraint: "unique_constraint"
          }, { status: 409 });
        }
      } else if (dbError.code === 'P2003') {
        // Foreign key constraint violation
        return NextResponse.json({
          success: false,
          message: "Invalid reference data provided.",
          code: "P2003",
          field: dbError.meta?.field_name || "unknown"
        }, { status: 400 });
      } else if (dbError.code === 'P2025') {
        // Record not found
        return NextResponse.json({
          success: false,
          message: "Required record not found.",
          code: "P2025"
        }, { status: 404 });
      } else {
        // Other database errors
        return NextResponse.json({
          success: false,
          message: "Database error occurred while saving paper.",
          code: "DATABASE_ERROR",
          error: process.env.NODE_ENV === 'development' ? dbError.message : undefined
        }, { status: 500 });
      }
    }

    // Activity logging (only if paper was created successfully)
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
      // Don't fail the entire request if logging fails
    }

    return NextResponse.json({
      success: true,
      id: created.paper_id,
      url: uploadedUrl,
      message: "Paper uploaded successfully!",
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
    
  } catch (error: any) {
    console.error("❌ Upload API Error:", error);
    console.error("Error stack:", error.stack);
    
    // Handle different types of errors
    let statusCode = 500;
    let errorCode = "INTERNAL_ERROR";
    let message = "Upload failed";

    if (error.name === 'JsonWebTokenError') {
      statusCode = 401;
      errorCode = "INVALID_TOKEN";
      message = "Invalid authentication token";
    } else if (error.message.includes('fetch')) {
      statusCode = 503;
      errorCode = "SERVICE_UNAVAILABLE";
      message = "External service temporarily unavailable";
    } else if (error.code === 'P2002') {
      // Catch any P2002 errors that weren't handled above
      statusCode = 409;
      errorCode = "P2002";
      message = "Duplicate entry detected";
    }
    
    return NextResponse.json({
      success: false,
      message: message,
      code: errorCode,
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack,
        name: error.constructor.name
      } : undefined
    }, { status: statusCode });
  }
}