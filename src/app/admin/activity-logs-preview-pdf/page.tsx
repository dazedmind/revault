// File: src/app/admin/activity-logs-preview-pdf/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ActivityLogsPreviewContent() {
  const searchParams = useSearchParams();
  const qs = searchParams?.toString() ?? "";

  return (
    <div className="flex flex-col h-screen">
      {/* Embed the PDF inline */}
      <iframe
        src={`/admin/api/activity-logs-report?${qs}`}
        className="flex-1 w-full"
        style={{ border: 0 }}
        title="Activity Logs PDF Preview"
      />
    </div>
  );
}

function ActivityLogsPreviewLoading() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 w-full bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading PDF preview...
          </p>
        </div>
      </div>

      <div className="m-4 self-center">
        <div className="bg-gray-300 dark:bg-gray-700 animate-pulse px-4 py-2 rounded-md w-40 h-10"></div>
      </div>
    </div>
  );
}

export default function ActivityLogsPreviewPage() {
  return (
    <Suspense fallback={<ActivityLogsPreviewLoading />}>
      <ActivityLogsPreviewContent />
    </Suspense>
  );
}
