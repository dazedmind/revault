
// src/app/admin/api/permanently-delete-paper/[id]/route.js
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, activity_type } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log('🗑️ PERMANENT DELETE API called');
  
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

    // Check if user is authorized (only ADMIN can permanently delete)
    if (payload.role !== 'ADMIN') {
      console.log('❌ Unauthorized role:', payload.role);
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const paperId = parseInt(id);
    if (isNaN(paperId)) {
      console.log('❌ Invalid paper ID:', id);
      return NextResponse.json({ error: 'Invalid paper ID' }, { status: 400 });
    }

    console.log('🔍 Looking for paper with ID:', paperId);

    // Check if paper exists and is soft-deleted
    const existingPaper = await prisma.papers.findUnique({
      where: { paper_id: paperId },
      select: {
        paper_id: true,
        title: true,
        author: true,
        deleted_at: true,
        is_deleted: true,
        paper_url: true
      }
    });

    if (!existingPaper) {
      console.log('❌ Paper not found:', paperId);
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }

    console.log('✅ Paper found:', existingPaper.title);

    // Check if paper is soft-deleted first
    if (!existingPaper.is_deleted || !existingPaper.deleted_at) {
      console.log('❌ Paper must be soft-deleted first');
      return NextResponse.json({ 
        error: 'Paper must be soft-deleted first' 
      }, { status: 400 });
    }

    console.log('🗑️ Performing permanent delete...');

    // Begin transaction for permanent deletion
    await prisma.$transaction(async (tx) => {
      console.log('🔄 Starting transaction...');

      // Delete associated records first (due to foreign key constraints)
      
      // Delete user bookmarks
      await tx.user_bookmarks.deleteMany({
        where: { paper_id: paperId }
      });
      console.log('✅ Deleted user bookmarks');

      // Delete paper metadata
      await tx.paper_metadata.deleteMany({
        where: { paper_id: paperId }
      });
      console.log('✅ Deleted paper metadata');

      // Delete user activity logs
      await tx.user_activity_logs.deleteMany({
        where: { paper_id: paperId }
      });
      console.log('✅ Deleted user activity logs');

      // Finally, delete the paper itself
      await tx.papers.delete({
        where: { paper_id: paperId }
      });
      console.log('✅ Deleted paper record');
    });

    console.log('✅ Paper permanently deleted successfully');

    // Log the permanent deletion activity
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
          activity: `Permanently deleted research paper: "${existingPaper.title}" by ${existingPaper.author}`,
          activity_type: 'PERMANENT_DELETE' as activity_type,
          user_agent: req.headers.get('user-agent') || '',
          ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
          status: "success",
          created_at: new Date(),
        },
      });
      console.log('✅ Activity logged successfully');
    } catch (logError) {
      console.warn('Failed to log permanent deletion activity:', logError);
    }

    return NextResponse.json({
      success: true,
      message: 'Paper permanently deleted successfully',
      paper: {
        id: existingPaper.paper_id,
        title: existingPaper.title,
        author: existingPaper.author,
        deletedAt: new Date()
      }
    });

  } catch (error) {
    console.error('❌ Permanent delete paper error:', error);
    console.error('Error stack:', error.stack);
    
    // Handle specific Prisma errors
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Paper not found'
      }, { status: 404 });
    }
    
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
