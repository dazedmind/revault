"use client";
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FaDownload, FaHistory, FaClock, FaShieldAlt, FaDatabase, FaCloudDownloadAlt, FaFileArchive, FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';


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

function Backup() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'history' | 'settings'>('create');
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>([]);
  const [stats, setStats] = useState<BackupStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchBackupHistory();
    fetchBackupStats();

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
        
        // Start polling for backup completion
        pollBackupStatus(data.backup_id);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create backup');
      }
    } catch (error) {
      console.error('Backup creation failed:', error);
      alert(`Backup creation failed: ${error.message}`);
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
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-midnight'} border border-gray-200 dark:border-white-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Files</p>
                <p className="text-2xl font-bold">{stats.total_files.toLocaleString()}</p>
              </div>
              <FaDatabase className="text-blue-500 text-2xl" />
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-midnight'} border border-gray-200 dark:border-white-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Size</p>
                <p className="text-2xl font-bold">{stats.total_size}</p>
              </div>
              <FaFileArchive className="text-green-500 text-2xl" />
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-midnight'} border border-gray-200 dark:border-white-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Backup</p>
                <p className="text-lg font-semibold">{new Date(stats.last_backup).toLocaleDateString()}</p>
              </div>
              <FaClock className="text-orange-500 text-2xl" />
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-midnight'} border border-gray-200 dark:border-white-5`}>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Full System Backup */}
              <div className={`p-6 rounded-lg border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-dusk border-white-5'}`}>
                <div className="flex items-center mb-4">
                  <FaDatabase className="text-blue-500 text-2xl mr-3" />
                  <div>
                    <h4 className="text-lg font-semibold">Full System Backup</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Complete backup of all files and data</p>
                  </div>
                </div>
                <button
                  onClick={() => createBackup('full')}
                  disabled={creating}
                  className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {creating ? <FaSpinner className="animate-spin" /> : <FaDownload />}
                  <span>{creating ? 'Creating...' : 'Create Full Backup'}</span>
                </button>
              </div>

              {/* Documents Only */}
              <div className={`p-6 rounded-lg border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-dusk border-white-5'}`}>
                <div className="flex items-center mb-4">
                  <FaFileArchive className="text-green-500 text-2xl mr-3" />
                  <div>
                    <h4 className="text-lg font-semibold">Documents Backup</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Backup only PDF files and documents</p>
                  </div>
                </div>
                <button
                  onClick={() => createBackup('documents')}
                  disabled={creating}
                  className="w-full cursor-pointer bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {creating ? <FaSpinner className="animate-spin" /> : <FaDownload />}
                  <span>{creating ? 'Creating...' : 'Create Documents Backup'}</span>
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
                          className="bg-yale-blue hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors flex items-center space-x-1"
                        >
                          <FaDownload className="w-3 h-3" />
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
          <h3 className="text-xl font-semibold mb-4">Backup Settings</h3>
          
          <div className={`p-6 rounded-lg border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-dusk border-white-5'}`}>
            <h4 className="text-lg font-semibold mb-4">Automated Backup Schedule</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Backup Frequency</label>
                <select className={`w-full p-2 border rounded-lg ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-dusk border-white-5'}`}>
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
                  defaultValue="02:00"
                  className={`w-full p-2 border rounded-lg ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-dusk border-white-5'}`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Retention Period (days)</label>
                <input
                  type="number"
                  defaultValue="30"
                  min="1"
                  max="365"
                  className={`w-full p-2 border rounded-lg ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-dusk border-white-5'}`}
                />
              </div>
              
              <button className="bg-yale-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                Save Settings
              </button>
            </div>
          </div>
          
          <div className={`p-6 rounded-lg border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-dusk border-white-5'}`}>
            <h4 className="text-lg font-semibold mb-4">Storage Management</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Auto-delete old backups</span>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <span>Compress backups</span>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <span>Email notifications</span>
                <input type="checkbox" className="toggle" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Backup;