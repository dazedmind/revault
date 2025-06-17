// File: src/app/admin/settings/security/manage-users/page.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, ChangeEvent, Suspense, useRef } from "react";
import { Plus } from "lucide-react";
import { toast, Toaster } from "sonner";

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
  profileURL: string; 
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

  // ─── Function to get automatic position based on user access ───
  const getPositionFromUserAccess = (userAccess: string): string => {
    const positionMapping: { [key: string]: string } = {
      Admin: "Chief Librarian",
      "Admin Assistant": "Chief's Secretary",
      "Librarian-in-Charge": "Librarian-in-Charge",
    };
    return positionMapping[userAccess] || "";
  };

  // ─── Function to get role based on user access ───
  const getRoleFromUserAccess = (userAccess: string): string => {
    const roleMapping: { [key: string]: string } = {
      "Librarian-in-Charge": "LIBRARIAN",
      "Admin Assistant": "ASSISTANT",
      Admin: "ADMIN",
    };
    return roleMapping[userAccess] || "LIBRARIAN";
  };

  // ─── Function to generate dynamic change messages ───
  const generateChangeMessage = (
    original: FrontendUser,
    updated: FrontendUser,
  ): string => {
    const changes: string[] = [];

    // Check each field for changes
    if (original.fullName !== updated.fullName) {
      changes.push(`First name "${original.fullName}" → "${updated.fullName}"`);
    }
    if (original.middleName !== updated.middleName) {
      changes.push(
        `Middle name "${original.middleName}" → "${updated.middleName}"`,
      );
    }
    if (original.lastName !== updated.lastName) {
      changes.push(`Last name "${original.lastName}" → "${updated.lastName}"`);
    }
    if (original.extension !== updated.extension) {
      changes.push(
        `Extension "${original.extension}" → "${updated.extension}"`,
      );
    }
    if (original.email !== updated.email) {
      changes.push(`Email "${original.email}" → "${updated.email}"`);
    }
    if (original.userAccess !== updated.userAccess) {
      changes.push(`Role "${original.userAccess}" → "${updated.userAccess}"`);
    }
    if (original.position !== updated.position) {
      changes.push(`Position "${original.position}" → "${updated.position}"`);
    }
    if (original.contactNum !== updated.contactNum) {
      changes.push(
        `Contact "${original.contactNum}" → "${updated.contactNum}"`,
      );
    }
    if (original.status !== updated.status) {
      changes.push(`Status "${original.status}" → "${updated.status}"`);
    }

    if (changes.length === 0) {
      return "No changes detected";
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
    position: "Librarian-in-Charge", // Auto-populate default
    profileURL: "",
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

    // Get user info for toast message
    const userInfo = users.find((u) => u.id === userToDelete);
    const userName = userInfo
      ? `${userInfo.fullName} ${userInfo.lastName}`
      : `User #${userToDelete}`;

    try {
      const res = await fetch(`/admin/api/delete-user/${userToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete user (${res.status})`);
      }

      // Show success toast
      toast.success("User Deleted Successfully", {
        description: `${userName} has been removed from the system.`,
        duration: 4000,
      });

      // Update local state immediately
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Error deleting user:", err);

      // Show error toast
      toast.error("Failed to Delete User", {
        description: `Could not delete ${userName}. Please try again.`,
        duration: 4000,
      });
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
    const { name, value } = e.target;

    setCurrentEditUser((prev) => {
      if (!prev) return prev;

      const updatedUser = { ...prev, [name]: value };

      // If userAccess changed, automatically update position and role
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

    // Store original user data for comparison
    const originalUser = users.find((u) => u.id === currentEditUser.id);
    if (!originalUser) return;

    // Password validation (if passwords are provided)
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

    // Get the automatic position and role
    const automaticPosition = getPositionFromUserAccess(
      currentEditUser.userAccess,
    );
    const automaticRole = getRoleFromUserAccess(currentEditUser.userAccess);

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
          role: automaticRole, // Use automatic role
          status: currentEditUser.status,
          contactNum: currentEditUser.contactNum,
          position: automaticPosition, // Use automatic position
          password: passwords.newPassword || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update user (${res.status})`);
      }

      const data = await res.json();
      const updatedUser = {
        ...currentEditUser,
        position: automaticPosition,
        role: automaticRole,
      };

      // Generate dynamic success message
      const changeMessage = generateChangeMessage(originalUser, updatedUser);

      // Show success toast with changes
      toast.success("User Updated Successfully", {
        description: changeMessage,
        duration: 4000,
      });

      // Update local state immediately
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
      );

      // Close modal and reset state
      setCurrentEditUser(null);
      setPasswords({ newPassword: "", confirmPassword: "" });
      setPasswordError("");
    } catch (err) {
      console.error("Error updating user:", err);
      setPasswordError("Failed to update user. Please try again.");

      // Show error toast
      toast.error("Failed to Update User", {
        description:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while updating the user.",
        duration: 4000,
      });
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

      // If userAccess changed, automatically update position and role
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

    // Get the automatic position and role
    const automaticPosition = getPositionFromUserAccess(newUser.userAccess);
    const automaticRole = getRoleFromUserAccess(newUser.userAccess);

    const apiPayload = {
      fullName: newUser.fullName,
      midName: newUser.middleName,
      lastName: newUser.lastName,
      extName: newUser.extension,
      employeeID: newUser.employeeID,
      email: newUser.email,
      role: automaticRole, // Use automatic role
      password: newUserPasswords.password,
      confirmPassword: newUserPasswords.confirmPassword,
      position: automaticPosition, // Use automatic position
    };

    try {
      const res = await fetch("/admin/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });

      if (!res.ok) {
        throw new Error(`Failed to create user (${res.status})`);
      }

      const data = await res.json();

      if (data.success) {
        // Generate user details for success message
        const userName = `${newUser.fullName} ${newUser.lastName}${newUser.extension ? " " + newUser.extension : ""}`;
        const userDetails = [
          `Role: ${newUser.userAccess}`,
          `Position: ${automaticPosition}`,
          `Email: ${newUser.email}`,
          `Employee ID: ${newUser.employeeID}`,
        ].join(", ");

        // Show success toast
        toast.success("User Created Successfully", {
          description: `${userName} has been added to the system. ${userDetails}`,
          duration: 5000,
        });

        // Refresh users list
        const usersRes = await fetch("/admin/api/users");
        const usersData = await usersRes.json();

        if (usersData.success) {
          setUsers(usersData.users);
        }

        // Close modal and reset state
        setShowAddModal(false);
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
      } else {
        throw new Error(data.message || "Failed to create user");
      }
    } catch (err) {
      console.error("Error creating user:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to create user. Please try again.";

      setNewUserPasswordError(errorMessage);

      // Show error toast
      toast.error("Failed to Create User", {
        description: errorMessage,
        duration: 4000,
      });
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
        <h1 className="text-2xl ml-1">Manage Librarians</h1>
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

      {/* Toaster positioned at bottom right */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#f9fafb" : "#111827",
            border:
              theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
          },
        }}
        richColors
      />
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
