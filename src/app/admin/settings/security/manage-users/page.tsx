// File: src/app/admin/settings/security/manage-users/page.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, ChangeEvent, Suspense, useRef } from "react";
import { Plus } from "lucide-react";

import UsersTable from "@/app/admin/components/manage-users/UsersTable";
import AddUserModal from "@/app/admin/components/manage-users/AddUserModal";
import DeleteConfirmationModal from "@/app/admin/components/manage-users/DeleteConfirmationModal";
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
}

function ManageUserContent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const usersFetched = useRef(false);

  // ─── Users state ───
  const [users, setUsers] = useState<FrontendUser[]>([]);
  const [loading, setLoading] = useState(true);

  // ─── Delete modal state ───
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

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
    position: "",
  });
  const [newUserPasswords, setNewUserPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [newUserPasswordError, setNewUserPasswordError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Fetch admin/staff users (only once) ───
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

    fetchUsers();
  }, [mounted]);

  // ─── Delete handlers ───
  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete === null) return;

    try {
      const res = await fetch(`/admin/api/delete-user/${userToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete user (${res.status})`);
      }

      // Update local state immediately
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Error deleting user:", err);
      // TODO: Show error toast
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // ─── Edit handlers ───
  const handleEditClick = (user: FrontendUser) => {
    setCurrentEditUser({ ...user });
    setPasswords({ newPassword: "", confirmPassword: "" });
    setPasswordError("");
    setShowEditModal(true);
  };

  const handleEditInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (!currentEditUser) return;
    const { name, value } = e.target;
    setCurrentEditUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleEditPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    if (!currentEditUser) return;

    // Validation
    if (passwords.newPassword || passwords.confirmPassword) {
      if (passwords.newPassword !== passwords.confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      if (passwords.newPassword.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        return;
      }
    }

    try {
      const res = await fetch(`/admin/api/update-user/${currentEditUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: currentEditUser.fullName,
          middleName: currentEditUser.middleName,
          lastName: currentEditUser.lastName,
          extension: currentEditUser.extension,
          employeeID: currentEditUser.employeeID,
          email: currentEditUser.email,
          role: currentEditUser.role,
          status: currentEditUser.status,
          contactNum: currentEditUser.contactNum,
          position: currentEditUser.position,
          password: passwords.newPassword || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update user (${res.status})`);
      }

      const data = await res.json();
      const updatedUser = data.user;

      // Update local state immediately
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
      );

      // Close modal and reset state
      setShowEditModal(false);
      setCurrentEditUser(null);
      setPasswords({ newPassword: "", confirmPassword: "" });
      setPasswordError("");
    } catch (err) {
      console.error("Error updating user:", err);
      setPasswordError("Failed to update user. Please try again.");
    }
  };

  // ─── Add handlers ───
  const handleAddClick = () => {
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
      position: "Librarian-in-Charge", // Auto-populate default
    });
    setNewUserPasswords({ password: "", confirmPassword: "" });
    setNewUserPasswordError("");
    setShowAddModal(true);
  };

  const handleNewUserInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewUserPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUserPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    // Basic validation is handled in the modal component
    const roleMapping: { [key: string]: string } = {
      "Librarian-in-Charge": "LIBRARIAN",
      "Admin Assistant": "ASSISTANT",
      Admin: "ADMIN",
    };

    const apiPayload = {
      fullName: newUser.fullName,
      midName: newUser.middleName,
      lastName: newUser.lastName,
      extName: newUser.extension,
      employeeID: newUser.employeeID,
      email: newUser.email,
      role: roleMapping[newUser.userAccess] || "LIBRARIAN",
      password: newUserPasswords.password,
      confirmPassword: newUserPasswords.confirmPassword,
      position: newUser.position,
    };

    try {
      const res = await fetch("/admin/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `Failed to create user (${res.status})`,
        );
      }

      const data = await res.json();

      // Create frontend user object
      const createdUser: FrontendUser = {
        id: data.user.userId,
        fullName: data.user.fullName || newUser.fullName,
        middleName: data.user.middleName || newUser.middleName,
        lastName: data.user.lastName || newUser.lastName,
        extension: data.user.extension || newUser.extension,
        employeeID: data.user.employeeId || newUser.employeeID,
        email: data.user.email,
        role: data.user.role,
        status: "Active",
        userAccess: newUser.userAccess,
        contactNum: "0",
        position: data.user.position || newUser.position,
        name: `${newUser.fullName} ${newUser.lastName}${newUser.extension ? " " + newUser.extension : ""}`,
      };

      // Update local state immediately
      setUsers((prev) => [...prev, createdUser]);

      // Close modal and reset state
      setShowAddModal(false);
      setNewUserPasswordError("");
    } catch (err) {
      console.error("Error creating user:", err);
      setNewUserPasswordError(
        err instanceof Error
          ? err.message
          : "Failed to create user. Please try again.",
      );
    }
  };

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
      {/* ─── Delete Confirmation Modal ─── */}
      <DeleteConfirmationModal
        theme={theme}
        show={showDeleteModal}
        userToDelete={users.find((u) => u.id === userToDelete) || null}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      {/* ─── Edit User Modal ─── */}
      <EditUserModal
        theme={theme}
        show={showEditModal}
        user={currentEditUser}
        passwords={passwords}
        passwordError={passwordError}
        onInputChange={handleEditInputChange}
        onPasswordChange={handleEditPasswordChange}
        onCancel={() => {
          setShowEditModal(false);
          setCurrentEditUser(null);
          setPasswords({ newPassword: "", confirmPassword: "" });
          setPasswordError("");
        }}
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
        className={`h-0.5 w-auto my-4 ${theme === "light" ? "bg-white-50" : "bg-dusk"}`}
      />

      {/* ─── Users Table ─── */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      ) : (
        <UsersTable
          users={users}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
          theme={theme}
        />
      )}
    </div>
  );
}

function ManageUsersLoading() {
  return (
    <div className="flex flex-col w-auto bg-midnight p-6 rounded-xl border-1 border-white-5">
      <div className="flex justify-between w-auto animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-48"></div>
        <div className="h-10 bg-gray-700 rounded w-32"></div>
      </div>
      <div className="h-0.5 w-auto my-4 bg-dusk"></div>
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gray-700 rounded"></div>
        <div className="h-12 bg-gray-700 rounded"></div>
        <div className="h-12 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}

export default function ManageUserSettings() {
  return (
    <Suspense fallback={<ManageUsersLoading />}>
      <ManageUserContent />
    </Suspense>
  );
}
