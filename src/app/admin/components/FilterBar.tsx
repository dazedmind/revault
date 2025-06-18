// src/app/admin/components/FilterBar.tsx
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
  downloadComponent,
}: FilterBarProps) {
  // Map internal sort value to display value for the Select component
  const getSortDisplayValue = (sortValue: string) => {
    switch (sortValue) {
      case "recent":
      case "year-recent":
        return "year-recent";
      case "year-oldest":
        return "year-oldest";
      case "title-asc":
        return "title-asc";
      case "title-desc":
        return "title-desc";
      default:
        return "year-recent"; // Default to most recent
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        {/* Sort / Search Input */}
        <SearchInput placeholder="Search paper" />

        {/* Download Component */}
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
            {/* Sort dropdown - moved to top and fixed default value */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Sort by</p>
              <Select
                onValueChange={onSortChange}
                value={getSortDisplayValue(sortOpt)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="year-recent">
                      Publish Year (Most recent)
                    </SelectItem>
                    <SelectItem value="year-oldest">
                      Publish Year (Oldest)
                    </SelectItem>
                    <SelectItem value="title-asc">Paper Title (A-Z)</SelectItem>
                    <SelectItem value="title-desc">
                      Paper Title (Z-A)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div
              className={`${
                theme === "light" ? "bg-white-50" : "bg-white-5"
              } h-0.5 w-auto my-2 mx-1`}
            />

            {/* Department Checkboxes */}
            <div className="mb-4">
              <p className="text-lg font-medium mb-2">Department</p>
              <ul className="ml-1 flex flex-col gap-2">
                {["Information Technology", "Computer Science"].map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <Checkbox
                      id={`dept-${d}`}
                      checked={departments.includes(d)}
                      onCheckedChange={() => onToggleDepartment(d)}
                    />
                    <label
                      htmlFor={`dept-${d}`}
                      className="text-sm cursor-pointer select-none"
                    >
                      {d}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`${
                theme === "light" ? "bg-white-50" : "bg-white-5"
              } h-0.5 w-auto my-2 mx-1`}
            />

            {/* Course Checkboxes - Made independent */}
            <div className="mb-4">
              <p className="text-lg font-medium mb-2">Course</p>
              <ul className="ml-1 flex flex-col gap-2">
                {[
                  { name: "SIA", department: "Information Technology" },
                  { name: "Capstone", department: "Information Technology" },
                  { name: "Thesis Writing", department: "Computer Science" },
                  { name: "Compiler Design", department: "Computer Science" },
                ].map((course) => (
                  <li key={course.name} className="flex items-center gap-2">
                    <Checkbox
                      id={`course-${course.name}`}
                      checked={courses.includes(course.name)}
                      onCheckedChange={() => onToggleCourse(course.name)}
                      // Removed the disabled condition to make filters independent
                    />
                    <label
                      htmlFor={`course-${course.name}`}
                      className="text-sm cursor-pointer select-none"
                    >
                      {course.name}
                      <span className="text-xs text-gray-500 ml-1">
                        (
                        {course.department.includes("Information")
                          ? "IT"
                          : "CS"}
                        )
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply / Clear Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={onClearFilters}
                className={`${
                  theme === "light"
                    ? "bg-white-50 hover:bg-white-25"
                    : "bg-white-5 hover:bg-white-10"
                } p-2 w-full rounded-md cursor-pointer transition-colors duration-200 text-sm`}
              >
                Clear All
              </button>
              <button
                onClick={onApplyFilters}
                className="bg-gold hover:brightness-110 p-2 w-full rounded-md cursor-pointer transition-all duration-200 text-sm font-medium text-white"
              >
                Apply Filters
              </button>
            </div>

            {/* Filter Summary */}
            {(departments.length > 0 || courses.length > 0) && (
              <div className="mt-3 p-2 bg-gold/10 rounded-md">
                <p className="text-xs text-gold font-medium">Active Filters:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {departments.map((dept) => (
                    <span
                      key={dept}
                      className="text-xs bg-gold/20 text-gold px-2 py-1 rounded"
                    >
                      {dept.includes("Information") ? "IT" : "CS"}
                    </span>
                  ))}
                  {courses.map((course) => (
                    <span
                      key={course}
                      className="text-xs bg-blue-500/20 text-blue-600 px-2 py-1 rounded"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
