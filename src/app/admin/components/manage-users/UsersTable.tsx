// components/manage-users/UsersTable.tsx
"use client";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { FaPen, FaTrash } from "react-icons/fa";
import userAvatar from "../../../img/user.png"; // adjust path if needed
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
  employeeId: string;
  userAccess: string;
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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead className="w-[250px]">Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell className="py-3 align-middle">
              <div className="flex justify-center">
                <Image
                  src={userAvatar}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </TableCell>
            <TableCell className="py-3 align-middle">{u.name}</TableCell>
            <TableCell className="py-3 align-middle">{u.email}</TableCell>
            <TableCell className="py-3 align-middle">{u.role}</TableCell>
            <TableCell className="py-3 align-middle">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
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
                  onClick={() => onDeleteClick(u.id)}
                  className="cursor-pointer bg-red-warning text-white p-2 rounded-md hover:bg-red-700"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => onEditClick(u)}
                  className="cursor-pointer bg-dusk text-white p-2 rounded-md hover:bg-blue-700"
                >
                  <FaPen />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
