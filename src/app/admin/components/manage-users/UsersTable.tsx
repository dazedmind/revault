// File: components/manage-users/UsersTable.tsx
"use client";
import Image from "next/image";
import { FaPen, FaTrash } from "react-icons/fa";
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
  employeeID: string; // Changed from employeeId
  userAccess: string;
  contactNum: string; // Added
  position: string; // Added
  profileURL: string;
}

interface UsersTableProps {
  users: User[];
  onDeleteClick: (id: number) => void;
  onEditClick: (user: User) => void;
  theme: string;
}

export default function UsersTable({
  users,
  onDeleteClick,
  onEditClick,
  theme,
}: UsersTableProps) {
  const VISIBLE_ROLES = ["ADMIN", "ASSISTANT", "LIBRARIAN"];

  // DEBUG: log every role coming in
  console.log("▶ raw users in UsersTable:", users);

  const filteredUsers = users.filter((u) => {
    const normalizedRole = u.role?.trim().toUpperCase() ?? "";
    console.log(
      `Checking user id=${u.id}, raw role="${u.role}", normalized="${normalizedRole}"`,
    );
    return VISIBLE_ROLES.includes(normalizedRole);
  });

  console.log("▶ filteredUsers:", filteredUsers);

  // Helper function to format user display name (removed contact info)
  const formatUserDisplayInfo = (user: User) => {
    const displayName =
      user.name ||
      `${user.fullName} ${user.lastName}${user.extension ? " " + user.extension : ""}`;
    const userProfile = user.profileURL || userAvatar;
    return {
      name: displayName,
      subtitle: user.position || user.employeeID, // Only show position or employee ID
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
          <TableHead className="text-center w-[120px]">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filteredUsers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No users found matching the criteria.
              </p>
            </TableCell>
          </TableRow>
        ) : (
          filteredUsers.map((u) => {
            const userInfo = formatUserDisplayInfo(u);
            return (
              <TableRow
                key={u.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
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
                    <span className="font-medium">{userInfo.name}</span>
                    {userInfo.subtitle && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {u.position && `${u.position}`}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span className="text-sm">{u.email}</span>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span className="text-sm font-mono">{u.employeeID}</span>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span className={getRoleBadgeClass(u.role)}>
                    {u.role.trim()}
                  </span>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      u.status === "Active"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {u.status}
                  </span>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onEditClick(u)}
                      className="cursor-pointer bg-dusk text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                      title={`Edit ${userInfo.name}`}
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => onDeleteClick(u.id)}
                      className="cursor-pointer bg-red-warning text-white p-2 rounded-md hover:bg-red-700 transition-colors"
                      title={`Delete ${userInfo.name}`}
                    >
                      <FaTrash />
                    </button>
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
