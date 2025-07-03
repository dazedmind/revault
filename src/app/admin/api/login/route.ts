import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { activity_type } from "@prisma/client"; // ⬅️ import the enum

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function POST(req: Request) {
  const { idNumber, password } = await req.json();

  if (!idNumber || !password) {
    return Response.json(
      { success: false, message: "Missing credentials" },
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
    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 },
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, userRecord.password);
  if (!isPasswordCorrect) {
    return Response.json(
      { success: false, message: "Invalid password" },
      { status: 401 },
    );
  }

  // Check if user account is active
  if (userRecord.status === "INACTIVE") {
    return Response.json(
      { 
        success: false, 
        message: "Account is disabled please contact your admin.",
        status: "INACTIVE"
      },
      { status: 403 },
    );
  }

  // 🪙 Create token
  const token = jwt.sign(
    {
      user_id: userRecord.user_id,
      firstName: userRecord.first_name,
      email: userRecord.email,
      role: userRecord.role,
      userNumber: idNumber,
      status: userRecord.status,
    },
    SECRET_KEY,
    { expiresIn: "2h" },
  );

    // ✅ Save login activity log
    try {
      await prisma.activity_logs.create({
        data: {
          employee_id: librarian.employee_id,
          user_id: parseInt(userRecord.user_id),
          name: userRecord.first_name,
          activity: `Logged in`,
          activity_type: activity_type.LOGIN,
          user_agent: req.headers.get('user-agent') || '',
          ip_address: req.headers.get('x-forwarded-for') || '',
          status: "success",
          created_at: new Date(),
        },
      });
      console.log("Login activity log saved");
    } catch (err) {
      console.error("Failed to log login activity:", err);
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
