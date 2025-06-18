// File: components/manage-users/UsersTable.tsx
"use client";
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import userAvatar from "../../../img/user.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  fullName: string;
  middleName: string;
  lastName: string;
  extension: string;
  employeeID: string;
  userAccess: string;
  contactNum: string;
  position: string;
}

interface UsersTableProps {
  users: User[];
  onEditClick: (user: User) => void;
  theme: string;
  selectedUserId?: number | null; // New prop to track selected user
  editingUserId?: number | null; // New prop to track user being edited
}

export default function UsersTable({
  users,
  onEditClick,
  theme,
  selectedUserId,
  editingUserId,
}: UsersTableProps) {
  const VISIBLE_ROLES = ["ADMIN", "ASSISTANT", "LIBRARIAN"];

  // Filter users based on visible roles
  const filteredUsers = users.filter((u) => {
    const normalizedRole = u.role?.trim().toUpperCase() ?? "";
    return VISIBLE_ROLES.includes(normalizedRole);
  });

  // Helper function to format user display name
  const formatUserDisplayInfo = (user: User) => {
    const displayName =
      user.name ||
      `${user.fullName} ${user.lastName}${user.extension ? " " + user.extension : ""}`;
    const userProfile = user.profileURL || userAvatar;
    return {
      name: displayName,
      subtitle: user.position || user.employeeID,
    };
  };

  // Helper function to get role badge styling
  const getRoleBadgeClass = (role: string) => {
    const baseClass = "px-2 py-1 rounded-full text-xs font-medium";
    switch (role?.toUpperCase()) {
      case "LIBRARIAN":
        return `${baseClass} bg-blue-500/20 text-blue-500`;
      case "ADMIN":
        return `${baseClass} bg-purple-500/20 text-purple-500`;
      case "ASSISTANT":
        return `${baseClass} bg-yellow-500/20 text-yellow-500`;
      default:
        return `${baseClass} bg-gray-500/20 text-gray-500`;
    }
  };

  // Helper function to get row styling based on state
  const getRowClass = (userId: number) => {
    const baseClass = "cursor-pointer transition-all duration-200";

    // User being edited (highest priority)
    if (editingUserId === userId) {
      return `${baseClass} bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 shadow-md`;
    }

    // User row selected/clicked
    if (selectedUserId === userId) {
      return `${baseClass} bg-gray-100 dark:bg-gray-800/70 border-l-2 border-gray-400`;
    }

    // Default hover state
    return `${baseClass} hover:bg-gray-50 dark:hover:bg-gray-800/50`;
  };

  // Handle row click
  const handleRowClick = (user: User, event: React.MouseEvent) => {
    // Trigger edit for the clicked user
    onEditClick(user);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead className="w-[250px]">Email</TableHead>
          <TableHead className="w-[120px]">Employee ID</TableHead>
          <TableHead className="w-[120px]">Role</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filteredUsers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No users found matching the criteria.
              </p>
            </TableCell>
          </TableRow>
        ) : (
          filteredUsers.map((user) => {
            const userInfo = formatUserDisplayInfo(user);
            const isSelected = selectedUserId === user.id;
            const isEditing = editingUserId === user.id;

            return (
              <TableRow
                key={user.id}
                className={getRowClass(user.id)}
                onClick={(e) => handleRowClick(user, e)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleRowClick(user, e as any);
                  }
                }}
              >
                <TableCell className="py-3 align-middle">
                  <div className="flex justify-center">
                    <Image
                      src={u.profileURL || userAvatar}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <div className="flex flex-col">
                    <span
                      className={`font-medium ${isEditing ? "text-blue-600 dark:text-blue-400" : ""}`}
                    >
                      {userInfo.name}
                    </span>
                    {userInfo.subtitle && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {user.position && `${user.position}`}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span className="text-sm">{user.email}</span>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span className="text-sm font-mono">{user.employeeID}</span>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span className={getRoleBadgeClass(user.role)}>
                    {user.role.trim()}
                  </span>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
