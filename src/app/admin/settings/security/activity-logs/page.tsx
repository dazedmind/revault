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

// Updated interface to match the API response
interface AdminUser {
  id: number;
  fullName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: string;
  name: string;
}

function ActivityLogContent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // ----- 1) Read initial URL params -----
  const initialUserId = searchParams.get("userId") || "all";
  const initialActivityTypes = searchParams.get("activityTypes") || "all";
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit = Number(searchParams.get("limit")) || 50;

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

  useEffect(() => {
    setMounted(true);
  }, []);

  // ----- 2) Helper to update URL params (no shallow flag) -----
  const updateQueryParams = useCallback(
    (params: {
      userId?: string;
      activityTypes?: string;
      page?: number;
      limit?: number;
    }) => {
      const search = new URLSearchParams(searchParams.toString());

      if (params.userId !== undefined) {
        search.set("userId", params.userId);
      }
      if (params.activityTypes !== undefined) {
        search.set("activityTypes", params.activityTypes);
      }
      if (params.page !== undefined) {
        search.set("page", params.page.toString());
      }
      if (params.limit !== undefined) {
        search.set("limit", params.limit.toString());
      }

      router.push(
        `/admin/settings/security/activity-logs?${search.toString()}`,
      );
    },
    [router, searchParams],
  );

  // ----- 3) Fetch user list for the "User name" dropdown -----
  useEffect(() => {
    if (!mounted) return;

    console.log("🔍 Fetching admin/staff users for dropdown...");

    fetch("/admin/api/users", {
      method: "GET",
      credentials: "include", // Include cookies for authentication
    })
      .then(async (res) => {
        console.log("📨 Users API response status:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ Users API error:", res.status, errorText);
          throw new Error(`Failed to fetch user list (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Users API response:", data);

        if (data.success && Array.isArray(data.users)) {
          // Map the admin users to the format expected by the dropdown
          const userOptions: UserOption[] = data.users.map(
            (user: AdminUser) => ({
              userId: user.id,
              name: user.name || `${user.fullName} ${user.lastName}`.trim(),
            }),
          );

          console.log("📋 Mapped user options:", userOptions);
          setUsers(userOptions);
        } else {
          console.error("❌ Invalid users response format:", data);
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("💥 Error fetching user list:", err);
        setUsers([]);
      });
  }, [mounted]);

  // ----- 4) Fetch logs whenever filters/pagination change -----
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

    console.log("🔍 Fetching logs with params:", params.toString());

    fetch(`/admin/api/get-logs?${params.toString()}`, {
      method: "GET",
      credentials: "include", // Include cookies for authentication
    })
      .then(async (res) => {
        console.log("📨 Logs API response status:", res.status);

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
          console.log("✅ Logs API response:", data);

          if (data.success) {
            const fetchedLogs = Array.isArray(data.logs) ? data.logs : [];
            setLogs(fetchedLogs);
            setTotal(data.total);
            console.log(
              "📋 Set logs:",
              fetchedLogs.length,
              "Total:",
              data.total,
            );
          } else {
            console.error("❌ Failed to fetch logs:", data);
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

  // ----- 5) Define the multi-select options (match your enum) -----
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

  return (
    <div
      className=" flex flex-col w-auto p-6 mb-8 rounded-xl border-1 border-white-5" // className={`flex flex-col w-auto ${
      //   theme === "light" ? "bg-secondary border-white-50" : "bg-midnight"
      // } p-6 mb-8 rounded-xl border-1 border-white-5`}
    >
      <h1 className="text-2xl ml-1">Activity Logs</h1>

      <div
        className={`h-0.5 w-auto my-4 ${
          theme === "light" ? "bg-white-50" : "bg-dusk"
        }`}
      />

      <div className="flex flex-row items-end space-x-8 mb-6 overflow-visible">
        {/* Username Filter */}
        <div className="flex flex-col">
          <Label className="text-sm mb-1">User name</Label>
          <Select
            value={selectedUser}
            onValueChange={(val) => {
              console.log("🔄 User selection changed to:", val);
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
                <SelectItem value="all">All Users</SelectItem>
                {users.map((u) => (
                  <SelectItem key={u.userId} value={u.userId.toString()}>
                    {u.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {users.length === 0 && (
            <p className="text-xs text-gray-500 mt-1">Loading users...</p>
          )}
        </div>

        {/* Event Type Multi-Select */}
        <div className="flex flex-col w-auto">
          <Label className="text-sm mb-1">Event type</Label>
          <MultipleSelector
            options={eventOptions}
            value={selectedEventTypes}
            onChange={(newSelected) => {
              console.log("🔄 Event types changed to:", newSelected);
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

      {/* Activity Logs Table + Pagination */}
      <ActivityLogsSection
        logs={logs}
        page={page}
        limit={limit}
        total={total}
        onPageChange={(newPage) => {
          console.log("🔄 Page changed to:", newPage);
          setPage(newPage);
          updateQueryParams({ page: newPage });
        }}
      />

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
          <p>
            <strong>Debug Info:</strong>
          </p>
          <p>Users loaded: {users.length}</p>
          <p>Logs loaded: {logs.length}</p>
          <p>Selected user: {selectedUser}</p>
          <p>
            Selected events:{" "}
            {selectedEventTypes.map((e) => e.value).join(", ") || "all"}
          </p>
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
