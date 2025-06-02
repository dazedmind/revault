"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InputField from "@/app/component/InputField";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface Activity {
  name: string;
  activity: string;
  created_at: string;
  ip_address: string;
  activity_type: string;
  status: string;
}

const ActivityLogSettings = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [logs, setLogs] = useState<Activity[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetch("/admin/api/get-logs")
        .then((res) => res.json())
        .then((data) => setLogs(data))
        .catch((err) => console.error("Error fetching logs:", err));
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className=" flex flex-col w-auto p-6 mb-8 rounded-xl border-1 border-white-5" // className={`flex flex-col w-auto ${
      //   theme === "light" ? "bg-secondary border-white-50" : "bg-midnight"
      // } p-6 mb-8 rounded-xl border-1 border-white-5`}
    >
      <h1 className="text-2xl ml-1">Activity Logs</h1>

      <div
        className="h-0.5 w-auto my-4 "
        // className={`h-0.5 w-auto my-4 ${
        //   theme === "light" ? "bg-white-50" : "bg-dusk"
        // }`}
      ></div>
      <div className="flex flex-row items-end space-x-8 mb-6 overflow-visible">
        {/* Username Filter */}
        <div className="flex flex-col">
          <Label className="text-sm  mb-1">User name</Label>
          <Select>
            <SelectTrigger className="w-64 dark:bg-primary">
              <SelectValue placeholder="Choose a team member" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* …map your real user list here… */}
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="alice">Alice</SelectItem>
                <SelectItem value="bob">Bob</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Event Type Filter */}
        <div className="flex flex-col">
          <Label className="text-sm  mb-1">Event type</Label>
          <Select>
            <SelectTrigger className="w-48 dark:bg-primary">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="logout">Logout</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader
          className={`${theme === "light" ? "bg-white-50" : "bg-dusk"} rounded-md`}
        >
          <TableRow>
            <TableCell className="w-50">Date & Time</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>IP Address</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log, index) => (
            <TableRow key={index}>
              <TableCell>
                {new Date(log.created_at).toLocaleTimeString([], {
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
          ))}
        </TableBody>
      </Table>

      {/* {logs.length > 0 ? (
        logs.map((log, index) => (
          <ActivityLog
            key={index}
            name={log.name}
            ip_address={log.ip_address}
            activity={log.activity}
            act_type={log.activity_type}
            act_status={log.status}
            time={new Date(log.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          />
        ))
      ) : (
        <p className="text-muted-foreground">No logs available.</p>
      )} */}
    </div>
  );
};

export default ActivityLogSettings;
