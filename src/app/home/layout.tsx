// app/home/layout.tsx
"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../component/NavBar";
import AdminNavBar from "../admin/components/AdminNavBar";
import LoadingScreen from "../component/LoadingScreen";
import { Toaster } from "@/components/ui/sonner";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedType = localStorage.getItem("userType");

    if (!token) {
      return router.push("/login");
    }

    try {
      // decode JWT
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload: any = JSON.parse(
        decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join(""),
        ),
      );

      if (payload.exp * 1000 > Date.now()) {
        setUserType(storedType);
        setAuthed(true);
      } else {
        throw new Error("expired");
      }
    } catch {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
      router.push("/login");
    }
  }, [router]);

  // show full-page loader until auth is confirmed
  if (!authed) {
    return <LoadingScreen />;
  }

  return (
    <div className="font-[family-name:'Inter'] dark:bg-accent min-h-screen">
      {userType === "ADMIN" || userType === "ASSISTANT" || userType === "LIBRARIAN"? <AdminNavBar /> : <NavBar />}
      {children}
      <Toaster />
    </div>
  );
}
