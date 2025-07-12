// File: src/app/api/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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
