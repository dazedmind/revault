// src/app/api/papers/[paper_id]/recent-viewers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ✅ Use the same import as other files
import jwt from "jsonwebtoken";

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ paper_id: string }> }
) {
  try {
    const { paper_id } = await params;
    console.log("🔍 Fetching recent viewers for paper:", paper_id);

    // 1) Verify JWT and get user info (optional for this endpoint, but we'll keep it for security)
    try {
      await verifyAndGetPayload(req);
    } catch (err: any) {
      console.log("❌ JWT verification failed:", err.message);
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2) Get recent viewers from user_activity_logs for this specific paper
    const recentLogs = await prisma.user_activity_logs.findMany({
      where: {
        paper_id: parseInt(paper_id), // Filter by the specific paper_id
        activity_type: "VIEW_DOCUMENT",
      },
      include: {
        users: {
          select: {
            user_id: true,
            first_name: true,
            last_name: true,
            role: true,
            students: {
              select: {
                student_num: true,
              },
            },
            librarian: {
              select: {
                employee_id: true,
                position: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: 10, // Get more than 3 in case we need to filter duplicates
    });

    console.log(`📋 Found ${recentLogs.length} recent activity logs`);

    // 3) Process and deduplicate by user (keep only the most recent view per user)
    const viewerMap = new Map();
    
    for (const log of recentLogs) {
      const userId = log.user_id;
      
      // Skip if we already have a more recent entry for this user
      if (viewerMap.has(userId)) {
        continue;
      }

      // Only include if the user still exists
      if (log.users) {
        const viewer = {
          user_id: log.users.user_id,
          name: `${log.users.first_name} ${log.users.last_name || ''}`.trim(),
          role: log.users.role,
          last_viewed: log.created_at,
          // Add additional info based on role
          ...(log.users.students && {
            student_number: log.users.students.student_num?.toString(),
          }),
          ...(log.users.librarian && {
            employee_id: log.users.librarian.employee_id?.toString(),
            position: log.users.librarian.position,
          }),
        };

        viewerMap.set(userId, viewer);
      }
    }

    // 4) Convert to array and get top 3
    const recentViewers = Array.from(viewerMap.values()).slice(0, 3);

    console.log(`✅ Returning ${recentViewers.length} recent viewers`);

    return NextResponse.json({
      success: true,
      paper_id,
      recent_viewers: recentViewers,
      total_unique_viewers: viewerMap.size,
    });

  } catch (error) {
    console.error("❌ Error fetching recent viewers:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch recent viewers",
        error: errorMessage,
      },
      { status: 500 }
    );
  } finally {
    // ✅ Remove prisma disconnect since we're using the centralized instance
    // The centralized prisma instance handles connection management
  }
}