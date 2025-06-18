// File: src/app/admin/settings/security/manage-users/page.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, ChangeEvent, Suspense, useRef } from "react";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { toast, Toaster } from "sonner";

import UsersTable from "@/app/admin/components/manage-users/UsersTable";
import NormalUsersTable from "@/app/admin/components/manage-users/NormalUsersTable";
import AddUserModal from "@/app/admin/components/manage-users/AddUserModal";
import EditUserModal from "@/app/admin/components/manage-users/EditUserModal";

interface FrontendUser {
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
  profileURL: string;
}

interface NormalUser {
  id: number;
  fullName: string;
  middleName?: string;
  lastName: string;
  extension?: string;
  email: string;
  role: "STUDENT" | "FACULTY";
  studentNumber?: string;
  employeeID?: string;
  program?: string;
  department?: string;
  position?: string;
  college?: string;
  yearLevel?: number;
  profileURL: string;
}

function ManageUserContent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const usersFetched = useRef(false);

  // ─── Users state ───
  const [users, setUsers] = useState<FrontendUser[]>([]);
  const [normalUsers, setNormalUsers] = useState<NormalUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [normalUsersLoading, setNormalUsersLoading] = useState(true);

  // ─── Selection and editing state ───
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  // ─── Normal users dropdown state ───
  const [showNormalUsers, setShowNormalUsers] = useState(false);

  // ─── Edit modal state ───
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState<FrontendUser | null>(
    null,
  );
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  // ─── Add modal state ───
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState<Omit<FrontendUser, "id" | "name">>({
    fullName: "",
    middleName: "",
    lastName: "",
    extension: "",
    employeeID: "",
    email: "",
    role: "LIBRARIAN",
    status: "Active",
    userAccess: "Librarian-in-Charge",
    contactNum: "",
    position: "Librarian-in-Charge",
    profileURL: "",
  });
  const [newUserPasswords, setNewUserPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [newUserPasswordError, setNewUserPasswordError] = useState("");

  // ─── Helper functions ───
  const getPositionFromUserAccess = (userAccess: string): string => {
    const positionMapping: { [key: string]: string } = {
      Admin: "Chief Librarian",
      "Admin Assistant": "Chief's Secretary",
      "Librarian-in-Charge": "Librarian-in-Charge",
    };
    return positionMapping[userAccess] || "";
  };

  const getRoleFromUserAccess = (userAccess: string): string => {
    const roleMapping: { [key: string]: string } = {
      "Librarian-in-Charge": "LIBRARIAN",
      "Admin Assistant": "ASSISTANT",
      Admin: "ADMIN",
    };
    return roleMapping[userAccess] || "LIBRARIAN";
  };

  const generateChangeMessage = (
    original: FrontendUser,
    updated: FrontendUser,
  ): string => {
    const changes: string[] = [];

    // Check each field for changes
    if (original.fullName !== updated.fullName) {
      changes.push(
        `first name from "${original.fullName}" to "${updated.fullName}"`,
      );
    }
    if (original.lastName !== updated.lastName) {
      changes.push(
        `last name from "${original.lastName}" to "${updated.lastName}"`,
      );
    }
    if (original.email !== updated.email) {
      changes.push(`email from "${original.email}" to "${updated.email}"`);
    }
    if (original.userAccess !== updated.userAccess) {
      changes.push(
        `access level from "${original.userAccess}" to "${updated.userAccess}"`,
      );
    }
    if (original.status !== updated.status) {
      changes.push(`status from "${original.status}" to "${updated.status}"`);
    }

    const userName =
      updated.fullName && updated.lastName
        ? `${updated.fullName} ${updated.lastName}`
        : `User #${updated.id}`;

    if (changes.length === 1) {
      return `${userName}: ${changes[0]} changed successfully`;
    } else if (changes.length <= 3) {
      return `${userName}: ${changes.join(", ")} changed successfully`;
    } else {
      return `${userName}: ${changes.length} fields updated successfully`;
    }
  };

  // ─── Effects ───
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || usersFetched.current) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/admin/api/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch users (${res.status})`);
        }

        const data = await res.json();
        if (data.success && Array.isArray(data.users)) {
          setUsers(data.users);
          usersFetched.current = true;
        } else {
          console.error("Invalid response format:", data);
          setUsers([]);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchNormalUsers = async () => {
      try {
        setNormalUsersLoading(true);
        const res = await fetch("/admin/api/normal-users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch normal users (${res.status})`);
        }

        const data = await res.json();
        if (data.success && Array.isArray(data.users)) {
          setNormalUsers(data.users);
        } else {
          console.error("Invalid normal users response format:", data);
          setNormalUsers([]);
        }
      } catch (err) {
        console.error("Error fetching normal users:", err);
        setNormalUsers([]);
      } finally {
        setNormalUsersLoading(false);
      }
    };

    fetchUsers();
    fetchNormalUsers();
  }, [mounted]);

  // ─── Edit handlers ───
  const handleEditClick = (user: FrontendUser) => {
    // Set both selected and editing states
    setSelectedUserId(user.id);
    setEditingUserId(user.id);

    // Prepare edit modal
    setCurrentEditUser({ ...user });
    setPasswords({ newPassword: "", confirmPassword: "" });
    setPasswordError("");
    setShowEditModal(true);
  };

  const handleEditInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setCurrentEditUser((prev) => {
      if (!prev) return prev;

      const updatedUser = { ...prev, [name]: value };

      // Auto-update position and role when userAccess changes
      if (name === "userAccess") {
        updatedUser.position = getPositionFromUserAccess(value);
        updatedUser.role = getRoleFromUserAccess(value);
      }

      return updatedUser;
    });
  };

  const handleEditPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    if (!currentEditUser) return;
    setShowEditModal(false);

    // Validate passwords if provided
    if (passwords.newPassword || passwords.confirmPassword) {
      if (passwords.newPassword !== passwords.confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      if (passwords.newPassword.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
        return;
      }
    }

    try {
      const updateData: any = { ...currentEditUser };
      if (passwords.newPassword) {
        updateData.password = passwords.newPassword;
      }

      const res = await fetch(`/admin/api/update-user/${currentEditUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        throw new Error(`Failed to update user (${res.status})`);
      }

      // Find original user for change message
      const originalUser = users.find((u) => u.id === currentEditUser.id);
      const changeMessage = originalUser
        ? generateChangeMessage(originalUser, currentEditUser)
        : `User updated successfully`;

      // Show success toast
      toast.success("User Updated Successfully", {
        description: changeMessage,
        duration: 4000,
      });

      // Update local state
      setUsers((prev) =>
        prev.map((u) =>
          u.id === currentEditUser.id ? { ...currentEditUser } : u,
        ),
      );

      // Close modal and reset states
      setShowEditModal(false);
      setCurrentEditUser(null);
      setEditingUserId(null);
      setSelectedUserId(null);
      setPasswords({ newPassword: "", confirmPassword: "" });
      setPasswordError("");
    } catch (err) {
      console.error("Error updating user:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Please try again.";

      toast.error("Failed to Update User", {
        description: errorMessage,
        duration: 4000,
      });
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setCurrentEditUser(null);
    setEditingUserId(null);
    setSelectedUserId(null);
    setPasswords({ newPassword: "", confirmPassword: "" });
    setPasswordError("");
  };

  // ─── Add user handlers ───
  const handleAddClick = () => {
    // Reset form and show modal
    setNewUser({
      fullName: "",
      middleName: "",
      lastName: "",
      extension: "",
      employeeID: "",
      email: "",
      role: "LIBRARIAN",
      status: "Active",
      userAccess: "Librarian-in-Charge",
      contactNum: "",
      position: "Librarian-in-Charge",
      profileURL: "",
    });
    setNewUserPasswords({ password: "", confirmPassword: "" });
    setNewUserPasswordError("");
    setShowAddModal(true);
  };

  const handleNewUserInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setNewUser((prev) => {
      const updatedUser = { ...prev, [name]: value };

      // Auto-update position and role when userAccess changes
      if (name === "userAccess") {
        updatedUser.position = getPositionFromUserAccess(value);
        updatedUser.role = getRoleFromUserAccess(value);
      }

      return updatedUser;
    });
  };

  const handleNewUserPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUserPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    setShowAddModal(false);

    // Validate required fields
    if (
      !newUser.fullName ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.employeeID
    ) {
      setNewUserPasswordError("Please fill in all required fields");
      return;
    }

    // Validate passwords
    if (!newUserPasswords.password || !newUserPasswords.confirmPassword) {
      setNewUserPasswordError("Password is required");
      return;
    }

    if (newUserPasswords.password !== newUserPasswords.confirmPassword) {
      setNewUserPasswordError("Passwords do not match");
      return;
    }

    if (newUserPasswords.password.length < 6) {
      setNewUserPasswordError("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await fetch("/admin/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newUser,
          password: newUserPasswords.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create user");
      }

      const result = await res.json();

      // Show success toast
      toast.success("User Created Successfully", {
        description: `${newUser.fullName} ${newUser.lastName} has been added to the system.`,
        duration: 4000,
      });

      // Update local state
      setUsers((prev) => [...prev, result.user]);

      // Close modal and reset form
      setNewUser({
        fullName: "",
        middleName: "",
        lastName: "",
        extension: "",
        employeeID: "",
        email: "",
        role: "LIBRARIAN",
        status: "Active",
        userAccess: "Librarian-in-Charge",
        contactNum: "",
        position: "Librarian-in-Charge",
        profileURL: "",
      });
      setNewUserPasswords({ password: "", confirmPassword: "" });
      setNewUserPasswordError("");
    } catch (err) {
      console.error("Error creating user:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to create user. Please try again.";

      setNewUserPasswordError(errorMessage);

      toast.error("Failed to Create User", {
        description: errorMessage,
        duration: 4000,
      });
    }
  };

  // ─── Render ───
  if (!mounted) {
    return (
      <div className="flex flex-col w-auto bg-midnight p-6 rounded-xl border-1 border-white-5 animate-pulse">
        <div className="flex justify-between w-auto">
          <div className="h-8 bg-gray-700 rounded w-48"></div>
          <div className="h-10 bg-gray-700 rounded w-32"></div>
        </div>
        <div className="h-0.5 w-auto my-4 bg-dusk"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-700 rounded"></div>
          <div className="h-12 bg-gray-700 rounded"></div>
          <div className="h-12 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col w-auto ${
        theme === "light" ? "bg-secondary border-white-50" : "bg-midnight"
      } p-6 rounded-xl border-1 border-white-5`}
    >
      {/* ─── Edit User Modal ─── */}
      <EditUserModal
        theme={theme}
        show={showEditModal}
        user={currentEditUser}
        passwords={passwords}
        passwordError={passwordError}
        onInputChange={handleEditInputChange}
        onPasswordChange={handleEditPasswordChange}
        onCancel={handleCancelEdit}
        onSave={handleSaveEdit}
      />

      {/* ─── Add User Modal ─── */}
      <AddUserModal
        theme={theme}
        show={showAddModal}
        newUser={newUser}
        newUserPasswords={newUserPasswords}
        newUserPasswordError={newUserPasswordError}
        onInputChange={handleNewUserInputChange}
        onPasswordChange={handleNewUserPasswordChange}
        onCancel={() => setShowAddModal(false)}
        onAddUser={handleAddUser}
      />

      {/* ─── Header + Create New Button ─── */}
      <div className="flex justify-between w-auto">
        <h1 className="text-2xl ml-1">Manage Users</h1>
        <button
          onClick={handleAddClick}
          className="bg-gold p-2 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer hover:brightness-110 transition-all duration-200"
        >
          <span className="hidden md:block text-sm">Create New</span>
          <Plus className="w-4 h-4 md:hidden" />
        </button>
      </div>

      <div
        className={`h-0.5 w-auto my-4 ${
          theme === "light" ? "bg-white-50" : "bg-dusk"
        }`}
      ></div>

      {/* ─── Admin/Staff Section ─── */}
      <div className="mb-8">


        {/* ─── Instruction Text ─── */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            💡 Click on any user to select them and update their information.
          </p>
        </div>

        {/* ─── Users Table ─── */}
        {loading ? (
          <div className="space-y-4">
            <div className="h-12 bg-secondary rounded animate-pulse"></div>
            <div className="h-12 bg-secondary rounded animate-pulse"></div>
          </div>
        ) : (
          <UsersTable
            users={users}
            onEditClick={handleEditClick}
            theme={theme}
            selectedUserId={selectedUserId}
            editingUserId={editingUserId}
          />
        )}
      </div>

      {/* ─── Normal Users Section ─── */}
      <div>
        {/* Separator */}
        <div className="flex items-center my-8">
          <div
            className={`flex-1 h-px ${theme === "light" ? "bg-gray-200" : "bg-gray-600"}`}
          ></div>
          <div className="px-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Normal Users
            </span>
          </div>
          <div
            className={`flex-1 h-px ${theme === "light" ? "bg-gray-200" : "bg-gray-600"}`}
          ></div>
        </div>

        {/* Collapsible Header */}
        <div
          className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
            theme === "light"
              ? "bg-gray-50 border-gray-200 hover:bg-gray-100"
              : "bg-gray-800/50 border-gray-600 hover:bg-gray-800/70"
          }`}
          onClick={() => setShowNormalUsers(!showNormalUsers)}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {showNormalUsers ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
              <h2 className="text-xl font-semibold">View Users</h2>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {normalUsersLoading ? (
                "Loading..."
              ) : (
                <>
                  {normalUsers.filter((u) => u.role === "STUDENT").length}{" "}
                  students,{" "}
                  {normalUsers.filter((u) => u.role === "FACULTY").length}{" "}
                  faculty
                </>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-400 italic">
            {showNormalUsers ? "Click to hide" : "Click to view"}
          </div>
        </div>

        {/* Collapsible Content */}
        {showNormalUsers && (
          <div className="mt-4 space-y-4">
            {/* ─── Info Text ─── */}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                📖 Read-only view of registered students and faculty members
              </p>
            </div>

            {/* ─── Normal Users Table ─── */}
            <NormalUsersTable
              users={normalUsers}
              loading={normalUsersLoading}
              theme={theme}
            />
          </div>
        )}
      </div>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#f9fafb" : "#111827",
            border:
              theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
          },
        }}
      />
    </div>
  );
}

export default function ManageUsersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ManageUserContent />
    </Suspense>
  );
}
