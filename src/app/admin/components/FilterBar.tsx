// src/app/admin/profile/components/FilterBar.tsx
"use client";

import React from "react";
import { FaFilter } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchInput from "@/app/component/SearchInput";

interface FilterBarProps {
  departments: string[];
  courses: string[];
  sortOpt: string;
  onToggleDepartment: (dept: string) => void;
  onToggleCourse: (course: string) => void;
  onSortChange: (val: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  theme: string;

  // ← NEW: allow a custom Download‐button (or any node) to be passed in
  downloadComponent?: React.ReactNode;
}

export function FilterBar({
  departments,
  courses,
  sortOpt,
  onToggleDepartment,
  onToggleCourse,
  onSortChange,
  onApplyFilters,
  onClearFilters,
  theme,
  downloadComponent, // ← receive it here
}: FilterBarProps) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        {/* Sort / Search Input */}
        <SearchInput placeholder="Search paper" />

        {/* If parent passed in a downloadComponent, render it here.
            Otherwise, fall back to the old static button. */}
        {downloadComponent ? (
          <>{downloadComponent}</>
        ) : (
          <button className="bg-gold p-2 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer">
            <p className="hidden md:block">Download</p>
          </button>
        )}

        {/* Department & Course Popover */}
        <Popover>
          <PopoverTrigger className="flex items-center gap-2 cursor-pointer">
            Filter <FaFilter />
          </PopoverTrigger>
          <PopoverContent
            className={`${
              theme === "light"
                ? "bg-accent border-white-50"
                : "bg-dusk border-white-5"
            }`}
            align="start"
          >
            {/* Sort inside popover (optional) */}
            <Select onValueChange={onSortChange} value={sortOpt}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="title-asc">Paper Title (A-Z)</SelectItem>
                  <SelectItem value="title-desc">Paper Title (Z-A)</SelectItem>
                  <SelectItem value="year-recent">
                    Publish Year (Most recent)
                  </SelectItem>
                  <SelectItem value="year-oldest">
                    Publish Year (Oldest)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div
              className={`${
                theme === "light" ? "bg-white-50" : "bg-white-5"
              } h-0.5 w-auto my-2 mx-1`}
            />

            {/* Department Checkboxes */}
            <p className="text-lg">Department</p>
            <ul className="ml-1 flex flex-col gap-1">
              {["Information Technology", "Computer Science"].map((d) => (
                <li key={d} className="flex items-center gap-2">
                  <Checkbox
                    id={`dept-${d}`}
                    checked={departments.includes(d)}
                    onCheckedChange={() => onToggleDepartment(d)}
                  />
                  <label htmlFor={`dept-${d}`}>{d}</label>
                </li>
              ))}
            </ul>

            <div
              className={`${
                theme === "light" ? "bg-white-50" : "bg-white-5"
              } h-0.5 w-auto my-2 mx-2`}
            />

            {/* Course Checkboxes */}
            <p className="text-lg">Course</p>
            <ul className="ml-1 flex flex-col gap-1">
              {["SIA", "Capstone Project", "Thesis Writing", "Compiler Design"].map(
                (c) => (
                  <li key={c} className="flex items-center gap-2">
                    <Checkbox
                      id={`course-${c}`}
                      checked={courses.includes(c)}
                      onCheckedChange={() => onToggleCourse(c)}
                      disabled={
                        ((c === "SIA" || c === "Capstone Project") &&
                          !departments.includes("Information Technology")) ||
                        ((c === "Thesis Writing" ||
                          c === "Compiler Design") &&
                          !departments.includes("Computer Science"))
                      }
                    />
                    <label htmlFor={`course-${c}`}>{c}</label>
                  </li>
                ),
              )}
            </ul>

            {/* Apply / Clear Buttons */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={onClearFilters}
                className={`${
                  theme === "light" ? "bg-white-50" : "bg-white-5"
                } p-2 w-full rounded-sm cursor-pointer`}
              >
                Clear Filters
              </button>
              <button
                onClick={onApplyFilters}
                className="bg-gold p-2 w-full rounded-sm cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
