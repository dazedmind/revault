"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import DeveloperList from "@/app/component/DeveloperList";

const AboutRevault = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddLibrarian = () => {
    setShowAddModal(true);
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 pb-10 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl font-bold ml-1">About Revault</h1>
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>
      
      <div className="text-center space-y-3">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">PLM CISTM Research Archive</h2>
          <p className="text-lg">Revault is a platform for PLM CISTM Students to browse archived research-based works</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">All rights reserved.</p>
          <p className="font-medium">© 2025 Revault</p>
          <p>
            Developed by: <span 
              onClick={handleAddLibrarian} 
              className="font-bold cursor-pointer hover:text-gold transition-all duration-300 underline"
            >
              Keyboard Warriors
            </span>
          </p>
          <p className="text-xs font-bold bg-red-600/20 text-red-600 p-2 rounded-lg mb-2">Beta Testing Version 1.0.0</p>

        </div>

        <div className="mt-8 p-4 rounded-lg bg-gold/5 border border-gold/20">
          <h3 className="text-lg font-medium mb-2">About the Platform</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            This digital repository serves as a comprehensive archive for academic research papers, 
            thesis works, and capstone projects from the College of Information Systems and Technology Management.
          </p>
        </div>
      </div>

      {showAddModal && (
        <DeveloperList onClick={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default AboutRevault;