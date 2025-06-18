// src/app/admin/components/PapersDisplayHeader.tsx
"use client";

import React from "react";
import { Filter, FileText, X } from "lucide-react";

interface PapersDisplayHeaderProps {
  papersCount: number;
  totalPapers: number;
  totalPages: number;
  currentPage: number;
  departments: string[];
  courses: string[];
  sortOpt: string;
  theme?: string;
  onClearFilters?: () => void;
}

export function PapersDisplayHeader({
  papersCount,
  totalPapers,
  totalPages,
  currentPage,
  departments,
  courses,
  sortOpt,
  theme,
  onClearFilters,
}: PapersDisplayHeaderProps) {
  // Helper function to get sort display text
  const getSortDisplayText = (sortValue: string) => {
    switch (sortValue) {
      case "recent":
      case "year-recent":
        return "Most Recent";
      case "year-oldest":
        return "Oldest First";
      case "title-asc":
        return "Title (A-Z)";
      case "title-desc":
        return "Title (Z-A)";
      default:
        return "Most Recent";
    }
  };

  // Check if any filters are active
  const hasActiveFilters =
    departments.length > 0 ||
    courses.length > 0 ||
    (sortOpt && sortOpt !== "recent");

  // Count active filters
  const activeFilterCount =
    departments.length +
    courses.length +
    (sortOpt && sortOpt !== "recent" ? 1 : 0);

  return (
    <div
      className={`flex flex-col gap-3 p-4 border-b ${
        theme === "light"
          ? "border-gray-200 bg-gray-50"
          : "border-white-5 bg-white-5/20"
      }`}
    >
      {/* Papers Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gold" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-lg font-semibold">
              {papersCount} Paper{papersCount !== 1 ? "s" : ""} on this page
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({totalPapers} total paper{totalPapers !== 1 ? "s" : ""} across
              all pages)
            </span>
            {totalPages > 1 && (
              <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                • Page {currentPage} of {totalPages}
              </span>
            )}
          </div>
        </div>

        {/* Clear Filters Button - only show if filters are active */}
        {hasActiveFilters && onClearFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
            Clear All Filters
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Active Filters ({activeFilterCount}):
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Department Filters */}
            {departments.map((dept) => (
              <span
                key={`dept-${dept}`}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full border border-blue-200 dark:border-blue-700"
              >
                <span className="font-medium">Dept:</span>
                {dept}
              </span>
            ))}

            {/* Course Filters */}
            {courses.map((course) => (
              <span
                key={`course-${course}`}
                className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full border border-green-200 dark:border-green-700"
              >
                <span className="font-medium">Course:</span>
                {course}
              </span>
            ))}

            {/* Sort Filter - only show if not default */}
            {sortOpt && sortOpt !== "recent" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full border border-purple-200 dark:border-purple-700">
                <span className="font-medium">Sort:</span>
                {getSortDisplayText(sortOpt)}
              </span>
            )}
          </div>
        </div>
      )}

      {/* No Filters State */}
      {!hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Filter className="w-4 h-4" />
          <span>No filters applied - showing all papers</span>
        </div>
      )}
    </div>
  );
}
