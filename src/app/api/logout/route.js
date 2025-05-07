import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Return a success response
    return NextResponse.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error during logout' },
      { status: 500 }
    );
  }
} 