// File: src/app/admin/settings/security/manage-users/ManageUserSettings.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, ChangeEvent, Suspense } from "react";
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
  employeeID: string; // Changed from employeeId
  email: string;
  role: string;
  status: string;
  userAccess: string;
  contactNum: string; // Added
  position: string; // Added
  name: string;
}

function ManageUserContent() {
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
    employeeID: "", // Changed from employeeId
    email: "",
    role: "LIBRARIAN", // Changed to match enum
    status: "Active",
    userAccess: "Librarian-in-Charge", // Default to librarian
    contactNum: "", // Added
    position: "", // Added
  });
  const [newUserPasswords, setNewUserPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [newUserPasswordError, setNewUserPasswordError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Fetch admin/staff users ───
  useEffect(() => {
    if (!mounted) return;

    console.log("🔄 Fetching admin/staff users...");

    fetch("/admin/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch users (${res.status})`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Users fetched successfully:", data);
        if (data.success && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error("❌ Invalid response format:", data);
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("💥 Error fetching users:", err);
        setUsers([]);
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
        employeeID: currentEditUser.employeeID, // Changed from employeeId
        email: currentEditUser.email,
        role: currentEditUser.role,
        status: currentEditUser.status,
        contactNum: currentEditUser.contactNum, // Added
        position: currentEditUser.position, // Added
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
      employeeID: "", // Changed from employeeId
      email: "",
      role: "LIBRARIAN", // Changed to match enum
      status: "Active",
      userAccess: "Librarian-in-Charge", // Default selection
      contactNum: "", // Added
      position: "", // Added
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
    // Validation
    if (
      !newUser.fullName ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.employeeID ||
      !newUser.userAccess
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

    // Map userAccess to API role format
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
      employeeID: newUser.employeeID, // API expects this field name
      email: newUser.email,
      role: roleMapping[newUser.userAccess] || "LIBRARIAN", // Map to enum values
      password: newUserPasswords.password,
      confirmPassword: newUserPasswords.confirmPassword,
      position: newUser.position,
      // Removed contactNum since we don't need it
    };

    console.log("Sending API payload:", {
      ...apiPayload,
      password: "***",
      confirmPassword: "***",
    });

    fetch("/admin/api/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiPayload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(
              errorData.message || `Failed to create user (${res.status})`,
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("User created successfully:", data);

        // Create frontend user object from API response
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
          contactNum: "0", // Always 0 since we don't collect it
          position: data.user.position || newUser.position,
          name: `${newUser.fullName} ${newUser.lastName}${newUser.extension ? " " + newUser.extension : ""}`,
        };

        setUsers((prev) => [...prev, createdUser]);
        setShowAddModal(false);
        setNewUserPasswordError(""); // Clear any previous errors
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        setNewUserPasswordError(
          err.message || "Failed to create user. Please try again.",
        );
      });
  };

  if (!mounted) {
    return (
      <div className="flex flex-col w-auto bg-midnight p-6 rounded-xl border-1 border-white-5">
        <div className="flex justify-between w-auto">
          <h1 className="text-2xl ml-1">Manage Users</h1>
          <div className="bg-gold/20 p-2 px-4 rounded-lg">
            <span className="text-sm">Loading...</span>
          </div>
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

function ManageUsersLoading() {
  return (
    <div className="flex flex-col w-auto bg-midnight p-6 rounded-xl border-1 border-white-5">
      <div className="flex justify-between w-auto">
        <h1 className="text-2xl ml-1">Manage Users</h1>
        <div className="bg-gold/20 p-2 px-4 rounded-lg animate-pulse">
          <span className="text-sm">Loading...</span>
        </div>
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