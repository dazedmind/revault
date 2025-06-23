// app/home/PapersArea.tsx
import React, { useEffect, useState, useRef } from "react";
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
  const [allPapers, setAllPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Track the last applied filters to prevent unnecessary loading
  const lastAppliedFiltersRef = useRef<string>("");
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const ut = localStorage.getItem("userType");
    setUserType(ut);
  }, []);

  useEffect(() => {
    async function load() {
      // Create a stable string representation of current filters for comparison
      const currentFiltersString = JSON.stringify({
        department: filters.department?.sort() || [],
        year: filters.year?.sort() || [],
        start: filters.start || "",
        end: filters.end || "",
        course: filters.course?.sort() || [],
        sort: filters.sort || "",
        search: filters.search || "",
        page: page,
      });

      // Only load if filters have actually changed (this prevents loading on UI filter changes)
      if (currentFiltersString === lastAppliedFiltersRef.current) {
        return;
      }

      console.log("🔄 Loading papers with applied filters:", filters);
      lastAppliedFiltersRef.current = currentFiltersString;

      setLoading(true);
      setError(null);
      setSearchPerformed(!!filters.search);

      try {
        let response;
        let data;

        // ✅ USE BETTER SEARCH API FOR SEARCH QUERIES
        if (filters.search) {
          console.log("🔍 Using advanced search API for query:", filters.search);
          
          const searchParams = new URLSearchParams();
          searchParams.set("q", filters.search);
          searchParams.set("limit", "100"); // Get more results for local pagination
          searchParams.set("sortBy", "relevance"); // Use relevance sorting
          
          // Add additional filters to search API
          if (filters.department?.length) {
            searchParams.set("department", filters.department.join(","));
          }
          if (filters.year?.length) {
            searchParams.set("year", filters.year.join(","));
          }
          if (filters.course?.length) {
            searchParams.set("course", filters.course.join(","));
          }

          response = await fetch(`/api/search?${searchParams.toString()}`, {
            cache: "no-store",
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Failed to search papers`);
          }

          data = await response.json();
          
          if (data.success) {
            const fetchedPapers = Array.isArray(data.results) ? data.results : [];
            
            // Filter out papers with low relevance scores (less than 1.0)
            const relevantPapers = fetchedPapers.filter(paper => 
              paper.relevanceScore >= 1.0
            );

            console.log(`📊 Search results: ${fetchedPapers.length} total, ${relevantPapers.length} relevant`);

            setAllPapers(relevantPapers);

            // Calculate pagination for search results
            const totalPagesCalculated = Math.ceil(relevantPapers.length / ITEMS_PER_PAGE);
            onTotalPages(totalPagesCalculated);

            // Set current page papers
            const startIndex = (page - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            setPapers(relevantPapers.slice(startIndex, endIndex));
          } else {
            throw new Error(data.error || "Search failed");
          }
        } else {

          const qp = new URLSearchParams();

          // Build query parameters for regular filtering
          if (filters.department?.length) {
            qp.set("department", filters.department.join(","));
          }
          if (filters.year?.length) {
            qp.set("year", filters.year.join(","));
          }
          if (filters.start && filters.end) {
            qp.set("start", filters.start);
            qp.set("end", filters.end);
          }
          if (filters.course?.length) {
            qp.set("course", filters.course.join(","));
          }
          if (filters.sort) {
            qp.set("sort", filters.sort);
          }

          qp.set("page", page.toString());

          response = await fetch(`/api/papers?${qp.toString()}`, {
            cache: "no-store",
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Failed to fetch papers`);
          }

          data = await response.json();

          setPapers(Array.isArray(data.papers) ? data.papers : []);
          setAllPapers(Array.isArray(data.papers) ? data.papers : []);
          onTotalPages(
            typeof data.totalPages === "number" ? data.totalPages : 1,
          );
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

  // Handle pagination when page changes for search results
  useEffect(() => {
    if (filters.search && allPapers.length > 0) {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setPapers(allPapers.slice(startIndex, endIndex));
    }
  }, [page, allPapers, filters.search]);

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
              No relevant papers found for &quot;{filters.search}&quot;. Try different
              keywords or check your spelling.
            </p>
          </>
        ) : (
          <>
            <FileX className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Papers Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              No papers match your current filters. Try adjusting your search
              criteria.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results summary */}
      {(filters.search || papers.length > 0) && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {searchPerformed
              ? `Found ${allPapers.length} relevant result${allPapers.length !== 1 ? "s" : ""} for "${filters.search}"`
              : `Showing ${papers.length} paper${papers.length !== 1 ? "s" : ""}`}
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
            description={paper.abstract || paper.highlights?.abstract || "No abstract available"}
            tags={paper.keywords || []}
            department={paper.department || "No department available"}
            paper_id={paper.paper_id}
            viewFromAdmin={userType === "LIBRARIAN"}
            year={paper.year || "No year available"}
            course={paper.course || "No course available"}
            searchQuery={filters.search} // Pass search query for highlighting
            relevanceScore={paper.relevanceScore} // ✅ Pass relevance score for search results
          />
        ))}
      </div>

      {/* Load more indicator for search results */}
      {searchPerformed && papers.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing relevant results for &quot;{filters.search}&quot;
          </p>
          {allPapers.length > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Results sorted by relevance • Minimum relevance score: 1.0
            </p>
          )}
        </div>
      )}
    </div>
  );
}