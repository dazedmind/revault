import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { Bookmark, BookmarkX, Eye, PencilLine } from "lucide-react";
import DocsLoader from "./DocsLoader";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { GoBookmark, GoBookmarkSlash, GoEye, GoPencil } from "react-icons/go";
import { GoBookmark, GoBookmarkSlash, GoEye, GoPencil } from "react-icons/go";

const tagColors = {
  IT: "bg-dusk",
  // Add more tags as needed
};

const DocsCard = (props) => {
  const [papers, setPapers] = useState();
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
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
      className={`w-9xl flex flex-col md:flex-row align-middle items-center gap-2 p-4 md:px-8  rounded-xl border border-dusk dark:bg-primary ${theme == "light" ? "border-white-50" : "border-white-5"}`}
    >
      <div className="w-52 hidden md:block">
        <a href={props.link}>
          <Image src={props.img} alt="Project" className="py-4 w-full h-full" />
        </a>
      </div>

      <div className="w-full flex flex-col p-2 gap-1 items-start relative">
        <h3 className="text-md md:text-lg font-bold">{props.title}</h3>
        <p className="text-sm text-gray-500">{truncateAuthor(props.author)}</p>
        <div className="w-full overflow-x-auto scrollbar-none">
          <div className="flex gap-2 whitespace-nowrap pb-2 mt-2 min-w-0">
            {/* Mapping over tags */}
            {props.year && (
              <p className="px-3 py-1 bg-yale-blue/10 text-yale-blue rounded-md text-sm flex-shrink-0">
                {props.year}
              </p>
            )}
            {props.department && (
              <p className="px-3 py-1 bg-yale-blue/10 text-yale-blue rounded-md text-sm flex-shrink-0">
                {props.department}
              </p>
            )}
            {props.tags && props.tags.length > 0 ? (
              props.tags.map((tag, index) => (
                <p
                  key={index}
                  className={`px-3 py-1 bg-yale-blue/10 text-yale-blue rounded-md text-sm flex-shrink-0`}
                >
                  {tag}
                </p>
              ))
            ) : (
              <p className="text-white text-md italic flex-shrink-0">
                No tags available
              </p>
            )}
          </div>
        </div>

        <p className="text-sm line-clamp-4 text-justify dark:text-card">
          {truncateText(props.description)}
        </p>

        <div className="flex flex-row justify-between w-full">
          <div className="mt-2 w-full flex flex-row gap-2 items-center">
            <Link
              href={`/view-file/${props.paper_id}`}
              className="w-full md:w-auto"
            >
              <button className="w-full md:w-auto transition-all duration-300 flex flex-row items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-gold-fg to-gold hover:brightness-120 text-white rounded-lg cursor-pointer">
                <GoEye className="text-xl" />
                Read
              </button>
            </Link>
            {(() => {
              const userType = localStorage.getItem("userType");
              if (userType !== "ADMIN" && userType !== "ASSISTANT") {
                return viewFromAdmin ? (
                  <button
                    onClick={() => router.push("/upload")}
                    className={`w-auto transition-all duration-300 flex flex-row items-center justify-center gap-2 px-4 py-2 ${theme == "light" ? "bg-white-75" : "bg-dusk"}  rounded-lg cursor-pointer hover:brightness-105`}
                  >
                    <GoPencil className="text-xl" />
                    <span className="hidden md:flex">Edit</span>
                  </button>
                ) : (
                  <>
                    {isBookmarked ? (
                      <button
                        onClick={() => handleUnbookmark(paper_id)}
                        className={`w-auto transition-all duration-300 flex flex-row items-center justify-center gap-2 px-3 py-2 ${theme == "light" ? "bg-white-75" : "bg-dusk"} rounded-lg cursor-pointer hover:bg-red-warning-fg hover:text-white`}
                      >
                        <GoBookmarkSlash className="text-xl" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBookmark(paper_id)}
                        className={`w-auto transition-all duration-300 flex flex-row items-center justify-center gap-2 px-3 py-2 ${theme == "light" ? "bg-tertiary" : "bg-dusk"} rounded-lg cursor-pointer hover:brightness-105`}
                      >
                        <GoBookmark className="text-xl" />
                      </button>
                    )}
                  </>
                );
              }
              return null;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsCard;
