// File: /app/profile/page.tsx
"use client";

import dynamicImport from 'next/dynamic';
import ProfileLoader from "@/app/component/ProfileLoader";

// Force dynamic rendering and disable SSR completely
export const dynamic = 'force-dynamic';

// Import the actual component dynamically
const DynamicProfilePage = dynamicImport(
  () => import('./ProfilePageClient'),
  {
    ssr: false,
    loading: () => <ProfileLoader />
  }
);

export default function ProfilePage() {
  return <DynamicProfilePage />;
}