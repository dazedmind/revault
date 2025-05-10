"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function loginUser(formData: FormData) {
  const studentNumber = formData.get("studentNumber")?.toString();
  const password = formData.get("password")?.toString();

  if (!studentNumber || !password) {
    return { success: false, message: "Missing credentials" };
  }

  const student = await prisma.students.findUnique({
    where: { student_num: BigInt(studentNumber) },
    include: { users: true },
  });

  if (!student || !student.users) {
    return { success: false, message: "No user found" };
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    student.users.password,
  );

  if (!isPasswordCorrect) {
    return { success: false, message: "Invalid password" };
  }

  // 🪙 Generate JWT token
  const token = jwt.sign(
    {
      user_id: student.users.user_id,
      firstName: student.users.first_name,
      role: student.users.role || "student",
      email: student.users.email,
      studentNumber: student.student_num.toString(), // ✅ Include this line
    },
    SECRET_KEY,
    { expiresIn: "2h" },
  );

  return {
    success: true,
    token, // return this so you can save it in localStorage
    user: {
      name: student.users.first_name,
      role: student.users.role,
    },
  };
}
