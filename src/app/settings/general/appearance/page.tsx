"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";

import { useTheme } from "next-themes";

const AppearanceSettings = () => {
  const { setTheme } = useTheme();

  return (
    <div>
      <h1 className="text-2xl ml-1">Appearance</h1>
      {/* divider */}
      <div className="bg-dusk h-0.5 w-5xl mb-2 mt-2"></div>

      <div className="flex flex-row gap-5 mt-5">
        <div className="flex flex-col justify-center items-center ">
          <button
            className="flex flex-col items-center justify-center py-3 px-6 bg-gray-300 text-gray-800 w-3xs h-24 rounded-lg cursor-pointer"
            onClick={() => setTheme("light")}
          >
            <Sun className="size-20 mb-1" />
          </button>
          <span className="text-base mt-2">Light Mode</span>
        </div>

        {/* Dark Mode Button */}
        <div className="flex flex-col justify-center items-center">
          <button
            className="flex flex-col items-center justify-center py-3 px-6 bg-gray-800 text-gray-200 w-3xs h-24 rounded-lg cursor-pointer "
            onClick={() => setTheme("dark")}
          >
            <Moon className="size-20 mb-1" />
          </button>
          <span className="text-base mt-2 ">Dark Mode </span>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
