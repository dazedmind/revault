// src/app/api/log-security-event/route.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { activity_type } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, userEmail, documentId, timestamp, details } = body;

    if (!event || !userEmail) {
      return NextResponse.json(
        { error: 'Event type and user email are required' },
        { status: 400 }
      );
    }

    console.log('🔒 Security event received:', {
      event,
      userEmail,
      documentId,
      details
    });

    // Find the user by email first (exclude librarian relation to avoid security event logging for librarians)
    const user = await prisma.users.findUnique({
      where: { email: userEmail },
      select: {
        user_id: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        faculty: true,
        students: true
      }
    });

    if (!user) {
      console.log('❌ User not found for email:', userEmail);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Exclude librarians, admins, and assistants from security event logging
    if (['LIBRARIAN', 'ADMIN', 'ASSISTANT'].includes(user.role)) {
      console.log('🔒 Security event skipped for privileged role:', user.role);
      return NextResponse.json(
        { 
          success: true, 
          message: 'Security event skipped for privileged user',
          skipped: true
        },
        { status: 200 }
      );
    }

    console.log('✅ User found:', {
      user_id: user.user_id,
      email: user.email,
      role: user.role
    });

    // Map security events to simple string types for user_activity_logs
    const securityEventMapping: Record<string, string> = {
      'POTENTIAL_SCREENSHOT_ATTEMPT': 'SECURITY_VIOLATION',
      'RIGHT_CLICK_BLOCKED': 'SECURITY_VIOLATION',
      'PRINT_SCREEN_ATTEMPT': 'SECURITY_VIOLATION',
      'COPY_ATTEMPT_BLOCKED': 'SECURITY_VIOLATION',
      'PRINT_ATTEMPT_BLOCKED': 'SECURITY_VIOLATION',
      'SAVE_ATTEMPT_BLOCKED': 'SECURITY_VIOLATION',
      'SELECT_ALL_BLOCKED': 'SECURITY_VIOLATION',
      'FIND_BLOCKED': 'SECURITY_VIOLATION',
      'KEYBOARD_SHORTCUT_BLOCKED': 'SECURITY_VIOLATION',
      'DRAG_ATTEMPT_BLOCKED': 'SECURITY_VIOLATION',
      'TEXT_SELECTION_BLOCKED': 'SECURITY_VIOLATION',
      'WINDOWS_SCREENSHOT_TOOL_BLOCKED': 'SECURITY_VIOLATION',
      'DEV_TOOLS_DETECTED': 'SECURITY_VIOLATION',
      'WINDOW_HIDDEN': 'SECURITY_VIOLATION',
    };

    const activityType = securityEventMapping[event] || 'SECURITY_VIOLATION';

    // Create the security log entry in user_activity_logs table
    const securityLog = await prisma.user_activity_logs.create({
      data: {
        users: { connect: { user_id: user.user_id } },
        activity_type: activityType as activity_type  ,
        activity: `${event}: ${details}${documentId ? ` (Document: ${documentId})` : ''}`,
        user_agent: req.headers.get('user-agent') || '',
        created_at: new Date(timestamp || Date.now()),
        name: `${user.first_name} ${user.last_name}`.trim(),
        employee_id: user.faculty?.employee_id || 0,
        student_num: user.students?.student_num || 0,
        papers: { connect: { paper_id: parseInt(documentId) } }
      }
    });

    console.log('✅ Security event logged:', {
      log_id: securityLog.activity_id,
      event,
      user_id: user.user_id,
      activity_type: activityType
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Security event logged successfully',
        log_id: securityLog.activity_id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Error logging security event:', error);
    
    // Don't expose internal errors to client
    return NextResponse.json(
      { 
        error: 'Failed to log security event',
        success: false
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}