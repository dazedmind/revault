import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { studentNumber } = await request.json();

    // Validate student number format (must start with "20" and be 9 digits)
    if (!studentNumber || !/^20\d{7}$/.test(studentNumber)) {
      return NextResponse.json(
        { 
          isUnique: false, 
          error: 'Invalid student number format. Must start with "20" and be 9 digits long.' 
        },
        { status: 400 }
      );
    }

    // Convert string to BigInt for database query
    const studentNumBigInt = BigInt(studentNumber);

    // Check if student number already exists in database
    const existingStudent = await prisma.students.findUnique({
      where: {
        student_num: studentNumBigInt,
      },
    });

    const isUnique = !existingStudent;

    return NextResponse.json({
      isUnique,
      message: isUnique ? 'Student number is available' : 'Student number already exists',
    });

  } catch (error) {
    console.error('Error checking student number:', error);
    return NextResponse.json(
      { 
        isUnique: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}