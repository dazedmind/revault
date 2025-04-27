import React from "react";

function FileMenuButton({ icon, label, onClick }) {
  return (
    <div className="flex align-middle items-center gap-2 mt-4 cursor-pointer">
      <button
        onClick={onClick}
        className="flex gap-2 items-center cursor-pointer"
      >
        <div className="dark:bg-card-foreground rounded-md p-2">{icon}</div>
        <p>{label}</p>
      </button>
    </div>
  );
}

export default FileMenuButton;
