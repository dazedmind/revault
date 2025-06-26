// File: src/app/api/profile/change-password/route.ts
// Enhanced version with user activity logging

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { activity_type } from "@prisma/client";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

export async function POST(req: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Decode and verify token
    let payload: any;
    try {
      payload = jwt.verify(token, SECRET_KEY);
    } catch (error) {
      console.error("JWT verification error:", error);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    const { oldPassword, newPassword } = await req.json();

    // Validate input
    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Old password and new password are required" },
        { status: 400 },
      );
    }

    // Validate new password requirements
    if (newPassword.length < 9) {
      return NextResponse.json(
        { error: "New password must be at least 9 characters long" },
        { status: 400 },
      );
    }

    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSymbol) {
      return NextResponse.json(
        {
          error:
            "New password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
        },
        { status: 400 },
      );
    }

    // Check if new password is same as old password
    if (oldPassword === newPassword) {
      return NextResponse.json(
        { error: "New password must be different from current password" },
        { status: 400 },
      );
    }

    // Find user by email from decoded payload
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

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "User not found or invalid" },
        { status: 404 },
      );
    }

    // Compare old password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      // ❌ Log failed password change attempt
      try {
        await prisma.user_activity_logs.create({
          data: {
            user_id: user.user_id,
            paper_id: 0, // No paper associated with password change
            name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
            activity: `Failed password change attempt - incorrect current password from IP: ${getClientIP(req)}`,
            activity_type: activity_type.CHANGE_PASSWORD,
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
        console.error(
          "Failed to log failed password change attempt:",
          logError,
        );
      }

      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 },
      );
    }

    // Hash new password
    const saltRounds = 12; // Use a higher salt rounds for better security
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password in database
    await prisma.users.update({
      where: { email: payload.email },
      data: {
        password: hashedPassword,
      },
    });

    // ✅ Log successful password change
    try {
      await prisma.user_activity_logs.create({
        data: {
          user_id: user.user_id,
          paper_id: 0, // No paper associated with password change
          name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
          activity: `Successfully changed password from IP: ${getClientIP(req)}`,
          activity_type: activity_type.CHANGE_PASSWORD,
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
      console.log(
        `✅ Password change activity logged for user: ${user.first_name} (${user.role})`,
      );
    } catch (logError) {
      // Don't fail the request if activity logging fails
      console.warn("Failed to log password change activity:", logError);
    }

    return NextResponse.json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (err) {
    console.error("Password change error:", err);
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
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
