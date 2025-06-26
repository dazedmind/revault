// File: src/app/admin/components/UserActivityLogsSection.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  Calendar,
  User,
  Activity,
  Globe,
  CheckCircle,
  XCircle,
  Info,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  FileUp,
  BookOpen,
  LogIn,
  LogOut,
  Key,
} from "lucide-react";

interface UserActivity {
  name: string;
  activity: string;
  created_at: string;
  activity_type: string | null;
  status: string;
  paper_id?: number;
  student_num?: string;
  employee_id?: string;
  user_role?: string;
}

interface UserActivityLogsSectionProps {
  logs: UserActivity[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

export default function UserActivityLogsSection({
  logs,
  page,
  limit,
  total,
  onPageChange,
}: UserActivityLogsSectionProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const lastPage = Math.ceil(total / limit);

  // Utility functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const localDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    const localTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return {
      date: localDate,
      time: localTime,
    };
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const toggleRowExpansion = (index: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };

  const getActivityIcon = (activityType: string | null | undefined) => {
    if (!activityType) {
      return <Activity className="w-4 h-4 text-gray-600" />;
    }

    switch (activityType) {
      case "LOGIN":
        return <LogIn className="w-4 h-4 text-green-600" />;
      case "LOGOUT":
        return <LogOut className="w-4 h-4 text-blue-600" />;
      case "VIEW_DOCUMENT":
        return <BookOpen className="w-4 h-4 text-purple-600" />;
      case "CHANGE_PASSWORD":
        return <Key className="w-4 h-4 text-orange-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "success" ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  const formatActivityType = (type: string | null | undefined) => {
    if (!type) {
      return "Unknown";
    }
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getUserRole = (log: UserActivity) => {
    // Determine user type based on available IDs
    if (log.student_num && log.student_num !== "0") {
      return "Student";
    } else if (log.employee_id && log.employee_id !== "0") {
      return "Faculty";
    }
    return log.user_role || "User";
  };

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, total);

  return (
    <div className="space-y-4">
      {/* Summary Bar */}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Showing {startIndex}-{endIndex} of {total} logs
          </span>
          <span>•</span>
          <span>
            Page {page} of {lastPage}
          </span>
        </div>
        <div className="text-sm text-muted-foreground">User Activity Logs</div>
      </div>

      {/* Enhanced Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableCell className="w-[140px] font-semibold text-left">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date & Time
                </div>
              </TableCell>
              <TableCell className="w-[160px] font-semibold text-left">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  User
                </div>
              </TableCell>
              <TableCell className="w-[80px] font-semibold text-left">
                Role
              </TableCell>
              <TableCell className="w-[280px] font-semibold text-left">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Action
                </div>
              </TableCell>
              <TableCell className="w-[140px] font-semibold text-left">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Activity Type
                </div>
              </TableCell>
              <TableCell className="w-[80px] font-semibold text-left">
                Status
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(logs) && logs.length > 0 ? (
              logs.map((log, idx) => {
                const formattedDateTime = formatDate(log.created_at);

                return (
                  <TableRow
                    key={idx}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="w-[140px]">
                      <div className="text-sm">
                        <div className="font-medium">
                          {formattedDateTime.date}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {formattedDateTime.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="w-[160px]">
                      <div className="text-left">
                        <div className="font-medium text-sm">{log.name}</div>
                        <div className="text-muted-foreground text-xs">
                          {log.student_num &&
                            log.student_num !== "0" &&
                            `Student: ${log.student_num}`}
                          {log.employee_id &&
                            log.employee_id !== "0" &&
                            `Employee: ${log.employee_id}`}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="w-[80px]">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                        {getUserRole(log)}
                      </span>
                    </TableCell>
                    <TableCell className="w-[280px]">
                      <div className="text-left">
                        <div className="flex items-start gap-2">
                          {getActivityIcon(log.activity_type)}
                          <div className="min-w-0 flex-1">
                            <div className="text-sm">
                              {expandedRows.has(idx) ? (
                                <div>
                                  <div className="break-words">
                                    {log.activity}
                                  </div>
                                  <button
                                    onClick={() => toggleRowExpansion(idx)}
                                    className="mt-1 text-xs hover:underline inline-flex items-center gap-1"
                                  >
                                    <EyeOff className="w-3 h-3" />
                                    Show less
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  <div className="break-words">
                                    {truncateText(log.activity, 50)}
                                  </div>
                                  {log.activity.length > 50 && (
                                    <button
                                      onClick={() => toggleRowExpansion(idx)}
                                      className="mt-1 text-xs hover:underline inline-flex items-center gap-1"
                                    >
                                      <Eye className="w-3 h-3" />
                                      Show more
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="w-[140px]">
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          {getActivityIcon(log.activity_type)}
                          <span className="text-sm font-medium">
                            {formatActivityType(log.activity_type)}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="w-[80px]">
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <span
                            className={`text-xs font-medium capitalize ${
                              log.status === "success"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {log.status}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <Activity className="w-12 h-12 opacity-30" />
                    <div>
                      <p className="font-medium">
                        No user activity logs to display
                      </p>
                      <p className="text-sm">
                        User activity logs will appear here when users perform
                        actions
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Enhanced Pagination Controls */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Showing</span>
          <span className="font-medium text-foreground">
            {startIndex}-{endIndex}
          </span>
          <span>of</span>
          <span className="font-medium text-foreground">{total}</span>
          <span>entries</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-1">
            {/* Show first page */}
            {page > 3 && (
              <>
                <button
                  key="page-1"
                  className="px-3 py-2 text-sm border rounded-md hover:bg-muted transition-colors"
                  onClick={() => onPageChange(1)}
                >
                  1
                </button>
                {page > 4 && (
                  <span
                    key="ellipsis-start"
                    className="px-2 text-muted-foreground"
                  >
                    ...
                  </span>
                )}
              </>
            )}

            {/* Show pages around current page */}
            {(() => {
              const startPage = Math.max(1, page - 2);
              const endPage = Math.min(lastPage, page + 2);
              const pages = [];

              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={`page-${i}`}
                    className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                      i === page
                        ? "dark:bg-primary dark:text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => onPageChange(i)}
                  >
                    {i}
                  </button>,
                );
              }

              return pages;
            })()}

            {/* Show last page */}
            {page < lastPage - 2 && (
              <>
                {page < lastPage - 3 && (
                  <span
                    key="ellipsis-end"
                    className="px-2 text-muted-foreground"
                  >
                    ...
                  </span>
                )}
                <button
                  key={`page-${lastPage}`}
                  className="px-3 py-2 text-sm border rounded-md hover:bg-muted transition-colors"
                  onClick={() => onPageChange(lastPage)}
                >
                  {lastPage}
                </button>
              </>
            )}
          </div>

          <button
            className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= lastPage}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
