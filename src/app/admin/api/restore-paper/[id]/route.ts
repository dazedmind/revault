// src/app/api/restore-paper/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { activity_type } from "@prisma/client";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("🔄 Restore API called for paper ID:", id);

    // Verify authentication
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      console.log("❌ No token provided");
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    let payload: any;
    try {
      payload = jwt.verify(token, SECRET_KEY!);
      console.log("✅ JWT verified, role:", payload.role);
    } catch (error) {
      console.log("❌ JWT verification failed:", error.message);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Check if user is authorized (LIBRARIAN, ADMIN, or ASSISTANT)
    if (!["LIBRARIAN", "ADMIN", "ASSISTANT"].includes(payload.role)) {
      console.log("❌ Unauthorized role:", payload.role);
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const paperId = parseInt(id);
    if (isNaN(paperId)) {
      console.log("❌ Invalid paper ID:", id);
      return NextResponse.json({ error: "Invalid paper ID" }, { status: 400 });
    }

    // Check if paper exists and is deleted
    const existingPaper = await prisma.papers.findUnique({
      where: { paper_id: paperId },
    });

    if (!existingPaper) {
      console.log("❌ Paper not found:", paperId);
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    if (!existingPaper.is_deleted) {
      console.log("❌ Paper is not deleted:", paperId);
      return NextResponse.json({ error: "Paper is not deleted" }, { status: 400 });
    }

    console.log("✅ Paper found and is deleted:", existingPaper.title);

    // Restore the paper
    console.log("🔄 Restoring paper...");
    const restoredPaper = await prisma.papers.update({
      where: { paper_id: paperId },
      data: {
        is_deleted: false,
        deleted_at: null,
        updated_at: new Date(),
      },
    });

    console.log("✅ Paper restored successfully");

    // Log the restoration activity
    try {
      let employeeId = null;
      let userName = payload.firstName || "Unknown User";

      if (["LIBRARIAN", "ADMIN", "ASSISTANT"].includes(payload.role)) {
        const librarian = await prisma.librarian.findFirst({
          where: { user_id: parseInt(payload.user_id) },
          include: { users: true },
        });

        if (librarian) {
          employeeId = librarian.employee_id;
          userName = librarian.users?.first_name || userName;
        }
      }

      await prisma.activity_logs.create({
        data: {
          employee_id: employeeId,
          user_id: parseInt(payload.user_id),
          name: userName,
          activity: `Restored research paper: "${existingPaper.title}"`,
          activity_type: "RESTORE_DOCUMENT" as activity_type,
          user_agent: req.headers.get("user-agent") || "",
          ip_address:
            req.headers.get("x-forwarded-for") ||
            req.headers.get("x-real-ip") ||
            "unknown",
          status: "success",
          created_at: new Date(),
        },
      });

      console.log("✅ Activity logged for restoration");
    } catch (logError) {
      console.warn("⚠️ Failed to log restoration activity:", logError);
    }

    return NextResponse.json({
      success: true,
      message: "Paper restored successfully",
      paper: {
        id: restoredPaper.paper_id,
        title: restoredPaper.title,
        restoredAt: restoredPaper.updated_at,
      },
    });
  } catch (error) {
    console.error("❌ Restore paper error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}