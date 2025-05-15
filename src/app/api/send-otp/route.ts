// app/api/send-otp/route.ts
import { NextResponse } from 'next/server';
import { generateOTP } from '@/lib/generateOtp';
import sgMail from '@sendgrid/mail';
import { prisma } from '@/lib/prisma';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    const generatedOtp = otp || generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 minutes

    // Save OTP to DB using upsert
    await prisma.otp.upsert({
      where: { email },
      update: {
        code: generatedOtp,
        createdAt: new Date(),
        expiresAt,
      },
      create: {
        email,
        code: generatedOtp,
        expiresAt,
      },
    });

    const msg = {
      to: email,
      from: 'jatevalena2022@plm.edu.ph',
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
          <img src="https://i.imgur.com/vFihHON.png" alt="PLM Logo" style="max-width: 120px; margin-bottom: 20px;">
          <h1 style="color: #01B783; margin-bottom: 30px;">PLM ReVault</h1>
          <p style="font-size: 16px; margin-bottom: 15px;">Your OTP is</p>
          <h2 style="color: #01B783; font-size: 32px; letter-spacing: 5px; padding: 15px; background-color: #f5f5f5; border-radius: 8px; margin: 20px 0;">${generatedOtp}</h2>
          <p style="font-size: 14px; color: #666; margin-top: 20px;">This expires in 5 minutes. Please do not share this code with anyone.</p>
          <p style="font-size: 14px; color: #666;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('OTP send error:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
