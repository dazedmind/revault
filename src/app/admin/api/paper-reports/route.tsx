// app/admin/api/generate-pdf/route.tsx

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
    }

    // 4) Fetch all matching papers
    const rawPapers = await prisma.papers.findMany({ where, orderBy });

    // 5) Map DB results to the non-nullable shape expected by PapersReport
    const papers = rawPapers.map((item) => ({
      paper_id: item.paper_id,
      title: item.title ?? "",
      author: item.author ?? "",
      year: item.year ?? 0,
      department: item.department ?? "",
    }));

    // 6) Create PDF element
    const pdfElement = (
      <PapersReport papers={papers} />
    ) as React.ReactElement<DocumentProps>;

    // 7) Render to stream and buffer
    const pdfStream = await renderToStream(pdfElement);
    const buffers: Uint8Array[] = [];
    for await (const chunk of pdfStream) {
      buffers.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    const pdfBuffer = Buffer.concat(buffers);

    // 8) Return PDF
    const headers: Record<string, string> = {
      "Content-Type": "application/pdf",
      "Content-Disposition": download
        ? `attachment; filename="papers-report.pdf"`
        : `inline; filename="papers-report.pdf"`,
    };
    return new NextResponse(pdfBuffer, { status: 200, headers });
  } catch (error) {
    console.error("API /admin/api/generate-pdf error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
