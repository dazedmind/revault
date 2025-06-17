// app/home/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import PapersArea from "./PapersArea";
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
import { useTheme } from "next-themes";
import {
  FilterSection,
  MobileFilterSection,
  type FilterState,
} from "@/app/component/FilterSection";

// Helper component for filter tags
const FilterTag = ({ label }: { label: string }) => (
  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded text-xs">
    {label}
  </span>
);

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useTheme();

  // UI state for filters
  const [filterState, setFilterState] = useState<FilterState>({
    departments: [],
    years: [],
    startYear: "",
    endYear: "",
    courses: [],
    sortOption: "",
  });

  // Applied filters
  const [appliedFilters, setAppliedFilters] = useState({
    department: [] as string[],
    year: [] as string[],
    start: "",
    end: "",
    course: [] as string[],
    sort: "",
    search: "",
  });

  // Pagination
  const rawPageParam = searchParams.get("page");
  const initialPage = rawPageParam ? parseInt(rawPageParam, 10) || 1 : 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Sync filters from URL
  useEffect(() => {
    const deps =
      searchParams.get("department")?.split(",").filter(Boolean) || [];
    const yrs = searchParams.get("year")?.split(",").filter(Boolean) || [];
    const start = searchParams.get("start") || "";
    const end = searchParams.get("end") || "";
    const crs = searchParams.get("course")?.split(",").filter(Boolean) || [];
    const sort = searchParams.get("sort") || "";
    const search = searchParams.get("q") || "";

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

    setAppliedFilters({
      department: deps,
      year: start && end ? [] : yrs,
      start: start,
      end: end,
      course: crs,
      sort: sort,
      search: search,
    });
  }, [searchParams, rawPageParam]);

  // Helper functions
  const hasFilters =
    appliedFilters.department.length > 0 ||
    appliedFilters.year.length > 0 ||
    (appliedFilters.start !== "" && appliedFilters.end !== "") ||
    appliedFilters.course.length > 0 ||
    appliedFilters.search !== "";

  const hasPendingChanges = () => {
    const compareArrays = (a: string[], b: string[]) =>
      JSON.stringify(a.slice().sort()) !== JSON.stringify(b.slice().sort());

    return (
      compareArrays(filterState.departments, appliedFilters.department) ||
      compareArrays(filterState.years, appliedFilters.year) ||
      filterState.startYear !== appliedFilters.start ||
      filterState.endYear !== appliedFilters.end ||
      compareArrays(filterState.courses, appliedFilters.course) ||
      filterState.sortOption !== appliedFilters.sort
    );
  };

  const buildFilterURL = (resetPage = true) => {
    const qp = new URLSearchParams();

    if (filterState.departments.length)
      qp.set("department", filterState.departments.join(","));
    if (filterState.startYear && filterState.endYear) {
      qp.set("start", filterState.startYear);
      qp.set("end", filterState.endYear);
    } else if (filterState.years.length) {
      qp.set("year", filterState.years.join(","));
    }
    if (filterState.courses.length)
      qp.set("course", filterState.courses.join(","));
    if (filterState.sortOption) qp.set("sort", filterState.sortOption);

    const currentSearch = searchParams.get("q");
    if (currentSearch) qp.set("q", currentSearch);

    if (!resetPage && currentPage > 1) qp.set("page", String(currentPage));

    return qp.toString() ? `${pathname}?${qp.toString()}` : pathname;
  };

  const handleFiltersChange = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const applyFilters = () => {
    const href = buildFilterURL(true);
    // Use push instead of replace to avoid page reload
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
    // Use push instead of replace to avoid page reload
    router.push(href, { scroll: false });
  };

  const goToPage = (newPage: number) => {
    if (newPage < 1) newPage = 1;
    if (newPage > totalPages) newPage = totalPages;

    const qp = new URLSearchParams(searchParams as any);
    if (newPage === 1) {
      qp.delete("page");
    } else {
      qp.set("page", String(newPage));
    }

    const href = qp.toString() ? `${pathname}?${qp.toString()}` : pathname;
    // Use push instead of replace to avoid page reload
    router.push(href, { scroll: false });
    setCurrentPage(newPage);
  };

  const getPageTitle = () => {
    if (appliedFilters.search)
      return `Search Results for "${appliedFilters.search}"`;
    if (hasFilters) return "Filtered Papers";
    return "Recent Papers";
  };

  // Render pagination
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    const addPage = (pageNum: number) => (
      <PaginationItem key={pageNum}>
        <PaginationLink
          href="#"
          isActive={pageNum === currentPage}
          className="dark:text-card cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            if (pageNum !== currentPage) goToPage(pageNum);
          }}
        >
          {pageNum}
        </PaginationLink>
      </PaginationItem>
    );

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(addPage(i));
    } else {
      pages.push(addPage(1));

      if (currentPage > 3) {
        pages.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) pages.push(addPage(i));
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      if (totalPages > 1) pages.push(addPage(totalPages));
    }

    return pages;
  };

  return (
    <main className="flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-80 p-10">
        <FilterSection
          filters={filterState}
          onFiltersChange={handleFiltersChange}
          onApplyFilters={applyFilters}
          onClearFilters={clearAllFilters}
          hasPendingChanges={hasPendingChanges()}
          theme={theme}
        />
      </aside>

      {/* Results Area */}
      <div className="flex-1 p-8 flex flex-col gap-5">
        <h1 className="text-3xl font-bold">{getPageTitle()}</h1>

        {/* Mobile Filter Popover */}
        <div className="flex md:hidden">
          <Popover>
            <PopoverTrigger className="flex items-center gap-2 cursor-pointer">
              Filter <FaFilter />
              {hasPendingChanges() && (
                <span className="text-yellow-500">⚡</span>
              )}
            </PopoverTrigger>
            <PopoverContent
              className={`${theme === "light" ? "bg-accent border-white-50" : "bg-dusk border-white-5"}`}
              align="start"
            >
              <MobileFilterSection
                filters={filterState}
                onFiltersChange={handleFiltersChange}
                onApplyFilters={applyFilters}
                onClearFilters={clearAllFilters}
                hasPendingChanges={hasPendingChanges()}
                theme={theme}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Active Filters Display */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Active filters:
            </span>
            {appliedFilters.department.map((dept) => (
              <FilterTag key={dept} label={dept} />
            ))}
            {appliedFilters.year.map((year) => (
              <FilterTag key={year} label={year} />
            ))}
            {appliedFilters.start && appliedFilters.end && (
              <FilterTag
                label={`${appliedFilters.start}-${appliedFilters.end}`}
              />
            )}
            {appliedFilters.course.map((course) => (
              <FilterTag key={course} label={course} />
            ))}
            {appliedFilters.sort && (
              <FilterTag label={`Sort: ${appliedFilters.sort}`} />
            )}
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-2 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-800 dark:text-red-200 rounded text-xs cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}

        <PapersArea
          filters={appliedFilters}
          page={currentPage}
          onTotalPages={(n) => setTotalPages(n)}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className={
                    currentPage <= 1
                      ? "dark:text-card opacity-50 pointer-events-none"
                      : "dark:text-card cursor-pointer"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) goToPage(currentPage - 1);
                  }}
                />
              </PaginationItem>

              {renderPagination()}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  className={
                    currentPage >= totalPages
                      ? "dark:text-card opacity-50 pointer-events-none"
                      : "dark:text-card cursor-pointer"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) goToPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </main>
  );
}
