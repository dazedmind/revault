// app/home/layout.tsx
"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import NavBar from "../component/NavBar";
import AdminNavBar from "../admin/components/AdminNavBar";
import LoadingScreen from "../component/LoadingScreen";
import { Toaster } from "@/components/ui/sonner";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    // Add a small delay to prevent theme-related flashing
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const storedType = localStorage.getItem("userType");

        if (!token) {
          router.push("/login");
          return;
        }

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
      } catch (error) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userType");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Prevent theme changes from triggering auth loading
  useEffect(() => {
    if (authed) {
      setIsLoading(false);
    }
  }, [theme, authed]);

  // Show loading screen only during initial auth check
  if (isLoading || !authed) {
    return <LoadingScreen />;
  }

  return (
    <div className="font-[family-name:'Inter'] dark:bg-accent min-h-screen">
      {userType === "ADMIN" ||
      userType === "ASSISTANT" ||
      userType === "LIBRARIAN" ? (
        <AdminNavBar />
      ) : (
        <NavBar />
      )}
      {children}
      <Toaster />
    </div>
  );
}