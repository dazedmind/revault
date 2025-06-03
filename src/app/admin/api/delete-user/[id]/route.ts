// File: src/app/admin/api/delete-user/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
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
    const existing = await prisma.users.findUnique({
      where: { user_id: userId },
    });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    await prisma.users.delete({
      where: { user_id: userId },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error deleting user:", err);
    return NextResponse.json(
      { success: false, message: "Failed to delete user" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
