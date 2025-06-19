// src/app/component/DocsCard.jsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { GoBookmark, GoEye, GoPencil, GoBookmarkFill } from "react-icons/go";
import { Calendar, User, Building, BookOpen } from "lucide-react";
import { logUserActivity, DOCUMENT_ACTIVITIES, ACTIVITY_TYPES } from "../utils/activityLogger";

const DocsCard = (props) => {
  // ❌ REMOVED: No more papers state and API fetching
  // const [papers, setPapers] = useState();
  // const [loading, setLoading] = useState(true);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const router = useRouter();
  const { theme, setTheme } = useTheme("light");
  const { paper_id, savedFromProfile = false, viewFromAdmin = false } = props;

  // Helper function to log document interactions
  const logDocumentInteraction = async (activity, activityType) => {
    try {
      console.log("🔍 DocsCard: Attempting to log activity:", { activity, activityType, paper_id: props.paper_id, title: props.title });
      
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

  // Handle read button click with activity logging
  const handleReadButtonClick = async (e) => {
    // Log the read button click as VIEW_DOCUMENT
    await logDocumentInteraction(
      DOCUMENT_ACTIVITIES.CLICK_READ_BUTTON,
      ACTIVITY_TYPES.VIEW_DOCUMENT
    );
  };

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


  return (
    <div
      className={`group relative w-full transition-all duration-300 hover:shadow-xl ${
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
              <div className="flex flex-wrap flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 hidden md:block" />
                  <span>{props.author}</span>
                </div>
                
                <div className="flex flex-row flex-wrap gap-2">
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
            </div>

            {/* Keywords/Tags */}
            {props.tags && props.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {props.tags.slice(0, 5).map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs rounded-full border ${
                      theme === "light"
                        ? "bg-yale-blue/10 text-yale-blue border-gold/20"
                        : "bg-yale-blue/20 text-yale-blue border-gold/30"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
           
              </div>
            )}

            {/* Description */}
            <p
              className={`${theme === "light" ? "text-gray-700" : "text-gray-300"} text-sm leading-relaxed line-clamp-3`}
            >
              {truncateText(props.description)}
            </p>

            {/* Action Buttons - Original Structure with Activity Logging */}
            <div className="flex items-center justify-between">
              <div className="flex items-center w-full md:w-auto gap-2">
                <Link href={`/view-file/${props.paper_id}`} className="flex-1" onClick={handleReadButtonClick}>
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