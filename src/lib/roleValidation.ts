// lib/roleValidation.ts
import { prisma } from "@/lib/prisma";

// Define role limits configuration
export const ROLE_LIMITS = {
  ADMIN: 2, // Chief Librarian - max 2 active accounts
  ASSISTANT: 2, // Chief's Secretary - max 2 active accounts
  LIBRARIAN: 5, // Librarian-in-Charge - max 5 active accounts
} as const;

// Type for role names
export type RoleName = keyof typeof ROLE_LIMITS;

// Interface for role count result
export interface RoleCountResult {
  role: RoleName;
  activeCount: number;
  limit: number;
  available: number;
  isAtLimit: boolean;
  isOverLimit: boolean;
}

// Interface for validation result
export interface RoleValidationResult {
  isValid: boolean;
  message: string;
  currentCount: number;
  limit: number;
  available: number;
}

// 🆕 NEW: Interface for UI-friendly validation result
export interface UIValidationResult extends RoleValidationResult {
  messageType: "success" | "error" | "info" | "warning";
  actionRequired?: string;
  icon?: string;
}

/**
 * Count active users by role
 * Only counts users with status = 'ACTIVE' (or null/empty treated as ACTIVE)
 */
export async function countActiveUsersByRole(role: RoleName): Promise<number> {
  try {
    const count = await prisma.users.count({
      where: {
        role: role,
        OR: [{ status: "ACTIVE" }, { status: null }, { status: "" }],
      },
    });

    console.log(`📊 Active ${role} users: ${count}/${ROLE_LIMITS[role]}`);
    return count;
  } catch (error) {
    console.error(`❌ Error counting ${role} users:`, error);
    throw new Error(`Failed to count ${role} users`);
  }
}

/**
 * Get role count information for a specific role
 */
export async function getRoleCountInfo(
  role: RoleName,
): Promise<RoleCountResult> {
  const activeCount = await countActiveUsersByRole(role);
  const limit = ROLE_LIMITS[role];
  const available = Math.max(0, limit - activeCount);

  return {
    role,
    activeCount,
    limit,
    available,
    isAtLimit: activeCount >= limit,
    isOverLimit: activeCount > limit,
  };
}

/**
 * Check if creating a new user with the given role would exceed limits
 */
export async function validateNewUserRole(
  role: RoleName,
): Promise<RoleValidationResult> {
  const roleInfo = await getRoleCountInfo(role);

  if (roleInfo.isAtLimit) {
    return {
      isValid: false,
      message: `Cannot create new ${role} user. Maximum limit of ${roleInfo.limit} active accounts reached. Currently have ${roleInfo.activeCount} active accounts. Deactivate an account to free a slot.`,
      currentCount: roleInfo.activeCount,
      limit: roleInfo.limit,
      available: 0,
    };
  }

  return {
    isValid: true,
    message: `Can create ${role} user. ${roleInfo.available} slot(s) available.`,
    currentCount: roleInfo.activeCount,
    limit: roleInfo.limit,
    available: roleInfo.available,
  };
}

/**
 * Check if changing a user's role would exceed limits
 * excludeUserId: The user being updated (to exclude from count)
 */
export async function validateRoleChange(
  newRole: RoleName,
  excludeUserId?: number,
): Promise<RoleValidationResult> {
  try {
    // Count active users excluding the user being updated
    const count = await prisma.users.count({
      where: {
        role: newRole,
        OR: [{ status: "ACTIVE" }, { status: null }, { status: "" }],
        ...(excludeUserId && { user_id: { not: excludeUserId } }),
      },
    });

    const limit = ROLE_LIMITS[newRole];
    const available = Math.max(0, limit - count);

    if (count >= limit) {
      return {
        isValid: false,
        message: `Cannot change role to ${newRole}. Maximum limit of ${limit} active accounts reached. Currently have ${count} active accounts.`,
        currentCount: count,
        limit,
        available: 0,
      };
    }

    return {
      isValid: true,
      message: `Can change role to ${newRole}. ${available} slot(s) available.`,
      currentCount: count,
      limit,
      available,
    };
  } catch (error) {
    console.error(`❌ Error validating role change to ${newRole}:`, error);
    throw new Error(`Failed to validate role change to ${newRole}`);
  }
}

/**
 * Check if changing a user's status from INACTIVE to ACTIVE would exceed limits
 */
export async function validateStatusChange(
  role: RoleName,
  newStatus: string,
  excludeUserId?: number,
): Promise<RoleValidationResult> {
  try {
    // Only validate when changing TO active status
    if (newStatus !== "ACTIVE") {
      return {
        isValid: true,
        message: "", // ✅ Remove confusing "INACTIVE is allowed" message
        currentCount: 0,
        limit: ROLE_LIMITS[role],
        available: ROLE_LIMITS[role],
      };
    }

    // Count active users excluding the user being updated
    const count = await prisma.users.count({
      where: {
        role: role,
        OR: [{ status: "ACTIVE" }, { status: null }, { status: "" }],
        ...(excludeUserId && { user_id: { not: excludeUserId } }),
      },
    });

    const limit = ROLE_LIMITS[role];
    const available = Math.max(0, limit - count);

    console.log(`📊 Status change validation for ${role}:`, {
      currentActiveCount: count,
      limit,
      available,
      excludeUserId,
      newStatus,
    });

    if (count >= limit) {
      return {
        isValid: false,
        message: `❌ Cannot activate ${role} user. Maximum limit of ${limit} active accounts reached. Currently have ${count} active accounts. Deactivate another ${role.toLowerCase()} user first to free up a slot.`,
        currentCount: count,
        limit,
        available: 0,
      };
    }

    return {
      isValid: true,
      message: `✅ Can activate ${role} user. ${available} slot(s) available (${count}/${limit} currently active).`,
      currentCount: count,
      limit,
      available,
    };
  } catch (error) {
    console.error(`❌ Error validating status change for ${role}:`, error);
    throw new Error(`Failed to validate status change for ${role}`);
  }
}

/**
 * 🆕 NEW: Enhanced status validation for UI with contextual messages
 */
export async function validateStatusChangeForUI(
  role: RoleName,
  currentStatus: string,
  newStatus: string,
  excludeUserId?: number,
): Promise<UIValidationResult> {
  try {
    const normalizedCurrentStatus = currentStatus || "ACTIVE";
    const normalizedNewStatus = newStatus || "ACTIVE";

    // Get current role info for context
    const roleInfo = await getRoleCountInfo(role);
    const count = excludeUserId
      ? await prisma.users.count({
          where: {
            role: role,
            OR: [{ status: "ACTIVE" }, { status: null }, { status: "" }],
            user_id: { not: excludeUserId },
          },
        })
      : roleInfo.activeCount;

    const limit = ROLE_LIMITS[role];
    const available = Math.max(0, limit - count);

    // If changing from INACTIVE to ACTIVE
    if (
      normalizedCurrentStatus !== "ACTIVE" &&
      normalizedNewStatus === "ACTIVE"
    ) {
      if (count >= limit) {
        return {
          isValid: false,
          message: `Cannot activate ${role.toLowerCase()} user. Maximum limit of ${limit} active accounts reached. Currently have ${count} active accounts.`,
          messageType: "error",
          icon: "❌",
          actionRequired: `Deactivate another ${role.toLowerCase()} user first to free up a slot.`,
          currentCount: count,
          limit,
          available: 0,
        };
      }

      return {
        isValid: true,
        message: `Can activate this ${role.toLowerCase()} user. ${available} slot(s) available.`,
        messageType: "success",
        icon: "✅",
        currentCount: count,
        limit,
        available,
      };
    }

    // If changing from ACTIVE to INACTIVE
    if (
      normalizedCurrentStatus === "ACTIVE" &&
      normalizedNewStatus === "INACTIVE"
    ) {
      return {
        isValid: true,
        message: `This will deactivate the ${role.toLowerCase()} user and free up 1 slot for new users.`,
        messageType: "info",
        icon: "ℹ️",
        currentCount: count,
        limit,
        available: available + 1, // Will have one more slot after deactivation
      };
    }

    // If no status change and currently active, show current stats
    if (
      normalizedCurrentStatus === normalizedNewStatus &&
      normalizedNewStatus === "ACTIVE"
    ) {
      return {
        isValid: true,
        message: `Current ${role.toLowerCase()} users: ${count}/${limit} active accounts`,
        messageType: count >= limit ? "warning" : "info",
        icon: "📊",
        currentCount: count,
        limit,
        available,
      };
    }

    // Default case (no meaningful change)
    return {
      isValid: true,
      message: "",
      messageType: "info",
      currentCount: count,
      limit,
      available,
    };
  } catch (error) {
    console.error(`❌ Error validating status change for UI:`, error);
    return {
      isValid: false,
      message: "Failed to validate status change",
      messageType: "error",
      icon: "❌",
      currentCount: 0,
      limit: ROLE_LIMITS[role],
      available: 0,
    };
  }
}

/**
 * 🆕 NEW: Get validation message for role selection in forms
 */
export async function getRoleSelectionInfo(
  role: RoleName,
): Promise<UIValidationResult> {
  try {
    const roleInfo = await getRoleCountInfo(role);

    if (roleInfo.isAtLimit) {
      return {
        isValid: false,
        message: `${role} role is at capacity (${roleInfo.activeCount}/${roleInfo.limit})`,
        messageType: "warning",
        icon: "⚠️",
        actionRequired:
          "Deactivate an existing account or choose a different role",
        currentCount: roleInfo.activeCount,
        limit: roleInfo.limit,
        available: 0,
      };
    }

    if (roleInfo.available <= 1) {
      return {
        isValid: true,
        message: `${role} role: ${roleInfo.available} slot remaining (${roleInfo.activeCount}/${roleInfo.limit})`,
        messageType: "warning",
        icon: "⚠️",
        currentCount: roleInfo.activeCount,
        limit: roleInfo.limit,
        available: roleInfo.available,
      };
    }

    return {
      isValid: true,
      message: `${role} role: ${roleInfo.available} slots available (${roleInfo.activeCount}/${roleInfo.limit})`,
      messageType: "success",
      icon: "✅",
      currentCount: roleInfo.activeCount,
      limit: roleInfo.limit,
      available: roleInfo.available,
    };
  } catch (error) {
    console.error(`❌ Error getting role selection info:`, error);
    return {
      isValid: false,
      message: "Failed to get role information",
      messageType: "error",
      icon: "❌",
      currentCount: 0,
      limit: ROLE_LIMITS[role],
      available: 0,
    };
  }
}

/**
 * Get all role counts at once (useful for dashboard displays)
 */
export async function getAllRoleCounts(): Promise<RoleCountResult[]> {
  const roles: RoleName[] = ["ADMIN", "ASSISTANT", "LIBRARIAN"];
  const results: RoleCountResult[] = [];

  for (const role of roles) {
    const roleInfo = await getRoleCountInfo(role);
    results.push(roleInfo);
  }

  return results;
}

/**
 * Get users that exceed role limits (for cleanup operations)
 */
export async function getOverLimitAccounts(): Promise<
  {
    role: RoleName;
    excess: number;
    users: Array<{
      id: number;
      name: string;
      email: string;
      employeeID: string;
    }>;
  }[]
> {
  const results = [];
  const roles: RoleName[] = ["ADMIN", "ASSISTANT", "LIBRARIAN"];

  for (const role of roles) {
    const roleInfo = await getRoleCountInfo(role);

    if (roleInfo.isOverLimit) {
      const excess = roleInfo.activeCount - roleInfo.limit;

      // Get the excess users for this role
      const users = await prisma.users.findMany({
        where: {
          role: role,
          OR: [{ status: "ACTIVE" }, { status: null }, { status: "" }],
        },
        include: {
          librarian: {
            select: {
              employee_id: true,
            },
          },
        },
        orderBy: {
          created_at: "desc", // Most recent users first (candidates for deactivation)
        },
      });

      results.push({
        role,
        excess,
        users: users.map((user) => ({
          id: user.user_id,
          name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
          email: user.email,
          employeeID: user.librarian?.employee_id?.toString() || "",
        })),
      });
    }
  }

  return results;
}
