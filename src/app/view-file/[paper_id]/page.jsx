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
import { Bookmark, Info, Moon, SunMedium } from "lucide-react";
import LoadingScreen from "@/app/component/LoadingScreen";

export const decode = (token) => {
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
  } catch (e) {
    console.log("Error decoding token:", e.message);
    return null;
  }
};

function ViewFile() {
  const { theme, setTheme } = useTheme("light");
  const [showMetadata, setShowMetadata] = useState(false);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null);

  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedPaperIndex, setSelectedPaperIndex] = useState(null);
  const { paper_id } = useParams(); // grab it from URL

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const storedUserType = localStorage.getItem('userType');
      
      if (!token) {
        window.location.href = "/login";      
      }

      if (token) {
        try {
          const decoded = decode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp > currentTime) {
            setIsAuthenticated(true);  // ✅ Token is valid
            setUserType(storedUserType); // Set the user type from localStorage
          } else {
            alert("Token expired. Please log in again.");
            localStorage.removeItem("authToken");
            localStorage.removeItem("userType"); // Also remove userType
            setIsAuthenticated(false);
            router.push("/login");
          }
        } catch (error) {
          alert("Invalid token. Please log in again.");
          console.error("Error decoding token:", error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("userType"); // Also remove userType
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
        setPaper(
          data.map((paper) => ({
            ...paper,
            title: paper.title.replace(/"/g, ""),
            author: paper.author.replace(/"/g, ""),
            keywords: Array.isArray(paper.keywords) 
            ? paper.keywords.flatMap(k => k.split(',').map(item => item.trim()))
            : [],
            course: paper.course.replace(/"/g, ""),
            department: paper.department.replace(/"/g, ""),
            abstract: paper.abstract.replace(/"/g, ""),
          })),
        );
      } catch (err) {
        console.error("failed to load papers:", err);
      } finally {
        setLoading(false);
      }
    }

    init();

    async function fetchPaper() {
      try {
        const res = await fetch(`/api/paper/${paper_id}`); // Example endpoint
        if (!res.ok) throw new Error('Failed to fetch paper');
        const data = await res.json();
        setPaper(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (paper_id) fetchPaper();
  }, [paper_id]);
  
  if (loading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <div className="dark:bg-secondary h-auto">
      {userType === "librarian" ? <AdminNavBar /> : <NavBar />}

      <ProtectedRoute>
        <main className="flex gap-6 h-auto justify-center">
          <div className="flex gap-6 relative">
            {showMetadata && (
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={() => setShowMetadata(false)}
              />
            )}

            <div 
              className={`fixed top-0 left-0 w-full md:w-[800px] h-screen z-50 p-10 shadow-lg 
                transform transition-transform duration-300 ease-in-out
                ${showMetadata ? 'translate-x-0' : '-translate-x-full'}
                dark:bg-card-foreground overflow-y-auto`}
            >
              <span className="flex items-center text-center align-middle gap-2 justify-between mb-6">
                <h2 className="text-3xl font-bold">
                  Viewing Document Metadata
                </h2>

                <button
                  className="text-2xl px-4 rounded-md cursor-pointer hover:bg-dusk/20 transition-colors duration-200"
                  onClick={() => setShowMetadata(false)}
                >
                  <FaChevronLeft />
                </button>
              </span>

              <div className={`border-2 ${theme === 'light' ? 'border-white-50' : 'border-white-5'} p-8 rounded-md`}>
                <p className="font-bold text-2xl text-teal mb-6">Metadata</p>
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
                            .split(/\s{2,}/)  // Split by two or more spaces
                            .map((author, index) => (
                                <div key={index} className="flex flex-row gap-2 items-center">
                                <Image src={avatar} className="w-8 rounded-full" alt={`author-${index}`} />
                                <p>{author.trim()}</p>
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
                              className={`px-3 py-1 bg-dusk ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'} rounded-md text-sm m-1`}
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
                <p className="font-bold text-2xl text-teal">Abstract</p>
                <p>
                  {paper.abstract}
                </p>{" "}
              </div>
            </div>

            <aside className="flex flex-col w-72 h-auto dark:bg-secondary p-8">
              <h1 className="text-2xl font-bold">File Menu</h1>

              <FileMenuButton
                icon={<Info className="text-xl text-teal" />}
                label="View Metadata"
                onClick={() => setShowMetadata(!showMetadata)}
              />

              <FileMenuButton
                icon={
                  theme === "dark" ? (
                    <SunMedium className="text-xl text-teal" />
                  ) : (
                    <Moon className="text-xl text-teal" />
                  )
                }
                label={
                  theme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"
                }
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
              <FileMenuButton
                icon={<Bookmark className="text-xl text-teal" />}
                label="Add to Bookmark"
              />
            </aside>

            <div className="Document ">
              <object
                data="/sample.pdf"
                type="application/pdf"
                width="100%"
                height="100%"
                className="h-screen w-3xl"
              >
                <p>
                  Alternative text - include a link{" "}
                  <a href="http://africau.edu/images/default/sample.pdf">
                    to the PDF!
                  </a>
                </p>
              </object>
            </div>
          </div>

          <div className="p-6 w-1/3 relative">
            <p className="text-2xl font-bold mb-2">
                {paper.title}
            </p>
{/* 
            <div className="flex flex-row gap-3 items-center my-4 flex-wrap">

                {paper.author &&
                    paper.author
                    .split(/\s{2,}/)  // Split by two or more spaces
                    .map((author, index) => (
                        <div key={index} className="flex flex-row gap-2 items-center">
                        <Image src={avatar} className="w-8 rounded-full" alt={`author-${index}`} />
                        <p>{author.trim()}</p>
                        </div>
                ))}
            </div> */}

            <p>Keywords:</p>
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
                              className={`px-3 py-1 bg-dusk ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'} rounded-md text-sm m-1`}
                            >
                              {keyword}
                            </span>
                          ))
                      ) : (   
                        <span className="text-white-25">No keywords available</span>
              )}

            <div className={`dark:bg-card-foreground border-2 ${theme === 'light' ? 'border-white-50' : 'border-white-5'} p-6 rounded-md mt-4`}>
              <h1 className="text-xl font-bold">Abstract.md </h1>
              <p>
                {paper.abstract}
              </p>
            </div>
          </div>
        </main>
      </ProtectedRoute>
    </div>
  );
}

export default ViewFile;