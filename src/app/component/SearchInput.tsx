"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  X,
  FileText,
  User,
  Calendar,
  Building,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// Debounce utility function
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const SearchInput = ({ placeholder = "Search papers..." }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const mobileInputRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize search query from URL if we're on homepage
  useEffect(() => {
    if (pathname === "/home") {
      const urlQuery = searchParams.get("q") || "";
      setQuery(urlQuery);
    }
  }, [pathname, searchParams]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      // 🔥 ONLY CHANGE: Check if it's a quoted query and preserve quotes
      const trimmedQuery = searchQuery.trim();
      const isQuotedQuery =
        trimmedQuery.startsWith('"') && trimmedQuery.endsWith('"');
      const queryToSend = isQuotedQuery ? trimmedQuery : trimmedQuery;

      if (!queryToSend || queryToSend.length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const params = new URLSearchParams({
          q: queryToSend, // 🔥 ONLY CHANGE: Use properly formatted query
          limit: "100", // 🔧 FIX: Get same amount as PapersArea
          sortBy: "relevance", // 🔧 FIX: Ensure relevance sorting
        });

        console.log("🔍 Searching for:", queryToSend);
        const response = await fetch(`/api/search?${params}`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("📥 Search response:", data);

        if (data.success) {
          // 🔧 FIX: Filter and slice to get top 6 relevant results
          const relevantResults = (data.results || [])
            .filter((paper) => paper.relevanceScore >= 1.0) // Same filter as PapersArea
            .slice(0, 6); // Take only top 6 for dropdown

          setResults(relevantResults);
        } else {
          console.error("Search failed:", data.error);
          setResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);

        // Show error state in dropdown
        setResults([
          {
            paper_id: -1,
            title: "Search temporarily unavailable",
            author: "Please try again later",
            isError: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }, 300),
    [],
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    if (value.trim().length >= 2) {
      setIsOpen(true);
      setLoading(true);
      debouncedSearch(value);
    } else {
      setIsOpen(false);
      setResults([]);
      setLoading(false);
    }
  };

  // Handle clicking on a search result
  const handleResultClick = (paper: any) => {
    if (paper.isError) return; // Don't navigate for error results

    setIsOpen(false);
    setIsMobileSearchOpen(false);
    setQuery("");
    router.push(`/view-file/${paper.paper_id}`);
  };

  // Handle search submission (Enter key or search button)
  const handleSearchSubmit = () => {
    // 🔥 ONLY CHANGE: Check if it's a quoted query and preserve quotes
    const trimmedQuery = query.trim();
    const isQuotedQuery =
      trimmedQuery.startsWith('"') && trimmedQuery.endsWith('"');
    const queryToSubmit = isQuotedQuery ? trimmedQuery : trimmedQuery;

    if (!queryToSubmit) return;

    setIsOpen(false);
    setIsMobileSearchOpen(false);

    // If we're on homepage, update the URL with search query
    if (pathname === "/home") {
      const newSearchParams = new URLSearchParams(searchParams as any);
      newSearchParams.set("q", queryToSubmit); // 🔥 ONLY CHANGE: Use properly formatted query
      newSearchParams.delete("page"); // Reset to page 1 when searching

      const newUrl = `${pathname}?${newSearchParams.toString()}`;
      console.log("🔍 Searching on homepage, updating URL to:", newUrl);
      router.replace(newUrl, { scroll: false });
    } else {
      // Navigate to home page if not on homepage
      const searchParamsNew = new URLSearchParams({ q: queryToSubmit }); // 🔥 ONLY CHANGE: Use properly formatted query
      router.push(`/home?${searchParamsNew}`);
    }
  };

  // Handle "View all results" click
  const handleViewAllResults = () => {
    handleSearchSubmit();
  };

  // Handle mobile search open
  const handleMobileSearchOpen = () => {
    setIsMobileSearchOpen(true);
    // Focus input after state update and DOM render
    setTimeout(() => {
      mobileInputRef.current?.focus();
    }, 100);
  };

  // Handle mobile search close
  const handleMobileSearchClose = () => {
    setIsMobileSearchOpen(false);
    setIsOpen(false);

    // Reset query to URL value if on homepage
    if (pathname === "/home") {
      const urlQuery = searchParams.get("q") || "";
      setQuery(urlQuery);
    } else {
      setQuery("");
    }

    setResults([]);
    setLoading(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearchSubmit();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.filter((r) => !r.isError).length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        const validResults = results.filter((r) => !r.isError);
        if (selectedIndex >= 0 && validResults[selectedIndex]) {
          handleResultClick(validResults[selectedIndex]);
        } else if (query.trim()) {
          handleSearchSubmit();
        }
        break;
      case "Escape":
        if (isMobileSearchOpen) {
          handleMobileSearchClose();
        } else {
          setIsOpen(false);
          setSelectedIndex(-1);
          searchRef.current?.blur();
        }
        break;
    }
  };

  // Clear search
  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);

    // If on homepage, clear search from URL too
    if (pathname === "/home") {
      const newSearchParams = new URLSearchParams(searchParams as any);
      newSearchParams.delete("q");
      newSearchParams.delete("page"); // Reset to page 1

      const newUrl = newSearchParams.toString()
        ? `${pathname}?${newSearchParams.toString()}`
        : pathname;
      router.replace(newUrl, { scroll: false });
    }

    if (isMobileSearchOpen) {
      mobileInputRef.current?.focus();
    } else {
      searchRef.current?.focus();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileSearchOpen) return; // Don't close on mobile overlay

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileSearchOpen]);

  // Prevent body scroll when mobile search is open
  useEffect(() => {
    if (isMobileSearchOpen) {
      // Store original body styles
      const originalStyle = window.getComputedStyle(document.body);
      const originalOverflow = originalStyle.overflow;
      const originalPaddingRight = originalStyle.paddingRight;

      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Apply styles to prevent body scroll
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isMobileSearchOpen]);

  // Utility function to escape special regex characters
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // Highlight matching text - using original styling
  const highlightText = (text: string, query: string) => {
    if (!text || !query) return text;

    // 🔥 ONLY CHANGE: Handle quoted queries for highlighting
    const trimmedQuery = query.trim();
    const isQuotedQuery =
      trimmedQuery.startsWith('"') && trimmedQuery.endsWith('"');

    if (isQuotedQuery) {
      // For quoted queries, highlight the exact phrase
      const exactPhrase = trimmedQuery.slice(1, -1).trim();
      if (exactPhrase) {
        const regex = new RegExp(`(${escapeRegExp(exactPhrase)})`, "gi");
        return text.replace(
          regex,
          '<strong class="text-yale-blue">$1</strong>',
        );
      }
      return text;
    } else {
      // ORIGINAL: For regular queries, highlight individual terms (unchanged)
      const queryTerms = query.toLowerCase().split(/\s+/);
      let highlightedText = text;

      queryTerms.forEach((term) => {
        if (term.length > 1) {
          const regex = new RegExp(`(${escapeRegExp(term)})`, "gi");
          highlightedText = highlightedText.replace(
            regex,
            '<strong class="text-yale-blue">$1</strong>',
          );
        }
      });

      return highlightedText;
    }
  };

  // Function to get the display text for abstract - USE BACKEND HIGHLIGHTS IF AVAILABLE
  const getAbstractDisplay = (paper: any, query: string) => {
    // CRITICAL: Use the backend's intelligent highlight if available
    if (paper.highlights && paper.highlights.abstract) {
      console.log(
        "🎯 Using backend intelligent snippet:",
        paper.highlights.abstract,
      );
      return highlightText(paper.highlights.abstract, query);
    }

    // Fallback to original abstract if no highlights
    if (paper.abstract) {
      console.log("⚠️ Using fallback abstract (first 150 chars)");
      const fallbackText = paper.abstract.substring(0, 150) + "...";
      return highlightText(fallbackText, query);
    }

    return "No abstract available";
  };

  return (
    <>
      {/* Desktop Search Input */}
      <div
        className="hidden md:block relative flex-1 max-w-lg z-40 font-[Inter]"
        ref={searchRef}
      >
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (query.trim().length >= 2 && results.length > 0) {
                  setIsOpen(true);
                }
              }}
              placeholder={placeholder}
              className="w-full pl-10 pr-10 py-2 bg-primary border border-gray-300 dark:border-gray-600 rounded-lg text-sm transition-all duration-200"
              autoComplete="off"
            />

            {/* Clear button */}
            {query && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Loading spinner */}
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-gold" />
              </div>
            )}
          </div>
        </div>

        {/* Desktop Search Results Dropdown */}
        {isOpen && query.length >= 2 && (
          <div
            className="absolute top-full left-0 right-0 mt-2 w-3xl bg-accent border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-card-foreground
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-tertiary"
          >
            {loading && results.length === 0 ? (
              <div className="p-4 text-center">
                <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-gold" />
                <p className="text-sm">Searching papers...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="">
                  {results
                    .filter((result) => !result.isError)
                    .map((paper, index) => (
                      <div
                        key={paper.paper_id}
                        onClick={() => handleResultClick(paper)}
                        className={`px-4 py-3 cursor-pointer border-gray-100 dark:border-gray-700  hover:bg-gold/80 transition-colors ${
                          selectedIndex === index
                            ? "bg-gold/10 dark:bg-gold/20"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <FileText className="w-4 h-4 text-yale-blue mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4
                              className="font-medium text-sm line-clamp-2"
                              dangerouslySetInnerHTML={{
                                __html: paper.highlights?.title
                                  ? highlightText(paper.highlights.title, query)
                                  : highlightText(
                                      paper.title || "Untitled",
                                      query,
                                    ),
                              }}
                            />
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                              <User className="w-3 h-3" />
                              <span
                                className="truncate"
                                dangerouslySetInnerHTML={{
                                  __html: paper.highlights?.author
                                    ? highlightText(
                                        paper.highlights.author,
                                        query,
                                      )
                                    : highlightText(
                                        paper.author || "Unknown Author",
                                        query,
                                      ),
                                }}
                              />
                              {paper.year && (
                                <>
                                  <span className="text-gray-300">•</span>
                                  <Calendar className="w-3 h-3" />
                                  <span>{paper.year}</span>
                                </>
                              )}
                              {paper.department && (
                                <>
                                  <span className="text-gray-300">•</span>
                                  <Building className="w-3 h-3" />
                                  <span className="truncate">
                                    {paper.department}
                                  </span>
                                </>
                              )}
                            </div>
                            <p
                              className="text-xs text-muted-foreground mt-1 line-clamp-2"
                              dangerouslySetInnerHTML={{
                                __html: getAbstractDisplay(paper, query),
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* View all results footer */}
                {results.filter((r) => !r.isError).length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
                    <button
                      onClick={handleViewAllResults}
                      className="w-full text-center text-sm text-gold hover:text-gold/80 transition-colors"
                    >
                      View all results for &quot;{query}&quot;
                    </button>
                  </div>
                )}
              </>
            ) : query.trim().length >= 2 ? (
              <div className="p-4 text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                <p className="text-sm">
                  No papers found for &quot;{query}&quot;
                </p>
                <p className="text-xs mt-1">
                  Try different keywords or check spelling
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Mobile Search Button */}
      <button
        onClick={handleMobileSearchOpen}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-primary border border-gray-300 dark:border-gray-600 transition-colors hover:bg-gold/10"
      >
        <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </button>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-primary font-[Inter] flex flex-col">
          {/* Mobile Search Header - Fixed */}
          <div className="flex-shrink-0 flex items-center gap-3 p-4 border-b border-white-5">
            <button
              onClick={handleMobileSearchClose}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gold/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <input
                ref={mobileInputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-3 bg-accent rounded-lg text-base transition-all duration-200 focus:ring-2 focus:ring-gold focus:border-transparent"
                autoComplete="off"
                autoFocus
              />

              {query && !loading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {loading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader2 className="w-5 h-5 animate-spin text-gold" />
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Results - Scrollable */}
          <div className="flex-1 min-h-0 overflow-y-auto bg-accent">
            {loading && results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 mb-4 animate-spin text-gold" />
                <p className="text-base">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {results
                  .filter((result) => !result.isError)
                  .map((paper, index) => (
                    <div
                      key={paper.paper_id}
                      onClick={() => handleResultClick(paper)}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedIndex === index
                          ? "bg-gold/10 dark:bg-gold/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-yale-blue mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-medium text-base line-clamp-2 mb-2"
                            dangerouslySetInnerHTML={{
                              __html: paper.highlights?.title
                                ? highlightText(paper.highlights.title, query)
                                : highlightText(
                                    paper.title || "Untitled",
                                    query,
                                  ),
                            }}
                          />
                          <div className="flex items-center gap-2 mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <User className="w-4 h-4" />
                            <span
                              className="truncate"
                              dangerouslySetInnerHTML={{
                                __html: paper.highlights?.author
                                  ? highlightText(
                                      paper.highlights.author,
                                      query,
                                    )
                                  : highlightText(
                                      paper.author || "Unknown Author",
                                      query,
                                    ),
                              }}
                            />
                          </div>
                          <p
                            className="text-sm text-muted-foreground line-clamp-3"
                            dangerouslySetInnerHTML={{
                              __html: getAbstractDisplay(paper, query),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                {/* View all results footer for mobile */}
                {results.filter((r) => !r.isError).length > 0 && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleViewAllResults}
                      className="w-full text-center text-base text-gold hover:text-gold/80 transition-colors py-2"
                    >
                      View all results for &quot;{query}&quot;
                    </button>
                  </div>
                )}
              </div>
            ) : query.trim().length >= 2 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-base mb-1">
                  No papers found for &quot;{query}&quot;
                </p>
                <p className="text-sm text-white-5">
                  Try different keywords or check spelling
                </p>
              </div>
            ) : query.trim().length < 2 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Search className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-base mb-1">Start typing to search</p>
                <p className="text-sm text-white-5">
                  Search papers by title, author, or keywords
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchInput;
