// File: src/app/admin/components/ActivityLogsSection.tsx
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
} from "lucide-react";

interface Activity {
  name: string;
  activity: string;
  created_at: string;
  ip_address: string;
  activity_type: string;
  status: string;
}

interface ActivityLogsSectionProps {
  logs: Activity[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  // Add current filter state for PDF generation
  currentFilters?: {
    userId?: string;
    activityTypes?: string;
  };
}

export default function ActivityLogsSection({
  logs,
  page,
  limit,
  total,
  onPageChange,
  currentFilters,
}: ActivityLogsSectionProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const lastPage = Math.ceil(total / limit) || 1;

  const toggleRowExpansion = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const truncateText = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Safe date parsing function
  const parseDate = (dateString: string): Date => {
    if (!dateString) return new Date();
    
    // Try different date parsing methods
    let date = new Date(dateString);
    
    // If the date is invalid, try parsing as ISO string
    if (isNaN(date.getTime())) {
      date = new Date(dateString.replace(' ', 'T'));
    }
    
    // If still invalid, try removing timezone info and parsing
    if (isNaN(date.getTime())) {
      const cleanDateString = dateString.replace(/[+-]\d{2}:\d{2}$/, '');
      date = new Date(cleanDateString);
    }
    
    // Last resort: return current date if all parsing fails
    if (isNaN(date.getTime())) {
      console.warn('Failed to parse date:', dateString);
      return new Date();
    }
    
    return date;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = parseDate(dateString);
      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        time: date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      };
    } catch (error) {
      console.error('Date formatting error:', error, 'for date:', dateString);
      return {
        date: "Invalid Date",
        time: "Invalid Time"
      };
    }
  };

  const getActivityIcon = (activityType: string) => {
    const iconClass = "w-4 h-4";
    switch (activityType) {
      case "LOGIN":
        return <User className={`${iconClass} text-green-500`} />;
      case "LOGOUT":
        return <User className={`${iconClass} text-gray-500`} />;
      case "UPLOAD_DOCUMENT":
        return <FileUp className={`${iconClass} text-blue-500`} />;
      case "VIEW_DOCUMENT":
        return <Eye className={`${iconClass} text-yellow-500`} />;
      case "DOWNLOAD_DOCUMENT":
        return <Activity className={`${iconClass} text-purple-500`} />;
      default:
        return <Info className={`${iconClass} text-gray-400`} />;
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "success" ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  const generatePDFReport = () => {
    // Build query parameters for PDF preview page
    const params = new URLSearchParams();

    if (currentFilters?.userId) {
      params.set("userId", currentFilters.userId);
    }

    if (currentFilters?.activityTypes) {
      params.set("activityTypes", currentFilters.activityTypes);
    }

    params.set("page", page.toString());
    params.set("limit", limit.toString());

    // Redirect to preview page in new tab
    const previewUrl = `/admin/activity-logs-preview-pdf?${params.toString()}`;
    window.open(previewUrl, "_blank");
  };

  const formatActivityType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
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
        <div className="text-sm text-muted-foreground">Activity Logs</div>
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
              <TableCell className="w-[120px] font-semibold text-left">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  IP Address
                </div>
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
                      </div>
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
                    <TableCell className="w-[120px]">
                      <div className="text-left">
                        <div className="text-sm font-mono bg-muted/50 px-2 py-1 rounded">
                          {log.ip_address || "Unknown"}
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
                      <p className="font-medium">No logs to display</p>
                      <p className="text-sm">
                        Activity logs will appear here when users perform
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
            disabled={page <= 1}
            onClick={() => onPageChange(Math.max(1, page - 1))}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-1">
            {/* Page numbers */}
            {Array.from({ length: Math.min(5, lastPage) }, (_, i) => {
              let pageNum;
              if (lastPage <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= lastPage - 2) {
                pageNum = lastPage - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={` cursor-pointer w-9 h-9 text-sm rounded-md transition-colors ${
                    pageNum === page
                      ? "font-medium"
                      : "hover:bg-muted border"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page >= lastPage}
            onClick={() => onPageChange(Math.min(lastPage, page + 1))}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}