import React from "react";
import { FiLink2 } from "react-icons/fi";
import Image from "next/image";
import {
  FaBook,
  FaBookmark,
  FaBookOpen,
  FaFlag,
  FaLink,
} from "react-icons/fa6";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, BookOpen, BookOpenText } from "lucide-react";
import DocsLoader from "./DocsLoader";
import { Eye } from "lucide-react"

const tagColors = {
  IT: "bg-dusk",
  // Add more tags as needed
};

const DocsCard = (props) => {
  const [papers, setPapers] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const truncateText = (text, maxWords = 50) => {
    if (!text) return "No description available";
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  if (loading) {
    return <DocsLoader message="Loading Recent Papers" />;
  }

    return (  
      <div className='w-9xl flex flex-col md:flex-row align-middle items-center gap-2 p-4 md:p-6 md:px-8 rounded-xl border border-dusk dark:bg-primary dark:border-dusk-foreground'> 
          <div className='w-52'>
            <a href={props.link}>
              <Image src={props.img} alt="Project" className="hidden md:flex w-full h-full"/>
            </a>
          </div>
  
          <div className='w-full flex flex-col p-4 gap-1 items-start relative'>
              <h3 className='text-xl font-bold dark:text-white'>{props.title}</h3>
              <div className="flex gap-2 flex-wrap overflow-hidden mt-2">
                {/* Mapping over tags */}
                {props.tags && props.tags.length > 0 ? (
                  props.tags.map((tag, index) => (
                    <p
                      key={index}
                      className={`flex text-white text-sm rounded-sm w-auto p-1 px-2 ${
                        tagColors[tag] || "bg-dusk dark:bg-dusk-foreground" // Updated dark mode background
                      }`}
                    >
                      {tag}
                    </p>
                  ))
                ) : (
                  <p className="text-white-25 dark:text-white-50 text-md italic">No tags available</p>
                )}
              </div>
              <p className='text-md line-clamp-4 dark:text-white-75'>{truncateText(props.description)}</p>
              <div className="mt-6 flex flex-row items-center justify-between gap-4">
                {/* Left Side Buttons */}
                <span className="flex gap-4">
                    <Link href={`/view-file/${props.paper_id}`}>
                    <button className="transition-all duration-300 flex flex-row items-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:brightness-120 rounded-lg cursor-pointer">
                      <Eye />
                      Read
                    </button>

                    </Link>

                    <button className="transition-all duration-300 flex flex-row items-center gap-2 px-4 py-3 bg-dusk dark:bg-dusk-foreground dark:text-white rounded-lg cursor-pointer hover:bg-dusk-foreground dark:hover:bg-dusk">
                    <Bookmark /> <span className="hidden md:flex">Bookmark</span>
                    </button>
                </span>
            <button className="flex flex-row items-center align-middle gap-2 px-6 py-3 dark:bg-dusk-foreground dark:text-white rounded-lg cursor-pointer  dark:hover:text-midnight dark:hover:bg-white-50">
              <Bookmark /> Bookmark
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocsCard;
