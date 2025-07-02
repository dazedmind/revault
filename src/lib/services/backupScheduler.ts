// src/lib/services/backupScheduler.ts
import { PrismaClient } from '@prisma/client';
import cron, { ScheduledTask } from 'node-cron';
import sgMail from '@sendgrid/mail';

const prisma = new PrismaClient();

class BackupScheduler {
  private static instance: BackupScheduler;
  private scheduledJobs: Map<string, ScheduledTask> = new Map();

  private constructor() {
    this.initializeSendGrid();
    this.initializeScheduler();
  }

  public static getInstance(): BackupScheduler {
    if (!BackupScheduler.instance) {
      BackupScheduler.instance = new BackupScheduler();
    }
    return BackupScheduler.instance;
  }

  private initializeSendGrid() {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.error('❌ SENDGRID_API_KEY not found in environment variables');
      return;
    }
    
    sgMail.setApiKey(apiKey);
    console.log('✅ SendGrid initialized');
  }

  private async initializeScheduler() {
    try {
      const settings = await this.getBackupSettings();
      this.scheduleBackup(settings);
      this.scheduleCleanup();
      
      console.log('✅ Backup scheduler initialized');
    } catch (error) {
      console.error('❌ Failed to initialize backup scheduler:', error);
    }
  }

  private async getBackupSettings() {
    let settings = await prisma.backup_settings.findFirst();
    
    if (!settings) {
      // Create default settings
      settings = await prisma.backup_settings.create({
        data: {
          frequency: 'weekly',
          backup_time: '02:00',
          retention_days: 30,
          auto_delete: true,
          compress_backups: true,
          email_notifications: false,
        },
      });
    }
    
    return settings;
  }

  public async updateSchedule() {
    // Stop existing jobs
    this.scheduledJobs.forEach((task) => task.stop());
    this.scheduledJobs.clear();

    // Restart with new settings
    await this.initializeScheduler();
  }

  private scheduleBackup(settings: any) {
    if (settings.frequency === 'manual') {
      console.log('📋 Manual backup mode - no automatic scheduling');
      return;
    }

    const [hour, minute] = settings.backup_time.split(':').map(Number);
    let cronExpression: string;

    switch (settings.frequency) {
      case 'daily':
        cronExpression = `${minute} ${hour} * * *`;
        break;
      case 'weekly':
        cronExpression = `${minute} ${hour} * * 0`; // Every Sunday
        break;
      case 'monthly':
        cronExpression = `${minute} ${hour} 1 * *`; // First day of month
        break;
      default:
        console.warn('⚠️ Unknown backup frequency:', settings.frequency);
        return;
    }

    const backupTask = cron.schedule(cronExpression, async () => {
      console.log('🕐 Starting scheduled backup...');
      await this.executeScheduledBackup(settings);
    }, {
      timezone: 'UTC',
    });

    this.scheduledJobs.set('main-backup', backupTask);
    console.log(`📅 Backup scheduled: ${settings.frequency} at ${settings.backup_time} UTC`);
  }

  private scheduleCleanup() {
    // Run cleanup daily at 3 AM UTC
    const cleanupTask = cron.schedule('0 3 * * *', async () => {
      console.log('🧹 Starting backup cleanup...');
      await this.cleanupOldBackups();
    }, {
      timezone: 'UTC',
    });

    this.scheduledJobs.set('cleanup', cleanupTask);
    console.log('📅 Backup cleanup scheduled: daily at 3:00 AM UTC');
  }

  private async executeScheduledBackup(settings: any) {
    try {
      const response = await fetch('http://localhost:3000/api/back-up/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.getSystemToken()}`,
        },
        body: JSON.stringify({ type: 'full' }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Scheduled backup created:', data.backup_id);

        if (settings.email_notifications && settings.notification_email) {
          await this.sendNotificationEmail(
            settings.notification_email,
            'Backup Started',
            `Scheduled backup (ID: ${data.backup_id}) has been initiated.`
          );
        }

        // Monitor backup completion
        this.monitorBackupCompletion(data.backup_id, settings);
      } else {
        throw new Error('Failed to create scheduled backup');
      }
    } catch (error) {
      console.error('❌ Scheduled backup failed:', error);
      
      if (settings.email_notifications && settings.notification_email) {
        await this.sendNotificationEmail(
          settings.notification_email,
          'Backup Failed',
          `Scheduled backup failed: ${error.message}`
        );
      }
    }
  }

  private async monitorBackupCompletion(backupId: string, settings: any) {
    const maxWaitTime = 30 * 60 * 1000; // 30 minutes
    const startTime = Date.now();
    
    const checkStatus = async () => {
      try {
        const backup = await prisma.backup_jobs.findUnique({
          where: { id: backupId },
        });

        if (!backup) {
          console.error('❌ Backup job not found:', backupId);
          return;
        }

        if (backup.status === 'completed') {
          console.log('✅ Scheduled backup completed:', backupId);
          
          if (settings.email_notifications && settings.notification_email) {
            await this.sendNotificationEmail(
              settings.notification_email,
              'Backup Completed',
              `Scheduled backup (ID: ${backupId}) completed successfully.\nFiles: ${backup.file_count}\nSize: ${backup.total_size}`
            );
          }
          return;
        }

        if (backup.status === 'failed') {
          console.error('❌ Scheduled backup failed:', backupId);
          
          if (settings.email_notifications && settings.notification_email) {
            await this.sendNotificationEmail(
              settings.notification_email,
              'Backup Failed',
              `Scheduled backup (ID: ${backupId}) failed.\nError: ${backup.error_message || 'Unknown error'}`
            );
          }
          return;
        }

        // Check timeout
        if (Date.now() - startTime > maxWaitTime) {
          console.warn('⚠️ Backup monitoring timeout:', backupId);
          return;
        }

        // Continue monitoring
        setTimeout(checkStatus, 30000); // Check every 30 seconds
      } catch (error) {
        console.error('❌ Error monitoring backup:', error);
      }
    };

    setTimeout(checkStatus, 30000); // Start checking after 30 seconds
  }

  private async cleanupOldBackups() {
    try {
      const settings = await this.getBackupSettings();
      
      if (!settings.auto_delete) {
        console.log('📋 Auto-delete disabled - skipping cleanup');
        return;
      }

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - settings.retention_days);

      const oldBackups = await prisma.backup_jobs.findMany({
        where: {
          created_at: { lt: cutoffDate },
          status: 'completed',
        },
      });

      let deletedCount = 0;
      let freedSpace = 0;

      for (const backup of oldBackups) {
        try {
          // Delete from cloud storage
          if (backup.download_url) {
            await this.deleteBackupFile(backup.download_url);
          }

          // Delete from database
          await prisma.backup_jobs.delete({
            where: { id: backup.id },
          });

          deletedCount++;
          console.log(`🗑️ Deleted old backup: ${backup.id}`);
        } catch (error) {
          console.error(`❌ Failed to delete backup ${backup.id}:`, error);
        }
      }

      // Update last cleanup time
      await prisma.backup_settings.updateMany({
        data: { last_cleanup: new Date() },
      });

      console.log(`✅ Cleanup completed: ${deletedCount} backups deleted`);

      // Send notification if enabled
      if (settings.email_notifications && settings.notification_email && deletedCount > 0) {
        await this.sendNotificationEmail(
          settings.notification_email,
          'Backup Cleanup Completed',
          `Cleanup completed: ${deletedCount} old backups deleted.`
        );
      }

    } catch (error) {
      console.error('❌ Backup cleanup failed:', error);
    }
  }

  private async deleteBackupFile(downloadUrl: string) {
    // Implementation depends on your cloud storage setup
    // For Google Cloud Storage:
    const { Storage } = require('@google-cloud/storage');
    const storage = new Storage();
    
    try {
      const url = new URL(downloadUrl);
      const pathParts = url.pathname.split('/');
      const bucketName = pathParts[1];
      const fileName = pathParts.slice(2).join('/');

      await storage.bucket(bucketName).file(fileName).delete();
      console.log(`🗑️ Deleted backup file: ${fileName}`);
    } catch (error) {
      console.error('❌ Failed to delete backup file:', error);
      throw error;
    }
  }

  private async sendNotificationEmail(to: string, subject: string, text: string) {
    try {
      const fromEmail = process.env.EMAIL_HOST || 'noreply@revault.system';
      
      const msg = {
        to,
        from: fromEmail,
        subject: `[ReVault] ${subject}`,
        text,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937;">${subject}</h2>
            <p style="color: #4b5563; line-height: 1.6;">${text.replace(/\n/g, '<br>')}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #9ca3af; font-size: 12px;">
              This is an automated message from ReVault Backup System.
            </p>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log('📧 Notification email sent to:', to);
    } catch (error) {
      console.error('❌ Failed to send notification email:', error);
      
      // Log more details about the SendGrid error
      if (error.response) {
        console.error('SendGrid error details:', error.response.body);
      }
    }
  }

  private async getSystemToken(): Promise<string> {
    // Generate a system token for internal API calls
    // This should use your existing JWT system with admin privileges
    const jwt = require('jsonwebtoken');
    const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
    
    return jwt.sign(
      {
        user_id: 1, // System user
        role: 'ADMIN',
        system: true,
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
  }

  public async getNextScheduledBackup(): Promise<Date | null> {
    const settings = await this.getBackupSettings();
    
    if (settings.frequency === 'manual') {
      return null;
    }

    const [hour, minute] = settings.backup_time.split(':').map(Number);
    const now = new Date();
    const next = new Date();
    
    next.setUTCHours(hour, minute, 0, 0);

    switch (settings.frequency) {
      case 'daily':
        if (next <= now) {
          next.setUTCDate(next.getUTCDate() + 1);
        }
        break;
      case 'weekly':
        next.setUTCDate(next.getUTCDate() + (7 - next.getUTCDay()));
        if (next <= now) {
          next.setUTCDate(next.getUTCDate() + 7);
        }
        break;
      case 'monthly':
        next.setUTCMonth(next.getUTCMonth() + 1, 1);
        if (next <= now) {
          next.setUTCMonth(next.getUTCMonth() + 1);
        }
        break;
    }

    return next;
  }

  public getScheduledJobsStatus() {
    return Array.from(this.scheduledJobs.entries()).map(([name, task]) => ({
      name,
      scheduled: true,
    }));
  }
}

export default BackupScheduler;

// src/lib/services/initializeBackupScheduler.ts
// Add this to your main application startup (e.g., in your Next.js app)

export function initializeBackupScheduler() {
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_BACKUP_SCHEDULER === 'true') {
    const scheduler = BackupScheduler.getInstance();
    console.log('🚀 Backup scheduler initialized');
  } else {
    console.log('📋 Backup scheduler disabled in development mode');
  }
}