// // app/api/verify-otp/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { user_role } from "@prisma/client";

export async function POST(req: Request) {
  const { email, otp, role: userRole } = await req.json();
  
  // Convert role to uppercase to match enum
  const normalizedRole = userRole?.toUpperCase();
  
  console.log(`Verifying OTP for email: ${email}, Role: ${normalizedRole}`);

  // Validate role is a valid enum value
  if (!Object.values(user_role).includes(normalizedRole)) {
    return NextResponse.json({ 
      verified: false, 
      error: "Invalid role" 
    }, { status: 400 });
  }

  const record = await prisma.otp.findUnique({
    where: { email }
  });

  const now = new Date();

  if (record && record.code === otp && record.expiresAt > now) {
    return NextResponse.json({ 
      verified: true,
      role: normalizedRole // Return the normalized role
    });
  }

  return NextResponse.json({ verified: false }, { status: 401 });
}
