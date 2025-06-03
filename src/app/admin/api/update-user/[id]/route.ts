// File: src/app/admin/api/update-user/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const idParam = params.id;
  const userId = parseInt(idParam, 10);

  if (isNaN(userId)) {
    return NextResponse.json(
      { success: false, message: "Invalid user ID" },
      { status: 400 },
    );
  }

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
        password?: string;
      };

    // Validate basic fields
    if (!fullName || !lastName || !email || !role) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // If password is nonempty, hash it; otherwise leave it unchanged
    let hashedPassword: string | undefined;
    if (password && password.length > 0) {
      if (password.length < 6) {
        return NextResponse.json(
          { success: false, message: "Password must be at least 6 characters" },
          { status: 400 },
        );
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const dataToUpdate: any = {
      first_name: fullName,
      mid_name: midName || null,
      last_name: lastName,
      ext_name: extName || null,
      email: email,
      role: role,
    };
    if (hashedPassword) {
      dataToUpdate.password = hashedPassword;
    }

    const updated = await prisma.users.update({
      where: { user_id: userId },
      data: dataToUpdate,
    });

    const updatedUser = {
      id: updated.user_id,
      fullName: updated.first_name ?? "",
      middleName: updated.mid_name ?? "",
      lastName: updated.last_name ?? "",
      extension: updated.ext_name ?? "",
      employeeId: "", // Not stored on users
      email: updated.email,
      role: updated.role ?? "",
      status: "", // No `status` column in users
      userAccess: updated.role ?? "",
      name: `${updated.first_name ?? ""} ${updated.last_name ?? ""}${
        updated.ext_name ? " " + updated.ext_name : ""
      }`,
    };

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update user" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
