import React from "react";
import { useTheme } from "next-themes";

function FileMenuButton({ icon, label, onClick }) {
  const { theme } = useTheme();

  return (
    <div className="flex align-middle items-center gap-2 mt-4 cursor-pointer">
      <button
        onClick={onClick}
        className="flex gap-2 items-center cursor-pointer"
      >
        <div className={`rounded-md p-2 hover:bg-card-foreground`}>{icon}</div>
        <p className="hidden md:block">{label}</p>
      </button>
    </div>
  );
}

export default FileMenuButton;
