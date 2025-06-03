// components/manage-users/EditUserModal.tsx
"use client";
import { Dispatch, SetStateAction, ChangeEvent } from "react";

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

interface EditUserModalProps {
  theme: string;
  show: boolean;
  user: User | null;
  passwords: { newPassword: string; confirmPassword: string };
  passwordError: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function EditUserModal({
  theme,
  show,
  user,
  passwords,
  passwordError,
  onInputChange,
  onPasswordChange,
  onCancel,
  onSave,
}: EditUserModalProps) {
  if (!show || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="p-6 rounded-lg bg-dusk w-full max-w-md relative z-10">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 text-gold">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={onInputChange}
                  className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={user.middleName}
                  onChange={onInputChange}
                  className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={onInputChange}
                  className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ext. (e.g. III, Sr.)
                </label>
                <input
                  type="text"
                  name="extension"
                  value={user.extension}
                  onChange={onInputChange}
                  className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                />
              </div>
            </div>
          </div>

          {/* Employee Information Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-gold">
              Employee Information
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={user.employeeId}
                  onChange={onInputChange}
                  className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  User Access
                </label>
                <div className="relative">
                  <select
                    name="userAccess"
                    value={user.userAccess}
                    onChange={onInputChange}
                    className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px] pr-8 appearance-none"
                  >
                    <option>Librarian-in-charge</option>
                    <option>Admin Assistant</option>
                    <option>Admin</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={onInputChange}
                className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
              />
            </div>
          </div>

          {/* Password Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-gold">Password</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Create Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter Password"
                value={passwords.newPassword}
                onChange={onPasswordChange}
                className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter Password Again"
                value={passwords.confirmPassword}
                onChange={onPasswordChange}
                className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{passwordError}</p>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-[12px] bg-transparent border border-gray-600 hover:bg-opacity-10 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 rounded-[12px] text-white transition-colors bg-gold hover:opacity-90"
            >
              Update User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
