"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
import { useTheme } from "next-themes";

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // useAntiCopy();

  // — UI state for the filter controls (mirrors URL)
  const [departments, setDepartments] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [courses, setCourses] = useState<string[]>([]);
  const { theme } = useTheme();

  // — Applied filters (what actually gets sent to PapersArea)
  const [appliedFilters, setAppliedFilters] = useState({
    department: [] as string[],
    year: [] as string[],
    start: "",
    end: "",
    course: [] as string[],
  });

  // — Pagination state
  // Read “page” from URL. If missing or invalid, default to 1.
  const rawPageParam = searchParams.get("page");
  const initialPage = rawPageParam ? parseInt(rawPageParam, 10) || 1 : 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // We’ll store totalPages once PapersArea tells us
  const [totalPages, setTotalPages] = useState<number>(1);

  // Whenever searchParams change (filters or page changed externally), update local UI state & page
  useEffect(() => {
    // 1) Sync filter controls from URL
    const deps =
      searchParams.get("department")?.split(",").filter(Boolean) || [];
    const yrs = searchParams.get("year")?.split(",").filter(Boolean) || [];
    const start = searchParams.get("start") || "";
    const end = searchParams.get("end") || "";
    const crs = searchParams.get("course")?.split(",").filter(Boolean) || [];

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

    // 2) Sync page from URL
    const p = rawPageParam ? parseInt(rawPageParam, 10) : 1;
    setCurrentPage(isNaN(p) || p < 1 ? 1 : p);
  }, [searchParams, rawPageParam]);

  const hasFilters =
    appliedFilters.department.length > 0 ||
    appliedFilters.year.length > 0 ||
    (appliedFilters.start !== "" && appliedFilters.end !== "") ||
    appliedFilters.course.length > 0;

  // Toggle helper for checkboxes
  const toggle = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setList(
      list.includes(value) ? list.filter((x) => x !== value) : [...list, value],
    );
  };

  // When “Apply Filters” is clicked:
  const applyFilters = () => {
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
  };

  // “Clear All Filters” (also resets page to 1 by removing ?page= entirely)
  const clearAllFilters = () => {
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
  };

  // When the user clicks a new page number (or Next/Previous), we update ?page= in the URL
  const goToPage = (newPage: number) => {
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
  };

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
            {["2025", "2024"].map((y) => (
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
            {["SIA", "Capstone", "Research Writing", "CS Thesis Writing"].map(
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
            <button
              onClick={clearAllFilters}
              className={`${theme === "light" ? "border-white-5" : "border-white-50"} border transition-all duration-300 p-2 rounded-md cursor-pointer`}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </aside>

      {/* Results area */}
      <div className="flex-1 p-8 flex flex-col gap-5">
        <h1 className="text-3xl font-bold">
          {hasFilters ? "Filtered Papers" : "Recent Papers"}
        </h1>
        {/* Mobile filter popover */}
        <div className="flex md:hidden">
          <Popover>
            <PopoverTrigger className="flex items-center gap-2 cursor-pointer">
              Filter <FaFilter />
            </PopoverTrigger>
            <PopoverContent
              className={`${theme === "light" ? "bg-accent border-white-50" : "bg-dusk border-white-5"}`}
              align="start"
            >
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="title-asc">Paper Title (A-Z)</SelectItem>
                    <SelectItem value="title-des">Paper Title (Z-A)</SelectItem>
                    <SelectItem value="year-recent">
                      Publish Year (Most recent)
                    </SelectItem>
                    <SelectItem value="year-oldest">
                      Publish Year (Oldest)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* divider */}
              <div
                className={`${theme === "light" ? "bg-white-50" : "bg-white-5"} h-0.5 w-auto mb-2 mt-2 mx-1`}
              ></div>

              <p className="text-lg">Department</p>
              <ul className="ml-1 flex flex-col gap-1">
                <li>
                  <Checkbox id="it-courses" />
                  <label htmlFor="it-courses"> Information Technology</label>
                </li>
                <li>
                  <Checkbox id="cs-courses" />
                  <label htmlFor="cs-courses"> Computer Science</label>
                </li>
              </ul>
              {/* divider */}
              <div
                className={`${theme === "light" ? "bg-white-50" : "bg-white-5"} h-0.5 w-auto mb-2 mt-2 mx-2`}
              ></div>

              <p className="text-lg">Course</p>
              <ul className="ml-1 flex flex-col gap-1">
                <li>
                  <Checkbox id="it-courses" />
                  <label htmlFor="it-courses"> SIA</label>
                </li>
                <li>
                  <Checkbox id="cs-courses" />
                  <label htmlFor="cs-courses"> Capstone</label>
                </li>
                <li>
                  <Checkbox id="cs-courses" />
                  <label htmlFor="cs-courses"> CS Thesis Writing</label>
                </li>
                <li>
                  <Checkbox id="cs-courses" />
                  <label htmlFor="cs-courses"> Research Writing</label>
                </li>
              </ul>
              <span className="flex gap-2">
                <button
                  className={`${theme === "light" ? "bg-white-50" : "bg-white-5"} p-2 mt-3 w-full rounded-sm cursor-pointer`}
                >
                  Clear Filters
                </button>
                <button className="bg-gold p-2 mt-3 w-full rounded-sm cursor-pointer">
                  Apply Filters
                </button>
              </span>
            </PopoverContent>
          </Popover>
        </div>
        <PapersArea filters={appliedFilters} />

        <Pagination>
          <PaginationContent>
            {/* ─────────────── “PREVIOUS” ─────────────── */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={
                  currentPage <= 1
                    ? "dark:text-card opacity-50 pointer-events-none"
                    : "dark:text-card"
                }
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    goToPage(currentPage - 1);
                  }
                }}
              />
            </PaginationItem>

            {/* ─────────────── Page Numbers (1…totalPages) ─────────────── */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === currentPage}
                  className={
                    p === currentPage ? "dark:text-card" : "dark:text-card"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    if (p !== currentPage) {
                      goToPage(p);
                    }
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* If you have a lot of pages, you can drop in
            <PaginationEllipsis /> at the spots you prefer. */}

            {/* ─────────────── “NEXT” ─────────────── */}
            <PaginationItem>
              <PaginationNext
                href="#"
                className={
                  currentPage >= totalPages
                    ? "dark:text-card opacity-50 pointer-events-none"
                    : "dark:text-card"
                }
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    goToPage(currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}
