import React from "react";
import { Sun, Moon } from "lucide-react";
import { FaMoon, FaSun } from "react-icons/fa6";

const AppearanceSettings = () => {
  return (
    <div>
      <h1 className="text-2xl ml-1">Appearance</h1>
      {/* divider */}
      <div className="bg-dusk h-0.5 w-5xl mb-2 mt-2"></div>

      <div className="flex flex-row gap-5 mt-5">
        <div className="flex flex-col justify-center items-center">
          <button className="flex flex-col items-center justify-center py-3 px-6 bg-white-75 text-midnight w-3xs h-32 rounded-lg cursor-pointer">
            {/* <Sun className="h-20 mb-1" /> */}
            <FaSun className="text-5xl"></FaSun>
          </button>
          <span className="text-base mt-2">Light Mode</span>
        </div>

        {/* Dark Mode Button */}
        <div className="flex flex-col justify-center items-center">
          <button className="flex flex-col items-center justify-center py-3 px-6 bg-neutral-800 text-gray-200 w-3xs h-32 rounded-lg cursor-pointer outline-2 outline-white-75 outline-offset-4">
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
