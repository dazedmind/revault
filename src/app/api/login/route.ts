import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { activity_type } from "@prisma/client"; // ⬅️ import the enum

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const MAX_LOGIN_ATTEMPTS = 3;
const LOCK_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

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

  if (numberLength === 9 && firstDigit === "2") role = "STUDENT";
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
    console.log(`Login attempt failed: User not found for ID ${idNumber}`);
    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 },
    );
  }

  console.log(`Login attempt for user: ${userRecord.first_name} (ID: ${idNumber}})`);

  // Check if user account is active
  if (userRecord.status === "INACTIVE") {
    console.log(`Login attempt blocked: Account inactive for user ${userRecord.first_name}`);
    return Response.json(
      { 
        success: false, 
        message: "Account is disabled please contact your admin.",
        status: "INACTIVE"
      },
      { status: 403 },
    );
  }

  // Check if account is currently locked
  if (userRecord.locked_until && new Date() < new Date(userRecord.locked_until)) {
    const timeRemaining = Math.ceil((new Date(userRecord.locked_until).getTime() - new Date().getTime()) / (1000 * 60 * 60));
    console.log(`Login attempt blocked: Account locked for user ${userRecord.first_name}, ${timeRemaining} hours remaining`);
    return Response.json(
      { 
        success: false, 
        message: `Account is locked due to multiple failed login attempts. Please try again in ${timeRemaining} hour(s).`,
        lockedUntil: userRecord.locked_until
      },
      { status: 423 }, // 423 Locked status code
    );
  }

  // If lock time has expired, reset attempts
  if (userRecord.locked_until && new Date() >= new Date(userRecord.locked_until)) {
    console.log(`Lock time expired for user ${userRecord.first_name}, resetting attempts`);
    await prisma.users.update({
      where: { user_id: userRecord.user_id },
      data: {
        login_attempts: 0,
        locked_until: null,
      },
    });
    userRecord.login_attempts = 0;
    userRecord.locked_until = null;
  }

  const isPasswordCorrect = await bcrypt.compare(password, userRecord.password);
  
  if (!isPasswordCorrect) {
    console.log(`Password incorrect for user ${userRecord.first_name}, current attempts: ${userRecord.login_attempts || 0}`);
    
    // 🔧 FIX: Properly increment login attempts
    const currentAttempts = (userRecord.login_attempts || 0) + 1;
    
    console.log(`Incrementing login attempts to: ${currentAttempts}`);
    
    // Update attempt count in database first
    try {
      await prisma.users.update({
        where: { user_id: userRecord.user_id },
        data: {
          login_attempts: currentAttempts,
        },
      });
      console.log(`Database updated: login_attempts = ${currentAttempts} for user_id ${userRecord.user_id}`);
    } catch (err) {
      console.error("Failed to update login attempts in database:", err);
      return Response.json(
        { success: false, message: "Database error occurred" },
        { status: 500 },
      );
    }

    // Log failed login attempt with current attempt count
    try {
      console.log(`Attempting to create activity log for failed login...`);
      console.log(`Data: student_num=${userRecord.student_num}, user_id=${userRecord.user_id}, name=${userRecord.first_name}`);
      
      await prisma.user_activity_logs.create({
        data: {
          employee_id: facultyData?.employee_id || BigInt(0),
          student_num: studentData?.student_num || BigInt(0),
          user_id: parseInt(userRecord.user_id),
          name: userRecord.first_name,
          activity: `Failed login attempt (${currentAttempts}/${MAX_LOGIN_ATTEMPTS})`,
          activity_type: activity_type.LOGIN,
          user_agent: req.headers.get('user-agent') || '',
          status: "failed",
          created_at: new Date(),
        },
      });
      console.log(`✅ Failed login attempt logged: ${currentAttempts}/${MAX_LOGIN_ATTEMPTS} for user ${userRecord.first_name}`);
    } catch (err) {
      console.error("❌ Failed to log failed login activity:", err);
      console.error("Error details:", err.message);
    }

    // Check if account should be locked
    if (currentAttempts >= MAX_LOGIN_ATTEMPTS) {
      console.log(`🔒 Locking account for user ${userRecord.first_name} - reached ${MAX_LOGIN_ATTEMPTS} attempts`);
      
      // Lock the account
      const lockUntil = new Date(Date.now() + LOCK_TIME);
      
      try {
        await prisma.users.update({
          where: { user_id: userRecord.user_id },
          data: {
            login_attempts: currentAttempts,
            locked_until: lockUntil,
          },
        });
        console.log(`Account locked until: ${lockUntil.toISOString()}`);
      } catch (err) {
        console.error("Failed to lock account in database:", err);
        return Response.json(
          { success: false, message: "Database error occurred" },
          { status: 500 },
        );
      }

      // Log account lock
      try {
        console.log(`Creating account lock activity log...`);
        await prisma.user_activity_logs.create({
          data: {
            employee_id: facultyData?.employee_id || BigInt(0),
            student_num: studentData?.student_num || BigInt(0),
            user_id: parseInt(userRecord.user_id),
            name: userRecord.first_name,
            activity: `Account locked due to ${MAX_LOGIN_ATTEMPTS} failed login attempts`,
            activity_type: activity_type.LOGIN,
            user_agent: req.headers.get('user-agent') || '',
            status: "locked",
            created_at: new Date(),
          },
        });
        console.log(`✅ Account locked logged for user ${userRecord.first_name} (ID: ${idNumber})`);
      } catch (err) {
        console.error("❌ Failed to log account lock activity:", err);
        console.error("Error details:", err.message);
      }

      return Response.json(
        { 
          success: false, 
          message: "Account locked due to multiple failed login attempts. Please try again in 24 hours or contact your administrator.",
          lockedUntil: lockUntil
        },
        { status: 423 }, // 423 Locked status code
      );
    } else {
      const remainingAttempts = MAX_LOGIN_ATTEMPTS - currentAttempts;
      console.log(`Invalid password attempt for user ${userRecord.first_name}. ${remainingAttempts} attempts remaining.`);
      
      return Response.json(
        { 
          success: false, 
          message: `Invalid password. ${remainingAttempts} attempt(s) remaining before account lock.`,
          attemptsRemaining: remainingAttempts
        },
        { status: 401 },
      );
    }
  }

  // Successful login - reset attempts
  if (userRecord.login_attempts > 0) {
    await prisma.users.update({
      where: { user_id: userRecord.user_id },
      data: {
        login_attempts: 0,
        locked_until: null,
      },
    });
    console.log(`Login attempts reset for user ${userRecord.first_name} after successful login`);
  }

  // 🪙 Create token
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

  // ✅ Save successful login activity log
  try {
    console.log(`Creating successful login activity log...`);
    await prisma.user_activity_logs.create({
      data: {
        employee_id: facultyData?.employee_id || BigInt(0),
        student_num: studentData?.student_num || BigInt(0),
        user_id: parseInt(userRecord.user_id),
        name: userRecord.first_name,
        activity: `Logged in successfully`,
        activity_type: activity_type.LOGIN,
        user_agent: req.headers.get('user-agent') || '',
        status: "success",
        created_at: new Date(),
      },
    });
    console.log(`✅ Successful login logged for user ${userRecord.first_name} (ID: ${idNumber})`);
  } catch (err) {
    console.error("❌ Failed to log login activity:", err);
    console.error("Error details:", err.message);
    // Optional: don't block login on log failure
  }

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