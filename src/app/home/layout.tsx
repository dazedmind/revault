// app/home/layout.tsx
"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import NavBar from "../component/NavBar";
import AdminNavBar from "../admin/components/AdminNavBar";
import LoadingScreen from "../component/LoadingScreen";
import { Toaster } from "@/components/ui/sonner";

// Confetti Component
const Confetti = ({ active }: { active: boolean }) => {
  if (!active) return null;

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 3,
    backgroundColor: [
      '#FFD700', // Gold
      '#FFA500', // Orange
      '#FF6B6B', // Red
      '#4ECDC4', // Teal
      '#45B7D1', // Blue
      '#96CEB4', // Green
      '#FFEAA7', // Light Yellow
      '#DDA0DD', // Plum
    ][Math.floor(Math.random() * 8)],
  }));

  return (
    <div className="fixed -top-10 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 opacity-80 animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.backgroundColor,
            animationDelay: `${piece.animationDelay}s`,
            animationDuration: '3s',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation: confetti-fall 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default function HomeLayout({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
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

  // Handle page loading and popup sequence
  useEffect(() => {
    if (authed && !isLoading) {
      // Allow page to render first
      const pageLoadTimer = setTimeout(() => {
        setPageLoaded(true);
        
        // Check if popup should be shown
        const popupShown = sessionStorage.getItem("welcomePopupShown");
        if (!popupShown) {
          // Start confetti first
          setShowConfetti(true);
          
          // Show popup after a brief delay
          const popupTimer = setTimeout(() => {
            setShowPopup(true);
            sessionStorage.setItem("welcomePopupShown", "true");
          }, 500);

          return () => clearTimeout(popupTimer);
        }
      }, 300); // Give page time to render

      return () => clearTimeout(pageLoadTimer);
    }
  }, [authed, isLoading]);

  // Auto-hide confetti after animation
  useEffect(() => {
    if (showConfetti) {
      const confettiTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 6000); // Stop confetti after 6 seconds

      return () => clearTimeout(confettiTimer);
    }
  }, [showConfetti]);

  const handleClosePopup = () => {
    setShowPopup(false);
    // Trigger a final confetti burst
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Show loading screen during initial auth check
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
      
      {/* Page content with fade-in animation */}
      <div 
        className={`transition-opacity duration-500 ${
          pageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>

      {/* Confetti Effect */}
      <Confetti active={showConfetti} />

      {/* Welcome Popup with enhanced animations */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50 animate-fade-in">
          <div className="flex flex-col items-center justify-center text-center bg-accent p-6 w-lg mx-4 rounded-lg transform animate-popup-bounce shadow-2xl border border-gold/20">
            <div className="text-4xl mb-2 animate-bounce">🎉</div>
            <h2 className="text-2xl font-bold text-gold-fg mb-2 animate-slide-down">
              Welcome to PLM ReVault!
            </h2>
            <p className="text-sm text-white-5 mb-4 animate-slide-up">
              This is a beta testing version of the platform. Feel free to explore the platform and give us your feedback.
            </p>
            <a 
              href="https://forms.gle/W5m4HZXtHiSXSjwG8" 
              target="_blank" 
              className="text-sm text-gold-fg mb-4 underline hover:text-gold transition-colors duration-200"
            >
              <p>Answer the survey here</p>
            </a>
            <button 
              onClick={handleClosePopup}
              className="bg-gold text-black p-2 px-6 font-sans flex items-center gap-2 rounded-lg cursor-pointer hover:brightness-110 hover:scale-105 transition-all duration-200 animate-slide-up shadow-lg"
            >
              Let&apos;s go!
            </button>
          </div>
        </div>
      )}      
      
      <Toaster />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes popup-bounce {
          0% { 
            transform: scale(0.3) rotate(-10deg);
            opacity: 0;
          }
          50% { 
            transform: scale(1.05) rotate(2deg);
          }
          70% { 
            transform: scale(0.95) rotate(-1deg);
          }
          100% { 
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes slide-down {
          from { 
            transform: translateY(-20px);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slide-up {
          from { 
            transform: translateY(20px);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-popup-bounce {
          animation: popup-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-slide-down {
          animation: slide-down 0.5s ease-out 0.2s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out 0.4s both;
        }
      `}</style>
    </div>
  );
}