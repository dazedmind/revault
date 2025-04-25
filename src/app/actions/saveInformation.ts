'use server';

import { prisma } from "@/lib/prisma"; // Make sure prisma client is set up here
import bcrypt from 'bcryptjs';

export async function saveInformation(formData: FormData) {
  try {
    // Extract values from formData
    const firstName = formData.get('firstName')?.toString();
    const midName = formData.get('middleName')?.toString();
    const lastName = formData.get('lastName')?.toString();
    const ext = formData.get('ext')?.toString();
    const studentNumber = formData.get('studentNumber')?.toString();
    const course = formData.get('course')?.toString();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const confirmPassword = formData.get('confirmPassword')?.toString();

    if (!email || !password || !confirmPassword || !firstName) {
      throw new Error("Missing required fields.");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords don't match.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into users first
    const user = await prisma.users.create({
      data: {
        first_name: firstName,
        mid_name: midName || null,
        last_name: lastName,
        ext_name: ext || null,
        email,
        password: hashedPassword,
        role: "student", // or whatever default
        created_at: new Date(),
      },
    });

    // Then insert into students
    await prisma.students.create({
      data: {
        student_num: parseFloat(studentNumber),
        program: course,
        college: "CISTM", // you can extend your form to get this
        year_level: 1, // also make it dynamic later
        user_id: user.user_id,
      },
    });

    console.log("User and student info saved!");
    console.log({
      firstName,
      midName,
      lastName,
      ext,
      studentNumber,
      course,
      email,
      password,
      confirmPassword,
    });
    
  } catch (err) {
    console.error("Save error:", err);
  }
}
