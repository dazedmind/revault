"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function LogInCheckBox({ id, label }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className="font-inter text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
