"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
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

  // useAntiCopy();

  // — UI state for the filter controls (mirrors URL)
  const [departments, setDepartments] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [courses, setCourses] = useState<string[]>([]);

  // — Applied filters (what actually gets sent to PapersArea)
  const [appliedFilters, setAppliedFilters] = useState({
    department: [] as string[],
    year: [] as string[],
    start: "",
    end: "",
    course: [] as string[],
  });

  // — Pagination state
  const rawPageParam = searchParams.get("page");
  const initialPage = rawPageParam ? parseInt(rawPageParam, 10) || 1 : 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Memoize filter parsing to prevent unnecessary re-renders during theme changes
  const parsedFilters = useMemo(() => {
    const deps = searchParams.get("department")?.split(",").filter(Boolean) || [];
    const yrs = searchParams.get("year")?.split(",").filter(Boolean) || [];
    const start = searchParams.get("start") || "";
    const end = searchParams.get("end") || "";
    const crs = searchParams.get("course")?.split(",").filter(Boolean) || [];

    return { deps, yrs, start, end, crs };
  }, [searchParams]);

  // Stabilize the effect dependencies to prevent theme-related re-renders
  const updateFiltersFromUrl = useCallback(() => {
    const { deps, yrs, start, end, crs } = parsedFilters;

    setDepartments(deps);
    setCourses(crs);

    if (start && end) {
      setStartYear(start);
      setEndYear(end);
      setYears([]); // clear individual‐year checkboxes
    } else {
      setStartYear("");
      setEndYear("");
      setYears(yrs);
    }

    // Update applied filters
    setAppliedFilters({
      department: deps,
      year: start && end ? [] : yrs,
      start,
      end,
      course: crs,
    });

    // Update page
    const p = rawPageParam ? parseInt(rawPageParam, 10) : 1;
    setCurrentPage(isNaN(p) || p < 1 ? 1 : p);
  }, [parsedFilters, rawPageParam]);

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

    const href = `${pathname}?${qp.toString()}`;
    router.replace(href, { scroll: false });

    setAppliedFilters({
      department: departments,
      year: startYear && endYear ? [] : years,
      start: startYear,
      end: endYear,
      course: courses,
    });
  }, [departments, years, startYear, endYear, courses, pathname, router]);

  // "Clear All Filters" (also resets page to 1 by removing ?page= entirely)
  const clearAllFilters = useCallback(() => {
    setDepartments([]);
    setYears([]);
    setCourses([]);
    setStartYear("");
    setEndYear("");

    router.replace(pathname, { scroll: false });

    setAppliedFilters({
      department: [],
      year: [],
      start: "",
      end: "",
      course: [],
    });
  }, [pathname, router]);

  // When the user clicks a new page number (or Next/Previous), we update ?page= in the URL
  const goToPage = useCallback((newPage: number) => {
    if (newPage < 1) newPage = 1;
    if (newPage > totalPages) newPage = totalPages;

    const qp = new URLSearchParams(
      searchParams as any as Record<string, string>,
    );
    if (newPage === 1) {
      qp.delete("page");
    } else {
      qp.set("page", String(newPage));
    }
    router.replace(`${pathname}?${qp.toString()}`, { scroll: false });
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

      {/* Mobile filter popover */}
      <div className="md:hidden flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">Recent Papers</h1>
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
            align="end"
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

      {/* Main content area */}
      <section className="flex-1 p-6">
        <h1 className="text-3xl font-bold my-4">Recent Papers</h1>

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