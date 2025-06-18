// File: src/app/admin/api/normal-users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("🔍 Fetching normal users (students and faculty)...");

    // Fetch all users with STUDENT and FACULTY roles and their related data
    const users = await prisma.users.findMany({
      where: {
        role: {
          in: ["STUDENT", "FACULTY"],
        },
      },
      include: {
        students: true, // Include student data
        faculty: true, // Include faculty data
      },
      orderBy: [
        { role: "asc" }, // Students first, then faculty
        { created_at: "desc" }, // Most recent first within each role
      ],
    });

    console.log(`✅ Found ${users.length} normal users`);

    // Map to frontend format
    const mappedUsers = users.map((user) => {
      const baseUser = {
        id: user.user_id,
        fullName: user.first_name || "",
        middleName: user.mid_name || "",
        lastName: user.last_name || "",
        extension: user.ext_name || "",
        email: user.email,
        role: user.role as "STUDENT" | "FACULTY",
      };

      // Add role-specific data
      if (user.role === "STUDENT" && user.students) {
        return {
          ...baseUser,
          studentNumber: user.students.student_num?.toString() || "",
          program: user.students.program || "",
          college: user.students.college || "",
          yearLevel: user.students.year_level || 1,
        };
      } else if (user.role === "FACULTY" && user.faculty) {
        return {
          ...baseUser,
          employeeID: user.faculty.employee_id?.toString() || "",
          position: user.faculty.position || "",
          department: user.faculty.department || "",
        };
      }

      // Fallback for users without related data
      return baseUser;
    });

    console.log("📋 Mapped normal users:", mappedUsers.length);

    // Separate stats for debugging
    const studentCount = mappedUsers.filter((u) => u.role === "STUDENT").length;
    const facultyCount = mappedUsers.filter((u) => u.role === "FACULTY").length;
    console.log(`📊 Students: ${studentCount}, Faculty: ${facultyCount}`);

    return NextResponse.json({
      success: true,
      users: mappedUsers,
      stats: {
        total: mappedUsers.length,
        students: studentCount,
        faculty: facultyCount,
      },
    });
  } catch (error) {
    console.error("💥 Error fetching normal users:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch normal users",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
