// app/admin/components/manage-users/EditUserModal.tsx
"use client";
import { Dispatch, SetStateAction, ChangeEvent } from "react";

interface User {
  id: number;
  fullName: string;
  middleName: string;
  lastName: string;
  extension: string;
  employeeID: string; // Changed from employeeId
  email: string;
  role: string;
  status: string;
  userAccess: string;
  contactNum: string; // Added
  position: string; // Added
  name: string;
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

  // Check if librarian role is selected (need contact number)
  const isLibrarian =
    user.userAccess === "Librarian-in-Charge" || user.role === "LIBRARIAN";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="dark:bg-primary w-full max-w-md relative z-10 max-h-[90vh] rounded-lg flex flex-col">
        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 text-gold">
                Edit User - Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={user.fullName}
                    onChange={onInputChange}
                    className="w-full p-2 pl-3 dark:bg-primary border border-[#444] rounded-xl text-sm h-[45px]"
                    required
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
                    className="w-full p-2 pl-3 dark:bg-primary border border-[#444] rounded-xl text-sm h-[45px]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={onInputChange}
                    className="w-full p-2 pl-3 dark:bg-primary border border-[#444] rounded-xl text-sm h-[45px]"
                    required
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
                    className="w-full p-2 pl-3 dark:bg-primary border border-[#444] rounded-xl text-sm h-[45px]"
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
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    name="employeeID" // Changed from employeeId
                    value={user.employeeID}
                    onChange={onInputChange}
                    placeholder="e.g. 1234567890"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className="w-full p-2 pl-3 dark:bg-primary border border-[#444] rounded-xl text-sm h-[45px]"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Must be exactly 10 digits starting with 1
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    User Access *
                  </label>
                  <div className="relative">
                    <select
                      name="userAccess"
                      value={user.userAccess}
                      onChange={onInputChange}
                      className="w-full p-2 pl-3 dark:bg-primary border border-[#444] rounded-xl text-sm h-[45px] pr-8 appearance-none"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Librarian-in-Charge">
                        Librarian-in-Charge
                      </option>
                      <option value="Admin Assistant">Admin Assistant</option>
                      <option value="Admin">Admin</option>
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

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={onInputChange}
                  className="w-full p-2 pl-3 dark:bg-primary border border-[#444] rounded-xl text-sm h-[45px]"
                  required
                />
              </div>

              {/* Position field - optional for all roles */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={user.position}
                  onChange={onInputChange}
                  placeholder="e.g. Head Librarian, Senior Admin"
                  className="w-full p-2 pl-3 dark:bg-primary border border-[#444] rounded-xl text-sm h-[45px]"
                />
              </div>

              {/* Contact Number - Required for Librarian */}
              {isLibrarian && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNum"
                    value={user.contactNum}
                    onChange={onInputChange}
                    placeholder="e.g. 09171234567"
                    className="w-full p-2 pl-3 dark:bg-primary border border-[#444] rounded-xl text-sm h-[45px]"
                    required={isLibrarian}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Required for Librarian role
                  </p>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Status</label>
                <div className="relative">
                  <select
                    name="status"
                    value={user.status}
                    onChange={onInputChange}
                    className="w-full p-2 pl-3 dark:bg-primary border border-[#444] rounded-xl text-sm h-[45px] pr-8 appearance-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
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

            {/* Password Section */}
            <div className="">
              <h3 className="text-lg font-medium mb-4 text-gold">
                Change Password (Optional)
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Leave blank to keep current password"
                  value={passwords.newPassword}
                  onChange={onPasswordChange}
                  className="w-full p-2 pl-3 dark:bg-primary border border-[#444] rounded-xl text-sm h-[45px]"
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-4">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={passwords.confirmPassword}
                  onChange={onPasswordChange}
                  className="w-full p-2 pl-3 dark:bg-primary border border-[#444] rounded-xl text-sm h-[45px]"
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Buttons */}
        <div className="border-t border-[#444] p-6 bg-primary rounded-b-lg">
          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-[12px] bg-transparent border border-gray-600 hover:bg-opacity-10 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 rounded-[12px] transition-colors bg-gold hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
