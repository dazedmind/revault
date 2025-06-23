import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { employeeNumber } = await request.json();

    // Validate employee number format (must be exactly 10 digits)
    if (!employeeNumber || !/^\d{10}$/.test(employeeNumber)) {
      return NextResponse.json(
        { 
          isUnique: true, // Return true for invalid format so frontend handles format validation
          error: 'Invalid employee number format. Must be exactly 10 digits.' 
        },
        { status: 200 } // Changed to 200 to avoid fetch errors
      );
    }

    // Convert string to BigInt for database query
    const employeeIdBigInt = BigInt(employeeNumber);

    // Check if employee number already exists in database
    const existingFaculty = await prisma.faculty.findUnique({
      where: {
        employee_id: employeeIdBigInt,
      },
    });

    const isUnique = !existingFaculty;

    return NextResponse.json({
      isUnique,
      message: isUnique ? 'Employee number is available' : 'Employee number already exists',
    }, { status: 200 });

  } catch (error) {
    console.error('Error checking employee number:', error);
    
    // Return true on error so the form doesn't get stuck
    // Let other validations handle the employee number
    return NextResponse.json(
      { 
        isUnique: true, 
        error: 'Unable to verify employee number. Please try again.',
        message: 'Verification temporarily unavailable'
      },
      { status: 200 }
    );
  } finally {
    await prisma.$disconnect();
  }
}