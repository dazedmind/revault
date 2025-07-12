// lib/roleValidation.ts
import { prisma } from "@/lib/prisma";

// Define role limits configuration
export const ROLE_LIMITS = {
  ADMIN: 1, // Chief Librarian - max 1 active account
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
      message: `Cannot create new ${role} user. Maximum limit of ${roleInfo.limit} active accounts reached. Currently have ${roleInfo.activeCount} active accounts.`,
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
  // Only validate when changing TO active status
  if (newStatus !== "ACTIVE") {
    return {
      isValid: true,
      message: "Status change to INACTIVE is allowed.",
      currentCount: 0,
      limit: ROLE_LIMITS[role],
      available: ROLE_LIMITS[role],
    };
  }

  // Use the same logic as role change validation
  return validateRoleChange(role, excludeUserId);
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
