"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PreviewPDFContent() {
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

function PreviewPDFLoading() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 w-full bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading PDF preview...</p>
        </div>
      </div>
      
      <div className="m-4 self-center">
        <div className="bg-gray-300 dark:bg-gray-700 animate-pulse px-4 py-2 rounded-md w-32 h-10"></div>
      </div>
    </div>
  );
}

export default function PreviewPDFPage() {
  return (
    <Suspense fallback={<PreviewPDFLoading />}>
      <PreviewPDFContent />
    </Suspense>
  );
}