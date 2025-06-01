import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

export async function POST(req: NextRequest) {
  try {
    // Extract token from Authorization header
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Decode and verify token
    let payload: any;
    try {
      payload = jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { oldPassword, newPassword } = await req.json();

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
      return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where: { email: payload.email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error("Password change error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
