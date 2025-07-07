// app/api/admin/backup-settings/route.js
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Helper function to verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return null;
  }
}

// Helper function to check if user is admin
function isAdmin(user) {
  return user && user.role === 'ADMIN';
}

// Helper function to authenticate request
function authenticateRequest(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);
  
  if (!decoded || !isAdmin(decoded)) {
    return null;
  }

  return decoded;
}

export async function GET(request) {
  try {
    const user = authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get current backup settings
    let settings = await prisma.backup_settings.findFirst({
      orderBy: { created_at: 'desc' }
    });

    // If no settings exist, create default settings
    if (!settings) {
      settings = await prisma.backup_settings.create({
        data: {
          frequency: 'weekly',
          backup_time: '02:00',
          retention_days: 30,
          auto_delete: true,
          compress_backups: true,
          email_notifications: false,
          notification_email: null
        }
      });
    }

    return NextResponse.json({
      success: true,
      settings: {
        id: settings.id,
        frequency: settings.frequency,
        backup_time: settings.backup_time,
        retention_days: settings.retention_days,
        auto_delete: settings.auto_delete,
        compress_backups: settings.compress_backups,
        email_notifications: settings.email_notifications,
        notification_email: settings.notification_email,
        last_cleanup: settings.last_cleanup,
        created_at: settings.created_at,
        updated_at: settings.updated_at
      }
    });
  } catch (error) {
    console.error('Backup settings GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request) {
  try {
    const user = authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      frequency,
      backup_time,
      retention_days,
      auto_delete,
      compress_backups,
      email_notifications,
      notification_email
    } = body;

    // Validate input
    if (frequency && !['daily', 'weekly', 'monthly', 'manual'].includes(frequency)) {
      return NextResponse.json(
        { error: 'Invalid frequency value' },
        { status: 400 }
      );
    }

    if (backup_time && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(backup_time)) {
      return NextResponse.json(
        { error: 'Invalid backup time format. Use HH:MM' },
        { status: 400 }
      );
    }

    if (retention_days && (retention_days < 1 || retention_days > 365)) {
      return NextResponse.json(
        { error: 'Retention days must be between 1 and 365' },
        { status: 400 }
      );
    }

    if (email_notifications && !notification_email) {
      return NextResponse.json(
        { error: 'Email address is required when notifications are enabled' },
        { status: 400 }
      );
    }

    if (notification_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notification_email)) {
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    // Check if settings exist
    const existingSettings = await prisma.backup_settings.findFirst({
      orderBy: { created_at: 'desc' }
    });

    let settings;
    if (existingSettings) {
      // Update existing settings
      settings = await prisma.backup_settings.update({
        where: { id: existingSettings.id },
        data: {
          frequency: frequency || existingSettings.frequency,
          backup_time: backup_time || existingSettings.backup_time,
          retention_days: retention_days !== undefined ? retention_days : existingSettings.retention_days,
          auto_delete: auto_delete !== undefined ? auto_delete : existingSettings.auto_delete,
          compress_backups: compress_backups !== undefined ? compress_backups : existingSettings.compress_backups,
          email_notifications: email_notifications !== undefined ? email_notifications : existingSettings.email_notifications,
          notification_email: email_notifications ? notification_email : null,
          updated_at: new Date()
        }
      });
    } else {
      // Create new settings
      settings = await prisma.backup_settings.create({
        data: {
          frequency: frequency || 'weekly',
          backup_time: backup_time || '02:00',
          retention_days: retention_days || 30,
          auto_delete: auto_delete !== undefined ? auto_delete : true,
          compress_backups: compress_backups !== undefined ? compress_backups : true,
          email_notifications: email_notifications || false,
          notification_email: email_notifications ? notification_email : null
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Backup settings saved successfully',
      settings: {
        id: settings.id,
        frequency: settings.frequency,
        backup_time: settings.backup_time,
        retention_days: settings.retention_days,
        auto_delete: settings.auto_delete,
        compress_backups: settings.compress_backups,
        email_notifications: settings.email_notifications,
        notification_email: settings.notification_email,
        updated_at: settings.updated_at
      }
    });
  } catch (error) {
    console.error('Backup settings PUT error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request) {
  try {
    const user = authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      frequency,
      backup_time,
      retention_days,
      auto_delete,
      compress_backups,
      email_notifications,
      notification_email
    } = body;

    // Validate input (same validation as PUT)
    if (frequency && !['daily', 'weekly', 'monthly', 'manual'].includes(frequency)) {
      return NextResponse.json(
        { error: 'Invalid frequency value' },
        { status: 400 }
      );
    }

    if (backup_time && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(backup_time)) {
      return NextResponse.json(
        { error: 'Invalid backup time format. Use HH:MM' },
        { status: 400 }
      );
    }

    if (retention_days && (retention_days < 1 || retention_days > 365)) {
      return NextResponse.json(
        { error: 'Retention days must be between 1 and 365' },
        { status: 400 }
      );
    }

    if (email_notifications && !notification_email) {
      return NextResponse.json(
        { error: 'Email address is required when notifications are enabled' },
        { status: 400 }
      );
    }

    if (notification_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notification_email)) {
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    // Create new settings
    const settings = await prisma.backup_settings.create({
      data: {
        frequency: frequency || 'weekly',
        backup_time: backup_time || '02:00',
        retention_days: retention_days || 30,
        auto_delete: auto_delete !== undefined ? auto_delete : true,
        compress_backups: compress_backups !== undefined ? compress_backups : true,
        email_notifications: email_notifications || false,
        notification_email: email_notifications ? notification_email : null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Backup settings created successfully',
      settings: {
        id: settings.id,
        frequency: settings.frequency,
        backup_time: settings.backup_time,
        retention_days: settings.retention_days,
        auto_delete: settings.auto_delete,
        compress_backups: settings.compress_backups,
        email_notifications: settings.email_notifications,
        notification_email: settings.notification_email,
        created_at: settings.created_at,
        updated_at: settings.updated_at
      }
    });
  } catch (error) {
    console.error('Backup settings POST error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request) {
  try {
    const user = authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Reset settings to defaults
    const existingSettings = await prisma.backup_settings.findFirst({
      orderBy: { created_at: 'desc' }
    });

    if (existingSettings) {
      const settings = await prisma.backup_settings.update({
        where: { id: existingSettings.id },
        data: {
          frequency: 'weekly',
          backup_time: '02:00',
          retention_days: 30,
          auto_delete: true,
          compress_backups: true,
          email_notifications: false,
          notification_email: null,
          updated_at: new Date()
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Backup settings reset to defaults',
        settings
      });
    } else {
      return NextResponse.json(
        { error: 'No settings found to reset' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Backup settings DELETE error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}