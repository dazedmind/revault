// app/api/papers/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const qp = url.searchParams;

    // Parse filters
    const deptParam = qp.get("department"); // e.g. "CS,IT"
    const yearParam = qp.get("year"); // e.g. "2025,2024"
    const courseParam = qp.get("course"); // e.g. "SIA,Capstone"
    const startParam = qp.get("start"); // e.g. "2020"
    const endParam = qp.get("end"); // e.g. "2022"
    const pageParam = parseInt(qp.get("page") || "1", 10);
    const sortParam = qp.get("sort") || "recent"; // default sort

    // Pagination settings
    const take = 5; // 5 items per page
    const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const skip = (page - 1) * take;

    // Build dynamic "where" conditions
    const andFilters: any[] = [];

    if (deptParam) {
      const depts = deptParam.split(",").map((d) => d.trim());
      andFilters.push({
        OR: depts.map((d) => ({ department: d })),
      });
    }

    if (yearParam) {
      const years = yearParam
        .split(",")
        .map((y) => parseInt(y.trim(), 10))
        .filter((y) => !isNaN(y));
      if (years.length) {
        andFilters.push({
          OR: years.map((y) => ({ year: y })),
        });
      }
    }

    // Custom year range overrides individual years if both present
    if (startParam && endParam) {
      const start = parseInt(startParam, 10);
      const end = parseInt(endParam, 10);
      if (!isNaN(start) && !isNaN(end)) {
        andFilters.push({
          year: { gte: start, lte: end },
        });
      }
    }

    if (courseParam) {
      const courses = courseParam.split(",").map((c) => c.trim());
      andFilters.push({
        OR: courses.map((c) => ({ course: c })),
      });
    }

    // Final where object
    const where = andFilters.length > 0 ? { AND: andFilters } : {};

    // Determine sort order
    let orderBy: any = {};
    switch (sortParam) {
      case "recent":
        orderBy = { created_at: "desc" };
        break;
      case "oldest":
        orderBy = { created_at: "asc" };
        break;
      case "title-asc":
        orderBy = { title: "asc" };
        break;
      case "title-desc":
        orderBy = { title: "desc" };
        break;
      case "year-recent":
        orderBy = { year: "desc" };
        break;
      case "year-oldest":
        orderBy = { year: "asc" };
        break;
      default:
        orderBy = { created_at: "desc" };
    }

    // Count total matching
    const totalCount = await prisma.papers.count({ where });

    // Fetch paginated items
    const items = await prisma.papers.findMany({
      where,
      orderBy,
      skip,
      take,
    });

    const totalPages = Math.ceil(totalCount / take);

    // Return "items" under the key "papers", so client can do `json.papers.map(...)`
    return NextResponse.json({ papers: items, totalPages }, { status: 200 });
  } catch (error) {
    console.error("API /papers error:", error);
    return NextResponse.json(
      { error: "Unable to fetch filtered papers" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
