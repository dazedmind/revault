"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

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
      <h1 className="text-2xl ml-1">About Revault</h1>
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
          <p className="text-sm font-mono bg-gold/10 text-gold px-2 py-1 rounded inline-block">
            Version 1.3.0-alpha
          </p>
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className={`p-6 rounded-lg bg-dusk dark:bg-accent border-1 ${theme === 'light' ? ' border-white-50' : 'border-white-5'} w-full max-w-md relative z-10 max-h-[80vh] overflow-y-auto`}>
            <h1 className="text-2xl font-bold text-gold text-center mb-4">
              BS in Information Technology 
              <br />
              (Keyboard Warriors)
            </h1>
            
            <div className="flex flex-col gap-4">
              <div className="p-3 rounded-lg bg-white/5">
                <h3 className="text-lg font-medium text-gold">Durante, KC D.</h3>
                <p className="text-sm text-gray-300">System Programmer and Documentation Member</p>
              </div>
              
              <div className="p-3 rounded-lg bg-white/5">
                <h3 className="text-lg font-medium text-gold">Lastra, Kristhia Cayle F.</h3>
                <p className="text-sm text-gray-300">Team Leader and Documentation Head</p>
              </div>
              
              <div className="p-3 rounded-lg bg-white/5">
                <h3 className="text-lg font-medium text-gold">Insigne, Matthew Jacob B.</h3>
                <p className="text-sm text-gray-300">System Programmer</p>
              </div>
              
              <div className="p-3 rounded-lg bg-white/5">
                <h3 className="text-lg font-medium text-gold">Valena, John Allen Troy E.</h3>
                <p className="text-sm text-gray-300">System Programmer and Designer</p>
              </div>
              
              <div className="p-3 rounded-lg bg-white/5">
                <h3 className="text-lg font-medium text-gold">Yacub, Jetthro Karl C.</h3>
                <p className="text-sm text-gray-300">Documentation Member</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <button 
                onClick={() => setShowAddModal(false)} 
                className="text-white cursor-pointer hover:brightness-110 hover:dark:text-white-75 transition-all duration-300 bg-gold p-3 px-6 rounded-md font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutRevault;