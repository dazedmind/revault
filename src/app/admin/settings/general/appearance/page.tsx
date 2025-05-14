"use client";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const AppearanceSettings = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} mr-10 p-6 mb-8 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl ml-1">Appearance</h1>
      {/* divider */}
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>

      <div className="flex flex-col md:flex-row gap-5 m-5">
        <div className={`flex flex-col justify-center items-center`}>
          <button
            className={`flex flex-col items-center justify-center py-3 px-6 ${theme === 'light' ? 'outline-2 outline-white-5 text-midnight' : 'bg-white-75 text-midnight'} w-3xs h-32 rounded-lg cursor-pointer`}
            onClick={() => setTheme("light")}
          >
            {/* <Sun className="h-20 mb-1" /> */}
            <FaSun className="text-5xl"></FaSun>
          </button>
          <span className="text-base mt-2">Light Mode</span>
        </div>

        {/* Dark Mode Button */}
        <div className="flex flex-col justify-center items-center">
          <button
            className="flex flex-col items-center justify-center py-3 px-6 bg-neutral-800 text-gray-200 w-3xs h-32 rounded-lg cursor-pointer outline-2 outline-white-75 outline-offset-4"
            onClick={() => setTheme("dark")}
          >
            {/* <Moon className="h-20 mb-1" /> */}
            <FaMoon className="text-5xl"></FaMoon>
          </button>
          <span className="text-base mt-2">Dark Mode </span>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
