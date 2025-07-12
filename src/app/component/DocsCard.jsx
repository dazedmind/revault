// Clean DocsCard.jsx without bookmark activity logging
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { GoBookmark, GoEye, GoPencil, GoBookmarkFill } from "react-icons/go";
import { Calendar, User, Building, BookOpen } from "lucide-react";
import {
  logUserActivity,
  DOCUMENT_ACTIVITIES,
  ACTIVITY_TYPES,
} from "../utils/activityLogger";

const DocsCard = (props) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const router = useRouter();
  const { theme, setTheme } = useTheme("light");
  const {
    paper_id,
    savedFromProfile = false,
    viewFromAdmin = false,
    searchQuery,
  } = props;

  // Helper function to log document interactions (ONLY for read button)
  const logDocumentInteraction = async (activity, activityType) => {
    try {
      console.log("🔍 DocsCard: Attempting to log activity:", {
        activity,
        activityType,
        paper_id: props.paper_id,
        title: props.title,
      });

      const success = await logUserActivity({
        activity,
        activity_type: activityType,
        paper_id: props.paper_id,
        paper_title: props.title,
      });

      if (success) {
        console.log("✅ DocsCard: Activity logged successfully");
      } else {
        console.log("⚠️ DocsCard: Activity logging returned false");
      }
    } catch (error) {
      console.error("❌ DocsCard: Failed to log document interaction:", error);
      // Don't block user interaction if logging fails
    }
  };

  // Handle read button click with activity logging (KEEP this one)
  const handleReadButtonClick = async (e) => {
    // Log the read button click as VIEW_DOCUMENT
    await logDocumentInteraction(
      DOCUMENT_ACTIVITIES.CLICK_READ_BUTTON,
      ACTIVITY_TYPES.VIEW_DOCUMENT,
    );
  };

  // Check bookmark status
  const checkBookmarkStatus = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch(`/api/bookmark/check/${paper_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  // ✅ CLEAN: Remove bookmark without activity logging
  const handleUnbookmark = async (paperId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in to manage bookmarks.");
      return;
    }

    try {
      const res = await fetch(`/api/bookmark/${paperId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to remove bookmark");

      toast.success(data.message || "Bookmark removed successfully");
      setIsBookmarked(false);
      setBookmarkCount((prev) => Math.max(0, prev - 1));

      // ✅ NO ACTIVITY LOGGING for bookmarks
    } catch (err) {
      console.error("Unbookmark error:", err);
      toast.error(
        err.message || "An error occurred while removing the bookmark.",
      );
    }
  };

  // ✅ CLEAN: Add bookmark without activity logging
  const handleBookmark = async (paperId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in to bookmark papers.");
      return;
    }

    try {
      const res = await fetch("/api/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paperId }), // Using paperId consistently
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to bookmark paper");

      toast.success(data.message || "Paper bookmarked successfully");
      setIsBookmarked(true);
      setBookmarkCount((prev) => prev + 1);

      // ✅ NO ACTIVITY LOGGING for bookmarks
    } catch (err) {
      console.error("Bookmark error:", err);
      toast.error(err.message || "An error occurred while bookmarking.");
    }
  };

  useEffect(() => {
    if (paper_id) {
      checkBookmarkStatus();
    }
  }, [paper_id]);

  // Utility functions
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const highlightText = (text, query) => {
    if (!text || !query) return text;

    // 🔥 NEW: Handle quoted queries for highlighting (same logic as SearchInput)
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
      const queryTerms = query
        .toLowerCase()
        .split(/\s+/)
        .filter((term) => term.length > 1);
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

  const getIntelligentDescription = (description, query) => {
    if (props.highlights && props.highlights.abstract) {
      console.log(
        "🎯 DocsCard: Using backend intelligent snippet for description",
      );
      return highlightText(props.highlights.abstract, query);
    }

    if (description && query) {
      console.log("🔍 DocsCard: Creating intelligent snippet for description");
      const bestSnippet = findBestSnippet(description, query, 200);
      return highlightText(bestSnippet, query);
    }

    return highlightText(truncateText(description), query);
  };

  const findBestSnippet = (text, query, maxLength = 200) => {
    if (!text || !query) return text;

    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower
      .split(/\s+/)
      .filter((term) => term.length > 1);

    const matches = [];

    if (textLower.includes(queryLower)) {
      let pos = textLower.indexOf(queryLower);
      while (pos !== -1) {
        matches.push({
          start: pos,
          end: pos + queryLower.length,
          score: 10,
        });
        pos = textLower.indexOf(queryLower, pos + 1);
      }
    }

    queryTerms.forEach((term) => {
      let pos = textLower.indexOf(term);
      while (pos !== -1) {
        const isOverlapping = matches.some(
          (match) => pos >= match.start && pos < match.end,
        );

        if (!isOverlapping) {
          matches.push({
            start: pos,
            end: pos + term.length,
            score: 3,
          });
        }
        pos = textLower.indexOf(term, pos + 1);
      }
    });

    if (matches.length === 0) {
      return text.length <= maxLength
        ? text
        : text.substring(0, maxLength) + "...";
    }

    if (text.length <= maxLength) {
      return text;
    }

    const bestMatch = matches.reduce((best, current) =>
      current.score > best.score ? current : best,
    );

    const matchCenter = (bestMatch.start + bestMatch.end) / 2;
    const halfLength = Math.floor(maxLength / 2);

    let snippetStart = Math.max(0, matchCenter - halfLength);
    let snippetEnd = Math.min(text.length, snippetStart + maxLength);

    if (snippetEnd === text.length) {
      snippetStart = Math.max(0, snippetEnd - maxLength);
    }

    snippetStart = findSentenceStart(text, snippetStart);
    snippetEnd = findSentenceEnd(text, snippetEnd);

    let snippet = text.substring(snippetStart, snippetEnd);

    if (snippetStart > 0) {
      snippet = "..." + snippet.trim();
    }
    if (snippetEnd < text.length) {
      snippet = snippet.trim() + "...";
    }

    return snippet;
  };

  const findSentenceStart = (text, position) => {
    const beforeText = text.substring(Math.max(0, position - 50), position);
    const lastSentence = beforeText.match(/[.!?]\s+([^.!?]*)$/);
    if (lastSentence && lastSentence.index !== undefined) {
      return (
        position -
        50 +
        lastSentence.index +
        lastSentence[0].length -
        lastSentence[1].length
      );
    }
    return position;
  };

  const findSentenceEnd = (text, position) => {
    const afterText = text.substring(
      position,
      Math.min(text.length, position + 50),
    );
    const sentenceEnd = afterText.match(/[.!?]\s+/);
    if (sentenceEnd && sentenceEnd.index !== undefined) {
      return position + sentenceEnd.index + sentenceEnd[0].length;
    }
    return position;
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "No description available";
    if (text.length <= maxLength) return text;

    const truncated = text.substring(0, maxLength);
    const lastSentence = truncated.lastIndexOf(". ");

    if (lastSentence > maxLength * 0.7) {
      return truncated.substring(0, lastSentence + 1);
    }

    return truncated + "...";
  };

  return (
    <div
      className={`group relative transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl ${
        theme === "light"
          ? "bg-white border border-gray-200 hover:shadow-gold/20"
          : "bg-darker border border-white-5 hover:shadow-lg"
      } rounded-xl overflow-hidden`}
    >
      {/* Bookmark Status Indicator */}
      {isBookmarked && (
        <div className="absolute top-0 right-2 z-10">
          <div className="bg-blue-500 text-white p-2 h-10 rounded-b-sm shadow-xl">
            <GoBookmarkFill className="text-2xl" />
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Content */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Header with intelligent highlighting */}
            <div>
              <h3
                className={`text-xl font-bold leading-tight mb-2 group-hover:text-gold transition-colors duration-300 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
                dangerouslySetInnerHTML={{
                  __html: searchQuery
                    ? props.highlights?.title
                      ? highlightText(props.highlights.title, searchQuery)
                      : highlightText(props.title, searchQuery)
                    : props.title,
                }}
              />

              {/* Metadata Row with highlighting */}
              <div className="flex flex-wrap flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 hidden md:block" />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: searchQuery
                        ? highlightText(props.author, searchQuery)
                        : props.author,
                    }}
                  />
                </div>

                <div className="flex flex-row flex-wrap gap-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{props.year}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: searchQuery
                          ? highlightText(props.department, searchQuery)
                          : props.department,
                      }}
                    />
                  </div>

                  {props.course && (
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: searchQuery
                            ? highlightText(props.course, searchQuery)
                            : props.course,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Keywords/Tags with highlighting */}
            {props.tags && props.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {props.tags.slice(0, 5).map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs rounded-full border ${
                      theme === "light"
                        ? "bg-yale-blue/10 text-yale-blue border-yale-blue/20"
                        : "bg-yale-blue/20 text-yale-blue border-yale-blue/30"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: searchQuery
                        ? highlightText(tag, searchQuery)
                        : tag,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Enhanced Description with intelligent highlighting */}
            <div
              className={`${theme === "light" ? "text-gray-700" : "text-gray-300"} text-sm leading-relaxed line-clamp-3`}
              dangerouslySetInnerHTML={{
                __html: searchQuery
                  ? getIntelligentDescription(props.description, searchQuery)
                  : truncateText(props.description),
              }}
            />

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center w-full md:w-auto gap-2">
                {/* Read Button - KEEP activity logging for this */}
                <Link
                  href={`/view-file/${props.paper_id}`}
                  className="flex-1"
                  onClick={handleReadButtonClick}
                >
                  <button className="cursor-pointer flex items-center w-full justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold to-gold-fg hover:brightness-120 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
                    <GoEye className="text-lg" />
                    <span>Read</span>
                  </button>
                </Link>

                {/* Bookmark Button - NO activity logging */}
                <button
                  onClick={() =>
                    isBookmarked
                      ? handleUnbookmark(paper_id)
                      : handleBookmark(paper_id)
                  }
                  className={`p-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                    isBookmarked
                      ? "text-yale-blue bg-blue-100 hover:bg-blue-200"
                      : "text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  }`}
                  title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                  {isBookmarked ? (
                    <GoBookmarkFill className="text-lg" />
                  ) : (
                    <GoBookmark className="text-lg" />
                  )}
                </button>

                {/* Secondary Actions */}
                <div className="flex items-center gap-1">
                  {(() => {
                    const userType = localStorage.getItem("userType");

                    if (userType === "LIBRARIAN") {
                      return (
                        <button
                          onClick={() =>
                            router.push(`/edit-file/${props.paper_id}`)
                          }
                          className="p-2.5 text-gray-600 dark:text-gray-400 hover:text-gold hover:bg-gold/10 rounded-lg transition-all duration-200 cursor-pointer"
                          title="Edit paper"
                        >
                          <GoPencil className="text-lg" />
                        </button>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsCard;
