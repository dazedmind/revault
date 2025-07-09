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
      { status: 400 }
    );
  }

  if (idNumber == null) {
    return Response.json(
      { success: false, message: "Please enter your ID number and password" },
      { status: 400 },
    );
  }

  let userRecord: any = null;

  const librarian = await prisma.librarian.findUnique({
    where: { employee_id: parseFloat(idNumber) },
    include: { users: true },
  });

  if (librarian && librarian.users) {
    userRecord = librarian.users;
  }

  if (!userRecord) {
    console.log(`Login attempt failed: User not found for ID ${idNumber}`);
    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  console.log(
    `Login attempt for user: ${userRecord.first_name} (ID: ${idNumber}, Employee ID: ${librarian.employee_id})`
  );

  if (userRecord.status === "INACTIVE") {
    // 📝 ADDED LOGGING
    await prisma.activity_logs.create({
      data: {
        employee_id: librarian.employee_id,
        user_id: parseInt(userRecord.user_id),
        name: userRecord.first_name,
        activity: "Login blocked - account inactive",
        activity_type: activity_type.LOGIN,
        user_agent: req.headers.get("user-agent") || "",
        ip_address: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
        status: "inactive",
        created_at: new Date(),
      },
    });

    console.log(
      `Login attempt blocked: Account inactive for user ${userRecord.first_name}`
    );
    return Response.json(
      {
        success: false,
        message: "Account is disabled please contact your admin.",
        status: "INACTIVE",
      },
      { status: 403 }
    );
  }

  if (
    userRecord.locked_until &&
    new Date() < new Date(userRecord.locked_until)
  ) {
    const timeRemaining = Math.ceil(
      (new Date(userRecord.locked_until).getTime() - new Date().getTime()) /
        (1000 * 60 * 60)
    );

    // 📝 ADDED LOGGING
    await prisma.activity_logs.create({
      data: {
        employee_id: librarian.employee_id,
        user_id: parseInt(userRecord.user_id),
        name: userRecord.first_name,
        activity: `Login blocked - account locked (${timeRemaining} hours remaining)`,
        activity_type: activity_type.LOGIN,
        user_agent: req.headers.get("user-agent") || "",
        ip_address: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
        status: "locked",
        created_at: new Date(),
      },
    });

    console.log(
      `Login attempt blocked: Account locked for user ${userRecord.first_name}, ${timeRemaining} hours remaining`
    );
    return Response.json(
      {
        success: false,
        message: `Account is locked due to multiple failed login attempts. Please try again in ${timeRemaining} hour(s).`,
        lockedUntil: userRecord.locked_until,
      },
      { status: 423 }
    );
  }

  if (
    userRecord.locked_until &&
    new Date() >= new Date(userRecord.locked_until)
  ) {
    console.log(
      `Lock time expired for user ${userRecord.first_name}, resetting attempts`
    );
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
    const currentAttempts = (userRecord.login_attempts || 0) + 1;

    console.log(
      `Password incorrect for user ${userRecord.first_name}, current attempts: ${userRecord.login_attempts || 0}`
    );
    console.log(`Incrementing login attempts to: ${currentAttempts}`);

    try {
      await prisma.users.update({
        where: { user_id: userRecord.user_id },
        data: {
          login_attempts: currentAttempts,
        },
      });
    } catch (err) {
      console.error("Failed to update login attempts in database:", err);
      return Response.json(
        { success: false, message: "Database error occurred" },
        { status: 500 }
      );
    }

    try {
      await prisma.activity_logs.create({
        data: {
          employee_id: librarian.employee_id,
          user_id: parseInt(userRecord.user_id),
          name: userRecord.first_name,
          activity: `Failed login attempt (${currentAttempts}/${MAX_LOGIN_ATTEMPTS})`,
          activity_type: activity_type.LOGIN,
          user_agent: req.headers.get("user-agent") || "",
          ip_address: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
          status: "failed",
          created_at: new Date(),
        },
      });
    } catch (err) {
      console.error("❌ Failed to log failed login activity:", err);
    }

    if (currentAttempts >= MAX_LOGIN_ATTEMPTS) {
      const lockUntil = new Date(Date.now() + LOCK_TIME);

      try {
        await prisma.users.update({
          where: { user_id: userRecord.user_id },
          data: {
            login_attempts: currentAttempts,
            locked_until: lockUntil,
          },
        });
      } catch (err) {
        return Response.json(
          { success: false, message: "Database error occurred" },
          { status: 500 }
        );
      }

      try {
        await prisma.activity_logs.create({
          data: {
            employee_id: librarian.employee_id,
            user_id: parseInt(userRecord.user_id),
            name: userRecord.first_name,
            activity: `Account locked due to ${MAX_LOGIN_ATTEMPTS} failed login attempts`,
            activity_type: activity_type.LOGIN,
            user_agent: req.headers.get("user-agent") || "",
            ip_address: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
            status: "locked",
            created_at: new Date(),
          },
        });
      } catch (err) {
        console.error("❌ Failed to log account lock activity:", err);
      }

      return Response.json(
        {
          success: false,
          message:
            "Account locked due to multiple failed login attempts. Please try again in 24 hours or contact your administrator.",
          lockedUntil: lockUntil,
        },
        { status: 423 }
      );
    } else {
      const remainingAttempts = MAX_LOGIN_ATTEMPTS - currentAttempts;
      return Response.json(
        {
          success: false,
          message: `Invalid password. ${remainingAttempts} attempt(s) remaining before account lock.`,
          attemptsRemaining: remainingAttempts,
        },
        { status: 401 }
      );
    }
  }

  if (userRecord.login_attempts > 0) {
    await prisma.users.update({
      where: { user_id: userRecord.user_id },
      data: {
        login_attempts: 0,
        locked_until: null,
      },
    });
  }

  const token = jwt.sign(
    {
      user_id: userRecord.user_id,
      firstName: userRecord.first_name,
      lastName: userRecord.last_name,
      email: userRecord.email,
      role: userRecord.role,
      userNumber: idNumber,
      employeeID: librarian.employee_id.toString(),
      status: userRecord.status,
    },
    SECRET_KEY,
    { expiresIn: "2h" }
  );

  try {
    await prisma.activity_logs.create({
      data: {
        employee_id: librarian.employee_id,
        user_id: parseInt(userRecord.user_id),
        name: userRecord.first_name,
        activity: `Logged in successfully`,
        activity_type: activity_type.LOGIN,
        user_agent: req.headers.get("user-agent") || "",
        ip_address: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
        status: "success",
        created_at: new Date(),
      },
    });
  } catch (err) {
    console.error("❌ Failed to log login activity:", err);
  }

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `authToken=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=7200`
  );

  return new Response(
    JSON.stringify({
      success: true,
      message: "Login successful",
      token,
      user: {
        name: userRecord.first_name,
        role: userRecord.role,
        employeeID: librarian.employee_id.toString(),
      },
    }),
    { headers }
  );
}
