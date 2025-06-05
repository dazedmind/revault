"use client";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const AppearanceSettings = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 mb-8 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl ml-1">Appearance</h1>
      {/* divider */}
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>

      <div className="flex flex-col md:flex-row gap-5 m-5">
        {/* Light Mode Button */}
        <div className={`flex flex-col justify-center items-center`}>
          <button
            className={`flex flex-col items-center justify-center py-3 px-6 ${
              theme === 'light' 
                ? 'outline-2 outline-gold bg-tertiary text-midnight' 
                : 'bg-white-75 text-midnight hover:bg-white-50 transition-colors'
            } w-3xs h-32 rounded-lg cursor-pointer`}
            onClick={() => setTheme("light")}
          >
            <FaSun className="text-5xl mb-2" />
          </button>
          <span className="text-base mt-2">Light Mode</span>
        </div>

        {/* Dark Mode Button */}
        <div className="flex flex-col justify-center items-center">
          <button
            className={`flex flex-col items-center justify-center py-3 px-6 ${
              theme === 'dark'
                ? 'bg-neutral-800 text-gray-200 outline-2 outline-gold outline-offset-2'
                : 'bg-neutral-800 text-gray-200 hover:bg-neutral-700 transition-colors'
            } w-3xs h-32 rounded-lg cursor-pointer`}
            onClick={() => setTheme("dark")}
          >
            <FaMoon className="text-5xl mb-2" />
          </button>
          <span className="text-base mt-2">Dark Mode</span>
        </div>
      </div>

      {/* Theme Preview Section */}
      <div className="mt-6 p-4 rounded-lg border border-white-5">
        <h3 className="text-lg font-medium mb-3">Preview</h3>
        <div className={`p-3 rounded ${theme === 'light' ? 'bg-white border border-gray-200' : 'bg-secondary border border-white-5'}`}>
          <p className="text-sm">This is how your interface will look with the selected theme.</p>
          <div className="mt-2 flex gap-2">
            <div className="w-4 h-4 bg-gold rounded"></div>
            <div className={`w-4 h-4 rounded ${theme === 'light' ? 'bg-gray-300' : 'bg-white-25'}`}></div>
            <div className={`w-4 h-4 rounded ${theme === 'light' ? 'bg-gray-500' : 'bg-white-50'}`}></div>
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">System Theme</h3>
        <button
          className={`flex items-center justify-center py-2 px-4 ${
            theme === 'system'
              ? 'bg-gold text-white'
              : theme === 'light' 
                ? 'bg-white-50 hover:bg-white-25' 
                : 'bg-white-5 hover:bg-white-10'
          } rounded-lg cursor-pointer transition-colors`}
          onClick={() => setTheme("system")}
        >
          Use System Setting
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Automatically switch between light and dark themes based on your system preference.
        </p>
      </div>
    </div>
  );
};

export default AppearanceSettings;