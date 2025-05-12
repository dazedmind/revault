import React from "react";
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

const ManageUserSettings = () => {
  return (
    <div>
      <div className="flex justify-between w-6xl ">
        <h1 className="text-2xl ml-1">Manage Users</h1>
        <button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br p-2 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer">
          Add Librarian
        </button>
      </div>

      {/* divider */}
      <div className="bg-dusk h-0.5 w-6xl mb-2 mt-2"></div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead className="w-[300px]">Email</TableHead>
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
