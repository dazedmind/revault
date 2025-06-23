// app/api/send-otp/route.ts
import { NextResponse } from 'next/server';
import { generateOTP } from '@/lib/generateOtp';
import sgMail from '@sendgrid/mail';
import { prisma } from '@/lib/prisma';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, otp, role } = await req.json();

    // Only generate OTP if not provided
    const otpCode = otp || generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 minutes

    console.log(`Sending OTP ${otpCode} to ${email}`); // Debug log

    // Save OTP to DB using upsert
    await prisma.otp.upsert({
      where: { email },
      update: {
        code: otpCode,
        createdAt: new Date(),
        expiresAt,
      },
      create: {
        email,
        code: otpCode,
        expiresAt,
      },
    });

    const msg = {
      to: email,
      from: 'mjbinsigne2022@plm.edu.ph',
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
          <img src="https://i.imgur.com/vFihHON.png" alt="PLM Logo" style="max-width: 120px; margin-bottom: 20px;">
          <h1 style="color: #CFC369; margin-bottom: 30px;">PLM ReVault</h1>
          <p style="font-size: 16px; margin-bottom: 15px;">Your OTP is</p>
          <h2 style="color: #CFC369; font-size: 32px; letter-spacing: 5px; padding: 15px; background-color: #f5f5f5; border-radius: 8px; margin: 20px 0;">${otpCode}</h2>
          <p style="font-size: 14px; color: #666; margin-top: 20px;">This expires in 5 minutes. Please do not share this code with anyone.</p>
          <p style="font-size: 14px; color: #666;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    
    console.log(`OTP sent successfully to ${email}`); // Debug log
    
    return NextResponse.json({ success: true, otp: otpCode }); // Return OTP for debugging (remove in production)
  } catch (error) {
    console.error('OTP send error:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}