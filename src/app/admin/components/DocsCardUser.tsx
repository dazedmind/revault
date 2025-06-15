"use client";
import React from "react";
import DocsLoader from "../../component/DocsLoader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { 
  GoEye, 
  GoChevronRight,
  GoPencil,
} from "react-icons/go";
import { 
  Calendar, 
  Building, 
  User, 
  FileText, 
  Clock,
  MoreHorizontal,
  Edit3,
  Eye,
  Download
} from "lucide-react";

const DocsCardUser = (props) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const { paper_id } = props;

  useEffect(() => {
    async function init() {
      // 1. Auth check (simplified)
      const token = localStorage.getItem("authToken");
      if (!token) {
        return router.push("/login");
      }

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

  const truncateText = (text, maxWords = 40) => {
    if (!text) return "No description available";
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const truncateAuthor = (text, maxWords = 24) => {
    if (!text) return "No author available";
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <DocsLoader message="Loading Recent Papers" />;
  }

  return (
    <div 
      className={`group relative transition-all duration-300 hover:shadow-lg mb-4 ${
        theme === "light" 
          ? "bg-white border border-gray-200 " 
          : "bg-darker border border-white-5"
      } rounded-xl overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status Bar */}
      {/* <div className={`h-2 w-full ${
        props.status === 'published' ? 'bg-green-500' :
        props.status === 'draft' ? 'bg-yellow-500' :
        props.status === 'review' ? 'bg-blue-500' : 'bg-gold'
      }`} /> */}

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Document Preview */}
          <div className="lg:w-32 xl:w-40 flex-shrink-0">
            <div className="relative group/image">
              <div className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                theme === "light" ? "bg-gray-100" : "bg-gray-800"
              }`}>
                <Image
                  src={props.img}
                  alt="Document preview"
                  className="w-full h-fit lg:h-fit object-cover transition-transform duration-300 group-hover/image:scale-105"
                  width={160}
                  height={144}
                />
                
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href={`/view-file/${paper_id}`}>
                    <button className="bg-white text-gray-900 p-2 rounded-full hover:scale-110 transition-transform duration-200">
                      <Eye className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
              
              {/* Document Type Badge */}
              <div className="absolute -top-2 -right-2 bg-gold text-white px-2 py-1 rounded-full text-xs font-semibold">
                PDF
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg lg:text-xl font-bold mb-2 line-clamp-2 group-hover:text-gold transition-colors duration-200">
                  {props.title}
                </h2>
                
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{truncateAuthor(props.author)}</span>
                </div>
              </div>

              {/* Action Menu */}
              <div className="flex items-center gap-1 ml-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{props.year}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span>{props.department}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Published: {formatDate(new Date())}</span>
              </div>
            </div>

            {/* Abstract Preview */}
            <div className="mb-4">
              <p className={`text-sm ${theme === "light" ? "text-white-5" : "text-gray-300"} line-clamp-3 leading-relaxed`}>
                {truncateText(props.abstract)}
              </p>
            </div>

          </div>
        </div>

        {/* Action Bar */}
        <div className={`flex items-center justify-between pt-4 mt-4 border-t ${
          theme === "light" ? "border-gray-200" : "border-white-5"
        }`}>
          <div className="flex items-center gap-3">
            {/* Primary Action */}
            <Link href={`/view-file/${paper_id}`} className="flex-shrink-0">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold to-gold-fg hover:brightness-120 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer">
                <GoEye className="text-lg" />
                <span className="hidden sm:inline">View</span>
                <span className="sm:hidden">View</span>
              </button>
            </Link>

            {/* Secondary Actions */}
            {(() => {
              const userType = localStorage.getItem("userType");
              if (userType === "LIBRARIAN") {
                return (
                  <Link href={`/edit-file/${paper_id}`} className="flex-shrink-0">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 cursor-pointer ${
                      theme === "light" 
                        ? " text-gray-700" 
                        : " text-gray-300"
                    }`}>
                      <GoPencil className="text-lg" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                  </Link>
                );
              }
              return null;
            })()}
          </div>

           {/* Stats Row */}
           <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                <span>Published</span>
              </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default DocsCardUser;