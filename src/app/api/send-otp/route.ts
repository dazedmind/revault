// // app/api/send-otp/route.ts
import { NextResponse } from 'next/server';
import { generateOTP } from "@/lib/generateOtp";
import sgMail from '@sendgrid/mail';
import { prisma } from "@/lib/prisma"; // adjust based on your setup


sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const otpStore = new Map<string, string>(); // email -> otp

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const generatedOtp = otp || generateOTP();

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  // Upsert OTP
  await prisma.otp.upsert({
    where: { email },
    update: { code: generatedOtp, createdAt: new Date(), expiresAt },
    create: { email, code: generatedOtp, expiresAt },
  });

  const msg = {
    to: email,
    from: 'jatevalena2022@plm.edu.ph',
    subject: 'Your OTP Code',
    html: `<strong>Your OTP code is: ${generatedOtp}</strong><br/>This expires in 5 minutes.`,
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}

export function getStoredOTP(email: string) {
  return otpStore.get(email);
}

// export async function POST(req: Request) {
//   const { email } = await req.json();

//   const otp = Math.floor(10000 + Math.random() * 90000).toString();

//   // TODO: Save OTP in DB/cache/session/etc.

//   const msg = {
//     to: email,
//     from: 'jatevalena2022@plm.edu.ph', // this must match the verified sender!
//     subject: 'Your OTP Code',
//     html: `<strong>Your OTP code is: ${otp}</strong><br/>This expires in 5 minutes.`,
//   };

//   try {
//     await sgMail.send(msg);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
//   }
  
// }

// File-level variable (temp memory)
