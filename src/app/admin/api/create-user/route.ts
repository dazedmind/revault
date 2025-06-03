// File: src/app/admin/api/create-user/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, midName, lastName, extName, email, role, password } =
      body as {
        fullName: string;
        midName?: string;
        lastName: string;
        extName?: string;
        email: string;
        role: string;
        password: string;
      };

    // Validate required fields
    if (!fullName || !lastName || !email || !role || !password) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert into users
    const created = await prisma.users.create({
      data: {
        first_name: fullName,
        mid_name: midName || null,
        last_name: lastName,
        ext_name: extName || null,
        email: email,
        role: role,
        password: hashed,
        // created_at will default to null; you can add a @default(now()) in schema if desired
      },
    });

    const newUser = {
      id: created.user_id,
      fullName: created.first_name ?? "",
      middleName: created.mid_name ?? "",
      lastName: created.last_name ?? "",
      extension: created.ext_name ?? "",
      employeeId: "", // Not stored here—use separate `librarian` table if needed
      email: created.email,
      role: created.role ?? "",
      status: "", // No `status` column exists in `users` table
      userAccess: created.role ?? "",
      name: `${created.first_name ?? ""} ${created.last_name ?? ""}${
        created.ext_name ? " " + created.ext_name : ""
      }`,
    };

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json(
      { success: false, message: "Failed to create user" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
