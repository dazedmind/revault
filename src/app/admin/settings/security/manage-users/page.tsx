"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPen, FaTrash } from "react-icons/fa";
import user from "../../../../img/user.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ManageUserSettings = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} mr-10 p-6 mb-8 rounded-xl border-1 border-white-5`}>
      <div className="flex justify-between w-auto ">
        <h1 className="text-2xl ml-1">Manage Users</h1>
        <button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br p-2 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer">
          Add Librarian
        </button>
      </div>

      {/* divider */}
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[250px]">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <Image
                src={user}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            </TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>john.doe@example.com</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Active</TableCell>
            <TableCell className="flex gap-2">
              <button className="cursor-pointer bg-red-warning   text-white px-4 py-2 rounded-md">
                <FaTrash />
              </button>
              <button className="cursor-pointer bg-dusk  text-white px-4 py-2 rounded-md">
                <FaPen />
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUserSettings;
