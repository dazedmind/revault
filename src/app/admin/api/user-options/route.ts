import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

async function verifyAndGetPayload(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  if (!token) throw new Error("NO_TOKEN");
  try {
    return jwt.verify(token, SECRET_KEY) as {
      user_id: number;
      firstName: string;
      email: string;
      role: string;
      userNumber: string;
      iat?: number;
      exp?: number;
    };
  } catch {
    throw new Error("INVALID_TOKEN");
  }
}

export async function GET(req: NextRequest) {
  // 1) Verify JWT
  let payload;
  try {
    payload = await verifyAndGetPayload(req);
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ success: false, message: err.message }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }
  // 2) Only allow Admin/AdminAssistant/Librarian
  if (!["ADMIN", "ADMIN_ASSISTANT"].includes(payload.role)) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Forbidden" }),
      { status: 403, headers: { "Content-Type": "application/json" } },
    );
  }

  // 3) Fetch every user’s id + full name
  try {
    const allUsers = await prisma.users.findMany({
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
      },
      orderBy: { first_name: "asc" },
    });

    const formatted = allUsers.map((u) => ({
      userId: u.user_id,
      name: `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim(),
    }));

    return new NextResponse(JSON.stringify(formatted), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (dbErr) {
    console.error("Failed to fetch user options:", dbErr);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Database error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}
