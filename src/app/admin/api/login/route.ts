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

  // 🪙 Create token
  const token = jwt.sign(
    {
      user_id: userRecord.user_id,
      firstName: userRecord.first_name,
      email: userRecord.email,
      role: userRecord.role,
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
      },
    }),
    { headers },
  );
}
