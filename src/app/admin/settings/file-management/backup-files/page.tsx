"use client";
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FaDownload, FaHistory, FaClock, FaShieldAlt, FaDatabase, FaCloudDownloadAlt, FaFileArchive, FaCheckCircle, FaExclamationTriangle, FaSpinner, FaSave, FaUndo } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';

interface BackupJob {
  id: string;
  type: 'full' | 'incremental' | 'user_data' | 'documents';
  status: 'pending' | 'running' | 'completed' | 'failed';
  created_at: string;
  completed_at?: string;
  file_count: number;
  total_size: string;
  download_url?: string;
  error_message?: string;
}

interface BackupStats {
  total_files: number;
  total_size: string;
  last_backup: string;
  backup_frequency: string;
  storage_used: string;
  next_scheduled: string;
}

interface BackupSettings {
  id: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'manual';
  backup_time: string;
  retention_days: number;
  auto_delete: boolean;
  compress_backups: boolean;
  email_notifications: boolean;
  notification_email: string | null;
  last_cleanup: string | null;
  created_at: string;
  updated_at: string;
}

function Backup() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'history' | 'settings'>('create');
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>([]);
  const [stats, setStats] = useState<BackupStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState<BackupSettings | null>(null);
  const [settingsForm, setSettingsForm] = useState({
    frequency: 'weekly' as 'daily' | 'weekly' | 'monthly' | 'manual',
    backup_time: '02:00',
    retention_days: 30,
    auto_delete: true,
    compress_backups: true,
    email_notifications: false,
    notification_email: ''
  });
  const [settingsLoading, setSettingsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchBackupHistory();
    fetchBackupStats();
    fetchBackupSettings();
  }, []);

  const fetchBackupHistory = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/admin/api/back-up/history', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBackupJobs(data.backups || []);
      }
    } catch (error) {
      console.error('Failed to fetch backup history:', error);
    }
  };

  const fetchBackupStats = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('/admin/api/back-up/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch backup stats:', error);
    }
  };

  const fetchBackupSettings = async () => {
    setSettingsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/admin/api/back-up/backup-settings', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
        setSettingsForm({
          frequency: data.settings.frequency,
          backup_time: data.settings.backup_time,
          retention_days: data.settings.retention_days,
          auto_delete: data.settings.auto_delete,
          compress_backups: data.settings.compress_backups,
          email_notifications: data.settings.email_notifications,
          notification_email: data.settings.notification_email || ''
        });
      }
    } catch (error) {
      console.error('Failed to fetch backup settings:', error);
      toast.error('Failed to load backup settings');
    } finally {
      setSettingsLoading(false);
    }
  };

  const createBackup = async (type: string) => {
    setCreating(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/admin/api/back-up/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ type }),
      });

      if (response.ok) {
        const data = await response.json();
        await fetchBackupHistory();
        await fetchBackupStats();
        toast.success('Backup created successfully');
        
        // Start polling for backup completion
        pollBackupStatus(data.backup_id);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create backup');
      }
    } catch (error) {
      console.error('Backup creation failed:', error);
      toast.error(`Backup creation failed: ${error.message}`);
    } finally {
      setCreating(false);
    }
  };

  const pollBackupStatus = (backupId: string) => {
    const interval = setInterval(async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/admin/api/back-up/status/${backupId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          
          // Update the specific backup job in the list
          setBackupJobs(prev => 
            prev.map(job => 
              job.id === backupId ? { ...job, ...data } : job
            )
          );

          // Stop polling if completed or failed
          if (data.status === 'completed' || data.status === 'failed') {
            clearInterval(interval);
            await fetchBackupStats();
          }
        }
      } catch (error) {
        console.error('Failed to poll backup status:', error);
        clearInterval(interval);
      }
    }, 2000);

    // Stop polling after 5 minutes regardless
    setTimeout(() => clearInterval(interval), 300000);
  };

  const downloadBackup = async (backupId: string) => {
    setDownloading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/admin/api/back-up/download/${backupId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup-${backupId}-${new Date().toISOString().split('T')[0]}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Backup downloaded successfully');
      }
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed');
    } finally {
      setDownloading(false);
    }
  };

  const saveSettings = async () => {
    setSavingSettings(true);
    try {
      const token = localStorage.getItem('authToken');
      
      // Validate email if notifications are enabled
      if (settingsForm.email_notifications && !settingsForm.notification_email) {
        toast.error('Email address is required when notifications are enabled');
        return;
      }

      const response = await fetch('/admin/api/back-up/backup-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(settingsForm),
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
        toast.success('Settings saved successfully');
        
        // Refresh stats to show updated schedule
        await fetchBackupStats();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error(`Failed to save settings: ${error.message}`);
    } finally {
      setSavingSettings(false);
    }
  };

  const resetSettings = async () => {
    if (!window.confirm('Are you sure you want to reset all settings to defaults?')) {
      return;
    }

    setSavingSettings(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/admin/api/back-up/backup-settings', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
        setSettingsForm({
          frequency: data.settings.frequency,
          backup_time: data.settings.backup_time,
          retention_days: data.settings.retention_days,
          auto_delete: data.settings.auto_delete,
          compress_backups: data.settings.compress_backups,
          email_notifications: data.settings.email_notifications,
          notification_email: data.settings.notification_email || ''
        });
        toast.success('Settings reset to defaults');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reset settings');
      }
    } catch (error) {
      console.error('Failed to reset settings:', error);
      toast.error(`Failed to reset settings: ${error.message}`);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSettingsChange = (field: string, value: any) => {
    setSettingsForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'failed':
        return <FaExclamationTriangle className="text-red-500" />;
      case 'running':
        return <FaSpinner className="text-blue-500 animate-spin" />;
      default:
        return <FaClock className="text-yellow-500" />;
    }
  };

  if (!mounted) {
    return null;
  }

  // Additional authorization check for rendering
  const userType = localStorage.getItem('userType');
  if (userType !== 'ADMIN') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-gray-600">Redirecting to unauthorized page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 pb-10 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl font-bold ml-1">Backup Files</h1>
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>
      
      {/* Statistics Cards */}
      {stats && (
        <div className="flex flex-col md:flex-row w-full gap-4 mb-6">
  
          
          <div className={`p-4 w-full rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-midnight'} border border-gray-200 dark:border-white-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Size</p>
                <p className="text-2xl font-bold">{stats.total_size}</p>
              </div>
              <FaFileArchive className="text-green-500 text-2xl" />
            </div>
          </div>
          
          <div className={`p-4 w-full rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-midnight'} border border-gray-200 dark:border-white-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Backup</p>
                <p className="text-lg font-semibold">{new Date(stats.last_backup).toLocaleDateString()}</p>
              </div>
              <FaClock className="text-orange-500 text-2xl" />
            </div>
          </div>
          
          <div className={`p-4 w-full rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-midnight'} border border-gray-200 dark:border-white-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Storage Used</p>
                <p className="text-lg font-semibold">{stats.storage_used}</p>
              </div>
              <FaShieldAlt className="text-purple-500 text-2xl" />
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className={`flex space-x-1 mb-6 p-2 gap-1 rounded-lg ${theme === 'light' ? 'bg-tertiary' : 'bg-dusk'}`}>
        {[
          { id: 'create', label: 'Create Backup', icon: FaCloudDownloadAlt },
          { id: 'history', label: 'Backup History', icon: FaHistory },
          { id: 'settings', label: 'Settings', icon: FaShieldAlt }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-yale-blue text-white'
                : `${theme === 'light' ? 'bg-tertiary hover:bg-gray-200' : 'bg-dusk hover:bg-dusk-fg'}`
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'create' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Create New Backup</h3>
            <div className="grid grid-cols-1 gap-4">
              {/* Documents Only */}
              <div className={`flex flex-row justify-between items-center gap-4  w-full p-6 rounded-lg border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-dusk border-white-5'}`}>
                <div className="flex items-center">
                  <FaFileArchive className="text-blue-500 text-4xl mr-3" />
                  <div>
                    <h4 className="text-lg font-semibold">Full Documents Backup</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Backup all uploaded PDF files and documents</p>
                  </div>
                </div>
                <button
                  onClick={() => createBackup('documents')}
                  disabled={creating}
                  className="w-auto cursor-pointer bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {creating ? <FaSpinner className="animate-spin" /> : <FaDownload />}
                  <span>{creating ? 'Creating...' : 'Create Backup'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Backup History</h3>
          
          {backupJobs.length === 0 ? (
            <div className="text-center py-8">
              <FaHistory className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No backup history found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {backupJobs.map((job) => (
                <div
                  key={job.id}
                  className={`p-4 rounded-lg border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-dusk border-white-5'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(job.status)}
                      <div>
                        <h4 className="font-semibold capitalize">{job.type.replace('_', ' ')} Backup</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Created: {new Date(job.created_at).toLocaleString()}
                        </p>
                        {job.completed_at && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Completed: {new Date(job.completed_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{job.file_count} files</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.total_size}</p>
                      </div>
                      
                      {job.status === 'completed' && job.download_url && (
                        <button
                          onClick={() => downloadBackup(job.id)}
                          disabled={downloading}
                          className="bg-yale-blue hover:bg-blue-600 text-white px-3 py-1 cursor-pointer rounded transition-colors flex items-center space-x-1 disabled:bg-gray-400"
                        >
                          {downloading ? <FaSpinner className="animate-spin" /> : <FaDownload className="w-3 h-3" />}
                          <span>Download</span>
                        </button>
                      )}
                      
                      {job.status === 'failed' && (
                        <div className="text-right">
                          <p className="text-sm text-red-500">Failed</p>
                          {job.error_message && (
                            <p className="text-xs text-gray-500">{job.error_message}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Backup Settings</h3>
            <div className="flex space-x-2">
              <button
                onClick={resetSettings}
                disabled={savingSettings}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:bg-gray-400"
              >
                <FaUndo className="w-4 h-4" />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>
          
          {settingsLoading ? (
            <div className="flex items-center justify-center py-8">
              <FaSpinner className="animate-spin text-2xl text-blue-500 mr-2" />
              <span>Loading settings...</span>
            </div>
          ) : (
            <>
              <div className={`p-6 rounded-lg border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-dusk border-white-5'}`}>
                <h4 className="text-lg font-semibold mb-4">Automated Backup Schedule</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Backup Frequency</label>
                    <select 
                      value={settingsForm.frequency}
                      onChange={(e) => handleSettingsChange('frequency', e.target.value)}
                      className={`w-full p-2 border rounded-lg ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-dusk border-white-5'}`}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="manual">Manual Only</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Backup Time</label>
                    <input
                      type="time"
                      value={settingsForm.backup_time}
                      onChange={(e) => handleSettingsChange('backup_time', e.target.value)}
                      className={`w-full p-2 border rounded-lg ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-dusk border-white-5'}`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Retention Period (days)</label>
                    <input
                      type="number"
                      value={settingsForm.retention_days}
                      onChange={(e) => handleSettingsChange('retention_days', parseInt(e.target.value))}
                      min="1"
                      max="365"
                      className={`w-full p-2 border rounded-lg ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-dusk border-white-5'}`}
                    />
                    <p className="text-xs text-gray-500 mt-1">How long to keep backup files (1-365 days)</p>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 rounded-lg border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-dusk border-white-5'}`}>
                <h4 className="text-lg font-semibold mb-4">Storage Management</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">Auto-delete old backups</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Automatically delete backups older than retention period
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.auto_delete}
                        onChange={(e) => handleSettingsChange('auto_delete', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">Compress backups</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Compress backup files to save storage space
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.compress_backups}
                        onChange={(e) => handleSettingsChange('compress_backups', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-lg border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-dusk border-white-5'}`}>
                <h4 className="text-lg font-semibold mb-4">Notifications</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">Email notifications</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Send email notifications for backup completion and failures
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.email_notifications}
                        onChange={(e) => handleSettingsChange('email_notifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  {settingsForm.email_notifications && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Notification Email</label>
                      <input
                        type="email"
                        value={settingsForm.notification_email}
                        onChange={(e) => handleSettingsChange('notification_email', e.target.value)}
                        placeholder="Enter email address"
                        className={`w-full p-2 border rounded-lg ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-dusk border-white-5'}`}
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={saveSettings} 
                  disabled={savingSettings}
                  className="flex items-center space-x-2 bg-yale-blue hover:bg-blue-600 text-white cursor-pointer px-6 py-3 rounded-lg transition-colors disabled:bg-gray-400"
                >
                  {savingSettings ? <FaSpinner className="animate-spin" /> : <FaSave />}
                  <span>{savingSettings ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>

              {settings && (
                <div className={`p-4 rounded-lg border ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-800 border-white-5'}`}>
                  <h5 className="text-sm font-medium mb-2">Current Settings Info</h5>
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <p>Last updated: {new Date(settings.updated_at).toLocaleString()}</p>
                    {settings.last_cleanup && (
                      <p>Last cleanup: {new Date(settings.last_cleanup).toLocaleString()}</p>
                    )}
                    <p>Settings ID: {settings.id}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default Backup;