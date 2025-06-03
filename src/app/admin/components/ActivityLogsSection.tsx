// File: src/app/admin/components/manage-logs/ActivityLogsSection.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
}

export default function ActivityLogsSection({
  logs,
  page,
  limit,
  total,
  onPageChange,
}: ActivityLogsSectionProps) {
  const lastPage = Math.ceil(total / limit) || 1;

  return (
    <div className="mt-6">
      <Table>
        <TableHeader className="rounded-md">
          <TableRow>
            <TableCell className="w-50">Date &amp; Time</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Activity Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>IP Address</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(logs) && logs.length > 0 ? (
            logs.map((log, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  {new Date(log.created_at).toLocaleString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>{log.name}</TableCell>
                <TableCell>{log.activity}</TableCell>
                <TableCell>{log.activity_type}</TableCell>
                <TableCell>{log.status}</TableCell>
                <TableCell>{log.ip_address}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                No logs to display.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          Page {page} of {lastPage}
        </div>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => onPageChange(Math.max(1, page - 1))}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            disabled={page >= lastPage}
            onClick={() => onPageChange(Math.min(lastPage, page + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
