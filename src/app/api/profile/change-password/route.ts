import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const { oldPassword, newPassword } = await req.json();

    // Validate input
    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: "Old password and new password are required" }, { status: 400 });
    }

    // Validate new password requirements
    if (newPassword.length < 9) {
      return NextResponse.json({ error: "New password must be at least 9 characters long" }, { status: 400 });
    }

    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSymbol) {
      return NextResponse.json({ 
        error: "New password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol" 
      }, { status: 400 });
    }

    // Check if new password is same as old password
    if (oldPassword === newPassword) {
      return NextResponse.json({ error: "New password must be different from current password" }, { status: 400 });
    }

    // Find user by email from decoded payload
    const user = await prisma.users.findUnique({
      where: { email: payload.email },
    });

    if (!user || !user.password) {
      return NextResponse.json({ error: "User not found or invalid" }, { status: 404 });
    }

    // Compare old password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
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

    // Log the password change activity (if you have activity logging)
    try {
      // Check if activity_logs table exists and log the activity
      await prisma.activity_logs.create({
        data: {
          name: `${user.first_name} ${user.last_name}`,
          activity: "Password changed successfully",
          activity_type: "CHANGE_PASSWORD",
          user_agent: req.headers.get('user-agent') || '',
          ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
          status: "success",
          created_at: new Date(),
          users: {
            connect: { user_id: user.user_id }
          },
          librarian: {
            connect: { user_id: user.user_id }
          }
        },
      });
    } catch (logError) {
      // Don't fail the request if activity logging fails
      console.warn("Failed to log password change activity:", logError);
    }

    return NextResponse.json({ 
      message: "Password updated successfully",
      success: true 
    });

  } catch (err) {
    console.error("Password change error:", err);
    return NextResponse.json({ 
      error: "Internal server error. Please try again later." 
    }, { status: 500 });
  }
}