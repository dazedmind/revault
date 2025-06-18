// app/admin/components/manage-users/AddUserModal.tsx
"use client";
import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { X } from "lucide-react";

interface NewUser {
  fullName: string;
  middleName: string;
  lastName: string;
  extension: string;
  employeeID: string; // Changed from employeeId
  email: string;
  userAccess: string;
  contactNum: string; // Added for librarian
  position: string; // Added optional position field
  status: string;
}

interface AddUserModalProps {
  theme: string;
  show: boolean;
  newUser: NewUser;
  newUserPasswords: { password: string; confirmPassword: string };
  newUserPasswordError: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onAddUser: () => void;
}

export default function AddUserModal({
  theme,
  show,
  newUser,
  newUserPasswords,
  newUserPasswordError,
  onInputChange,
  onPasswordChange,
  onCancel,
  onAddUser,
}: AddUserModalProps) {
  if (!show) return null;

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
  const automaticPosition = getPositionFromUserAccess(newUser.userAccess);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="p-6 rounded-lg dark:bg-primary border-1 dark:border-foreground w-full max-w-md relative z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-20"
          title="Close"
        >
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
        </button>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gold">
              Add New Librarian
            </h1>
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
                  value={newUser.fullName}
                  onChange={onInputChange}
                  className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md  text-sm h-[45px]"
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
                  value={newUser.middleName}
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
                  value={newUser.lastName}
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
                  value={newUser.extension}
                  onChange={onInputChange}
                  className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
                />
              </div>
            </div>
          </div>

          <div
            className={`h-0.5 w-auto my-4 ${theme === "light" ? "bg-white-50" : "bg-white-5"}`}
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
                  name="employeeID" // Changed from employeeId
                  value={newUser.employeeID}
                  onChange={onInputChange}
                  className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  User Access *
                </label>
                <div className="relative">
                  <select
                    name="userAccess"
                    value={newUser.userAccess}
                    onChange={onInputChange}
                    className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px] pr-8 appearance-none"
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
                value={newUser.email}
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
                className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px] cursor-not-allowed"
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
                value={newUser.contactNum}
                onChange={onInputChange}
                placeholder="e.g. 09171234567"
                className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
              />
              <p className="text-xs text-gray-400 mt-1">
                Optional contact information
              </p>
            </div>
          </div>

          <div
            className={`h-0.5 w-auto my-4 ${theme === "light" ? "bg-white-50" : "bg-white-5"}`}
          ></div>
          {/* Account Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">
              Account Information
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Password * (Minimum 6 characters)
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password (Minimum 6 characters)"
                value={newUserPasswords.password}
                onChange={onPasswordChange}
                className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-4">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter Password Again"
                value={newUserPasswords.confirmPassword}
                onChange={onPasswordChange}
                className="w-full p-2 pl-3 border border-[#444] rounded-md text-sm h-[45px]"
                required
              />
            </div>
            {newUserPasswordError && (
              <p className="text-red-500 text-sm mt-2">
                {newUserPasswordError}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-[12px] bg-transparent border border-gray-600 hover:bg-opacity-10 hover:bg-gray-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onAddUser}
              className="px-4 py-2 rounded-[12px] transition-colors bg-gold hover:opacity-90 cursor-pointer"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
