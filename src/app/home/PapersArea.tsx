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
  search?: string; // Add search support
}

interface PapersAreaProps {
  filters: Filters;
  page: number;
  onTotalPages: (n: number) => void;
}

export default function PapersArea({
  filters,
  page,
  onTotalPages,
}: PapersAreaProps) {
  const [papers, setPapers] = useState<any[]>([]);
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

        // If there's a search query, use the search endpoint
        if (filters.search && filters.search.trim()) {
          url = '/api/papers/search';
          queryParams.set('q', filters.search.trim());
          queryParams.set('page', String(page));
          queryParams.set('limit', '10');

          // Add other filters to search
          if (filters.department?.length) {
            queryParams.set('department', filters.department.join(','));
          }
          if (filters.year?.length) {
            queryParams.set('year', filters.year.join(','));
          }
          if (filters.course?.length) {
            queryParams.set('course', filters.course.join(','));
          }
          if (filters.sort) {
            queryParams.set('sortBy', filters.sort);
          }
        } else {
          // Use regular papers endpoint
          url = '/api/papers';
          queryParams.set('page', String(page));

          if (filters.department?.length) {
            queryParams.set('department', filters.department.join(','));
          }
          if (filters.year?.length) {
            queryParams.set('year', filters.year.join(','));
          }
          if (filters.course?.length) {
            queryParams.set('course', filters.course.join(','));
          }
          if (filters.start && filters.end) {
            queryParams.set('start', filters.start);
            queryParams.set('end', filters.end);
          }
          if (filters.sort) {
            queryParams.set('sort', filters.sort);
          }
        }

        const fullUrl = `${url}?${queryParams.toString()}`;
        console.log('Fetching:', fullUrl);

        const res = await fetch(fullUrl, { cache: "no-store" });
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${await res.text()}`);
        }

        const json = await res.json();
        console.log('API Response:', json);

        let rawArray: any[] = [];
        let totalPages = 1;

        // Handle search API response format
        if (filters.search && json.success) {
          rawArray = json.results || [];
          totalPages = json.pagination?.totalPages || 1;
        }
        // Handle regular papers API response format
        else if (Array.isArray(json)) {
          rawArray = json;
          totalPages = 1;
        } else if (Array.isArray(json.papers)) {
          rawArray = json.papers;
          totalPages = json.totalPages || 1;
        } else {
          console.error("Unexpected JSON shape:", json);
          rawArray = [];
          totalPages = 1;
        }

        onTotalPages(totalPages);

        // Normalize the paper data
        const normalized = rawArray.map((paper: any) => ({
          ...paper,
          title: stripQuotes(paper.title || ''),
          author: stripQuotes(paper.author || ''),
          keywords: normalizeKeywords(paper.keywords),
          tags: normalizeKeywords(paper.tags || paper.keywords),
          abstract: stripQuotes(paper.abstract || ''),
          department: paper.department || '',
          course: paper.course || '',
          year: paper.year || '',
        }));

        setPapers(normalized);

      } catch (err) {
        console.error("Error loading papers:", err);
        setError(err instanceof Error ? err.message : 'Failed to load papers');
        setPapers([]);
        onTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filters, page, onTotalPages]);

  // Helper functions
  const stripQuotes = (str: string) => {
    if (!str) return '';
    return str.replace(/^"|"$/g, "");
  };

  const normalizeKeywords = (keywords: any) => {
    if (!keywords) return [];
    if (Array.isArray(keywords)) {
      return keywords.flatMap((k: string) =>
        typeof k === 'string' ? k.split(",").map((item) => item.trim()) : []
      );
    }
    return [];
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingScreen />
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {filters.search ? `Searching for "${filters.search}"...` : 'Loading papers...'}
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
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // No papers found
  if (papers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        {searchPerformed ? (
          <>
            <Search className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Search Results
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              No papers found for &quot;{filters.search}&quot;. Try different keywords or check your spelling.
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
              No papers match your current filters. Try adjusting your filter criteria.
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
            Found {papers.length} paper{papers.length !== 1 ? 's' : ''} matching your search
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
            viewFromAdmin={userType === "librarian"}
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