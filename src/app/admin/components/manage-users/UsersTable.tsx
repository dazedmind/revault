// File: components/manage-users/UsersTable.tsx
"use client";
import Image from "next/image";
import { FaPen, FaLock, FaUser } from "react-icons/fa";
import userAvatar from "../../../img/user.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  fullName: string;
  middleName: string;
  lastName: string;
  extension: string;
  employeeID: string;
  userAccess: string;
  contactNum: string;
  position: string;
  profileURL: string;
}

interface UsersTableProps {
  users: User[];
  onEditClick: (user: User) => void;
  theme: string;
  selectedUserId?: number | null;
  editingUserId?: number | null;
}

export default function UsersTable({
  users,
  onEditClick,
  theme,
  selectedUserId,
  editingUserId,
}: UsersTableProps) {
  const VISIBLE_ROLES = ["ADMIN", "ASSISTANT", "LIBRARIAN"];

  // Get current user info from JWT token
  const getCurrentUserId = (): number | null => {
    if (typeof window === "undefined") return null;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.user_id || null;
    } catch (error) {
      console.error("Error getting current user ID:", error);
      return null;
    }
  };

  const getCurrentUserEmail = (): string | null => {
    if (typeof window === "undefined") return null;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.email || null;
    } catch (error) {
      console.error("Error getting current user email:", error);
      return null;
    }
  };

  const currentUserId = getCurrentUserId();
  const currentUserEmail = getCurrentUserEmail();

  // Filter users based on visible roles
  const filteredUsers = users.filter((u) => {
    const normalizedRole = u.role?.trim().toUpperCase() ?? "";
    return VISIBLE_ROLES.includes(normalizedRole);
  });

  // Helper function to check if user is the current logged-in user
  const isCurrentUser = (user: User): boolean => {
    // Try matching by user ID first (most reliable)
    if (currentUserId && user.id === currentUserId) {
      return true;
    }
    // Fallback to email matching
    if (currentUserEmail && user.email === currentUserEmail) {
      return true;
    }
    return false;
  };

  // Helper function to format user display name
  const formatUserDisplayInfo = (user: User) => {
    const displayName =
      user.name ||
      `${user.fullName} ${user.lastName}${user.extension ? " " + user.extension : ""}`;
    return {
      name: displayName,
      subtitle: user.position || user.employeeID,
      status: user.status,
    };
  };

  // Helper function to get role badge styling
  const getRoleBadgeClass = (role: string) => {
    const baseClass = "px-2 py-1 rounded-full text-xs font-medium";
    switch (role?.toUpperCase()) {
      case "LIBRARIAN":
        return `${baseClass} bg-blue-500/20 text-blue-500`;
      case "ADMIN":
        return `${baseClass} bg-purple-500/20 text-purple-500`;
      case "ASSISTANT":
        return `${baseClass} bg-yellow-500/20 text-yellow-500`;
      default:
        return `${baseClass} bg-gray-500/20 text-gray-500`;
    }
  };

  // Helper function to get status badge styling and handle missing status
  const getStatusBadgeClass = (status: string | null | undefined) => {
    const baseClass = "px-2 py-1 rounded-full text-xs font-medium";

    // Normalize the status - treat empty/null as ACTIVE
    const normalizedStatus =
      !status || status.trim() === "" ? "ACTIVE" : status.toUpperCase();

    switch (normalizedStatus) {
      case "ACTIVE":
        return `${baseClass} bg-green-500/20 text-green-500`;
      case "INACTIVE":
        return `${baseClass} bg-red-500/20 text-red-500`;
      default:
        return `${baseClass} bg-gray-500/20 text-gray-500`;
    }
  };

  // Helper function to display status text
  const getStatusText = (status: string | null | undefined) => {
    // Normalize the status - treat empty/null as ACTIVE
    if (!status || status.trim() === "") {
      return "ACTIVE";
    }
    return status.toUpperCase();
  };

  // RBAC permission checking
  const canUserEdit = (userRole: string): boolean => {
    const currentUserRole =
      typeof window !== "undefined" ? localStorage.getItem("userType") : null;

    // ASSISTANT cannot edit ADMIN users
    return !(currentUserRole === "ASSISTANT" && userRole === "ADMIN");
  };

  // Helper function to get row styling based on state, permissions, and current user
  const getRowClass = (
    userId: number,
    userRole: string,
    isCurrentUserRow: boolean,
  ) => {
    const canEdit = canUserEdit(userRole);

    let baseClass = "transition-all duration-200";

    // Current user highlighting (highest priority visual indicator)
    if (isCurrentUserRow) {
      baseClass +=
        " bg-gradient-to-r from-gold/10 to-gold/5 border-l-4 border-gold shadow-md";
      if (canEdit) {
        baseClass += " cursor-pointer";
      }
    }
    // If user cannot be edited, make it visually distinct
    else if (!canEdit) {
      baseClass +=
        " opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-900/50";
    } else {
      baseClass += " cursor-pointer";
    }

    // User being edited (should show on top of current user highlighting)
    if (editingUserId === userId && canEdit) {
      if (isCurrentUserRow) {
        baseClass = baseClass.replace("border-gold", "border-blue-500");
        baseClass += " ring-2 ring-blue-300 dark:ring-blue-700";
      } else {
        baseClass +=
          " bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 shadow-md";
      }
    }
    // User row selected/clicked (but not editing)
    else if (selectedUserId === userId && canEdit && !isCurrentUserRow) {
      baseClass +=
        " bg-gray-100 dark:bg-gray-800/70 border-l-2 border-gray-400";
    }

    // Default hover state only for editable users
    if (canEdit && !isCurrentUserRow) {
      baseClass += " hover:bg-card-foreground";
    } else if (canEdit && isCurrentUserRow) {
      baseClass += " hover:from-gold/15 hover:to-gold/8";
    }

    return baseClass;
  };

  // Handle row click with permission checking
  const handleRowClick = (user: User, event: React.MouseEvent) => {
    const canEdit = canUserEdit(user.role);

    if (!canEdit) {
      console.log(
        `Cannot edit ${user.role} user: ASSISTANT role cannot edit ADMIN users`,
      );
      return;
    }

    // Trigger edit for the clicked user (including self-editing)
    onEditClick(user);
  };

  // Helper function to render the action indicator
  const renderActionIndicator = (user: User) => {
    const canEdit = canUserEdit(user.role);
    const isCurrentUserRow = isCurrentUser(user);

    if (!canEdit) {
      return (
        <div className="flex items-center justify-center">
          <FaLock
            className="w-3 h-3 text-gray-400"
            title={`Cannot edit ${user.role} user: ASSISTANT role cannot edit ADMIN users`}
          />
        </div>
      );
    }

    // Show different icon for current user
    if (isCurrentUserRow) {
      return (
        <div className="flex items-center justify-center opacity-70 group-hover:opacity-100">
          <FaUser
            className="w-3 h-3 text-gold"
            title="This is your account - click to edit your profile"
          />
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center opacity-70 group-hover:opacity-100">
        <FaPen className="w-3 h-3 text-gray-500" />
      </div>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px]">Action</TableHead>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead className="w-[250px]">Email</TableHead>
          <TableHead className="w-[120px]">Employee ID</TableHead>
          <TableHead className="w-[120px]">Role</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filteredUsers.length === 0 ? (
          <TableRow key="no-users">
            <TableCell colSpan={6} className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No users found matching the criteria.
              </p>
            </TableCell>
          </TableRow>
        ) : (
          filteredUsers.map((user) => {
            const userInfo = formatUserDisplayInfo(user);
            const isSelected = selectedUserId === user.id;
            const isEditing = editingUserId === user.id;
            const canEdit = canUserEdit(user.role);
            const isCurrentUserRow = isCurrentUser(user);

            return (
              <TableRow
                key={`user-${user.id}`}
                className={`${getRowClass(user.id, user.role, isCurrentUserRow)} group`}
                onClick={(e) => handleRowClick(user, e)}
                role="button"
                tabIndex={canEdit ? 0 : -1}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && canEdit) {
                    e.preventDefault();
                    handleRowClick(user, e as any);
                  }
                }}
                title={
                  !canEdit
                    ? `Cannot edit ${user.role} user: ASSISTANT role cannot edit ADMIN users`
                    : isCurrentUserRow
                      ? "This is your account - click to edit your profile"
                      : "Click to edit user"
                }
              >
                <TableCell className="py-3 align-middle">
                  {renderActionIndicator(user)}
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src={user.profileURL || userAvatar}
                        alt="avatar"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {/* Current user indicator badge */}
                      {isCurrentUserRow && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${
                            isEditing ? "text-blue-600 dark:text-blue-400" : ""
                          } ${!canEdit ? "text-gray-500" : ""} ${
                            isCurrentUserRow ? "text-gold font-semibold" : ""
                          }`}
                        >
                          {userInfo.name}
                          {isCurrentUserRow && (
                            <span className="text-xs text-gold ml-1">
                              (You)
                            </span>
                          )}
                        </span>
                      </div>
                      {userInfo.subtitle && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {user.position && `${user.position}`}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span
                    className={`text-sm ${!canEdit ? "text-gray-500" : ""} ${
                      isCurrentUserRow ? "font-medium" : ""
                    }`}
                  >
                    {user.email}
                  </span>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span
                    className={`text-sm font-mono ${!canEdit ? "text-gray-500" : ""} ${
                      isCurrentUserRow ? "font-semibold" : ""
                    }`}
                  >
                    {user.employeeID}
                  </span>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span className={getRoleBadgeClass(user.role)}>
                    {user.role.trim()}
                  </span>
                </TableCell>

                <TableCell className="py-3 align-middle">
                  <span className={getStatusBadgeClass(user.status)}>
                    {getStatusText(user.status)}
                  </span>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
