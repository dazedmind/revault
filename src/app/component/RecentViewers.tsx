// src/app/component/RecentViewers.tsx
import React, { useState, useEffect } from 'react';
import { Eye, User, GraduationCap, Briefcase, Clock } from 'lucide-react';
import Image from 'next/image';
import avatar from '../img/user.png';

interface RecentViewer {
  user_id: number;
  name: string;
  role: string;
  last_viewed: string;
  student_number?: string;
  employee_id?: string;
  position?: string;
}

interface RecentViewersProps {
  paperId: string;
  theme?: string;
}

const RecentViewers: React.FC<RecentViewersProps> = ({ paperId, theme = "light" }) => {
  const [viewers, setViewers] = useState<RecentViewer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentViewers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        console.log("🔍 Fetching recent viewers for paper:", paperId);

        const response = await fetch(`/api/papers/${paperId}/recent-viewers`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch recent viewers: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("📋 Recent viewers data:", data);

        if (data.success) {
          setViewers(data.recent_viewers || []);
        } else {
          setError(data.message || "Failed to load recent viewers");
        }
      } catch (err) {
        console.error("❌ Error fetching recent viewers:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (paperId) {
      fetchRecentViewers();
    }
  }, [paperId]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'STUDENT':
        return <GraduationCap className="w-3 h-3" />;
      case 'FACULTY':
        return <Briefcase className="w-3 h-3" />;
      case 'LIBRARIAN':
      case 'ADMIN':
      case 'ASSISTANT':
        return <Briefcase className="w-3 h-3" />;
      default:
        return <User className="w-3 h-3" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'STUDENT':
        return 'text-blue-600 dark:text-blue-400';
      case 'FACULTY':
        return 'text-green-600 dark:text-green-400';
      case 'LIBRARIAN':
        return 'text-gold dark:text-gold-fg';
      case 'ADMIN':
        return 'text-red-600 dark:text-red-400';
      case 'ASSISTANT':
        return 'text-purple-600 dark:text-purple-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className={`border-2 ${theme === "light" ? "border-white-50 bg-tertiary" : "border-white-5"} p-4 rounded-md mt-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-yale-blue" />
          <h2 className="text-lg font-semibold">Recently Viewed By</h2>
        </div>
        <div className="animate-pulse space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-1"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`border-2 ${theme === "light" ? "border-white-50 bg-tertiary" : "border-white-5"} p-4 rounded-md mt-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-yale-blue" />
          <h2 className="text-lg font-semibold">Recently Viewed By</h2>
        </div>
        <p className="text-sm text-red-500 dark:text-red-400">
          Unable to load recent viewers
        </p>
      </div>
    );
  }

  if (viewers.length === 0) {
    return (
      <div className={`border-2 ${theme === "light" ? "border-white-50 bg-tertiary" : "border-white-5"} p-4 rounded-md mt-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-yale-blue" />
          <h2 className="text-lg font-semibold">Recently Viewed By</h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No recent viewers
        </p>
      </div>
    );
  }

  return (
    <div className={`border-2 ${theme === "light" ? "border-white-50 bg-tertiary" : "border-white-5"} p-4 rounded-md mt-4`}>
      <div className="flex items-center gap-2 mb-3">
        <Eye className="w-4 h-4 text-yale-blue" />
        <h2 className="text-lg font-semibold">Recently Viewed By</h2>
      </div>
      
      <div className="space-y-3">
        {viewers.map((viewer, index) => (
          <div key={viewer.user_id} className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <Image
                src={avatar}
                alt={`${viewer.name} avatar`}
                className="w-8 h-8 rounded-full object-cover"
                width={32}
                height={32}
              />
      
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">
                  {viewer.name}
                </p>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  theme === "light" 
                    ? "bg-gray-100 text-gray-700" 
                    : "bg-gray-700 text-gray-300"
                }`}>
                  {viewer.role.toLowerCase()}
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(viewer.last_viewed)}</span>
                {viewer.student_number && (
                  <span className="ml-2">
                    • {viewer.student_number}
                  </span>
                )}
                {viewer.employee_id && (
                  <span className="ml-2">
                    • {viewer.employee_id}
                  </span>
                )}
                {viewer.position && (
                  <span className="ml-2">
                    • {viewer.position}
                  </span>
                )}
              </div>
            </div>

            {/* View order indicator */}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              index === 0 
                ? "bg-gold text-white" 
                : theme === "light" 
                  ? "bg-gray-200 text-gray-600" 
                  : "bg-gray-700 text-gray-400"
            }`}>
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {viewers.length === 3 && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Showing 3 most recent viewers
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentViewers;