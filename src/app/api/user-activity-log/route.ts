// src/app/api/user-activity-log/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { activity_type } from "@prisma/client";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

interface JWTPayload {
  user_id: number;
  firstName: string;
  email: string;
  role: string;
  studentNumber?: string;
  userNumber?: string;
  iat?: number;
  exp?: number;
}

async function verifyAndGetPayload(req: NextRequest): Promise<JWTPayload> {
  // Try to get token from Authorization header first
  const authHeader = req.headers.get('authorization');
  let token: string | null = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }
  
  // Fallback to cookie
  if (!token) {
    token = req.cookies.get("authToken")?.value || null;
  }

  if (!token) {
    throw new Error("NO_TOKEN");
  }

  try {
    return jwt.verify(token, SECRET_KEY) as JWTPayload;
  } catch {
    throw new Error("INVALID_TOKEN");
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("🔍 User activity log request received");

    // 1) Verify JWT and get user info
    let payload: JWTPayload;
    try {
      payload = await verifyAndGetPayload(req);
      console.log("✅ JWT verified for user:", {
        user_id: payload.user_id,
        role: payload.role,
        email: payload.email,
      });
    } catch (err: any) {
      console.log("❌ JWT verification failed:", err.message);
      return NextResponse.json(
        { success: false, message: "Unauthorized", error: err.message },
        { status: 401 }
      );
    }

    // 2) Parse request body
    const body = await req.json();
    console.log("📥 Request body received:", body);
    
    const { activity, activity_type: activityType, paper_id, paper_title } = body;

    if (!activity || !activityType) {
      console.log("❌ Missing required fields:", { activity, activityType });
      return NextResponse.json(
        { error: "Activity and activity_type are required", received: { activity, activityType } },
        { status: 400 }
      );
    }

    // 3) Validate activity_type against Prisma enum
    if (!Object.values(activity_type).includes(activityType as activity_type)) {
      console.log("❌ Invalid activity type:", activityType);
      return NextResponse.json(
        { 
          error: "Valid activity type is required", 
          received: activityType,
          validTypes: Object.values(activity_type)
        },
        { status: 400 }
      );
    }

    // 4) Get user details from database
    const user = await prisma.users.findUnique({
      where: { user_id: payload.user_id },
      include: {
        students: true,
        librarian: true,
      },
    });

    if (!user) {
      console.log("❌ User not found in database:", payload.user_id);
      return NextResponse.json(
        { error: "User not found", user_id: payload.user_id },
        { status: 404 }
      );
    }

    console.log("👤 User found:", {
      user_id: user.user_id,
      name: `${user.first_name} ${user.last_name || ''}`.trim(),
      role: user.role,
      hasStudent: !!user.students,
      hasLibrarian: !!user.librarian,
    });

    // 5) Check if user role should be excluded from logging
    const excludedRoles = ['LIBRARIAN', 'ASSISTANT', 'ADMIN'];
    if (excludedRoles.includes(user.role)) {
      console.log(`⚠️ Skipping activity log for ${user.role} user:`, user.user_id);
      return NextResponse.json({
        success: true,
        message: "Activity not logged - user role excluded",
        user_role: user.role,
        excluded: true,
      });
    }

    // 5) Prepare activity description
    let activityDescription = activity;
    if (paper_title) {
      activityDescription = `${activity}: "${paper_title}"`;
    }

    // 6) Determine employee_id and student_num based on user type
    let employee_id: bigint = BigInt(0);
    let student_num: bigint = BigInt(0);

    if (user.librarian) {
      employee_id = user.librarian.employee_id;
      console.log("📋 Librarian employee_id:", employee_id);
    }

    if (user.students) {
      student_num = user.students.student_num;
      console.log("🎓 Student number:", student_num);
    }



    // 8) Create activity log entry
    console.log("💾 Creating activity log entry...");
    const logData = {
      user_id: payload.user_id,
      paper_id: parseInt(paper_id?.toString() || '0'), // Add paper_id from request
      name: `${user.first_name} ${user.last_name || ''}`.trim(),
      activity: activityDescription,
      activity_type: activityType,
      status: 'success',
      user_agent: req.headers.get('user-agent') || '',
      created_at: new Date(),
      employee_id: employee_id,
      student_num: student_num,
    };

    console.log("📝 Log data prepared:", {
      ...logData,
      employee_id: logData.employee_id.toString(),
      student_num: logData.student_num.toString(),
    });

    const newLog = await prisma.user_activity_logs.create({
      data: logData,
    });

    console.log("✅ User activity log created successfully:", {
      activity_id: newLog.activity_id,
      user_id: newLog.user_id,
      activity: newLog.activity,
      activity_type: newLog.activity_type,
    });

    return NextResponse.json({
      success: true,
      message: "Activity logged successfully",
      activity_id: newLog.activity_id,
      logged_activity: newLog.activity,
    });

  } catch (error) {
    console.error("❌ Error creating user activity log:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    const errorStack = error instanceof Error ? error.stack : "No stack trace";
    
    console.error("❌ Error details:", {
      message: errorMessage,
      stack: errorStack,
      name: error instanceof Error ? error.name : "Unknown",
    });
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to log user activity",
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorStack : undefined,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 