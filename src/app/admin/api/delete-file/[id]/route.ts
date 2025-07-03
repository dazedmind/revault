// src/app/api/delete-file/[id]/route.ts
// Make sure this file is in: src/app/api/delete-file/[id]/route.ts
// NOT in: src/app/admin/api/delete-file/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log('🗑️ DELETE API called');
  
  try {
    const { id } = await params;
    console.log('📝 Paper ID:', id);
    
    // Verify authentication
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    
    console.log('🔐 Auth header:', authHeader ? 'Present' : 'Missing');
    console.log('🎫 Token:', token ? 'Present' : 'Missing');
    
    if (!token) {
      console.log('❌ No token provided');
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    let payload: any;
    try {
      payload = jwt.verify(token, SECRET_KEY!);
      console.log('✅ JWT verified, role:', payload.role);
    } catch (error) {
      console.log('❌ JWT verification failed:', error.message);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check if user is authorized (LIBRARIAN, ADMIN, or ASSISTANT)
    if (!['LIBRARIAN', 'ADMIN', 'ASSISTANT'].includes(payload.role)) {
      console.log('❌ Unauthorized role:', payload.role);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const paperId = parseInt(id);
    if (isNaN(paperId)) {
      console.log('❌ Invalid paper ID:', id);
      return NextResponse.json({ error: 'Invalid paper ID' }, { status: 400 });
    }

    console.log('🔍 Looking for paper with ID:', paperId);

    // Check if paper exists
    const existingPaper = await prisma.papers.findUnique({
      where: { paper_id: paperId },
    });

    if (!existingPaper) {
      console.log('❌ Paper not found:', paperId);
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }

    console.log('✅ Paper found:', existingPaper.title);

    // Soft delete: Update the paper to mark it as deleted
    console.log('🗑️ Performing soft delete...');
    const deletedPaper = await prisma.papers.update({
      where: { paper_id: paperId },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
        updated_at: new Date(),
        deleted_by: payload.firstName + ' ' + payload.lastName || 'Unknown User',
      },
    });

    console.log('✅ Paper soft deleted successfully');

    // Log the deletion activity
    try {
      let employeeId = null;
      let userName = payload.firstName || 'Unknown User';

      if (payload.role === 'LIBRARIAN' || payload.role === 'ADMIN' || payload.role === 'ASSISTANT') {
        const librarian = await prisma.librarian.findFirst({
          where: { user_id: parseInt(payload.user_id) },
          include: { users: true }
        });
        
        if (librarian) {
          employeeId = librarian.employee_id;
          userName = librarian.users?.first_name || userName;
        }
      }

      await prisma.activity_logs.create({
        data: {
          employee_id: employeeId,
          user_id: parseInt(payload.user_id),
          name: userName,
          activity: `Deleted research paper: "${existingPaper.title}"`,
          activity_type: 'DELETE_DOCUMENT',
          user_agent: req.headers.get('user-agent') || '',
          ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
          status: "success",
          created_at: new Date(),
        },
      });
    } catch (logError) {
      console.warn('Failed to log deletion activity:', logError);
    }

    return NextResponse.json({
      success: true,
      message: 'Paper deleted successfully',
      paper: {
        id: deletedPaper.paper_id,
        title: deletedPaper.title,
        deletedAt: deletedPaper.deleted_at
      }
    });

  } catch (error) {
    console.error('❌ Delete paper error:', error);
    console.error('Error stack:', error.stack);
    
    // Make sure we always return valid JSON
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error.message || 'Unknown error occurred',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  } finally {
    // Ensure database connection is closed
    await prisma.$disconnect();
  }
}