// File: /app/admin/profile/page.tsx
"use client";

import dynamicImport from "next/dynamic";
import ProfileLoader from "@/app/component/ProfileLoader";

// Force dynamic rendering and disable SSR completely
export const dynamic = "force-dynamic";

// Import all the necessary components and hooks dynamically
const DynamicAdminProfilePage = dynamicImport(
  () => import("./AdminProfilePageClient"),
  {
    ssr: false,
    loading: () => <ProfileLoader />,
  },
);

export default function AdminProfilePage() {
  return <DynamicAdminProfilePage />;
}
