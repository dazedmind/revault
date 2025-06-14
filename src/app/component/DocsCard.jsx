import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { 
  GoBookmark, 
  GoBookmarkSlash, 
  GoEye, 
  GoPencil, 
  GoBookmarkFill, 
  GoBookmarkSlashFill,
  GoDownload,
  GoShare
} from "react-icons/go";
import { Calendar, User, Building, Tag, BookOpen } from "lucide-react";
import DocsLoader from "./DocsLoader";


const DocsCard = (props) => {
  const [papers, setPapers] = useState();
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme("light");
  const { paper_id, savedFromProfile = false, viewFromAdmin = false } = props;

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

  const fetchBookmarkCount = async () => {
    try {
      const res = await fetch(`/api/bookmark/count/${paper_id}`);
      if (res.ok) {
        const data = await res.json();
        setBookmarkCount(data.count);
      }
    } catch (error) {
      console.error("Error fetching bookmark count:", error);
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

  useEffect(() => {
    async function init() {
      // 1. Auth check (simplified)
      const token = localStorage.getItem("authToken");
      if (!token) {
        return router.push("/login");
      }

      // Check bookmark status and count
      await checkBookmarkStatus();
      await fetchBookmarkCount();

      // 2. Fetch recent papers
      console.log("▶️ fetching /api/recent");
      try {
        const res = await fetch("/api/recent", { cache: "no-store" });
        if (!res.ok) {
          const text = await res.text();
          console.error("raw /api/recent response:", text);
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setPapers(
          data.map((paper) => ({
            ...paper,
            paper_id: paper.paper_id,
          })),
        );
      } catch (err) {
        console.error("failed to load papers:", err);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [router, paper_id]);

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

  if (loading) {
    return <DocsLoader message="Loading Recent Papers" />;
  }

  return (
    <div 
      className={`group relative w-full transition-all duration-300 hover:shadow-xl ${
        theme === "light" 
          ? "bg-white border border-gray-200" 
          : "bg-darker border border-white-5"
      } rounded-2xl border-2 overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
  

      {/* Bookmark Status Indicator */}
      {isBookmarked && (
        <div className="absolute top-0 left-2 z-10">
          <div className="bg-blue-500 text-white p-2 h-10 rounded-b-sm shadow-xl">
            <GoBookmarkFill className="text-2xl" />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        {/* Image Section with Overlay */}
        <div className="relative md:w-64 h-48 md:h-auto overflow-hidden">
          <Image 
            src={props.img} 
            alt="Research Paper" 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={256}
            height={200}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gold/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick Action Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            isHovered ? "backdrop-blur-sm" : ""
          }`}>
            <Link href={`/view-file/${props.paper_id}`}>
              <button className="bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer">
                <GoEye className="text-xl" />
              </button>
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold line-clamp-2 group-hover:text-gold transition-colors duration-200">
              {props.title}
            </h3>
            
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <User className="w-4 h-4 hidden md:block" />
              <span className="text-sm">{truncateAuthor(props.author)}</span>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-3 text-sm text-yale-blue dark:text-gray-400">
            {props.year && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{props.year}</span>
              </div>
            )}
            {props.department && (
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span>{props.department}</span>
              </div>
            )}
            {props.course && (
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{props.course}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex-wrap gap-2 hidden md:flex">
            {props.tags && props.tags.length > 0 ? (
              props.tags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-yale-blue/30  text-yale-blue  rounded-full text-xs font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500 italic text-sm">No tags available</span>
            )}
            {props.tags && props.tags.length > 5 && (
              <span className="px-3 py-1 bg-yale-blue/80  text-white  rounded-full text-xs">
                +{props.tags.length - 5} more
              </span>
            )}
          </div>

          {/* Tags on mobile */}
          <div className="flex flex-wrap gap-2 md:hidden">
            {props.tags && props.tags.length > 0 ? (
              props.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-yale-blue/30  text-yale-blue  rounded-full text-xs font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500 italic text-sm">No tags available</span>
            )}
            {props.tags && props.tags.length > 2 && (
              <span className="px-3 py-1 bg-yale-blue/80  text-white  rounded-full text-xs">
                +{props.tags.length - 2} more
              </span>
            )}
          </div>

          {/* Description */}
          <p className={`${theme === "light" ? "text-gray-700" : "text-gray-300"} text-sm leading-relaxed line-clamp-3`}>
            {truncateText(props.description)}
          </p>



          {/* Action Buttons */}
          <div className="flex items-center justify-between ">
            <div className="flex items-center w-full md:w-auto gap-2">
              <Link href={`/view-file/${props.paper_id}`} className="flex-1">
                <button className=" cursor-pointer flex items-center w-full justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold to-gold-fg hover:brightness-120 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
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
                        onClick={() => router.push("/upload")}
                        className="p-2.5 text-gray-600 dark:text-gray-400 hover:text-gold hover:bg-gold/10 rounded-lg transition-all duration-200 cursor-pointer"
                        title="Edit paper"
                      >
                        <GoPencil className="text-lg" />
                      </button>
                    );
                  } else if (userType !== "ADMIN" && userType !== "ASSISTANT") {
                    return (
                      <button
                        onClick={() => isBookmarked ? handleUnbookmark(paper_id) : handleBookmark(paper_id)}
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
  );
};

export default DocsCard;