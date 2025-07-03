// src/app/api/recently-deleted/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function GET(req: NextRequest) {
  try {
    console.log("🗑️ Recently deleted API called");

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

    // Get URL parameters for pagination and filtering
    const { searchParams } = new URL(req.url);
    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);
    const sortBy = searchParams.get("sortBy") || "deleted_at";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const department = searchParams.get("department");
    const author = searchParams.get("author");

    const skip = (page - 1) * limit;

    // Build where conditions
    const whereConditions: any = {
      is_deleted: true,
    };

    // Add filters if provided
    if (department) {
      whereConditions.department = {
        contains: department,
        mode: "insensitive",
      };
    }

    if (author) {
      whereConditions.author = {
        contains: author,
        mode: "insensitive",
      };
    }

    // Build orderBy clause
    const orderBy: any = {};
    if (sortBy === "deleted_at") {
      orderBy.deleted_at = sortOrder;
    } else if (sortBy === "title") {
      orderBy.title = sortOrder;
    } else if (sortBy === "author") {
      orderBy.author = sortOrder;
    } else if (sortBy === "year") {
      orderBy.year = sortOrder;
    } else {
      orderBy.deleted_at = "desc"; // default
    }

    console.log("🔍 Fetching deleted papers with conditions:", whereConditions);

    // Get total count for pagination
    const totalCount = await prisma.papers.count({
      where: whereConditions,
    });

    // Fetch deleted papers
    const deletedPapers = await prisma.papers.findMany({
      where: whereConditions,
      orderBy,
      skip,
      take: limit,
      select: {
        paper_id: true,
        title: true,
        author: true,
        abstract: true,
        keywords: true,
        department: true,
        course: true,
        year: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
        deleted_by: true,
        paper_url: true,
      },
    });

    const totalPages = Math.ceil(totalCount / limit);

    console.log(`✅ Found ${deletedPapers.length} deleted papers`);

    return NextResponse.json({
      success: true,
      papers: deletedPapers,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      filters: {
        department,
        author,
        sortBy,
        sortOrder,
      },
    });
  } catch (error) {
    console.error("❌ Recently deleted API error:", error);
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