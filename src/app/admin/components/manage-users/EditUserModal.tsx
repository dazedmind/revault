// app/admin/components/manage-users/EditUserModal.tsx
"use client";
import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { X } from "lucide-react";

interface User {
  id: number;
  fullName: string;
  middleName: string;
  lastName: string;
  extension: string;
  employeeID: string;
  email: string;
  role: string;
  status: string;
  userAccess: string;
  contactNum: string;
  position: string;
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
  isEditingSelf: boolean;
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
  isEditingSelf,
}: EditUserModalProps) {
  if (!show || !user) return null;

  // Function to get automatic position based on user access
  const getPositionFromUserAccess = (userAccess: string): string => {
    const positionMapping: { [key: string]: string } = {
      Admin: "Chief Librarian",
      "Admin Assistant": "Chief's Secretary",
      "Librarian-in-Charge": "Librarian-in-Charge",
    };
    return positionMapping[userAccess] || "";
  };

  // Get the automatic position for the current user access
  const automaticPosition = getPositionFromUserAccess(user.userAccess);

  // RBAC pattern - Get current user role from localStorage
  const currentUserRole =
    typeof window !== "undefined" ? localStorage.getItem("userType") : null;

  // Check if current user can assign Admin role
  const canAssignAdminRole = currentUserRole === "ADMIN";

  return (
    <div className="fixed inset-0 flex items-center bg-black/50 backdrop-blur-sm justify-center z-50">
      <div
        className={`p-6 rounded-lg bg-accent border-1 ${
          theme === "light" ? "border-white-50" : "border-white-5"
        } w-full max-w-md relative z-10 max-h-[90vh] overflow-y-auto`}
      >
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-tertiary cursor-pointer transition-colors z-20"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gold">
                Personal Information
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
                    className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
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
                    className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
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
                    className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
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
                    className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
                  />
                </div>
              </div>
            </div>

            <div
              className={`h-0.5 w-auto my-4 ${
                theme === "light" ? "bg-white-50" : "bg-white-5"
              }`}
            ></div>

            {/* Employee Information Section */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gold">
                Employee Information
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    name="employeeID"
                    value={user.employeeID}
                    onChange={onInputChange}
                    placeholder="e.g. 1234567890"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
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
                      className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px] pr-8 appearance-none"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Librarian-in-Charge">
                        Librarian-in-Charge
                      </option>
                      <option value="Admin Assistant">Admin Assistant</option>
                      {/* Only show Admin option if current user is ADMIN */}
                      {canAssignAdminRole && (
                        <option value="Admin">Admin</option>
                      )}
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
                  {/* Show information about restricted options for ASSISTANT users */}
                  {!canAssignAdminRole && (
                    <p className="text-xs text-yellow-500 mt-1">
                      💡 Admin role assignment requires ADMIN permissions
                    </p>
                  )}
                  {/* Special handling for existing Admin users being edited by Assistant */}
                  {!canAssignAdminRole && user.userAccess === "Admin" && (
                    <p className="text-xs text-orange-500 mt-1">
                      ⚠️ Current user is Admin - role change restricted
                    </p>
                  )}
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
                  className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
                  required
                />
              </div>

              {/* Position field - automatically set based on user access and disabled */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  name="position"
                  value={automaticPosition}
                  onChange={onInputChange}
                  className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px] cursor-not-allowed opacity-70"
                  disabled
                  readOnly
                />
                <p className="text-xs text-gray-400 mt-1">
                  Position is automatically assigned based on User Access role
                </p>
              </div>

              {/* Contact Number - Now optional for all roles */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Contact Number (Optional)
                </label>
                <input
                  type="tel"
                  name="contactNum"
                  value={user.contactNum}
                  onChange={onInputChange}
                  placeholder="e.g. +639123456789"
                  className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Optional contact information
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Status</label>
                <div className="relative">
                  <select
                    name="status"
                    value={user.status}
                    onChange={onInputChange}
                    className={`w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px] pr-8 appearance-none ${
                      isEditingSelf
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer"
                    }`}
                    disabled={isEditingSelf}
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
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
                {isEditingSelf && (
                  <p className="text-xs text-yellow-500 mt-1">
                    💡 Cannot change your own account status
                  </p>
                )}
              </div>
            </div>

            <div
              className={`h-0.5 w-auto my-4 ${
                theme === "light" ? "bg-white-50" : "bg-white-5"
              }`}
            ></div>

            {/* Password Section */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gold">
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
                  className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-4">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter Password Again"
                  value={passwords.confirmPassword}
                  onChange={onPasswordChange}
                  className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
                  minLength={6}
                />
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <div
              className={`h-0.5 w-auto my-4 ${
                theme === "light" ? "bg-white-50" : "bg-white-5"
              }`}
            ></div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/80 transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
