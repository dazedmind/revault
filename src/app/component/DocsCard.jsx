// src/app/component/DocsCard.jsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { GoBookmark, GoEye, GoPencil, GoBookmarkFill } from "react-icons/go";
import { Calendar, User, Building, BookOpen } from "lucide-react";

const DocsCard = (props) => {
  // ❌ REMOVED: No more papers state and API fetching
  // const [papers, setPapers] = useState();
  // const [loading, setLoading] = useState(true);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const router = useRouter();
  const { theme, setTheme } = useTheme("light");
  const { paper_id, savedFromProfile = false, viewFromAdmin = false } = props;

  // ✅ KEPT: Only bookmark-related functionality (component-specific)
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

  const handleUnbookmark = async (paperId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("You're not logged in.");
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
      if (!res.ok) throw new Error(data?.error || "Failed to unbookmark");

      toast.success(data.message || "Bookmark removed.");
      setIsBookmarked(false);
      setBookmarkCount((prev) => Math.max(0, prev - 1));
      router.refresh();
    } catch (err) {
      console.error("Unbookmark error:", err);
      toast.error("An error occurred while removing the bookmark.");
    }
  };

  const handleBookmark = async (paperId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("You're not logged in.");
      return;
    }

    try {
      const res = await fetch(`/api/bookmark/${paperId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paper_id: paperId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to bookmark");

      toast.success(data.message || "Paper Bookmarked successfully.");
      setIsBookmarked(true);
      setBookmarkCount((prev) => prev + 1);
    } catch (err) {
      console.error("Bookmark error:", err);
      toast.error("An error occurred while bookmarking.");
    }
  };

  // ❌ REMOVED: No more papers API fetching
  // useEffect(() => {
  //   async function init() {
  //     const token = localStorage.getItem("authToken");
  //     if (!token) {
  //       return router.push("/login");
  //     }
  //     await checkBookmarkStatus();
  //     // ❌ REMOVED: No more /api/recent fetching
  //   }
  //   init();
  // }, [router, paper_id]);

  // ✅ SIMPLIFIED: Only check bookmark status for this specific paper
  useEffect(() => {
    if (paper_id) {
      checkBookmarkStatus();
    }
  }, [paper_id]);

  const truncateText = (text, maxWords = 48) => {
    if (!text) return "No description available";
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const truncateAuthor = (text, maxWords = 20, maxChars = 20) => {
    if (!text) return "No description available";
    const words = text.split(" ");
    if (words.length > maxChars) {
      return words.slice(0, maxChars).join(" ") + "...";
    }
    return text;
  };

  // ❌ REMOVED: No more loading state needed
  // if (loading) {
  //   return <DocsLoader message="Loading Recent Papers" />;
  // }

  return (
    <div
      className={`group relative w-full transition-all duration-300 hover:shadow-xl ${
        theme === "light"
          ? "bg-white border border-gray-200 hover:shadow-gold/20"
          : "bg-darker border border-white-5 hover:shadow-lg"
      } rounded-xl overflow-hidden`}
    >
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Document Preview */}
          <div className="lg:w-32 xl:w-40 flex-shrink-0">
            <div className="relative group/image">
              <div
                className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                  theme === "light"
                    ? "bg-gradient-to-br from-gold/10 to-gold-fg/10 border border-gold/20"
                    : "bg-gradient-to-br from-gold/20 to-gold-fg/20 border border-gold/30"
                }`}
              >
                <div className="aspect-[3/4] flex items-center justify-center">
                  <Image
                    src={props.img}
                    alt="Document preview"
                    width={120}
                    height={160}
                    className="object-contain transition-transform duration-300 group-hover/image:scale-105"
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                  <span className="text-white text-xs font-medium">
                    Preview
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Header */}
            <div>
              <h3
                className={`text-xl font-bold leading-tight mb-2 group-hover:text-gold transition-colors duration-300 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                {props.title}
              </h3>

              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{truncateAuthor(props.author)}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{props.year}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>{props.department}</span>
                </div>

                {props.course && (
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{props.course}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Keywords/Tags */}
            {props.tags && props.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {props.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs rounded-full border ${
                      theme === "light"
                        ? "bg-gold/10 text-gold border-gold/20"
                        : "bg-gold/20 text-gold border-gold/30"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                {props.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                    +{props.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            <p
              className={`${theme === "light" ? "text-gray-700" : "text-gray-300"} text-sm leading-relaxed line-clamp-3`}
            >
              {truncateText(props.description)}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center w-full md:w-auto gap-2">
                <Link href={`/view-file/${props.paper_id}`} className="flex-1">
                  <button className="cursor-pointer flex items-center w-full justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold to-gold-fg hover:brightness-120 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
                    <GoEye className="text-lg" />
                    <span>Read</span>
                  </button>
                </Link>

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
                    } else if (
                      userType !== "ADMIN" &&
                      userType !== "ASSISTANT"
                    ) {
                      return (
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
                          title={
                            isBookmarked ? "Remove bookmark" : "Add bookmark"
                          }
                        >
                          {isBookmarked ? (
                            <GoBookmarkFill className="text-lg" />
                          ) : (
                            <GoBookmark className="text-lg" />
                          )}
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
