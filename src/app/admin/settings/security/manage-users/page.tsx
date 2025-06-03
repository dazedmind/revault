// File: src/app/admin/components/manage-users/ManageUserSettings.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, ChangeEvent } from "react";
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
  employeeId: string;
  email: string;
  role: string;
  status: string;
  userAccess: string;
  name: string;
}

export default function ManageUserSettings() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ─── Users state ───
  const [users, setUsers] = useState<FrontendUser[]>([]);

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
    employeeId: "",
    email: "",
    role: "Librarian",
    status: "Active",
    userAccess: "Librarian",
  });
  const [newUserPasswords, setNewUserPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [newUserPasswordError, setNewUserPasswordError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Fetch “profile” via Bearer token from localStorage ───
  useEffect(() => {
    if (!mounted) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No authToken found in localStorage");
      return;
    }

    fetch("/admin/api/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch profile (${res.status})`);
        return res.json();
      })
      .then((data: any) => {
        if (data.error) {
          console.error("API error:", data.error);
          return;
        }
        const empId = data.employee_id as string;
        const fetched = Array.isArray(data.users) ? data.users : [];
        const mapped: FrontendUser[] = fetched.map((u: any) => ({
          id: Number(u.user_id),
          fullName: u.first_name,
          middleName: u.middle_name || "",
          lastName: u.last_name,
          extension: u.extension || "",
          employeeId: empId,
          email: u.email,
          role: u.role,
          status: u.status,
          userAccess: u.role,
          name: `${u.first_name} ${u.last_name}${u.extension ? " " + u.extension : ""}`,
        }));
        setUsers(mapped);
      })
      .catch((err) => {
        console.error("Error fetching profile/users:", err);
      });
  }, [mounted]);

  // ─── Delete handlers ───
  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };
  const handleConfirmDelete = () => {
    if (userToDelete === null) return;

    fetch(`/admin/api/delete-user/${userToDelete}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to delete user (${res.status})`);
        return res.json();
      })
      .then(() => {
        setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
        setShowDeleteModal(false);
        setUserToDelete(null);
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      });
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
  const handleSaveEdit = () => {
    if (!currentEditUser) return;

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

    fetch(`/admin/api/update-user/${currentEditUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: currentEditUser.fullName,
        middleName: currentEditUser.middleName,
        lastName: currentEditUser.lastName,
        extension: currentEditUser.extension,
        employeeId: currentEditUser.employeeId,
        email: currentEditUser.email,
        role: currentEditUser.role,
        status: currentEditUser.status,
        password: passwords.newPassword || undefined,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to update user (${res.status})`);
        return res.json();
      })
      .then((data: { user: FrontendUser }) => {
        const updatedUser = data.user;
        setUsers((prev) =>
          prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
        );
        setShowEditModal(false);
        setCurrentEditUser(null);
        setPasswords({ newPassword: "", confirmPassword: "" });
        setPasswordError("");
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  // ─── Add handlers ───
  const handleAddClick = () => {
    setNewUser({
      fullName: "",
      middleName: "",
      lastName: "",
      extension: "",
      employeeId: "",
      email: "",
      role: "Librarian",
      status: "Active",
      userAccess: "Librarian",
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
  const handleAddUser = () => {
    if (
      !newUser.fullName ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.employeeId
    ) {
      setNewUserPasswordError("Please fill in all required fields");
      return;
    }
    if (!newUserPasswords.password || !newUserPasswords.confirmPassword) {
      setNewUserPasswordError("Password is required");
      return;
    }
    if (newUserPasswords.password !== newUserPasswords.confirmPassword) {
      setNewUserPasswordError("Passwords do not match");
      return;
    }
    if (newUserPasswords.password.length < 6) {
      setNewUserPasswordError("Password must be at least 6 characters");
      return;
    }

    fetch("/admin/api/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: newUser.fullName,
        middleName: newUser.middleName,
        lastName: newUser.lastName,
        extension: newUser.extension,
        employeeId: newUser.employeeId,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        password: newUserPasswords.password,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to create user (${res.status})`);
        return res.json();
      })
      .then((data: { user: FrontendUser }) => {
        setUsers((prev) => [...prev, data.user]);
        setShowAddModal(false);
      })
      .catch((err) => {
        console.error("Error creating user:", err);
      });
  };

  if (!mounted) return null;

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
          className="bg-gold p-2 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer"
        >
          <span className="hidden md:block text-sm">Create New</span>
          <Plus className="block md:hidden" />
        </button>
      </div>

      <div
        className={`h-0.5 w-auto my-4 ${theme === "light" ? "bg-white-50" : "bg-dusk"}`}
      />

      {/* ─── Users Table ─── */}
      <UsersTable
        users={users}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
        theme={theme}
      />
    </div>
  );
}
