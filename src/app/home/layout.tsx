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
  const [showPopup, setShowPopup] = useState(false);

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
      setShowPopup(true);
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

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="flex flex-col items-center justify-center text-center bg-accent p-6 w-lg mx-4 rounded-lg">
            <p className="text-4xl">🎉</p>
            <h2 className="text-2xl font-bold text-gold-fg">Welcome to PLM ReVault!</h2>
            <p className="text-sm text-white-5 mb-4">
              This is a beta testing version of the platform. Feel free to explore the platform and give us your feedback.

            </p>
            <a href="https://forms.gle/W5m4HZXtHiSXSjwG8" target="_blank" className="text-sm text-gold-fg mb-4 underline">
              <p>Answer the survey here</p>
            </a>
            <button 
             onClick={() => setShowPopup(false)}
             className="bg-gold p-1 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer hover:brightness-110 transition-all duration-200">
              Let's go!
            </button>
          </div>
        </div>
      )}      
      <Toaster />
    </div>
  );
}