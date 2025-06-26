// File: src/app/api/login/route.ts
// Original implementation with ADDED user activity logging

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { activity_type } from "@prisma/client";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function POST(req: Request) {
  const { idNumber, password } = await req.json();

  if (!idNumber || !password) {
    return Response.json(
      { success: false, message: "Missing credentials" },
      { status: 400 },
    );
  }

  // 🧠 Determine role based on first digit
  const firstDigit = idNumber[0];
  const numberLength = idNumber.length;
  let role: "STUDENT" | "FACULTY" | null = null;

  console.log("ID Number:", idNumber); // Debugging line

  if (numberLength === 9) role = "STUDENT";
  else if (numberLength === 10) role = "FACULTY";
  else {
    return Response.json(
      { success: false, message: "Invalid ID format" },
      { status: 400 },
    );
  }

  let userRecord: any = null;
  let studentData: any = null;
  let facultyData: any = null;

  if (role === "STUDENT") {
    const student = await prisma.students.findUnique({
      where: { student_num: BigInt(idNumber) },
      include: { users: true },
    });

    if (student && student.users) {
      userRecord = student.users;
      studentData = student;
    }
  } else if (role === "FACULTY") {
    const faculty = await prisma.faculty.findUnique({
      where: { employee_id: BigInt(idNumber) },
      include: { users: true },
    });

    if (faculty && faculty.users) {
      userRecord = faculty.users;
      facultyData = faculty;
    }
  }

  if (!userRecord) {
    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 },
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, userRecord.password);
  if (!isPasswordCorrect) {
    // ❌ Log failed login attempt to user_activity_logs (ADDED FUNCTIONALITY)
    try {
      // First, find any existing paper to use as a reference
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
          user_id: userRecord.user_id,
          paper_id: validPaperId, // Use a valid paper ID since it's required
          name: `${userRecord.first_name || ""} ${userRecord.last_name || ""}`.trim(),
          activity: `Failed login attempt - incorrect password from IP: ${getClientIP(req)} (No document associated)`,
          activity_type: activity_type.LOGIN,
          status: "failed",
          user_agent: req.headers.get("user-agent") || "",
          created_at: new Date(),
          employee_id: facultyData?.employee_id || BigInt(0),
          student_num: studentData?.student_num || BigInt(0),
        },
      });
      console.log(
        `❌ Failed login attempt logged for ${role}: ${userRecord.first_name}`,
      );
    } catch (logError) {
      console.error("Failed to log failed login attempt:", logError);
    }

    return Response.json(
      { success: false, message: "Invalid password" },
      { status: 401 },
    );
  }

  // 🪙 Create token (ORIGINAL LOGIC)
  const token = jwt.sign(
    {
      user_id: userRecord.user_id,
      firstName: userRecord.first_name,
      role: userRecord.role,
      email: userRecord.email,
      userNumber: idNumber,
    },
    SECRET_KEY,
    { expiresIn: "2h" },
  );

  // ✅ Log successful login to user_activity_logs (ADDED FUNCTIONALITY)
  try {
    // First, find any existing paper to use as a reference
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
        user_id: userRecord.user_id,
        paper_id: validPaperId, // Use a valid paper ID since it's required
        name: `${userRecord.first_name || ""} ${userRecord.last_name || ""}`.trim(),
        activity: `Successfully logged in from IP: ${getClientIP(req)} (No document associated)`,
        activity_type: activity_type.LOGIN,
        status: "success",
        user_agent: req.headers.get("user-agent") || "",
        created_at: new Date(),
        employee_id: facultyData?.employee_id || BigInt(0),
        student_num: studentData?.student_num || BigInt(0),
      },
    });
    console.log(
      `✅ Login activity logged for ${role}: ${userRecord.first_name}`,
    );
  } catch (logError) {
    console.error("❌ Failed to log login activity:", logError);
    // Don't block login on log failure
  }

  // ORIGINAL RESPONSE LOGIC
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `authToken=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=7200`,
  );

  return new Response(
    JSON.stringify({
      success: true,
      message: "Login successful",
      token,
      user: {
        name: userRecord.first_name,
        role: userRecord.role,
      },
    }),
    { headers },
  );
}

// Helper function to get client IP (ADDED FUNCTIONALITY)
function getClientIP(req: Request): string {
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
