// src/app/admin/api/users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("🔍 Fetching admin/staff users...");

    // Fetch all users with admin/staff roles and their librarian details
    const users = await prisma.users.findMany({
      where: {
        role: {
          in: ["ADMIN", "ASSISTANT", "LIBRARIAN"],
        },
      },
      include: {
        librarian: true, // Include librarian table data
      },
      orderBy: {
        created_at: "desc",
      },
    });

    console.log(`✅ Found ${users.length} admin/staff users`);

    // Map to frontend format
    const mappedUsers = users.map((user) => ({
      id: user.user_id,
      fullName: user.first_name || "",
      middleName: user.mid_name || "",
      lastName: user.last_name || "",
      extension: user.ext_name || "",
      employeeID: user.librarian?.employee_id?.toString() || "", // Convert number to string
      email: user.email,
      role: user.role || "",
      status: "Active", // You can add a status field to your schema if needed
      userAccess: getUserAccessFromRole(user.role || ""),
      contactNum: user.librarian?.contact_num?.toString() || "0",
      position: user.librarian?.position || "",
      name: `${user.first_name || ""} ${user.last_name || ""}${user.ext_name ? " " + user.ext_name : ""}`.trim(),
    }));

    console.log("📋 Mapped users:", mappedUsers.length);

    return NextResponse.json({
      success: true,
      users: mappedUsers,
    });
  } catch (error) {
    console.error("💥 Error fetching admin/staff users:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Helper function to map role to userAccess display value
function getUserAccessFromRole(role: string): string {
  const roleMapping: { [key: string]: string } = {
    LIBRARIAN: "Librarian-in-Charge",
    ADMIN: "Admin",
    ASSISTANT: "Admin Assistant",
  };

  return roleMapping[role] || role;
}
