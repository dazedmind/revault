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

const tagColors = {
  IT: "bg-dusk",
  // Add more tags as needed
};

const DocsCard = (props) => {
  const [papers, setPapers] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { theme, setTheme } = useTheme("light");
  const {
    paper_id,
    savedFromProfile = false, // 👈 default is false unless passed explicitly
    viewFromAdmin = false,
  } = props;

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

      router.refresh(); // Optionally refresh the view
      window.location.reload();
    } catch (err) {
      console.error("Unbookmark error:", err);
      toast.error("An error occurred while removing the bookmark.");
    }
  };

  const handleBookmark = async (paperId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You're not logged in.");
      return;
    }

    try {
      const res = await fetch("/api/bookmark", {
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
    } catch (err) {
      console.error("Bookmark error:", err);
      alert("An error occurred while bookmarking.");
    }
  };

  useEffect(() => {
    async function init() {
      // 1. Auth check (simplified)
      const token = localStorage.getItem("authToken");
      if (!token) {
        return router.push("/login");
      }
      // you can re-use your decode(token) here…

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
  }, [router]);

  const truncateText = (text, maxWords = 48) => {
    if (!text) return "No description available";
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  if (loading) {
    return <DocsLoader message="Loading Recent Papers" />;
  }

  return (
    <div className={`w-9xl flex flex-col md:flex-row align-middle items-center gap-2 p-2 md:p-4 md:px-8  rounded-xl border border-dusk dark:bg-primary ${theme == "light" ? "border-white-50" : "border-white-5"}`}>
      <div className="w-52">
        <a href={props.link}>
          <Image
            src={props.img}
            alt="Project"
            className="hidden py-4 md:flex w-full h-full"
          />
        </a>
      </div>

      <div className="w-full flex flex-col p-4 gap-1 items-start relative">
        <h3 className="text-md md:text-lg font-bold">
          {props.title}
        </h3>
        <div className="flex gap-2 flex-wrap overflow-hidden mt-2">
          {/* Mapping over tags */}
          {props.year && (
            <p className="px-3 py-1 bg-yale-blue/10 text-yale-blue rounded-md text-sm">
              {props.year}
            </p>
          )}
          {props.department && (
            <p className="px-3 py-1 bg-yale-blue/10 text-yale-blue rounded-md text-sm">
              {props.department}
            </p>
          )}
          {props.tags && props.tags.length > 0 ? (
            props.tags.map((tag, index) => (
              <p
                key={index}
                className={`flex px-3 py-1 bg-yale-blue/10 text-yale-blue rounded-md text-sm`}
              >
                {tag}
              </p>
            ))
          ) : (
            <p className="text-white text-md italic">No tags available</p>
          )}

        </div>

        <p className="text-sm line-clamp-4 text-justify dark:text-card">
          {truncateText(props.description)}
        </p>
        <div className="mt-2 w-full flex flex-row gap-2 sm:gap-4">
          {/* Left Side Buttons */}
            <Link href={`/view-file/${props.paper_id}`} className="w-full md:w-auto">
                <button className="w-full md:w-auto transition-all duration-300 flex flex-row items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-gold-fg to-gold hover:brightness-120 text-white rounded-lg cursor-pointer">
                  <GoEye className="text-xl" />
                Read
              </button>
            </Link>
            {viewFromAdmin ? (
              <button
                onClick={() => router.push("/upload")}
                className={`w-auto transition-all duration-300 flex flex-row items-center justify-center gap-2 px-4 py-3 ${theme == "light" ? "bg-white-75" : "bg-dusk"}  rounded-lg cursor-pointer hover:brightness-105`}
              >
                <GoPencil className="text-xl"/>
                <span className="hidden md:flex">Edit</span>
              </button>
            ) : savedFromProfile ? (
              <button
                onClick={() => handleUnbookmark(paper_id)}
                className={`w-auto transition-all duration-300 flex flex-row items-center justify-center gap-2 px-4 py-3 ${theme == "light" ? "bg-white-75" : "bg-dusk"} rounded-lg cursor-pointer hover:bg-red-warning-fg hover:text-white`}
              >
                <GoBookmarkSlash className="text-xl" />
                <span className="hidden md:flex">Unsave</span>
              </button>
            ) : (
              <button
                onClick={() => handleBookmark(paper_id)}
                className={`w-auto transition-all duration-300 flex flex-row items-center justify-center gap-2 px-4 py-3 ${theme == "light" ? "bg-tertiary" : "bg-dusk"} rounded-lg cursor-pointer hover:brightness-105`}
              >
                <GoBookmark className="text-xl" /> <span className="hidden md:flex">Bookmark</span>
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default DocsCard;
