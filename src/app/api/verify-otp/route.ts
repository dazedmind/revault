// // app/api/verify-otp/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const record = await prisma.otp.findUnique({
    where: { email }
  });

  const now = new Date();

  if (record && record.code === otp && record.expiresAt > now) {
    return NextResponse.json({ verified: true });
  }

  return NextResponse.json({ verified: false }, { status: 401 });
}
