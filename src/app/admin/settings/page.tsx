"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if we're exactly on /admin/settings
    if (pathname === "/admin/settings") {
      router.replace("/admin/settings/general/edit-profile");
    }
  }, [router, pathname]);

  return null;
}