"use client";

import { useSearchParams } from "next/navigation";

export default function PreviewPDFPage() {
  const searchParams = useSearchParams();
  const qs = searchParams?.toString() ?? "";

  return (
    <div className="flex flex-col h-screen">
      {/* Embed the PDF inline */}
      <iframe
        src={`/admin/api/paper-reports?${qs}`}
        className="flex-1 w-full"
        style={{ border: 0 }}
        title="PDF Preview"
      />

      {/* Download button opens API with download=1 in a new tab */}
      <a
        href={`/admin/api/paper-reports?${qs}&download=1`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-yale-blue/50 hover:brightness-110 transition-all duration-300 px-4 py-2 rounded-md m-4 self-center"
      >
        Download PDF
      </a>
    </div>
  );
}
