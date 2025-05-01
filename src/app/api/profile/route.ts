import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // install with `npm install jose`
import { prisma } from "@/lib/prisma"; // adjust based on your setup
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function GET(req: Request) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    console.log("JWT Payload:", payload);

    const studentNumber = BigInt(payload.studentNumber);

    const user = await prisma.students.findFirst({
        where: {
            student_num: studentNumber,
        },
        include: {
          users: true,
        }
      });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

   // ✅ Convert BigInt to string so JSON.stringify works
   const safeUser = {
    ...user,
    student_num: user.student_num.toString(),
    users: {
      ...user.users,
      user_id: user.users.user_id.toString(), // just in case it's BigInt too
    }
  };

  return NextResponse.json(safeUser);
} catch (err) {
    console.error("Error verifying token:", err); // Log error to debug

    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
  }
}
