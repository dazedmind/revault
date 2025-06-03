// File: src/app/admin/settings/security/activity-logs/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
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

export default function ActivityLogSettings() {
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

  // ----- 3) Fetch user list for the “User name” dropdown -----
  useEffect(() => {
    if (!mounted) return;

    fetch("/admin/api/user-options", { method: "GET" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch user list");
        return res.json();
      })
      .then((data: UserOption[]) => {
        setUsers(data);
      })
      .catch((err) => console.error("Error fetching user list:", err));
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

    fetch(`/admin/api/get-logs?${params.toString()}`, { method: "GET" })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.error(
            "Server returned non-200 for get-logs:",
            res.status,
            text,
          );
          throw new Error("Failed to fetch logs");
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
            console.error("Failed to fetch logs:", data);
            setLogs([]);
            setTotal(0);
          }
        },
      )
      .catch((err) => {
        console.error("Error fetching logs:", err);
        setLogs([]);
        setTotal(0);
      });
  }, [mounted, selectedUser, selectedEventTypes, page, limit]);

  if (!mounted) return null;

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
      className={`flex flex-col w-auto ${
        theme === "light" ? "bg-secondary border-white-50" : "bg-midnight"
      } p-6 mb-8 rounded-xl border-1 border-white-5`}
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
                <SelectItem value="all">All</SelectItem>
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

      {/* Activity Logs Table + Pagination */}
      <ActivityLogsSection
        logs={logs}
        page={page}
        limit={limit}
        total={total}
        onPageChange={(newPage) => {
          setPage(newPage);
          updateQueryParams({ page: newPage });
        }}
      />
    </div>
  );
}
