// File: src/app/api/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { activity_type } from "@prisma/client";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

export async function POST(req: NextRequest) {
  try {
    console.log("🚪 Logout API called");

    // Get token from Authorization header or cookies
    const authHeader = req.headers.get("authorization");
    const tokenFromHeader = authHeader?.replace("Bearer ", "");
    const tokenFromCookie = req.cookies.get("authToken")?.value;
    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
      console.log("❌ No token found during logout");
      return NextResponse.json({
        success: true, // Still return success even without token
        message: "No active session found",
      });
    }

    // Decode token to get user info
    let payload: any;
    try {
      payload = jwt.verify(token, SECRET_KEY);
      console.log("✅ Token verified for logout:", payload.user_id);
    } catch (jwtError) {
      console.warn("⚠️ Invalid token during logout:", jwtError.message);
      return NextResponse.json({
        success: true, // Still return success for expired tokens
        message: "Session already expired",
      });
    }

    // Get user details to determine if they're student or faculty
    try {
      const user = await prisma.users.findUnique({
        where: { user_id: payload.user_id },
        include: {
          students: {
            select: { student_num: true },
          },
          faculty: {
            select: { employee_id: true },
          },
        },
      });

      if (!user) {
        console.warn("⚠️ User not found during logout:", payload.user_id);
        return NextResponse.json({
          success: true,
          message: "User not found, but logout completed",
        });
      }

      // ✅ Log logout activity
      // First, find any existing paper to use as a reference, or handle non-document activities
      let validPaperId = 1; // Default to paper ID 1 if it exists
      try {
        const firstPaper = await prisma.papers.findFirst({
          select: { paper_id: true },
          orderBy: { paper_id: "asc" },
        });
        if (firstPaper) {
          validPaperId = firstPaper.paper_id;
        }
      } catch (paperError) {
        console.log("No papers found, using paper_id 1");
      }

      await prisma.user_activity_logs.create({
        data: {
          user_id: user.user_id,
          paper_id: validPaperId, // Use a valid paper ID since it's required
          name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
          activity: `Successfully logged out from IP: ${getClientIP(req)}`,
          activity_type: activity_type.LOGOUT,
          status: "success",
          user_agent: req.headers.get("user-agent") || "",
          created_at: new Date(),
          employee_id: user.faculty?.employee_id || BigInt(0),
          student_num: user.students?.student_num || BigInt(0),
        },
      });

      console.log(
        `✅ Logout activity logged for user: ${user.first_name} (${user.role})`,
      );
    } catch (logError) {
      console.error("❌ Failed to log logout activity:", logError);
      // Don't block logout on log failure
    }

    // Clear the cookie by setting it to expire immediately
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `authToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`,
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Logout successful",
      }),
      { headers },
    );
  } catch (error) {
    console.error("💥 Error in logout API:", error);

    // Even on error, clear the cookie and return success
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `authToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`,
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Logout completed with errors",
      }),
      { headers },
    );
  }
}

// Helper function to get client IP
function getClientIP(req: NextRequest): string {
  // Try different headers in order of preference
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");
  const clientIP = req.headers.get("x-client-ip");

  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }

  if (realIP) {
    return realIP.trim();
  }

  if (clientIP) {
    return clientIP.trim();
  }

  return "unknown";
}
