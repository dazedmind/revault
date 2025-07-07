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
    debounce(async (searchQuery) => {
      if (!searchQuery.trim() || searchQuery.length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const params = new URLSearchParams({
          q: searchQuery,
          limit: "6", // Limit results for dropdown
        });

        console.log("🔍 Searching for:", searchQuery);
        const response = await fetch(`/api/search?${params}`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("📥 Search response:", data);

        if (data.success) {
          setResults(data.results || []);
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
  const handleInputChange = (e) => {
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
  const handleResultClick = (paper) => {
    if (paper.isError) return; // Don't navigate for error results

    setIsOpen(false);
    setIsMobileSearchOpen(false);
    setQuery("");
    router.push(`/view-file/${paper.paper_id}`);
  };

  // Handle search submission (Enter key or search button)
  const handleSearchSubmit = () => {
    if (!query.trim()) return;

    setIsOpen(false);
    setIsMobileSearchOpen(false);

    // If we're on homepage, update the URL with search query
    if (pathname === "/home") {
      const newSearchParams = new URLSearchParams(searchParams as any);
      newSearchParams.set("q", query.trim());
      newSearchParams.delete("page"); // Reset to page 1 when searching

      const newUrl = `${pathname}?${newSearchParams.toString()}`;
      console.log("🔍 Searching on homepage, updating URL to:", newUrl);
      router.replace(newUrl, { scroll: false });
    } else {
      // Navigate to home page if not on homepage
      const searchParamsNew = new URLSearchParams({ q: query.trim() });
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
  const handleKeyDown = (e) => {
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
    const handleClickOutside = (event) => {
      if (isMobileSearchOpen) return; // Don't close on mobile overlay

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileSearchOpen]);

  // Prevent body scroll when mobile search is open - FIXED
  useEffect(() => {
    if (isMobileSearchOpen) {
      // Store original body styles
      const originalStyle = window.getComputedStyle(document.body);
      const originalOverflow = originalStyle.overflow;
      const originalPaddingRight = originalStyle.paddingRight;
      
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
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

  // Highlight matching text
  const highlightText = (text, query) => {
    if (!text || !query) return text;

    const queryTerms = query.toLowerCase().split(/\s+/);
    let highlightedText = text;

    queryTerms.forEach((term) => {
      if (term.length > 1) {
        const regex = new RegExp(`(${term})`, "gi");
        highlightedText = highlightedText.replace(
          regex,
          '<strong class="text-yale-blue">$1</strong>',
        );
      }
    });

    return highlightedText;
  };

  return (
    <>
      {/* Desktop Search Input */}
      <div
        className="hidden md:block relative flex-1 max-w-lg z-50 font-[Inter]"
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
                                __html: highlightText(paper.title, query),
                              }}
                            />

                            <div className="flex items-center gap-3 mt-1 text-xs">
                              {paper.author && (
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span className="truncate max-w-28">
                                    {paper.author}
                                  </span>
                                </div>
                              )}
                              {paper.year && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{paper.year}</span>
                                </div>
                              )}
                              {paper.department && (
                                <div className="flex items-center gap-1">
                                  <Building className="w-3 h-3" />
                                  <span className="truncate max-w-24">
                                    {paper.department}
                                  </span>
                                </div>
                              )}
                            </div>

                            {paper.highlights?.abstract && (
                              <p
                                className="text-xs text-white-5 mt-1 line-clamp-2"
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(
                                    paper.highlights.abstract.substring(
                                      0,
                                      100,
                                    ) + "...",
                                    query,
                                  ),
                                }}
                              />
                            )}
                          </div>

                          {paper.relevanceScore > 0 && (
                            <div className="text-xs text-green-500 font-medium">
                              {Math.min(paper.relevanceScore * 10, 100).toFixed(
                                0,
                              )}
                              %
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                  {results.some((r) => r.isError) && (
                    <div className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                      <p className="text-sm">Search temporarily unavailable</p>
                      <p className="text-xs">Please try again later</p>
                    </div>
                  )}
                </div>

                {!results.some((r) => r.isError) && (
                  <div className="border-t border-gray-200 px-4 py-3 bg-secondary">
                    <button
                      onClick={handleViewAllResults}
                      className="cursor-pointer w-full text-left text-sm text-gold hover:text-gold/80 font-medium flex items-center justify-between transition-colors"
                    >
                      <span>View all results for &quot;{query}&quot;</span>
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : query.trim().length >= 2 && !loading ? (
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

      {/* Mobile Search Overlay - FIXED LAYOUT */}
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
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-gold" />
                <p className="text-sm">Searching papers...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-white-5 dark:divide-gray-700">
                {results
                  .filter((result) => !result.isError)
                  .map((paper, index) => (
                    <div
                      key={paper.paper_id}
                      onClick={() => handleResultClick(paper)}
                      className={`p-4 cursor-pointer hover:bg-gold/80 transition-colors active:bg-gold/60 ${
                        selectedIndex === index
                          ? "bg-gold/10 dark:bg-gold/20"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-yale-blue mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-medium text-base line-clamp-3 mb-2"
                            dangerouslySetInnerHTML={{
                              __html: highlightText(paper.title, query),
                            }}
                          />

                          <div className="flex flex-wrap items-center gap-3 mb-2 text-sm">
                            {paper.author && (
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span className="truncate max-w-40">
                                  {paper.author}
                                </span>
                              </div>
                            )}
                            {paper.year && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{paper.year}</span>
                              </div>
                            )}
                            {paper.department && (
                              <div className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                <span className="truncate max-w-32">
                                  {paper.department}
                                </span>
                              </div>
                            )}
                          </div>

                          {paper.highlights?.abstract && (
                            <p
                              className="text-sm text-white-5 line-clamp-3"
                              dangerouslySetInnerHTML={{
                                __html: highlightText(
                                  paper.highlights.abstract.substring(0, 150) +
                                    "...",
                                  query,
                                ),
                              }}
                            />
                          )}
                        </div>

                        {paper.relevanceScore > 0 && (
                          <div className="text-sm text-green-500 font-medium">
                            {Math.min(paper.relevanceScore * 10, 100).toFixed(
                              0,
                            )}
                            %
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                {results.some((r) => r.isError) && (
                  <div className="p-8 text-center text-red-600 dark:text-red-400">
                    <p className="text-base">Search temporarily unavailable</p>
                    <p className="text-sm mt-1">Please try again later</p>
                  </div>
                )}

                {!results.some((r) => r.isError) && query.trim() && (
                  <div className="p-4 border-t border-white-5 dark:border-gray-700 bg-secondary">
                    <button
                      onClick={handleViewAllResults}
                      className="w-full p-3 text-gold hover:text-gold/80 font-medium flex items-center justify-center gap-2 transition-colors rounded-lg hover:bg-gold/10"
                    >
                      <span>View all results for &quot;{query}&quot;</span>
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : query.trim().length >= 2 && !loading ? (
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

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default SearchInput;