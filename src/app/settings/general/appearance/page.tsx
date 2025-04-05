import React from "react";
import { Sun, Moon } from "lucide-react";

const AppearanceSettings = () => {
  return (
    <div>
      <h1 className="text-2xl ml-1">Appearance</h1>
      {/* divider */}
      <div className="bg-dusk h-0.5 w-5xl mb-2 mt-2"></div>

      <div className="flex flex-row gap-5 mt-5">
        <div className="flex flex-col justify-center items-center">
          <button className="flex flex-col items-center justify-center py-3 px-6 bg-gray-300 text-gray-800 w-3xs h-24 rounded-lg cursor-pointer">
            <Sun className="h-5 w-5 mb-1" />
          </button>
          <span className="text-base mt-2">Light Mode</span>
        </div>

        {/* Dark Mode Button */}
        <div className="flex flex-col justify-center items-center">
          <button className="flex flex-col items-center justify-center py-3 px-6 bg-gray-800 text-gray-200 w-3xs h-24 rounded-lg cursor-pointer">
            <Moon className="h-5 w-5 mb-1" />
          </button>
          <span className="text-base mt-2">Dark Mode </span>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
