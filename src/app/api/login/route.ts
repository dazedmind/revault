import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  let role: "student" | "faculty" | null = null;

  console.log("ID Number:", idNumber); // Debugging line

  if (firstDigit === "2") role = "student";
  else if (firstDigit === "1") role = "faculty";
  else {
    return Response.json(
      { success: false, message: "Invalid ID format" },
      { status: 400 },
    );
  }

  let userRecord: any = null;

  if (role === "student") {
    const student = await prisma.students.findUnique({
      where: { student_num: BigInt(idNumber) },
      include: { users: true },
    });

    if (student && student.users) {
      userRecord = student.users;
    }
  } else if (role === "faculty") {
    const faculty = await prisma.faculty.findUnique({
      where: { employee_id: parseFloat(idNumber) },
      include: { users: true },
    });

    if (faculty && faculty.users) {
      userRecord = faculty.users;
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
    return Response.json(
      { success: false, message: "Invalid password" },
      { status: 401 },
    );
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
