// File: src/app/api/reset-password/route.ts
// API endpoint to handle password reset with token

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { activity_type } from "@prisma/client";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

// Helper function to get client IP
function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");
  const remoteAddress = req.headers.get("x-forwarded-for") || 
                       req.headers.get("x-real-ip") || 
                       "unknown";
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return realIP || remoteAddress;
}

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    // Validate input
    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      );
    }

    // Validate new password requirements
    if (newPassword.length < 9) {
      return NextResponse.json(
        { error: "Password must be at least 9 characters long" },
        { status: 400 }
      );
    }

    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSymbol) {
      return NextResponse.json(
        {
          error: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
        },
        { status: 400 }
      );
    }

    // Verify JWT token
    let payload: any;
    try {
      payload = jwt.verify(token, SECRET_KEY);
    } catch (jwtError) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Check if it's a password reset token
    if (payload.type !== "password_reset") {
      return NextResponse.json(
        { error: "Invalid token type" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.users.findUnique({
      where: { email: payload.email },
      include: {
        students: {
          select: { student_num: true },
        },
        faculty: {
          select: { employee_id: true },
        },
        librarian: {
          select: { employee_id: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if token exists in database and is valid (optional if table exists)
    let resetToken = null;
    try {
      resetToken = await prisma.password_reset_tokens.findFirst({
        where: {
          token: token,
          user_id: user.user_id,
          expires_at: {
            gt: new Date(), // Token hasn't expired
          },
          used_at: null, // Token hasn't been used
        },
      });

      // If we have database tracking and token was used/expired, reject it
      if (resetToken === null) {
        const anyToken = await prisma.password_reset_tokens.findFirst({
          where: {
            token: token,
            user_id: user.user_id,
          },
        });

        if (anyToken) {
          // Log failed reset attempt
          try {
            await prisma.user_activity_logs.create({
              data: {
                user_id: user.user_id,
                paper_id: null, // No paper associated with password reset
                name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
                activity: `Failed password reset attempt - token already used or expired from IP: ${getClientIP(req)}`,
                activity_type: activity_type.PASSWORD_RESET,
                status: "failed",
                user_agent: req.headers.get("user-agent") || "",
                created_at: new Date(),
                employee_id:
                  user.faculty?.employee_id ||
                  user.librarian?.employee_id ||
                  BigInt(0),
                student_num: user.students?.student_num || BigInt(0),
              },
            });
          } catch (logError) {
            console.error("Failed to log failed password reset attempt:", logError);
          }

          return NextResponse.json(
            { error: "Token has already been used or expired" },
            { status: 400 }
          );
        }
      }
    } catch (dbError) {
      console.log("Database token verification skipped - table may not exist yet");
      console.log("Proceeding with JWT-only validation");
    }

    // Check if new password is same as current password
    if (user.password) {
      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        return NextResponse.json(
          { error: "New password must be different from current password" },
          { status: 400 }
        );
      }
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Start a transaction to update password and mark token as used (if token table exists)
    if (resetToken) {
      // We have database token tracking
      await prisma.$transaction(async (tx) => {
        // Update user password
        await tx.users.update({
          where: { user_id: user.user_id },
          data: {
            password: hashedPassword,
          },
        });

        // Mark token as used
        await tx.password_reset_tokens.update({
          where: { id: resetToken.id },
          data: {
            used_at: new Date(),
          },
        });

        // Invalidate all other reset tokens for this user
        await tx.password_reset_tokens.updateMany({
          where: {
            user_id: user.user_id,
            id: { not: resetToken.id },
            used_at: null,
          },
          data: {
            used_at: new Date(), // Mark as used to invalidate
          },
        });
      });
    } else {
      // No database token tracking, just update password
      await prisma.users.update({
        where: { user_id: user.user_id },
        data: {
          password: hashedPassword,
        },
      });
    }

    // Log successful password reset (temporarily disabled)
    try {
      console.log(`✅ Password reset completed for user: ${user.first_name} (${user.email}) - logging temporarily disabled`);
      
      // Uncomment after schema migration:
      /*
      await prisma.user_activity_logs.create({
        data: {
          user_id: user.user_id,
          paper_id: null,
          name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
          activity: `Successfully reset password via email link from IP: ${getClientIP(req)}`,
          activity_type: activity_type.PASSWORD_RESET,
          status: "success",
          user_agent: req.headers.get("user-agent") || "",
          created_at: new Date(),
          employee_id:
            user.faculty?.employee_id ||
            user.librarian?.employee_id ||
            BigInt(0),
          student_num: user.students?.student_num || BigInt(0),
        },
      });
      */
    } catch (logError) {
      // Don't fail the request if activity logging fails
      console.warn("Failed to log password reset activity:", logError);
    }

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully",
    });

  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}