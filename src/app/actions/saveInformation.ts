"use server";

import { prisma } from "@/lib/prisma"; // Make sure prisma client is set up here
import bcrypt from "bcryptjs";

export async function saveInformation(formData: any) {
  try {
    const {
      firstName,
      middleName,
      lastName,
      ext,
      studentNumber,
      program,
      email,
      password,
      confirmPassword,
      employeeID,
      department,
      role,
    } = formData;

    if (!email || !password || !confirmPassword || !firstName) {
      throw new Error("Missing required fields.");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords don't match.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into users first
    // For students
    if (role === "STUDENT") {
      const user = await prisma.users.create({
        data: {
          first_name: firstName,
          mid_name: middleName || null,
          last_name: lastName,
          ext_name: ext || null,
          email,
          password: hashedPassword,
          role: "STUDENT", // Set the role to 'student' here
          created_at: new Date(),
        },
      });

      await prisma.students.create({
        data: {
          student_num: parseFloat(studentNumber),
          program: program || "Unknown", // Set default if program is empty
          college: "CISTM", // Or you can make it dynamic
          year_level: 1, // Default year level, adjust as needed
          user_id: user.user_id, // Link to the user
        },
      });

      console.log("User and student info saved!");
    } else if (role === "FACULTY") {
      const user = await prisma.users.create({
        data: {
          first_name: firstName,
          mid_name: middleName || null,
          last_name: lastName,
          ext_name: ext || null,
          email,
          password: hashedPassword,
          role: "FACULTY", // Set the role to 'faculty' here
          created_at: new Date(),
        },
      });

      await prisma.faculty.create({
        data: {
          employee_id: parseFloat(employeeID), // Ensure employee ID is correct
          position: "Faculty", // Set default if position is empty
          department: department || "", // Set default if department is empty
          user_id: user.user_id, // Link to the user
        },
      });

      console.log("User and faculty info saved!");
    }
  } catch (err) {
    console.error("Save error:", err);
  }
}
