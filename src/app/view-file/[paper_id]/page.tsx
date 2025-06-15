"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../component/NavBar";
import AdminNavBar from "../../admin/components/AdminNavBar";
import Image from "next/image";
import avatar from "../../img/user.png";
import { FaChevronLeft } from "react-icons/fa6";
import FileMenuButton from "../../component/FileMenuButton";
import ProtectedRoute from "../../component/ProtectedRoute";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import {
  Link,
  Download,
  ExternalLink,
  User,
  BookOpen,
  Calendar,
  Tag,
  Building2,
} from "lucide-react";
import LoadingScreen from "@/app/component/LoadingScreen";
import { Toaster, toast } from "sonner";
import useAntiCopy from "../../hooks/useAntiCopy";
import {
  GoBookmark,
  GoBookmarkSlash,
  GoInfo,
  GoMoon,
  GoSun,
} from "react-icons/go";
import MobileFriendlyPDFViewer from "../../component/MobileFriendlyPDFViewer";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      return /android|iphone|ipad|ipod|blackberry|iemobile/i.test(userAgent.toLowerCase());
    };
    
    setIsMobile(checkMobile());
  }, []);

  return isMobile;
};

function ViewFile() {
  const { theme, setTheme } = useTheme();
  const [showMetadata, setShowMetadata] = useState(false);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null);
  const isMobile = useIsMobile();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const [selectedPaperIndex, setSelectedPaperIndex] = useState(null);
  const { paper_id } = useParams(); // grab it from URL

  const [viewFromAdmin, setViewFromAdmin] = useState(null);

  // useAntiCopy();

  const decode = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
      return JSON.parse(jsonPayload);
    } catch (e: any) {
      console.log("Error decoding token:", e.message);
      return null;
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
    } catch (err) {
      console.error("Bookmark error:", err);
      toast.error("An error occurred while bookmarking.");
    }
  };

  const checkBookmarkStatus = useCallback(async () => {
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
  }, [paper_id]);

  // Get the dynamic PDF URL
  const getPdfUrl = () => {
    if (!paper) return null;

    // Priority order for PDF URL:
    // 1. paper_url from database
    // 2. file_path from database
    // 3. API endpoint for download
    // 4. Fallback to sample PDF

    if (paper.paper_url) {
      return paper.paper_url;
    } else if (paper.file_path) {
      return paper.file_path;
    } else {
      return `/api/papers/${paper_id}/download`;
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const storedUserType = localStorage.getItem("userType");

      if (!token) {
        window.location.href = "/login";
      }

      if (storedUserType === "STUDENT" || storedUserType === "FACULTY") {
        setViewFromAdmin(false);
      } else if (storedUserType === "LIBRARIAN") {
        setViewFromAdmin(true);
      }

      if (token) {
        try {
          const decoded = decode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp > currentTime) {
            setIsAuthenticated(true);
            setUserType(storedUserType);
          } else {
            alert("Token expired. Please log in again.");
            localStorage.removeItem("authToken");
            localStorage.removeItem("userType");
            setIsAuthenticated(false);
            router.push("/login");
          }
        } catch (error) {
          alert("Invalid token. Please log in again.");
          console.error("Error decoding token:", error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("userType");
          setIsAuthenticated(false);
          router.push("/login");
        }
      } else {
        alert("No token found. Please log in.");
        setIsAuthenticated(false);
        router.push("/login");
      }
    };

    checkAuth();

    async function fetchPaper() {
      try {
        console.log("Fetching paper with ID:", paper_id);
        const token = localStorage.getItem("authToken");
        const res = await fetch(`/api/paper/${paper_id}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch paper: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Fetched paper data:", data);

        if (!data) {
          throw new Error("No paper data received");
        }

        setPaper({
          ...data,
          title: data.title?.replace(/"/g, "") || "",
          author: data.author?.replace(/"/g, "") || "",
          keywords: Array.isArray(data.keywords)
            ? data.keywords.flatMap((k) =>
                k.split(",").map((item) => item.trim()),
              )
            : [],
          course: data.course?.replace(/"/g, "") || "",
          department: data.department?.replace(/"/g, "") || "",
          abstract: data.abstract?.replace(/"/g, "") || "",
          // Keep the original PDF URL fields
          paper_url: data.paper_url || null,
          file_path: data.file_path || null,
        });

        // Check bookmark status after paper data is loaded
        await checkBookmarkStatus();
      } catch (err) {
        console.error("Error fetching paper:", err);
        toast.error("Failed to load paper data");
      } finally {
        setLoading(false);
      }
    }

    if (paper_id) {
      fetchPaper();
    }
  }, [paper_id, router, checkBookmarkStatus]);

  // Handle PDF load error
  const handlePdfError = () => {
    setPdfError(true);
    toast.error("Failed to load PDF. The file may not be available.");
  };

  if (loading) {
    return <LoadingScreen />;
  }

  // Get the PDF URL for display
  const pdfUrl = getPdfUrl();
  const pdfDisplayUrl = pdfUrl ? `${pdfUrl}#toolbar=0` : null;

  return (
    <div className="dark:bg-secondary h-auto">
      {userType === "LIBRARIAN" ||
      userType === "ASSISTANT" ||
      userType === "ADMIN" ? (
        <AdminNavBar />
      ) : (
        <NavBar />
      )}

      <ProtectedRoute>
        <main className="w-full h-auto">
          <div className="flex flex-col md:flex-row gap-6 relative">
            {showMetadata && (
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={() => setShowMetadata(false)}
              />
            )}

            <div
              className={`fixed top-0 left-0 w-full md:w-[800px] h-screen z-50 p-4 md:p-10 shadow-lg 
                transform transition-transform duration-300 ease-in-out
                ${showMetadata ? "translate-x-0" : "-translate-x-full"}
                dark:bg-accent overflow-y-auto`}
            >
              <span className="flex items-center text-center align-middle gap-2 justify-between mb-2 md:mb-6">
                <h2 className="text-3xl p-4 md:p-0 font-bold">Metadata</h2>

                <button
                  className="text-2xl px-4 rounded-md cursor-pointer transition-colors duration-200"
                  onClick={() => setShowMetadata(false)}
                >
                  <FaChevronLeft />
                </button>
              </span>

              <div
                className={`border-2 ${theme === "light" ? "border-white-50" : "border-white-5"} p-8 rounded-md`}
              >
                <p className="font-bold text-2xl text-gold">Metadata</p>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg">
                      <strong>Title:</strong>
                      {paper.id} {paper.title}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-lg">
                      <strong>Authors:</strong>
                    </p>
                    <div className="flex flex-row gap-3 items-center my-4 flex-wrap">
                      {paper.author &&
                        paper.author
                          .split(".,") // Split by period followed by comma
                          .map((author, index) => (
                            <div
                              key={index}
                              className="flex flex-row gap-2 items-center"
                            >
                              <Image
                                src={avatar}
                                className="w-8 rounded-full"
                                alt={`author-${index}`}
                              />
                              <p>
                                {author.trim() +
                                  (index < paper.author.split(".,").length - 1
                                    ? "."
                                    : "")}
                              </p>
                            </div>
                          ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-lg">
                      <strong>Date:</strong> {paper.year}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-lg">
                      <strong>Course:</strong> {paper.course}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-lg">
                      <strong>Department:</strong> {paper.department}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <strong className="text-lg">Keywords:</strong>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(paper.keywords) ? (
                        paper.keywords
                          .flatMap(
                            (keyword) =>
                              keyword
                                .split(/[,\s]+/) // Split by comma or whitespace
                                .map((word) => word.trim()) // Trim whitespace
                                .filter((word) => word.length > 0), // Remove empty strings
                          )
                          .map((keyword, keywordIndex) => (
                            <span
                              key={keywordIndex}
                              className={`px-3 py-1 bg-yale-blue/10 text-yale-blue rounded-md text-sm`}
                            >
                              {keyword}
                            </span>
                          ))
                      ) : (
                        <span className="text-white-25">
                          No keywords available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <br />
                <p className="font-bold text-2xl text-gold">Abstract</p>
                <p>{paper.abstract}</p>{" "}
              </div>
            </div>

            {/* File Menu and Main Content */}
            <div className="flex flex-col-reverse md:flex-row">
              <aside className="flex flex-row md:flex-col justify-center md:justify-start gap-4 md:gap-0 w-auto md:w-72 h-auto dark:bg-secondary p-4 pt-2 md:p-8">
                <h1 className="text-2xl font-bold  hidden md:block">
                  File Menu
                </h1>

                <FileMenuButton
                  icon={<GoInfo className="text-2xl text-yale-blue" />}
                  label="View Metadata"
                  onClick={() => setShowMetadata(!showMetadata)}
                />

                <FileMenuButton
                  icon={
                    theme === "dark" ? (
                      <GoSun className="text-2xl text-yale-blue" />
                    ) : (
                      <GoMoon className="text-2xl text-yale-blue" />
                    )
                  }
                  label={
                    theme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"
                  }
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                />

                {viewFromAdmin && (
                  <>
                    <FileMenuButton
                      icon={<Link className="text-xl text-yale-blue" />}
                      label="Cite Paper"
                      onClick={() => {}}
                    />
                  </>
                )}

                {!viewFromAdmin &&
                  userType !== "ADMIN" &&
                  userType !== "ASSISTANT" && (
                    <>
                      {isBookmarked ? (
                        <FileMenuButton
                          icon={
                            <GoBookmarkSlash className="text-2xl text-yale-blue" />
                          }
                          label="Remove Bookmark"
                          onClick={() => handleUnbookmark(paper_id)}
                        />
                      ) : (
                        <FileMenuButton
                          icon={
                            <GoBookmark className="text-2xl text-yale-blue" />
                          }
                          label="Add to Bookmark"
                          onClick={() => handleBookmark(paper_id)}
                        />
                      )}
                    </>
                  )}
              </aside>

              {/* Main Content Area with Title Header */}
              <div className="flex flex-col flex-1">
                {/* Title Header */}
                <span>
                  <p className="flex flex-col text-xl md:text-2xl font-bold bg-gold text-white p-6">
                    {paper.title}
                    <span className="flex gap-2 items-center text-sm font-normal text-gold-fg">
                      <User className="hidden md:block w-4 h-4" />
                      {paper.author}
                    </span>
                  </p>
                </span>

                {/* Content Row - Document and Metadata Sidebar */}
                <div className="flex flex-col lg:flex-row">
                  
                {/* Document Viewer */}
                  <div className="Document flex-1">
                    {isMobile ? (
                      <MobileFriendlyPDFViewer 
                        pdfUrl={pdfUrl}
                        pdfError={pdfError}
                        handlePdfError={handlePdfError}
                        theme={theme}
                      />
                    ) : (
                      // Desktop: Original object tag code
                      pdfDisplayUrl && !pdfError ? (
                        <object
                          data={pdfDisplayUrl}
                          type="application/pdf"
                          width="100%"
                          height="100%"
                          className="h-screen w-screen md:w-3xl"
                          onError={handlePdfError}
                        >
                          {/* Fallback content when PDF can't be displayed */}
                          <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-100 dark:bg-gray-800">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Download className="w-8 h-8 text-red-600 dark:text-red-400" />
                              </div>
                              <h3 className="text-lg font-semibold mb-2">
                                PDF Viewer Not Supported
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Your browser doesn&apos;t support inline PDF viewing.
                              </p>
                              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                <a
                                  href={pdfUrl}
                                  download
                                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                                >
                                  Download PDF
                                </a>
                                <a
                                  href={pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                                >
                                  Open in New Tab
                                </a>
                              </div>
                            </div>
                          </div>
                        </object>
                      ) : (
                        // Error state for desktop
                        <div className="flex flex-col items-center justify-center h-screen p-8 bg-gray-100 dark:bg-gray-800">
                          <div className="text-center">
                            {pdfError ? (
                              <>
                                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <ExternalLink className="w-8 h-8 text-red-600 dark:text-red-400" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                  PDF Not Available
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                  The PDF file could not be loaded. It may have been moved or deleted.
                                </p>
                              </>
                            ) : (
                              <>
                                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <Download className="w-8 h-8 text-gray-500" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                  No PDF File Available
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                  This document doesn&apos;t have an associated PDF file.
                                </p>
                              </>
                            )}
                            <div className="flex flex-col sm:flex-row gap-2 justify-center">
                              <button
                                onClick={() => router.back()}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                              >
                                Go Back
                              </button>
                              {pdfError && (
                                <button
                                  onClick={() => {
                                    setPdfError(false);
                                    window.location.reload();
                                  }}
                                  className="bg-gold hover:brightness-110 text-white px-4 py-2 rounded-lg transition-all duration-300"
                                >
                                  Retry
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Right Sidebar - Metadata Preview */}
                  <div className="p-8 pt-2 pb-0 relative w-full lg:w-full">
                    <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-400 my-4">
                       <div className={`flex items-center gap-2 ${theme === "light" ? "bg-tertiary" : "bg-dusk"} p-2 rounded-md`}>
                        <Building2 className="w-4 h-4 hidden md:block" />
                        <span className="text-sm">{paper.department}</span>
                       </div>
                      
                      <div className={`flex items-center gap-2 ${theme === "light" ? "bg-tertiary" : "bg-dusk"} p-2 rounded-md`}>
                        <Calendar className="w-4 h-4 hidden md:block" />
                        <span className="text-sm">{paper.year}</span>
                      </div>


                      <div className={`flex items-center gap-2 ${theme === "light" ? "bg-tertiary" : "bg-dusk"} p-2 rounded-md`}>
                        <BookOpen className="w-4 h-4 hidden md:block" />
                        <span className="text-sm">{paper.course}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tags:</p>
                      {Array.isArray(paper.keywords) ? (
                        paper.keywords
                          .flatMap(
                            (keyword) =>
                              keyword
                                .split(/[,\s]+/) // Split by comma or whitespace
                                .map((word) => word.trim()) // Trim whitespace
                                .filter((word) => word.length > 0), // Remove empty strings
                          )
                          .map((keyword, keywordIndex) => (
                            <span
                              key={keywordIndex}
                              className={`flex gap-1 items-center px-3 py-1 bg-yale-blue/10 text-yale-blue  rounded-md text-sm`}
                            >
                              <Tag className="w-3 h-3" />
                              {keyword}
                            </span>
                          ))
                      ) : (
                        <span className="text-white-25">No keywords available</span>
                      )}
                    </div>

                    <div
                      className={`
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-card-foreground
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-tertiary
                    h-[400px] scrollbar-hide text-sm  border-2 ${theme === "light" ? "border-white-50 bg-tertiary" : "border-white-5"} p-4 text-justify rounded-md mt-6 overflow-y-auto`}
                    >
                      <h1 className="text-xl font-bold mb-2">Abstract</h1>
                      <p className="whitespace-pre-wrap">{paper.abstract}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </ProtectedRoute>
      <Toaster />
    </div>
  );
}

export default ViewFile;