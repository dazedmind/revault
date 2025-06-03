// components/manage-users/DeleteConfirmationModal.tsx
"use client";
import { Dispatch, SetStateAction } from "react";

interface DeleteConfirmationModalProps {
  theme: string;
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({
  theme,
  show,
  onCancel,
  onConfirm,
}: DeleteConfirmationModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`p-6 rounded-lg ${
          theme === "light" ? "bg-white" : "bg-dusk"
        } w-96 shadow-xl border ${
          theme === "light" ? "border-gray-200" : "border-gray-700"
        } pointer-events-auto`}
      >
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">
            Are you sure you want to delete this user?
          </h2>
        </div>
        <div className="text-center mb-6 text-sm text-gray-500">
          This action cannot be undone
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-opacity-10 hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-warning text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
