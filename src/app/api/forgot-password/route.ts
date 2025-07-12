import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import { activity_type } from "@prisma/client";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;
const EMAIL_HOST = process.env.EMAIL_HOST || "noreply@revault.com";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Initialize SendGrid
sgMail.setApiKey(SENDGRID_API_KEY);

// Helper function to get client IP
function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");
  const remoteAddress = req.headers.get("x-forwarded-for") || 
                       req.headers.get("x-real-ip") || 
                       "unknown";
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return realIP || remoteAddress;
}

// Generate password reset token
const generateResetToken = (email: string): string => {
  const payload = {
    email,
    type: "password_reset",
    timestamp: Date.now(),
  };
  
  // Token expires in 1 hour
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

// Send password reset email using SendGrid
const sendResetEmail = async (email: string, resetToken: string, userName: string) => {
  const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const msg = {
    to: email,
    from: {
      email: EMAIL_HOST,
      name: "ReVault Support"
    },
    subject: "Password Reset Instructions - ReVault",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - ReVault</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #8F8749 0%, #CFC369 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold; font-family: 'Courier New', monospace;">ReVault</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Password Reset Request</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #8F8749; margin-top: 0; font-size: 24px;">Hello ${userName}!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              We received a request to reset your password for your ReVault account. If you didn't make this request, you can safely ignore this email.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #8F8749 0%, #CFC369 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">Reset My Password</a>
            </div>
            
            <p style="font-size: 14px; color: #666; line-height: 1.6;">
              If the button above doesn't work, you can copy and paste this link into your browser:
            </p>
            <p style="font-size: 12px; color: #8F8749; word-break: break-all; background: #f8f8f8; padding: 10px; border-radius: 5px; margin: 10px 0;">
              ${resetLink}
            </p>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              <strong>Important:</strong> This link will expire in 1 hour for security reasons.
            </p>
            
            <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Best regards,<br>
                The ReVault Team
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f8f8; padding: 20px 30px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #6c757d; font-size: 12px; margin: 0 0 10px 0;">
              This email was sent by ReVault system.
              Please do not reply to this email.
            </p>
            <p style="color: #6c757d; font-size: 12px; margin: 0 0 10px 0;">
              If you need help, contact our support team.
            </p>
            <p style="color: #6c757d; font-size: 12px; margin: 0;">
              &copy; 2025 ReVault. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Hello ${userName}!
      
      We received a request to reset your password for your ReVault account.
      
      To reset your password, visit this link: ${resetLink}
      
      This link will expire in 1 hour for security reasons.
      
      If you didn't request this password reset, please ignore this email.
      
      Best regards,
      The ReVault Team
      
      ---
      This email was sent by ReVault system.
      © 2025 ReVault. All rights reserved.
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Password reset email sent successfully to: ${email}`);
  } catch (error) {
    console.error("SendGrid error details:", error);
    if (error.response) {
      console.error("SendGrid response body:", error.response.body);
    }
    throw error;
  }
};

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if SendGrid API key is configured
    if (!SENDGRID_API_KEY) {
      console.error("SendGrid API key not configured");
      return NextResponse.json(
        { error: "Email service not configured. Please contact support." },
        { status: 500 }
      );
    }

    // Find user by email
    const user = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        students: {
          select: { student_num: true },
        },
        faculty: {
          select: { employee_id: true },
        },
        librarian: {
          select: { employee_id: true },
        },
      },
    });

    // ✅ NEW: Check if user exists and return appropriate response
    if (!user) {
      // Log attempt with non-existent email
      console.log(`⚠️ Password reset attempted for non-existent email: ${email}`);
      
      return NextResponse.json(
        { 
          error: "No account found with that email address",
          userExists: false 
        },
        { status: 404 }
      );
    }

    // User exists, proceed with password reset
    try {
      // Generate reset token
      const resetToken = generateResetToken(email.toLowerCase());
      
      // Store reset token in database (optional - for additional security)
      try {
        await prisma.password_reset_tokens.create({
          data: {
            user_id: user.user_id,
            token: resetToken,
            expires_at: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
            created_at: new Date(),
          },
        });
      } catch (tokenError) {
        console.log("Password reset tokens table not found - migration may be needed");
        // Continue without storing token in DB (JWT is still valid)
      }

      // Send reset email
      const userName = `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User";
      await sendResetEmail(email.toLowerCase(), resetToken, userName);

      // Log password reset request
      try {
        await prisma.user_activity_logs.create({
          data: {
            user_id: user.user_id,
            paper_id: null,
            name: userName,
            activity: `Password reset requested from IP: ${getClientIP(req)}`,
            activity_type: activity_type.PASSWORD_RESET,
            status: "requested",
            user_agent: req.headers.get("user-agent") || "",
            created_at: new Date(),
            employee_id:
              user.faculty?.employee_id ||
              user.librarian?.employee_id ||
              BigInt(0),
            student_num: user.students?.student_num || BigInt(0),
          },
        });
      } catch (logError) {
        console.log("Failed to log password reset activity:", logError.message);
      }

      console.log(`✅ Password reset process completed for: ${email}`);
      
      return NextResponse.json({
        success: true,
        userExists: true,
        message: "Password reset instructions have been sent to your email.",
      });

    } catch (emailError) {
      console.error("Failed to send reset email:", emailError);
      
      // Log failed email attempt
      try {
        await prisma.user_activity_logs.create({
          data: {
            user_id: user.user_id,
            paper_id: null,
            name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
            activity: `Failed to send password reset email from IP: ${getClientIP(req)} - Error: ${emailError.message || 'Unknown error'}`,
            activity_type: activity_type.PASSWORD_RESET,
            status: "failed",
            user_agent: req.headers.get("user-agent") || "",
            created_at: new Date(),
            employee_id:
              user.faculty?.employee_id ||
              user.librarian?.employee_id ||
              BigInt(0),
            student_num: user.students?.student_num || BigInt(0),
          },
        });
      } catch (logError) {
        console.error("Failed to log email error:", logError.message);
      }
      
      return NextResponse.json(
        { error: "Failed to send reset email. Please try again later." },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}