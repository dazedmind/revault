// app/admin/api/paper-reports/route.tsx

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import React from "react";
import { renderToStream, DocumentProps } from "@react-pdf/renderer";
import PapersReport from "@/lib/PapersReport";

export const runtime = "nodejs"; // ensure Node.js runtime for App API

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const qp = url.searchParams;

    // 1) Parse filters & download flag
    const deptParam = qp.get("department") || "";
    const courseParam = qp.get("course") || "";
    const sortParam = qp.get("sort") || "";
    const download = qp.get("download") === "1";

    // 2) Build Prisma filters
    const andFilters: any[] = [];
    if (deptParam) {
      andFilters.push({
        OR: deptParam.split(",").map((d) => ({ department: d.trim() })),
      });
    }
    if (courseParam) {
      andFilters.push({
        OR: courseParam.split(",").map((c) => ({ course: c.trim() })),
      });
    }
    const where = andFilters.length > 0 ? { AND: andFilters } : {};

    // 3) Determine orderBy
    let orderBy: any = { created_at: "desc" };
    switch (sortParam) {
      case "title-asc":
        orderBy = { title: "asc" };
        break;
      case "title-desc":
        orderBy = { title: "desc" };
        break;
      case "year-asc":
        orderBy = { year: "asc" };
        break;
      case "year-desc":
        orderBy = { year: "desc" };
        break;
      case "upload-asc":
        orderBy = { created_at: "asc" };
        break;
      case "upload-desc":
        orderBy = { created_at: "desc" };
        break;
    }

    // 4) Fetch all matching papers with created_at field
    const rawPapers = await prisma.papers.findMany({
      where,
      orderBy,
      select: {
        paper_id: true,
        title: true,
        author: true,
        year: true,
        department: true,
        created_at: true, // Include the uploaded date
      },
    });

    // 5) Map DB results to the shape expected by PapersReport
    const papers = rawPapers.map((item) => ({
      paper_id: item.paper_id,
      title: item.title ?? "",
      author: item.author ?? "",
      year: item.year ?? 0,
      department: item.department ?? "",
      created_at: item.created_at, // Include uploaded date
    }));

    // 6) Prepare filter information for PDF
    const filters = {
      department: deptParam || undefined,
      course: courseParam || undefined,
      sort: sortParam || undefined,
    };

    // 7) Create PDF element with filters
    const pdfElement = (
      <PapersReport papers={papers} filters={filters} />
    ) as React.ReactElement<DocumentProps>;

    // 8) Render to stream and buffer
    const pdfStream = await renderToStream(pdfElement);
    const buffers: Uint8Array[] = [];
    for await (const chunk of pdfStream) {
      buffers.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    const pdfBuffer = Buffer.concat(buffers);

    // 9) Return PDF
    const headers: Record<string, string> = {
      "Content-Type": "application/pdf",
      "Content-Disposition": download
        ? `attachment; filename="papers-report.pdf"`
        : `inline; filename="papers-report.pdf"`,
    };
    return new NextResponse(pdfBuffer, { status: 200, headers });
  } catch (error) {
    console.error("API /admin/api/paper-reports error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
