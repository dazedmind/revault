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
import { Download, FileText, Users, ChevronDown, ChevronUp, UserCog } from "lucide-react";

// Admin activity logs interfaces
interface Activity {
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

  const [logs, setLogs] = useState<Activity[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [total, setTotal] = useState<number>(0);

  // User Activity Logs State
  const initialUserUserId = searchParams.get("userUserId") || "all";
  const initialUserActivityTypes =
    searchParams.get("userActivityTypes") || "all";
  const initialUserRole = searchParams.get("userRole") || "all";
  const initialUserPage = Number(searchParams.get("userPage")) || 1;
  const initialShowUserLogs = searchParams.get("showUserLogs") === "true";

  const [selectedUserUser, setSelectedUserUser] =
    useState<string>(initialUserUserId);
  const [selectedUserEventTypes, setSelectedUserEventTypes] = useState<
    Option[]
  >(
    initialUserActivityTypes === "all"
      ? []
      : initialUserActivityTypes.split(",").map((val) => ({
          value: val,
          label: val.replaceAll("_", " "),
        })),
  );
  const [selectedUserRole, setSelectedUserRole] =
    useState<string>(initialUserRole);
  const [userPage, setUserPage] = useState<number>(initialUserPage);
  const [userLimit] = useState<number>(10);

  const [userLogs, setUserLogs] = useState<UserActivity[]>([]);
  const [regularUsers, setRegularUsers] = useState<RegularUser[]>([]);
  const [userTotal, setUserTotal] = useState<number>(0);
  const [userLogsLoading, setUserLogsLoading] = useState(false);

  // Collapsible state for User Activity Logs
  const [showUserLogs, setShowUserLogs] = useState(initialShowUserLogs);

  const currentUserRole =
    typeof window !== "undefined" ? localStorage.getItem("userType") : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  // URL parameter management
  const updateQueryParams = useCallback(
    (params: {
      userId?: string;
      activityTypes?: string;
      page?: number;
      limit?: number;
      userUserId?: string;
      userActivityTypes?: string;
      userRole?: string;
      userPage?: number;
      showUserLogs?: boolean;
    }) => {
      const search = new URLSearchParams(searchParams.toString());

      if (params.userId !== undefined) search.set("userId", params.userId);
      if (params.activityTypes !== undefined)
        search.set("activityTypes", params.activityTypes);
      if (params.page !== undefined) search.set("page", params.page.toString());
      if (params.limit !== undefined)
        search.set("limit", params.limit.toString());
      if (params.userUserId !== undefined)
        search.set("userUserId", params.userUserId);
      if (params.userActivityTypes !== undefined)
        search.set("userActivityTypes", params.userActivityTypes);
      if (params.userRole !== undefined)
        search.set("userRole", params.userRole);
      if (params.userPage !== undefined)
        search.set("userPage", params.userPage.toString());
      if (params.showUserLogs !== undefined)
        search.set("showUserLogs", params.showUserLogs.toString());

      router.push(
        `/admin/settings/security/activity-logs?${search.toString()}`,
      );
    },
    [router, searchParams],
  );

  // Admin Activity Logs Functions
  const generatePDFReport = () => {
    const params = new URLSearchParams();
    params.set("userId", selectedUser);
    const eventTypesString =
      selectedEventTypes.length === 0
        ? "all"
        : selectedEventTypes.map((opt) => opt.value).join(",");
    params.set("activityTypes", eventTypesString);
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    const previewUrl = `/admin/activity-logs-preview-pdf?${params.toString()}`;
    window.open(previewUrl, "_blank");
  };

  // Handle User Logs Toggle
  const handleUserLogsToggle = () => {
    const newShowState = !showUserLogs;
    setShowUserLogs(newShowState);
    updateQueryParams({ showUserLogs: newShowState });
    
    // Fetch data when opening for the first time
    if (newShowState && regularUsers.length === 0) {
      fetchRegularUsers();
    }
    if (newShowState) {
      fetchUserLogs();
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
 // Wrap fetchUserLogs in useCallback
  const fetchUserLogs = useCallback(async () => {
    if (!showUserLogs) return;

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
    showUserLogs,
    selectedUserUser,
    selectedUserEventTypes,
    selectedUserRole,
    userPage,
    userLimit,
  ]);

  // Update the useEffect to include fetchUserLogs in dependencies
  useEffect(() => {
    if (!mounted || !showUserLogs) return;
    fetchUserLogs();
  }, [
    mounted,
    showUserLogs,
    fetchUserLogs, // Add this dependency
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
    if (!mounted) return;

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
          logs: Activity[];
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
  }, [mounted, selectedUser, selectedEventTypes, page, limit]);

  // Fetch user activity logs when dependencies change
  useEffect(() => {
    if (!mounted || !showUserLogs) return;
    fetchUserLogs();
  }, [
    mounted,
    showUserLogs,
    selectedUserUser,
    selectedUserEventTypes,
    selectedUserRole,
    userPage,
    userLimit,
  ]);

  if (!mounted) {
    return (
      <div className="flex flex-col w-auto bg-midnight p-6 mb-8 rounded-xl border-1 border-white-5">
        <h1 className="text-2xl ml-1">Activity Logs</h1>
        <div className="h-0.5 w-auto my-4 bg-dusk"></div>
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
    <div className="space-y-8">
      {/* Admin Activity Logs Section */}
      <div className="flex flex-col w-auto p-6 mb-8 rounded-xl border-1 border-white-5">
        <div className="flex flex-row items-center justify-between">
          <span className="flex items-center gap-2">
            <UserCog className="w-6 h-6" />
            <h1 className="text-2xl ml-1">Admin Activity Logs</h1>
          </span>
 

          {(currentUserRole === "ADMIN" || currentUserRole === "ASSISTANT") && (
            <div className="flex items-center gap-3">
              <button
                onClick={generatePDFReport}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-sm"
                title="Preview PDF Report"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Audit Trail</span>
              </button>
            </div>
          )}
        </div>

        <div
          className={`h-0.5 w-auto my-4 ${theme === "light" ? "bg-white-50" : "bg-dusk"}`}
        />

        {/* Admin Filters */}
        <div className="flex flex-row items-end space-x-8 mb-6 overflow-visible">
          {/* Username Filter */}
          <div className="flex flex-col">
            <Label className="text-sm mb-1">Admin User</Label>
            <Select
              value={selectedUser}
              onValueChange={(val) => {
                setSelectedUser(val);
                setPage(1);
                updateQueryParams({ userId: val, page: 1 });
              }}
            >
              <SelectTrigger className="w-64 dark:bg-primary">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Admin Users</SelectItem>
                  {users.map((u) => (
                    <SelectItem key={u.userId} value={u.userId.toString()}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Event Type Multi-Select */}
          <div className="flex flex-col w-auto">
            <Label className="text-sm mb-1">Event type</Label>
            <MultipleSelector
              options={eventOptions}
              value={selectedEventTypes}
              onChange={(newSelected) => {
                setSelectedEventTypes(newSelected);
                setPage(1);
                const typesString =
                  newSelected.length === 0
                    ? "all"
                    : newSelected.map((o) => o.value).join(",");
                updateQueryParams({ activityTypes: typesString, page: 1 });
              }}
              placeholder="Select event types..."
              hidePlaceholderWhenSelected={false}
              maxSelected={eventOptions.length}
              creatable={false}
              className="border border-input rounded-md"
              badgeClassName="bg-blue-100 text-blue-800"
            />
          </div>
        </div>

        {/* Admin Activity Logs Table */}
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
            activityTypes:
              selectedEventTypes.length === 0
                ? "all"
                : selectedEventTypes.map((opt) => opt.value).join(","),
          }}
        />
      </div>

      {/* User Activity Logs Section - Collapsible */}
      <div className="flex flex-col w-auto p-6 mb-8 rounded-xl border-1 border-white-5">

        {/* Collapsible Header */}
        <div
          className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
            theme === "light"
              ? "bg-gray-50 border-gray-200 hover:bg-gray-100"
              : "bg-gray-800/50 border-gray-600 hover:bg-gray-800/70"
          }`}
          onClick={handleUserLogsToggle}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {showUserLogs ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
              <Users className="w-6 h-6" />
              <h2 className="text-xl font-semibold">User Activity Logs</h2>
            </div>
           
          </div>

          <div className="text-sm text-gray-400 italic">
            {showUserLogs ? "Click to hide" : "Click to view"}
          </div>
        </div>

        {/* Collapsible Content */}
        {showUserLogs && (
          <div className="mt-4 space-y-4">
            <div
              className={`h-0.5 w-auto ${theme === "light" ? "bg-white-50" : "bg-dusk"}`}
            />


            {/* User Filters */}
            <div className="flex flex-row items-end space-x-8 mb-6 overflow-visible">
              {/* User Filter */}
              <div className="flex flex-col">
                <Label className="text-sm mb-1">User</Label>
                <Select
                  value={selectedUserUser}
                  onValueChange={(val) => {
                    setSelectedUserUser(val);
                    setUserPage(1);
                    updateQueryParams({ userUserId: val, userPage: 1 });
                  }}
                >
                  <SelectTrigger className="w-64 dark:bg-primary">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Users</SelectItem>
                      {regularUsers.map((u) => (
                        <SelectItem key={u.userId} value={u.userId.toString()}>
                          <div>
                            <div className="font-medium">{u.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {u.role} - {u.details}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* User Role Filter */}
              <div className="flex flex-col">
                <Label className="text-sm mb-1">User Role</Label>
                <Select
                  value={selectedUserRole}
                  onValueChange={(val) => {
                    setSelectedUserRole(val);
                    setUserPage(1);
                    updateQueryParams({ userRole: val, userPage: 1 });
                  }}
                >
                  <SelectTrigger className="w-48 dark:bg-primary">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="STUDENT">Students</SelectItem>
                      <SelectItem value="FACULTY">Faculty</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Event Type Multi-Select for Users */}
              <div className="flex flex-col w-auto">
                <Label className="text-sm mb-1">Event type</Label>
                <MultipleSelector
                  options={userEventOptions}
                  value={selectedUserEventTypes}
                  onChange={(newSelected) => {
                    setSelectedUserEventTypes(newSelected);
                    setUserPage(1);
                    const typesString =
                      newSelected.length === 0
                        ? "all"
                        : newSelected.map((o) => o.value).join(",");
                    updateQueryParams({
                      userActivityTypes: typesString,
                      userPage: 1,
                    });
                  }}
                  placeholder="Select event types..."
                  hidePlaceholderWhenSelected={false}
                  maxSelected={userEventOptions.length}
                  creatable={false}
                  className="border border-input rounded-md"
                  badgeClassName="bg-green-100 text-green-800"
                />
              </div>
            </div>

            {/* User Activity Logs Table */}
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
        )}
      </div>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
          <p>
            <strong>Debug Info:</strong>
          </p>
          <p>Admin users loaded: {users.length}</p>
          <p>Admin logs loaded: {logs.length}</p>
          <p>Regular users loaded: {regularUsers.length}</p>
          <p>User logs loaded: {userLogs.length}</p>
          <p>Selected admin user: {selectedUser}</p>
          <p>Selected regular user: {selectedUserUser}</p>
          <p>Selected user role: {selectedUserRole}</p>
          <p>Show user logs: {showUserLogs.toString()}</p>
        </div>
      )}
    </div>
  );
}

function ActivityLogsLoading() {
  return (
    <div className="flex flex-col w-auto bg-midnight p-6 mb-8 rounded-xl border-1 border-white-5">
      <h1 className="text-2xl ml-1">Activity Logs</h1>
      <div className="h-0.5 w-auto my-4 bg-dusk"></div>
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