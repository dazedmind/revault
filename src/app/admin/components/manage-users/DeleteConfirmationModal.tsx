// components/manage-users/DeleteConfirmationModal.tsx
"use client";
import {
  AlertTriangle,
  User,
  Mail,
  IdCard,
  Phone,
  Briefcase,
} from "lucide-react";

interface UserToDelete {
  id: number;
  name: string;
  email: string;
  role: string;
  employeeID: string;
  contactNum?: string;
  position?: string;
}

interface DeleteConfirmationModalProps {
  theme: string;
  show: boolean;
  userToDelete?: UserToDelete | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({
  theme,
  show,
  userToDelete,
  onCancel,
  onConfirm,
}: DeleteConfirmationModalProps) {
  if (!show) return null;

  const getRoleColor = (role: string) => {
    switch (role?.toUpperCase()) {
      case "LIBRARIAN":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30";
      case "ADMIN":
        return "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30";
      case "ADMIN_ASSISTANT":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div
        className={`p-6 rounded-lg ${
          theme === "light" ? "bg-white" : "bg-dusk"
        } w-full max-w-md shadow-xl border ${
          theme === "light" ? "border-gray-200" : "border-gray-700"
        } mx-4`}
      >
        {/* Warning Icon and Title */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Delete User Account
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Are you sure you want to permanently delete this user account?
          </p>
        </div>

        {/* User Information Card */}
        {userToDelete && (
          <div
            className={`p-4 rounded-lg border mb-6 ${
              theme === "light"
                ? "bg-gray-50 border-gray-200"
                : "bg-gray-800/50 border-gray-600"
            }`}
          >
            <div className="space-y-3">
              {/* Name and Role */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {userToDelete.name}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(userToDelete.role)}`}
                >
                  {userToDelete.role}
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {userToDelete.email}
                </span>
              </div>

              {/* Employee ID */}
              <div className="flex items-center space-x-2">
                <IdCard className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                  ID: {userToDelete.employeeID}
                </span>
              </div>

              {/* Contact Number (if available) */}
              {userToDelete.contactNum && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {userToDelete.contactNum}
                  </span>
                </div>
              )}

              {/* Position (if available) */}
              {userToDelete.position && (
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {userToDelete.position}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Warning Message */}
        <div
          className={`p-3 rounded-lg mb-6 ${
            theme === "light"
              ? "bg-red-50 border border-red-200"
              : "bg-red-900/20 border border-red-800"
          }`}
        >
          <div className="flex">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="ml-3">
              <p className="text-sm text-red-800 dark:text-red-200">
                <strong>Warning:</strong> This action cannot be undone. All user
                data, including:
              </p>
              <ul className="mt-2 text-xs text-red-700 dark:text-red-300 list-disc list-inside space-y-1">
                <li>Account credentials and permissions</li>
                <li>Activity logs and user history</li>
                <li>Associated bookmarks and preferences</li>
              </ul>
              <p className="mt-2 text-xs text-red-700 dark:text-red-300">
                will be permanently removed from the system.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-md border transition-colors ${
              theme === "light"
                ? "border-gray-300 hover:bg-gray-50 text-gray-700"
                : "border-gray-600 hover:bg-gray-700 text-gray-300"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}
