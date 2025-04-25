import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function POST(req) {
  const body = await req.formData();
  const studentNumber = body.get("studentNumber")?.toString();
  const password = body.get("password")?.toString();

  if (!studentNumber || !password) {
    return Response.json({ success: false, message: "Missing credentials" }, { status: 400 });
  }

  const student = await prisma.students.findUnique({
    where: { student_num: BigInt(studentNumber) },
    include: { users: true },
  });

  if (!student || !student.users) {
    return Response.json({ success: false, message: "No user found" }, { status: 404 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, student.users.password);

  if (!isPasswordCorrect) {
    return Response.json({ success: false, message: "Invalid password" }, { status: 401 });
  }

  // 🪙 Generate JWT token
  const token = jwt.sign(
    {
      user_id: student.users.user_id,
      role: student.users.role || 'student',
      email: student.users.email,
    },
    SECRET_KEY,
    { expiresIn: '2h' }
  );

  // Set the token in a cookie with HttpOnly flag
  const headers = new Headers();
  headers.append('Set-Cookie', `authToken=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=7200`);

  return new Response(
    JSON.stringify({
      success: true,
      message: "Login successful",
      user: {
        name: student.users.first_name,
        role: student.users.role,
      }
    }),
    { headers }
  );
}
