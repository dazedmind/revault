import React, { useEffect, useState } from "react";
import DocsCard from "../component/DocsCard";
import LoadingScreen from "../component/LoadingScreen";
import document from "../img/document.png";
import { Search, AlertCircle, FileX } from "lucide-react";

interface Filters {
  department?: string[];
  year?: string[];
  start?: string;
  end?: string;
  course?: string[];
  sort?: string;
  search?: string;
}

interface PapersAreaProps {
  filters: Filters;
  page: number;
  onTotalPages: (n: number) => void;
}

const ITEMS_PER_PAGE = 5;

export default function PapersArea({
  filters,
  page,
  onTotalPages,
}: PapersAreaProps) {
  const [papers, setPapers] = useState<any[]>([]);
  const [allPapers, setAllPapers] = useState<any[]>([]); // Store all papers for client-side pagination
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Pull userType from localStorage (for viewFromAdmin toggle)
  const [userType, setUserType] = useState<string | null>(null);
  useEffect(() => {
    const ut = localStorage.getItem("userType");
    setUserType(ut);
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      setSearchPerformed(!!filters.search);

      try {
        let url: string;
        let queryParams = new URLSearchParams();

        // Check if we have any filters or search applied
        const hasSearch = filters.search && filters.search.trim();
        const hasFilters =
          (filters.department && filters.department.length > 0) ||
          (filters.year && filters.year.length > 0) ||
          (filters.start && filters.end) ||
          (filters.course && filters.course.length > 0);

        let isRecentPapers = false;

        // If there's a search query, use the search endpoint
        if (hasSearch) {
          url = "/api/search";
          queryParams.set("q", filters.search.trim());
          queryParams.set("page", String(page));
          queryParams.set("limit", "5");

          // Add other filters to search
          if (filters.department?.length) {
            queryParams.set("department", filters.department.join(","));
          }
          if (filters.year?.length) {
            queryParams.set("year", filters.year.join(","));
          }
          if (filters.start && filters.end) {
            queryParams.set("start", filters.start);
            queryParams.set("end", filters.end);
          }
          if (filters.course?.length) {
            queryParams.set("course", filters.course.join(","));
          }
          if (filters.sort) {
            queryParams.set("sortBy", filters.sort);
          }
        }
        // If we have filters but no search, use filtered papers endpoint
        else if (hasFilters) {
          url = "/api/papers";
          queryParams.set("page", String(page));

          if (filters.department?.length) {
            queryParams.set("department", filters.department.join(","));
          }
          if (filters.year?.length) {
            queryParams.set("year", filters.year.join(","));
          }
          if (filters.start && filters.end) {
            queryParams.set("start", filters.start);
            queryParams.set("end", filters.end);
          }
          if (filters.course?.length) {
            queryParams.set("course", filters.course.join(","));
          }
          if (filters.sort) {
            queryParams.set("sort", filters.sort);
          }
        }
        // Default: show recent papers
        else {
          url = "/api/recent";
          isRecentPapers = true;
          // Recent papers endpoint doesn't use pagination
        }

        const fullUrl =
          hasFilters || hasSearch ? `${url}?${queryParams.toString()}` : url;
        console.log("Fetching:", fullUrl);

        const res = await fetch(fullUrl, { cache: "no-store" });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`HTTP ${res.status}: ${errorText}`);
        }

        const json = await res.json();
        console.log("API Response:", json);

        let rawArray: any[] = [];
        let totalPages = 1;

        // Handle search API response format
        if (hasSearch && json.success) {
          rawArray = json.results || [];
          totalPages = json.pagination?.totalPages || 1;
        }
        // Handle regular papers API response format (with filters)
        else if (hasFilters) {
          if (Array.isArray(json)) {
            rawArray = json;
            totalPages = 1;
          } else if (Array.isArray(json.papers)) {
            rawArray = json.papers;
            totalPages = json.totalPages || 1;
          } else {
            console.error("Unexpected JSON shape for filtered papers:", json);
            rawArray = [];
            totalPages = 1;
          }
        }
        // Handle recent papers API response format (no filters, no search)
        else {
          if (Array.isArray(json)) {
            rawArray = json;
            // For recent papers, calculate total pages based on all papers
            totalPages = Math.ceil(rawArray.length / ITEMS_PER_PAGE);
          } else {
            console.error("Unexpected JSON shape for recent papers:", json);
            rawArray = [];
            totalPages = 1;
          }
        }

        onTotalPages(totalPages);

        // Normalize the paper data
        const normalized = rawArray.map((paper: any) => ({
          ...paper,
          title: stripQuotes(paper.title || ""),
          author: stripQuotes(paper.author || ""),
          keywords: normalizeKeywords(paper.keywords),
          tags: normalizeKeywords(paper.tags || paper.keywords),
          abstract: stripQuotes(paper.abstract || ""),
          department: paper.department || "",
          course: paper.course || "",
          year: paper.year || "",
        }));

        // Sort recent papers by year (most recent first)
        if (isRecentPapers) {
          normalized.sort((a, b) => {
            const yearA = parseInt(a.year) || 0;
            const yearB = parseInt(b.year) || 0;
            return yearB - yearA; // Descending order
          });
        }

        // For recent papers, handle client-side pagination
        if (isRecentPapers) {
          setAllPapers(normalized);
          const startIndex = (page - 1) * ITEMS_PER_PAGE;
          const endIndex = startIndex + ITEMS_PER_PAGE;
          setPapers(normalized.slice(startIndex, endIndex));
        } else {
          setPapers(normalized);
          setAllPapers([]);
        }
      } catch (err) {
        console.error("Error loading papers:", err);
        setError(err instanceof Error ? err.message : "Failed to load papers");
        setPapers([]);
        setAllPapers([]);
        onTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filters, page, onTotalPages]);

  // Handle pagination when page changes for recent papers
  useEffect(() => {
    if (allPapers.length > 0) {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setPapers(allPapers.slice(startIndex, endIndex));
    }
  }, [page, allPapers]);

  // Helper functions
  const stripQuotes = (str: string) => {
    if (!str) return "";
    return str.replace(/^"|"$/g, "");
  };

  const normalizeKeywords = (keywords: any) => {
    if (!keywords) return [];
    if (Array.isArray(keywords)) {
      return keywords.flatMap((k: string) =>
        typeof k === "string" ? k.split(",").map((item) => item.trim()) : [],
      );
    }
    return [];
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        {/* <LoadingScreen /> */}
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {filters.search
            ? `Searching for "${filters.search}"...`
            : "Loading papers..."}
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Error Loading Papers
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
          {error}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // No papers found
  if (papers.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        {searchPerformed ? (
          <>
            <Search className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Search Results
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              No papers found for &quot;{filters.search}&quot;. Try different
              keywords or check your spelling.
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>Search tips:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Try broader or more general terms</li>
                <li>Check spelling and try synonyms</li>
                <li>Use fewer keywords</li>
                <li>Search by author name or department</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <FileX className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Papers Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              {filters.department?.length ||
              filters.year?.length ||
              filters.course?.length ||
              (filters.start && filters.end)
                ? "No papers match your current filters. Try adjusting your filter criteria."
                : "No papers are currently available in the system."}
            </p>
          </>
        )}
      </div>
    );
  }

  // Render papers
  return (
    <div className="space-y-4">
      {/* Search results header */}
      {searchPerformed && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Search Results for &quot;{filters.search}&quot;
            </span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
            Found {papers.length} paper{papers.length !== 1 ? "s" : ""} matching
            your search
          </p>
        </div>
      )}

      {/* Papers grid */}
      <div className="grid gap-4">
        {papers.map((paper) => (
          <DocsCard
            key={paper.paper_id}
            img={document}
            title={paper.title || "Untitled"}
            author={paper.author || "No author available"}
            description={paper.abstract || "No abstract available"}
            tags={paper.keywords || []}
            department={paper.department || "No department available"}
            paper_id={paper.paper_id}
            viewFromAdmin={userType === "LIBRARIAN"}
            year={paper.year || "No year available"}
            course={paper.course || "No course available"}
            searchQuery={filters.search} // Pass search query for highlighting
          />
        ))}
      </div>

      {/* Load more indicator for search results */}
      {searchPerformed && papers.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing results for &quot;{filters.search}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
