import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { activity_type } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    console.log("🚨 Security event logging API called");

    // Parse request body
    const body = await req.json();
    const { event, userEmail, documentId, timestamp, details } = body;

    console.log("📋 Security event data:", {
      event,
      userEmail,
      documentId,
      timestamp,
      details
    });

    // Validate required fields
    if (!event || !userEmail) {
      console.log("❌ Missing required fields");
      return NextResponse.json({
        success: false,
        message: "Missing required fields: event and userEmail are required"
      }, { status: 400 });
    }

    // Get user info from token or email
    let userId: number | null = null;
    let userName = 'Unknown User';

    try {
      // Try to get user from Authorization header first
      const authHeader = req.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        userId = decoded.user_id;
      }

      // If no token or token failed, try to find user by email
      if (!userId && userEmail) {
        const user = await prisma.users.findUnique({
          where: { email: userEmail },
          select: {
            user_id: true,
            first_name: true,
            last_name: true,
            students: {
              select: {
                student_num: true
              }
            },
            librarian: {
              select: {
                employee_id: true
              }
            }
          }
        });

        if (user) {
          userId = user.user_id;
          userName = `${user.first_name} ${user.last_name || ''}`.trim();
        }
      }
    } catch (tokenError) {
      console.log("⚠️ Token verification failed, proceeding with email lookup");
    }

    // Map security events to activity types
    const eventToActivityTypeMap: { [key: string]: string } = {
      'PDF_KEYBOARD_BLOCK': 'SECURITY_VIOLATION',
      'RIGHT_CLICK_BLOCKED': 'SECURITY_VIOLATION',
      'POTENTIAL_SCREENSHOT': 'SECURITY_VIOLATION',
      'PRINT_ATTEMPT': 'PRINT_DOCUMENT',
      'DOWNLOAD_ATTEMPT': 'DOWNLOAD_DOCUMENT',
      'COPY_ATTEMPT': 'SECURITY_VIOLATION',
      'WATERMARK_BYPASS': 'SECURITY_VIOLATION'
    };

    const activityType = eventToActivityTypeMap[event] || 'SECURITY_EVENT';

    // Create activity description
    let activityDescription = `Security Event: ${event}`;
    if (details) {
      activityDescription += ` - ${details}`;
    }
    if (documentId) {
      activityDescription += ` (Document ID: ${documentId})`;
    }

    // Get additional request info
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const ipAddress = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     req.headers.get('cf-connecting-ip') || 
                     'Unknown';

    // Prepare log data for user_activity_logs table
    const logData = {
      user_id: userId || 0, // Use 0 if user not found
      paper_id: documentId ? parseInt(documentId.toString()) : 0,
      name: userName,
      activity: activityDescription,
      activity_type: activityType,
      status: event.includes('BLOCK') ? 'blocked' : 'detected',
      user_agent: userAgent,
      created_at: new Date(timestamp || Date.now()),
      employee_id: BigInt(0), // Default value
      student_num: BigInt(0)  // Default value
    };

    // If we found the user, get their employee_id or student_num
    if (userId) {
      try {
        const userDetails = await prisma.users.findUnique({
          where: { user_id: userId },
          include: {
            students: {
              select: { student_num: true }
            },
            librarian: {
              select: { employee_id: true }
            }
          }
        });

        if (userDetails?.librarian?.employee_id) {
          logData.employee_id = userDetails.librarian.employee_id;
        }
        if (userDetails?.students?.student_num) {
          logData.student_num = userDetails.students.student_num;
        }
      } catch (userDetailsError) {
        console.log("⚠️ Could not fetch user details, using defaults");
      }
    }

    console.log("💾 Creating security log entry...", {
      ...logData,
      employee_id: logData.employee_id.toString(),
      student_num: logData.student_num.toString()
    });

    // Create the activity log entry
    const { user_id, paper_id, ...restLogData } = logData;
    const securityLog = await prisma.user_activity_logs.create({
      data: {
        ...restLogData,
        activity_type: activity_type[activityType as keyof typeof activity_type],
        users: { connect: { user_id } },
        papers: paper_id ? { connect: { paper_id } } : undefined,
      }
    });

    console.log("✅ Security event logged successfully:", {
      activity_id: securityLog.activity_id,
      event,
      user: userName,
      timestamp: securityLog.created_at
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Security event logged successfully",
      activity_id: securityLog.activity_id,
      event_type: event,
      logged_at: securityLog.created_at
    });

  } catch (error) {
    console.error("❌ Error logging security event:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("❌ Error details:", {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : "No stack trace"
    });

    // Even if logging fails, we don't want to break the user experience
    return NextResponse.json({
      success: false,
      message: "Failed to log security event",
      error: errorMessage
    }, { status: 500 });
  }
}

// Optional: GET method for testing the endpoint
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Security event logging API is running",
    timestamp: new Date().toISOString(),
    endpoint: "/api/log-security-event"
  });
}