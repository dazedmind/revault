// src/app/admin/components/DocsCardUser.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { GoEye, GoPencil } from "react-icons/go";
import {
  Calendar,
  Building,
  User,
  FileText,
  Clock,
  MoreHorizontal,
  Eye,
} from "lucide-react";

interface DocsCardUserProps {
  img: any;
  title: string;
  abstract: string;
  author: string;
  department: string;
  year: string | number;
  paper_id: string;
}

const DocsCardUser: React.FC<DocsCardUserProps> = (props) => {
  // ❌ REMOVED: No more papers state, loading state, or API fetching
  // const [papers, setPapers] = useState([]);
  // const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { theme } = useTheme();
  const { paper_id, img, title, abstract, author, department, year } = props;

  // ❌ REMOVED: No more API fetching useEffect
  // useEffect(() => {
  //   async function init() {
  //     const token = localStorage.getItem("authToken");
  //     if (!token) {
  //       return router.push("/login");
  //     }
  //     console.log("▶️ fetching /api/recent");
  //     try {
  //       const res = await fetch("/api/recent", { cache: "no-store" });
  //       // ... API fetching logic removed
  //     } catch (err) {
  //       console.error("failed to load papers:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   init();
  // }, [router]);

  const truncateText = (text: string, maxWords = 40) => {
    if (!text) return "No description available";
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const truncateAuthor = (text: string, maxWords = 24) => {
    if (!text) return "No author available";
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const formatDate = (dateString: Date | string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ❌ REMOVED: No more loading state component
  // if (loading) {
  //   return <DocsLoader message="Loading Recent Papers" />;
  // }

  return (
    <div
      className={`group relative transition-all duration-300 hover:shadow-lg mb-4 ${
        theme === "light"
          ? "bg-white border border-gray-200 "
          : "bg-darker border border-white-5"
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
                    src={img}
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
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-xl font-bold leading-tight mb-2 group-hover:text-gold transition-colors duration-300 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  {title || "Untitled"}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <User className="w-4 h-4" />
                  <span>{truncateAuthor(author)}</span>
                </div>
              </div>

              {/* More Options */}
              <div className="flex-shrink-0">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{year}</span>
              </div>

              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span>{department}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Published: {formatDate(new Date())}</span>
              </div>
            </div>

            {/* Abstract Preview */}
            <div className="mb-4">
              <p
                className={`text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"} line-clamp-3 leading-relaxed`}
              >
                {truncateText(abstract)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div
          className={`flex items-center justify-between pt-4 mt-4 border-t ${
            theme === "light" ? "border-gray-200" : "border-white-5"
          }`}
        >
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
                  <Link
                    href={`/edit-file/${paper_id}`}
                    className="flex-shrink-0"
                  >
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 cursor-pointer ${
                        theme === "light"
                          ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                      }`}
                    >
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
