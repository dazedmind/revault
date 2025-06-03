"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../component/NavBar";
import AdminNavBar from "../../admin/components/AdminNavBar";
import Image from "next/image";
import avatar from "../../img/user.png";
import { FaChevronLeft } from "react-icons/fa6";
import FileMenuButton from "../../component/FileMenuButton";
import ProtectedRoute from "../../component/ProtectedRoute";
import { useTheme } from "next-themes";
import { useParams } from 'next/navigation';
import { Link } from "lucide-react"; 
import LoadingScreen from "@/app/component/LoadingScreen";
import { Toaster, toast } from "sonner";
import useAntiCopy from "../../hooks/useAntiCopy";
import { GoBookmark, GoBookmarkSlash, GoInfo, GoMoon, GoSun } from "react-icons/go";

function ViewFile() {
  const { theme, setTheme } = useTheme();
  const [showMetadata, setShowMetadata] = useState(false);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null);

  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error("You're not logged in.");
      return;
    }
  
    try {
      const res = await fetch(`/api/bookmark/${paperId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  const checkBookmarkStatus = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const res = await fetch(`/api/bookmark/check/${paper_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const storedUserType = localStorage.getItem('userType');
      
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
        const token = localStorage.getItem('authToken');
        const res = await fetch(`/api/paper/${paper_id}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            ...(token && { Authorization: `Bearer ${token}` })
          }
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch paper: ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log("Fetched paper data:", data);
        
        if (!data) {
          throw new Error('No paper data received');
        }

        setPaper({
          ...data,
          title: data.title?.replace(/"/g, "") || "",
          author: data.author?.replace(/"/g, "") || "",
          keywords: Array.isArray(data.keywords) 
            ? data.keywords.flatMap(k => k.split(',').map(item => item.trim()))
            : [],
          course: data.course?.replace(/"/g, "") || "",
          department: data.department?.replace(/"/g, "") || "",
          abstract: data.abstract?.replace(/"/g, "") || "",
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
  }, [paper_id, router]);
  
  if (loading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <div className="dark:bg-secondary h-auto">
      {userType === "LIBRARIAN" || userType === "ASSISTANT" || userType === "ADMIN" ? <AdminNavBar /> : <NavBar />}

      <ProtectedRoute>
        <main className="flex flex-col-reverse md:flex-row h-auto justify-center">
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
                ${showMetadata ? 'translate-x-0' : '-translate-x-full'}
                dark:bg-accent overflow-y-auto`}
            >
              <span className="flex items-center text-center align-middle gap-2 justify-between mb-2 md:mb-6">
                <h2 className="text-3xl p-4 md:p-0 font-bold">
                  Metadata
                </h2>

                <button
                  className="text-2xl px-4 rounded-md cursor-pointer transition-colors duration-200"
                  onClick={() => setShowMetadata(false)}
                >
                  <FaChevronLeft />
                </button>
              </span>

              <div className={`border-2 ${theme === 'light' ? 'border-white-50' : 'border-white-5'} p-8 rounded-md`}>
                <p className="font-bold text-2xl text-gold">Metadata</p>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg">
                      <strong>Title:</strong> {paper.title}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-lg">
                      <strong>Authors:</strong>
                    </p>
                    <div className="flex flex-row gap-3 items-center my-4 flex-wrap">
                        {paper.author &&
                            paper.author
                            .split('.,')  // Split by period followed by comma
                            .map((author, index) => (
                                <div key={index} className="flex flex-row gap-2 items-center">
                                <Image src={avatar} className="w-8 rounded-full" alt={`author-${index}`} />
                                <p>{author.trim() + (index < paper.author.split('.,').length - 1 ? '.' : '')}</p>
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
                          .flatMap(keyword => 
                            keyword.split(/[,\s]+/) // Split by comma or whitespace
                              .map(word => word.trim()) // Trim whitespace
                              .filter(word => word.length > 0) // Remove empty strings
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
                        <span className="text-white-25">No keywords available</span>
                      )}
                    </div>
                  </div>
                </div>
                <br />
                <p className="font-bold text-2xl text-gold">Abstract</p>
                <p>
                  {paper.abstract}
                </p>{" "}
              </div>
            </div>
            
            {/* File Menu and Document View */}
            <div className="flex flex-col md:flex-row">
              <aside className="flex flex-row md:flex-col justify-end md:justify-start gap-4 md:gap-0 w-auto md:w-72 h-auto dark:bg-secondary p-8 pt-4">
                <h1 className="text-2xl font-bold  hidden md:block">File Menu</h1>
      
                <FileMenuButton
                  icon={<GoInfo className="text-3xl text-yale-blue" />}
                  label="View Metadata"
                  onClick={() => setShowMetadata(!showMetadata)}
                />

                <FileMenuButton
                  icon={
                    theme === "dark" ? (
                      <GoSun className="text-3xl text-yale-blue" />
                    ) : (
                      <GoMoon className="text-3xl text-yale-blue" />
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
                      icon={<Link className="text-3xl text-yale-blue" />}
                      label="Cite Paper"
                      onClick={() => {}}
                    />
                  </>
                )}

                {!viewFromAdmin && userType !== "ADMIN" && userType !== "ASSISTANT" && (
                  <>
                    {isBookmarked ? (
                      <FileMenuButton
                        icon={<GoBookmarkSlash className="text-3xl text-yale-blue" />}
                        label="Remove Bookmark"
                        onClick={() => handleUnbookmark(paper_id)}
                      />
                    ) : (
                      <FileMenuButton
                        icon={<GoBookmark className="text-3xl text-yale-blue" />}
                        label="Add to Bookmark"
                        onClick={() => handleBookmark(paper_id)}
                      />
                    )}
                  </>
                )}

                
              </aside>

              <div className="Document ">
                  <object
                    data="/sample.pdf#toolbar=0"
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    className="h-screen w-screen md:w-3xl"
                  >
                    <p>
                      Document is currently not available.{" "}
                      <a href="http://africau.edu/images/default/sample.pdf">
                        View PDF
                      </a>
                    </p>
                  </object>
                </div>
              </div>
            </div>

          <div className="p-8 pb-0 w-auto md:w-1/3 relative">
            <p className="text-xl font-bold mb-2">
                {paper.title}
            </p>

            <div className=" my-2 flex-row gap-2">
              <h1 className="text-sm">{paper.author}  </h1>
            </div>
              
            <div className="flex flex-wrap gap-2">
              {Array.isArray(paper.keywords) ? (   
                        paper.keywords
                          .flatMap(keyword => 
                            keyword.split(/[,\s]+/) // Split by comma or whitespace
                              .map(word => word.trim()) // Trim whitespace
                              .filter(word => word.length > 0) // Remove empty strings
                          )
                          .map((keyword, keywordIndex) => (
                            <span 
                              key={keywordIndex} 
                              className={`px-3 py-1 bg-yale-blue/10 text-yale-blue  rounded-md text-sm mr-2`}
                            >
                              {keyword}
                            </span>
                          ))
                      ) : (   
                        <span className="text-white-25">No keywords available</span>
              )}
            </div>

            <div className={`
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-card-foreground
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-tertiary
              h-[400px] scrollbar-hide text-sm dark:bg-card-foreground border-2 ${theme === 'light' ? 'border-white-50' : 'border-white-5'} p-4 text-justify rounded-md mt-6 overflow-y-auto`}>
              <h1 className="text-xl font-bold mb-2">Abstract</h1>
              <p className="whitespace-pre-wrap">
                {paper.abstract}
              </p>
            </div>
          </div>
        </main>
      </ProtectedRoute>
      <Toaster />
    </div>
  );
}

export default ViewFile;