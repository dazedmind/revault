"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

import PapersArea from "./PapersArea";
import { Checkbox } from "@/components/ui/checkbox";
import { FaFilter } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useAntiCopy from "../hooks/useAntiCopy";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useTheme();

  // UI state for filters (temporary state, doesn't trigger API calls)
  const [filterState, setFilterState] = useState<FilterState>({
    departments: [],
    years: [],
    startYear: "",
    endYear: "",
    courses: [],
    sortOption: "",
  });

  // Applied filters - ONLY derived from URL, never from filterState
  // This ensures PapersArea only re-renders when filters are actually applied
  const appliedFilters = useMemo(() => {
    const deps =
      searchParams.get("department")?.split(",").filter(Boolean) || [];
    const yrs = searchParams.get("year")?.split(",").filter(Boolean) || [];
    const start = searchParams.get("start") || "";
    const end = searchParams.get("end") || "";
    const crs = searchParams.get("course")?.split(",").filter(Boolean) || [];
    const sort = searchParams.get("sort") || "";
    const search = searchParams.get("q") || "";

    return {
      department: deps,
      year: start && end ? [] : yrs,
      start: start,
      end: end,
      course: crs,
      sort: sort,
      search: search,
    };
  }, [searchParams]); // Only depends on URL params, not filterState

  // — Pagination state
  const rawPageParam = searchParams.get("page");
  const initialPage = rawPageParam ? parseInt(rawPageParam, 10) || 1 : 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Sync UI filterState from URL (when URL changes)
  useEffect(() => {
    const deps =
      searchParams.get("department")?.split(",").filter(Boolean) || [];
    const yrs = searchParams.get("year")?.split(",").filter(Boolean) || [];
    const start = searchParams.get("start") || "";
    const end = searchParams.get("end") || "";
    const crs = searchParams.get("course")?.split(",").filter(Boolean) || [];
    const sort = searchParams.get("sort") || "";

    setFilterState({
      departments: deps,
      courses: crs,
      sortOption: sort,
      startYear: start && end ? start : "",
      endYear: start && end ? end : "",
      years: start && end ? [] : yrs,
    });

    const p = rawPageParam ? parseInt(rawPageParam, 10) : 1;
    setCurrentPage(isNaN(p) || p < 1 ? 1 : p);
  }, [searchParams, rawPageParam]);

  // Only update when URL actually changes, not on theme changes
  useEffect(() => {
    updateFiltersFromUrl();
  }, [updateFiltersFromUrl]);

  const hasFilters =
    appliedFilters.department.length > 0 ||
    appliedFilters.year.length > 0 ||
    (appliedFilters.start !== "" && appliedFilters.end !== "") ||
    appliedFilters.course.length > 0;

  // Toggle helper for checkboxes
  const toggle = useCallback(
    (
      value: string,
      list: string[],
      setList: React.Dispatch<React.SetStateAction<string[]>>,
    ) => {
      setList(
        list.includes(value) ? list.filter((x) => x !== value) : [...list, value],
      );
    },
    []
  );

  // When "Apply Filters" is clicked:
  const applyFilters = useCallback(() => {
    const qp = new URLSearchParams();

    if (departments.length) qp.set("department", departments.join(","));
    if (startYear && endYear) {
      qp.set("start", startYear);
      qp.set("end", endYear);
    } else if (years.length) {
      qp.set("year", years.join(","));
    }
    if (courses.length) qp.set("course", courses.join(","));

    // Reset to page=1 whenever filters change:
    qp.set("page", "1");

    const currentSearch = searchParams.get("q");
    if (currentSearch) qp.set("q", currentSearch);

    if (!resetPage && currentPage > 1) qp.set("page", String(currentPage));

    return qp.toString() ? `${pathname}?${qp.toString()}` : pathname;
  };

  // Handle filter changes - ONLY updates UI state, doesn't trigger API calls
  const handleFiltersChange = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  // Apply filters - ONLY this function triggers URL change and API calls
  const applyFilters = () => {
    const href = buildFilterURL(true);
    router.push(href, { scroll: false });
  };

  const clearAllFilters = () => {
    setFilterState({
      departments: [],
      years: [],
      startYear: "",
      endYear: "",
      courses: [],
      sortOption: "",
    });

    const currentSearch = searchParams.get("q");
    const href = currentSearch ? `${pathname}?q=${currentSearch}` : pathname;
    router.push(href, { scroll: false });
  };

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const qp = new URLSearchParams();

    // Preserve current APPLIED filters (from URL, not filterState)
    if (appliedFilters.department.length)
      qp.set("department", appliedFilters.department.join(","));
    if (appliedFilters.start && appliedFilters.end) {
      qp.set("start", appliedFilters.start);
      qp.set("end", appliedFilters.end);
    } else if (appliedFilters.year.length) {
      qp.set("year", appliedFilters.year.join(","));
    }
    if (appliedFilters.course.length)
      qp.set("course", appliedFilters.course.join(","));
    if (appliedFilters.sort) qp.set("sort", appliedFilters.sort);
    if (appliedFilters.search) qp.set("q", appliedFilters.search);

    if (newPage > 1) qp.set("page", String(newPage));

    const href = qp.toString() ? `${pathname}?${qp.toString()}` : pathname;
    router.push(href, { scroll: false });
    setCurrentPage(newPage);
  }, [totalPages, searchParams, pathname, router]);

  return (
    <main className="flex flex-col md:flex-row">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-80 p-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold ">Filter Results</h1>

          <section>
            <h2 className="font-bold text-gold">Program</h2>
            {["Information Technology", "Computer Science"].map((d) => (
              <div key={d} className="flex items-center gap-2 ml-2">
                <Checkbox
                  id={`dept-${d}`}
                  checked={departments.includes(d)}
                  onCheckedChange={() => toggle(d, departments, setDepartments)}
                />
                <label htmlFor={`dept-${d}`}>{d}</label>
              </div>
            ))}
          </section>

          <section>
            <h2 className="font-bold text-gold">Publication Year</h2>
            {["2025", "2024", "2023", "2022", "2021"].map((y) => (
              <div key={y} className="flex items-center gap-2 ml-2">
                <Checkbox
                  id={`year-${y}`}
                  checked={years.includes(y)}
                  onCheckedChange={() => toggle(y, years, setYears)}
                  disabled={Boolean(startYear && endYear)}
                />
                <label htmlFor={`year-${y}`}>{y}</label>
              </div>
            ))}
            <div className="flex flex-col gap-2 ml-2 mt-2">
              <p className="text-sm">Custom Range:</p>
              <span className="flex gap-2">
                <input
                  type="number"
                  placeholder="Start year"
                  value={startYear}
                  onChange={(e) => {
                    setStartYear(e.target.value);
                    if (e.target.value && endYear) setYears([]); // clear years if custom
                  }}
                  className="border p-1 rounded-md text-sm w-20"
                />
                <input
                  type="number"
                  placeholder="End year"
                  value={endYear}
                  onChange={(e) => {
                    setEndYear(e.target.value);
                    if (e.target.value && startYear) setYears([]); // clear years if custom
                  }}
                  className="border p-1 rounded-md text-sm w-20"
                />
              </span>
            </div>
          </section>

          <section>
            <h2 className="font-bold text-gold">Course</h2>
            {["SIA", "Capstone Project", "Compiler Design", "Thesis Writing"].map(
              (c) => (
                <div key={c} className="flex items-center gap-2 ml-2">
                  <Checkbox
                    id={`course-${c}`}
                    checked={courses.includes(c)}
                    onCheckedChange={() => toggle(c, courses, setCourses)}
                  />
                  <label htmlFor={`course-${c}`}>{c}</label>
                </div>
              ),
            )}
          </section>

          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={applyFilters}
              className="bg-yale-blue/50 hover:brightness-110 transition-all duration-300 p-2 rounded-md cursor-pointer"
            >
              Apply Filters
            </button>
            {hasFilters && (
              <button
                onClick={clearAllFilters}
                className={`${
                  theme === "light"
                    ? "bg-white-25 hover:bg-white-50"
                    : "bg-white-5 hover:bg-white-10"
                } transition-all duration-300 p-2 rounded-md cursor-pointer`}
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      </aside>

    
      {/* Main content area */}
      <section className="flex-1 p-6">
        <h1 className="text-3xl font-bold md:my-4 mb-4">Recent Papers</h1>

      {/* Mobile filter popover */}
      <div className="md:hidden flex justify-between items-center mb-6">
            <Popover>
              <PopoverTrigger className="flex items-center gap-2 bg-gold text-midnight px-4 py-2 rounded-lg">
                <FaFilter />
                Filter
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
                    onValueChange={() => {}}
                    value={""}
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
                          onCheckedChange={() => toggle(d, departments, setDepartments)}
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
                      { name: "CS Thesis Writing", department: "Computer Science" },
                      { name: "Compiler Design", department: "Computer Science" },
                    ].map((course) => (
                      <li key={course.name} className="flex items-center gap-2">
                        <Checkbox
                          id={`course-${course.name}`}
                          checked={courses.includes(course.name)}
                          onCheckedChange={() => toggle(course.name, courses, setCourses)}
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
                    onClick={clearAllFilters}
                    className={`${
                      theme === "light"
                        ? "bg-white-50 hover:bg-white-25"
                        : "bg-white-5 hover:bg-white-10"
                    } p-2 w-full rounded-md cursor-pointer transition-colors duration-200 text-sm`}
                  >
                    Clear All
                  </button>
                  <button
                    onClick={applyFilters}
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

        {/* PapersArea - Now only receives URL-based appliedFilters */}
        <PapersArea
          filters={appliedFilters}
          page={currentPage}
          onTotalPages={setTotalPages}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => goToPage(currentPage - 1)}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => goToPage(pageNum)}
                      isActive={currentPage === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => goToPage(currentPage + 1)}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>
    </main>
  );
}