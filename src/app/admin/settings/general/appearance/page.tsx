"use client";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const AppearanceSettings = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="flex flex-col w-auto bg-midnight p-6 mb-8 rounded-xl border-1 border-white-5">
        <h1 className="text-2xl ml-1">Appearance</h1>
        <div className="h-0.5 w-auto my-4 bg-dusk"></div>
        <div className="flex flex-col md:flex-row gap-5 m-5">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center py-3 px-6 bg-white-75 text-midnight w-3xs h-32 rounded-lg animate-pulse">
              <div className="w-12 h-12 bg-gray-300 rounded"></div>
            </div>
            <span className="text-base mt-2">Light Mode</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center py-3 px-6 bg-neutral-800 text-gray-200 w-3xs h-32 rounded-lg animate-pulse">
              <div className="w-12 h-12 bg-gray-600 rounded"></div>
            </div>
            <span className="text-base mt-2">Dark Mode</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 mb-8 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl ml-1">Appearance</h1>
      {/* divider */}
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>

      <div className="flex flex-col md:flex-row gap-5 m-5">
        {/* Light Mode Button */}
        <div className="flex flex-col justify-center items-center">
          <button
            className={`flex flex-col items-center justify-center py-3 px-6 transition-all duration-200 ${
              theme === 'light' 
                ? 'outline-2 outline-gold bg-tertiary text-midnight shadow-lg' 
                : 'bg-white-75 text-midnight hover:bg-white-50 hover:shadow-md'
            } w-3xs h-32 rounded-lg cursor-pointer`}
            onClick={() => setTheme("light")}
            aria-label="Switch to light mode"
          >
            <FaSun className="text-5xl mb-2" />
          </button>
          <span className="text-base mt-2 font-medium">Light Mode</span>
        </div>

        {/* Dark Mode Button */}
        <div className="flex flex-col justify-center items-center">
          <button
            className={`flex flex-col items-center justify-center py-3 px-6 transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-neutral-800 text-gray-200 outline-2 outline-gold outline-offset-2 shadow-lg'
                : 'bg-neutral-800 text-gray-200 hover:bg-neutral-700 hover:shadow-md'
            } w-3xs h-32 rounded-lg cursor-pointer`}
            onClick={() => setTheme("dark")}
            aria-label="Switch to dark mode"
          >
            <FaMoon className="text-5xl mb-2" />
          </button>
          <span className="text-base mt-2 font-medium">Dark Mode</span>
        </div>
      </div>

      {/* System Theme Option */}
      <div className="mx-5 mb-5">
        <button
          className={`flex items-center justify-center py-3 px-6 transition-all duration-200 rounded-lg w-full md:w-auto ${
            theme === 'system'
              ? 'bg-gold text-white shadow-lg'
              : theme === 'light' 
                ? 'bg-white-50 hover:bg-white-25 border border-white-25' 
                : 'bg-white-5 hover:bg-white-10 border border-white-5'
          }`}
          onClick={() => setTheme("system")}
          aria-label="Use system theme setting"
        >
          <span className="font-medium">Use System Setting</span>
        </button>
        <p className="text-sm opacity-75 mt-2 text-center md:text-left">
          Automatically switch between light and dark themes based on your system preference.
        </p>
      </div>

      {/* Theme Preview */}
      <div className={`mx-5 p-4 rounded-lg border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-secondary border-white-5'}`}>
        <h3 className="text-lg font-medium mb-3">Preview</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold rounded-full"></div>
            <span className="text-sm">Primary Color (Gold)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${theme === 'light' ? 'bg-gray-300' : 'bg-white-25'}`}></div>
            <span className="text-sm">Secondary Color</span>
          </div>
          <div className={`p-3 rounded text-sm ${theme === 'light' ? 'bg-gray-50 text-gray-700' : 'bg-white-5 text-gray-300'}`}>
            This is how text and backgrounds will appear with your selected theme.
          </div>
        </div>
      </div>
    </div>
  );
};

// Export with dynamic import to ensure client-side only rendering
export default dynamic(() => Promise.resolve(AppearanceSettings), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col w-auto bg-midnight p-6 mb-8 rounded-xl border-1 border-white-5">
      <h1 className="text-2xl ml-1">Appearance</h1>
      <div className="h-0.5 w-auto my-4 bg-dusk"></div>
      <div className="animate-pulse space-y-4">
        <div className="flex gap-4">
          <div className="w-32 h-32 bg-gray-700 rounded-lg"></div>
          <div className="w-32 h-32 bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
});