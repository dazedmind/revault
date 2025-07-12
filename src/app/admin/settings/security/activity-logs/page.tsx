// File: src/app/admin/settings/security/activity-logs/page.tsx
"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useTheme } from "next-themes";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@radix-ui/react-dropdown-menu";
import MultipleSelector, {
  Option,
} from "@/app/admin/components/EventTypeMultiSelect";
import ActivityLogsSection from "@/app/admin/components/ActivityLogsSection";
import UserActivityLogsSection from "@/app/admin/components/UserActivityLogsSection";
import { 
  Download, 
  FileText, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  UserCog, 
  Shield,
  Activity,
  Database
} from "lucide-react";

// Admin activity logs interfaces
interface ActivityLog {
  name: string;
  activity: string;
  created_at: string;
  ip_address: string;
  activity_type: string;
  status: string;
}

interface UserOption {
  userId: number;
  name: string;
}

interface AdminUser {
  id: number;
  fullName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: string;
  name: string;
}

// User activity logs interfaces
interface UserActivity {
  name: string;
  activity: string;
  created_at: string;
  activity_type: string;
  status: string;
  paper_id?: number;
  student_num?: string;
  employee_id?: string;
  user_role?: string;
}

interface RegularUser {
  userId: number;
  name: string;
  role: string;
  details: string;
}

function ActivityLogContent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tab Management State
  const initialActiveTab = searchParams.get("tab") || "admin";
  const [activeTab, setActiveTab] = useState<'admin' | 'users'>(initialActiveTab as 'admin' | 'users');

  // Admin Activity Logs State
  const initialUserId = searchParams.get("userId") || "all";
  const initialActivityTypes = searchParams.get("activityTypes") || "all";
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit = Number(searchParams.get("limit")) || 10;

  const [selectedUser, setSelectedUser] = useState<string>(initialUserId);
  const [selectedEventTypes, setSelectedEventTypes] = useState<Option[]>(
    initialActivityTypes === "all"
      ? []
      : initialActivityTypes.split(",").map((val) => ({
          value: val,
          label: val.replaceAll("_", " "),
        })),
  );
  const [page, setPage] = useState<number>(initialPage);
  const [limit] = useState<number>(initialLimit);

  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [total, setTotal] = useState<number>(0);

  // User Activity Logs State
  const initialUserUserId = searchParams.get("userUserId") || "all";
  const initialUserActivityTypes = searchParams.get("userActivityTypes") || "all";
  const initialUserRole = searchParams.get("userRole") || "all";
  const initialUserPage = Number(searchParams.get("userPage")) || 1;

  const [selectedUserUser, setSelectedUserUser] = useState<string>(initialUserUserId);
  const [selectedUserEventTypes, setSelectedUserEventTypes] = useState<Option[]>(
    initialUserActivityTypes === "all"
      ? []
      : initialUserActivityTypes.split(",").map((val) => ({
          value: val,
          label: val.replaceAll("_", " "),
        })),
  );
  const [selectedUserRole, setSelectedUserRole] = useState<string>(initialUserRole);
  const [userPage, setUserPage] = useState<number>(initialUserPage);
  const [userLimit] = useState<number>(10);

  const [userLogs, setUserLogs] = useState<UserActivity[]>([]);
  const [regularUsers, setRegularUsers] = useState<RegularUser[]>([]);
  const [userTotal, setUserTotal] = useState<number>(0);
  const [userLogsLoading, setUserLogsLoading] = useState(false);

  const currentUserRole = typeof window !== "undefined" ? localStorage.getItem("userType") : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  // URL parameter management
  const updateQueryParams = useCallback(
    (params: {
      tab?: string;
      userId?: string;
      activityTypes?: string;
      page?: number;
      limit?: number;
      userUserId?: string;
      userActivityTypes?: string;
      userRole?: string;
      userPage?: number;
    }) => {
      const url = new URL(window.location.href);
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, value.toString());
        }
      });
      router.push(url.pathname + url.search);
    },
    [router],
  );

  // Handle tab change
  const handleTabChange = (tab: 'admin' | 'users') => {
    setActiveTab(tab);
    updateQueryParams({ tab });
    
    // Fetch data for the selected tab if not already loaded
    if (tab === 'users' && regularUsers.length === 0) {
      fetchRegularUsers();
    }
    if (tab === 'users') {
      fetchUserLogs();
    }
  };

  // Generate PDF report function
  const generatePDFReport = async () => {
    try {
      const params = new URLSearchParams();
      
      if (activeTab === 'admin') {
        params.set("userId", selectedUser);
        const eventTypesString = selectedEventTypes.length === 0
          ? "all"
          : selectedEventTypes.map((opt) => opt.value).join(",");
        params.set("activityTypes", eventTypesString);
        params.set("page", page.toString());
        params.set("limit", limit.toString());
      } else {
        // For user logs, we could create a separate PDF endpoint
        // For now, we'll use the admin endpoint but could be extended
        params.set("userId", selectedUserUser);
        const eventTypesString = selectedUserEventTypes.length === 0
          ? "all"
          : selectedUserEventTypes.map((opt) => opt.value).join(",");
        params.set("activityTypes", eventTypesString);
        params.set("page", userPage.toString());
        params.set("limit", userLimit.toString());
      }

      const previewUrl = `/admin/activity-logs-preview-pdf?${params.toString()}`;
      window.open(previewUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Separate function for fetching regular users
  const fetchRegularUsers = async () => {
    try {
      console.log("🔍 Fetching regular users for user activity logs dropdown...");

      const res = await fetch("/admin/api/get-user-logs?page=1&limit=1", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ User logs API error:", res.status, errorText);
        throw new Error(`Failed to fetch user list (${res.status})`);
      }

      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        setRegularUsers(data.users);
      } else {
        setRegularUsers([]);
      }
    } catch (err) {
      console.error("💥 Error fetching regular user list:", err);
      setRegularUsers([]);
    }
  };

  // Separate function for fetching user logs
  const fetchUserLogs = useCallback(async () => {
    if (activeTab !== 'users') return;

    try {
      setUserLogsLoading(true);
      const params = new URLSearchParams();
      params.set("userId", selectedUserUser);
      const eventTypesString =
        selectedUserEventTypes.length === 0
          ? "all"
          : selectedUserEventTypes.map((opt) => opt.value).join(",");
      params.set("activityTypes", eventTypesString);
      params.set("userRole", selectedUserRole);
      params.set("page", userPage.toString());
      params.set("limit", userLimit.toString());

      const res = await fetch(`/admin/api/get-user-logs?${params.toString()}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ User logs API error:", res.status, text);
        throw new Error(`Failed to fetch user logs (${res.status})`);
      }

      const data = await res.json();
      if (data.success) {
        const fetchedLogs = Array.isArray(data.logs) ? data.logs : [];
        setUserLogs(fetchedLogs);
        setUserTotal(data.total);
        if (Array.isArray(data.users) && data.users.length > 0) {
          setRegularUsers(data.users);
        }
      } else {
        setUserLogs([]);
        setUserTotal(0);
      }
    } catch (err) {
      console.error("💥 Error fetching user logs:", err);
      setUserLogs([]);
      setUserTotal(0);
    } finally {
      setUserLogsLoading(false);
    }
  }, [
    activeTab,
    selectedUserUser,
    selectedUserEventTypes,
    selectedUserRole,
    userPage,
    userLimit,
  ]);

  // Fetch admin users for dropdown
  useEffect(() => {
    if (!mounted) return;

    console.log("🔍 Fetching admin/staff users for dropdown...");

    fetch("/admin/api/users", {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ Users API error:", res.status, errorText);
          throw new Error(`Failed to fetch user list (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.users)) {
          const userOptions: UserOption[] = data.users.map(
            (user: AdminUser) => ({
              userId: user.id,
              name: user.name || `${user.fullName} ${user.lastName}`.trim(),
            }),
          );
          setUsers(userOptions);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("💥 Error fetching user list:", err);
        setUsers([]);
      });
  }, [mounted]);

  // Fetch admin activity logs
  useEffect(() => {
    if (!mounted || activeTab !== 'admin') return;

    const params = new URLSearchParams();
    params.set("userId", selectedUser);
    const eventTypesString =
      selectedEventTypes.length === 0
        ? "all"
        : selectedEventTypes.map((opt) => opt.value).join(",");
    params.set("activityTypes", eventTypesString);
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    fetch(`/admin/api/get-logs?${params.toString()}`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.error("❌ Logs API error:", res.status, text);
          throw new Error(`Failed to fetch logs (${res.status})`);
        }
        return res.json();
      })
      .then(
        (data: {
          success: boolean;
          total: number;
          page: number;
          limit: number;
          logs: ActivityLog[];
        }) => {
          if (data.success) {
            const fetchedLogs = Array.isArray(data.logs) ? data.logs : [];
            setLogs(fetchedLogs);
            setTotal(data.total);
          } else {
            setLogs([]);
            setTotal(0);
          }
        },
      )
      .catch((err) => {
        console.error("💥 Error fetching logs:", err);
        setLogs([]);
        setTotal(0);
      });
  }, [mounted, activeTab, selectedUser, selectedEventTypes, page, limit]);

  // Fetch user activity logs when dependencies change
  useEffect(() => {
    if (!mounted || activeTab !== 'users') return;
    fetchUserLogs();
  }, [
    mounted,
    activeTab,
    fetchUserLogs,
  ]);

  if (!mounted) {
    return (
      <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 mb-8 rounded-xl border-1 border-white-5`}>
        <h1 className="text-2xl font-bold ml-1">Activity Logs</h1>
        <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>
        <div className="animate-pulse space-y-4">
          <div className="flex gap-4">
            <div className="h-10 bg-gray-700 rounded w-64"></div>
            <div className="h-10 bg-gray-700 rounded w-64"></div>
          </div>
          <div className="h-64 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  // Event options for admin logs
  const eventOptions: Option[] = [
    { value: "LOGIN", label: "Login" },
    { value: "LOGOUT", label: "Logout" },
    { value: "VIEW_DOCUMENT", label: "View Document" },
    { value: "DOWNLOAD_DOCUMENT", label: "Download Document" },
    { value: "CHANGE_PASSWORD", label: "Change Password" },
    { value: "ADD_USER", label: "Add User" },
    { value: "DELETE_USER", label: "Delete User" },
    { value: "MODIFY_USER", label: "Modify User" },
    { value: "DELETE_DOCUMENT", label: "Delete Document" },
    { value: "UPDATE_DOCUMENT", label: "Update Document" },
    { value: "UPLOAD_DOCUMENT", label: "Upload Document" },
  ];

  // Event options for user logs (more limited set)
  const userEventOptions: Option[] = [
    { value: "LOGIN", label: "Login" },
    { value: "LOGOUT", label: "Logout" },
    { value: "VIEW_DOCUMENT", label: "View Document" },
    { value: "CHANGE_PASSWORD", label: "Change Password" },
  ];

  // Calculate user counts for display
  const studentCount = regularUsers.filter((u) => u.role === "STUDENT").length;
  const facultyCount = regularUsers.filter((u) => u.role === "FACULTY").length;

  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 pb-10 rounded-xl border-1 border-white-5`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold ml-1">Activity Logs</h1>
        <button
          onClick={generatePDFReport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Generate Report
        </button>
      </div>
      
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>

      {/* Tab Navigation */}
      <div className={`flex space-x-1 mb-6 p-2 gap-1 rounded-lg ${theme === 'light' ? 'bg-tertiary' : 'bg-dusk'}`}>
        {[
          { 
            id: 'admin', 
            label: 'Admin & Staff Logs', 
            icon: Shield,
            description: 'View activity logs for administrators, assistants, and librarians'
          },
          { 
            id: 'users', 
            label: 'User Activity Logs', 
            icon: Users,
            description: 'View activity logs for students and faculty members'
          }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as 'admin' | 'users')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-yale-blue text-white'
                : `${theme === 'light' ? 'bg-tertiary hover:bg-gray-200' : 'bg-dusk hover:bg-dusk-fg'}`
            }`}
            title={tab.description}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'admin' && (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            {/* User Selector */}
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-medium">Select Admin/Staff User</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Admin/Staff Users</SelectItem>
                    {users.map((user) => (
                      <SelectItem key={user.userId} value={user.userId.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Activity Type Selector */}
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-medium">Activity Types</Label>
              <MultipleSelector
                value={selectedEventTypes}
                onChange={setSelectedEventTypes}
                defaultOptions={eventOptions}
                placeholder="Select activity types..."
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    No event types found.
                  </p>
                }
              />
            </div>
          </div>

          {/* Admin Activity Logs Section */}
          <ActivityLogsSection
            logs={logs}
            page={page}
            limit={limit}
            total={total}
            onPageChange={(newPage) => {
              setPage(newPage);
              updateQueryParams({ page: newPage });
            }}
            currentFilters={{
              userId: selectedUser,
              activityTypes: selectedEventTypes.map(opt => opt.value).join(",")
            }}
          />
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* User Activity Logs Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
            {/* User Selector */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Select User</Label>
              <Select value={selectedUserUser} onValueChange={setSelectedUserUser}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Users</SelectItem>
                    {regularUsers.map((user) => (
                      <SelectItem key={user.userId} value={user.userId.toString()}>
                        <div className="flex flex-col">
                          <span>{user.name}</span>
                          <span className="text-xs text-gray-500">{user.details}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Role Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">User Role</Label>
              <Select value={selectedUserRole} onValueChange={setSelectedUserRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="STUDENT">Students ({studentCount})</SelectItem>
                    <SelectItem value="FACULTY">Faculty ({facultyCount})</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Activity Type Selector */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Activity Types</Label>
              <MultipleSelector
                value={selectedUserEventTypes}
                onChange={setSelectedUserEventTypes}
                defaultOptions={userEventOptions}
                placeholder="Select activity types..."
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    No event types found.
                  </p>
                }
              />
            </div>
          </div>

          {/* User Activity Logs Section */}
          <div className="space-y-4">
            {userLogsLoading ? (
              <div className="space-y-4">
                <div className="h-12 bg-secondary rounded animate-pulse"></div>
                <div className="h-12 bg-secondary rounded animate-pulse"></div>
                <div className="h-12 bg-secondary rounded animate-pulse"></div>
              </div>
            ) : (
              <UserActivityLogsSection
                logs={userLogs}
                page={userPage}
                limit={userLimit}
                total={userTotal}
                onPageChange={(newPage) => {
                  setUserPage(newPage);
                  updateQueryParams({ userPage: newPage });
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
          <p><strong>Debug Info:</strong></p>
          <p>Active tab: {activeTab}</p>
          <p>Admin users loaded: {users.length}</p>
          <p>Admin logs loaded: {logs.length}</p>
          <p>Regular users loaded: {regularUsers.length}</p>
          <p>User logs loaded: {userLogs.length}</p>
          <p>Selected admin user: {selectedUser}</p>
          <p>Selected regular user: {selectedUserUser}</p>
          <p>Selected user role: {selectedUserRole}</p>
        </div>
      )}
    </div>
  );
}

function ActivityLogsLoading() {
  const { theme } = useTheme();
  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 mb-8 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl ml-1">Activity Logs</h1>
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>
      <div className="animate-pulse space-y-4">
        <div className="flex gap-4">
          <div className="h-10 bg-gray-700 rounded w-64"></div>
          <div className="h-10 bg-gray-700 rounded w-64"></div>
        </div>
        <div className="h-64 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}

export default function ActivityLogSettings() {
  return (
    <Suspense fallback={<ActivityLogsLoading />}>
      <ActivityLogContent />
    </Suspense>
  );
}