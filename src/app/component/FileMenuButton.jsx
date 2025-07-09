import React from "react";
import { useTheme } from "next-themes";
import { Tooltip } from "react-tooltip";

function FileMenuButton({ icon, label, onClick }) {
  const { theme } = useTheme();

  return (
    <div className="flex align-middle items-center gap-2 cursor-pointer">
      <button
        onClick={onClick}
        className="flex gap-2 items-center cursor-pointer"
        data-tooltip-id="file-menu-tooltip"
        data-tooltip-content={label}
      >
        <div className={`rounded-md p-2 hover:bg-card-foreground`}>{icon}</div>
      </button>
      <Tooltip id="file-menu-tooltip" className="z-100" />
    </div>
  );
}

export default FileMenuButton;
