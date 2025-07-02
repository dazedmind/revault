// File: src/app/api/verify-reset-token/route.ts
// API endpoint to verify password reset token validity

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "Token is required" },
        { status: 400 }
      );
    }

    // Verify JWT token
    let payload: any;
    try {
      payload = jwt.verify(token, SECRET_KEY);
    } catch (jwtError) {
      return NextResponse.json(
        { valid: false, error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Check if it's a password reset token
    if (payload.type !== "password_reset") {
      return NextResponse.json(
        { valid: false, error: "Invalid token type" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.users.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      return NextResponse.json(
        { valid: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Check if token exists in database and hasn't been used
    const resetToken = await prisma.password_reset_tokens.findFirst({
      where: {
        token: token,
        user_id: user.user_id,
        expires_at: {
          gt: new Date(), // Token hasn't expired
        },
        used_at: null, // Token hasn't been used
      },
    });

    if (!resetToken) {
      return NextResponse.json(
        { valid: false, error: "Token not found, expired, or already used" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      email: payload.email,
    });

  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { valid: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}