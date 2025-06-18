// File: components/manage-users/NormalUsersTable.tsx
"use client";
import Image from "next/image";
import userAvatar from "../../../img/user.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface NormalUser {
  id: number;
  fullName: string;
  middleName?: string;
  lastName: string;
  extension?: string;
  email: string;
  role: "STUDENT" | "FACULTY";
  studentNumber?: string; // For students
  employeeID?: string; // For faculty
  program?: string; // For students
  department?: string; // For faculty
  position?: string; // For faculty
  college?: string; // For students
  yearLevel?: number; // For students
}

interface NormalUsersTableProps {
  users: NormalUser[];
  loading: boolean;
  theme: string;
}

export default function NormalUsersTable({
  users,
  loading,
  theme,
}: NormalUsersTableProps) {
  // Helper function to format user display name
  const formatUserDisplayInfo = (user: NormalUser) => {
    const displayName = `${user.fullName} ${user.lastName}${
      user.extension ? " " + user.extension : ""
    }`;

    // Create subtitle based on role
    let subtitle = "";
    if (user.role === "STUDENT") {
      subtitle = user.program || "Student";
      if (user.college && user.yearLevel) {
        subtitle += ` • ${user.college} • Year ${user.yearLevel}`;
      }
    } else if (user.role === "FACULTY") {
      subtitle = user.position || "Faculty";
      if (user.department) {
        subtitle += ` • ${user.department}`;
      }
    }

    return {
      name: displayName,
      subtitle: subtitle,
    };
  };

  // Helper function to get role badge styling
  const getRoleBadgeClass = (role: string) => {
    const baseClass = "px-2 py-1 rounded-full text-xs font-medium";
    switch (role?.toUpperCase()) {
      case "STUDENT":
        return `${baseClass} bg-green-500/20 text-green-500`;
      case "FACULTY":
        return `${baseClass} bg-orange-500/20 text-orange-500`;
      default:
        return `${baseClass} bg-gray-500/20 text-gray-500`;
    }
  };

  // Helper function to get ID display (Student Number or Employee ID)
  const getIdDisplay = (user: NormalUser) => {
    if (user.role === "STUDENT") {
      return {
        label: "Student No.",
        value: user.studentNumber || "N/A",
      };
    } else {
      return {
        label: "Employee ID",
        value: user.employeeID || "N/A",
      };
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]"></TableHead>
          <TableHead className="w-[250px]">Name</TableHead>
          <TableHead className="w-[120px]">Role</TableHead>
          <TableHead className="w-[280px]">Email</TableHead>
          <TableHead className="w-[150px]">ID Number</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No students or faculty found.
              </p>
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => {
            const userInfo = formatUserDisplayInfo(user);
            const idInfo = getIdDisplay(user);

            return (
              <TableRow
                key={user.id}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <TableCell className="py-3 align-middle">
                  <div className="flex justify-center">
                    <Image
                      src={userAvatar}
                      alt="avatar"
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  </div>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{userInfo.name}</span>
                    {userInfo.subtitle && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {userInfo.subtitle}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span className={getRoleBadgeClass(user.role)}>
                    {user.role}
                  </span>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span className="text-sm">{user.email}</span>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <div className="flex flex-col">
                    <span className="text-sm font-mono">{idInfo.value}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {idInfo.label}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
