"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../component/NavBar";
import AdminNavBar from "../admin/components/AdminNavBar";
import Image from "next/image";
import avatar from "../img/user.png";
import {
  FaBookmark,
  FaSun,
  FaMoon,
  FaCircleInfo,
  FaChevronLeft,
} from "react-icons/fa6";
import FileMenuButton from "../component/FileMenuButton";
import ProtectedRoute from "../component/ProtectedRoute";
import { useTheme } from "next-themes";
import { useParams } from 'next/navigation';

function ViewFile() {
  const { theme, setTheme } = useTheme();
  const [showMetadata, setShowMetadata] = useState(false);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null);

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPaperIndex, setSelectedPaperIndex] = useState(null);
  const { paper_id } = useParams(); // grab it from URL

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
        setPapers(
          data.map((paper) => ({
            ...paper,
            title: paper.title.replace(/"/g, ""),
            author: paper.author.replace(/"/g, ""),
            keywords: Array.isArray(paper.keywords) 
            ? paper.keywords.flatMap(k => k.split(',').map(item => item.trim()))
            : [],
            tags: Array.isArray(paper.tags) 
              ? paper.tags.flatMap(t => t.split(',').map(item => item.trim()))
              : [],
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
        setPapers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (paper_id) fetchPaper();
  }, [paper_id, router]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading recent papers…
      </div>
    );
  }
  return (
    <div className="dark:bg-secondary h-auto">
      {userType === "librarian" ? <AdminNavBar /> : <NavBar />}

      <ProtectedRoute>
        <main className="flex gap-6 h-auto justify-center">
          <div className="flex gap-6 relative">
            {showMetadata && (
              <div className="absolute top-0 left-0 w-full h-screen z-50 p-10 shadow-lg duration-300 ease-in-out overflow-y-auto dark:bg-card-foreground">
                <span className="flex items-center text-center align-middle gap-2 justify-between mb-6">
                  <h2 className="text-3xl font-bold">
                    {" "}
                    Viewing Document Metadata
                  </h2>
                  <button
                    className="text-2xl px-4 rounded-md cursor-pointer"
                    onClick={() => setShowMetadata(false)}
                  >
                    <FaChevronLeft />
                  </button>
                </span>

                <div className="border-2 border-white-5 p-8 rounded-md">
                  <p className="font-bold text-2xl">Abstract.md</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris blandit ex imperdiet, tristique erat non, luctus
                    justo. In at facilisis metus. Donec volutpat nisi magna, sit
                    amet dignissim neque imperdiet sit amet. 
                  </p>{" "}
                  <br></br>
                  <p className="font-bold text-2xl">Results</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris blandit ex imperdiet, tristique erat non, luctus
                    justo. In at facilisis metus. Donec volutpat nisi magna, sit
                    amet dignissim neque imperdiet sit amet. 
                  </p>{" "}
                  <br></br>
                  <p>
                    <strong>Title:</strong> ReVault: A Version-Controlled Cloud
                    Repository with SEO Metadata Tagging for Archiving Thesis
                    Works of PLM CISTM Students
                  </p>
                  <p>
                    <strong>Authors:</strong> John Allen Troy Valena, etc.
                  </p>
                  <p>
                    <strong>Date:</strong> April 6, 2025
                  </p>
                  <div>
                    <strong>Tags:</strong>{" "}
                    {Array.isArray(papers[0].tags) ? (   
                      papers[0].tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="mr-2">
                        {tag}
                      </span>
                      ))
                    ) : (   
                      <span>No tags available</span>
                    )}
                  </div>
                  <p>
                    <strong>Keywords:</strong> {""}
                  </p>
                </div>
              </div>
            )}

            <aside className="flex flex-col w-72 h-auto dark:bg-secondary p-8">
              <h1 className="text-2xl font-bold">File Menu</h1>

              <FileMenuButton
                icon={<FaCircleInfo className="text-xl text-teal" />}
                label="View Metadata"
                onClick={() => setShowMetadata(!showMetadata)}
              />

              {/* divider */}
              <div className="bg-dusk h-0.5 w-auto my-4"></div>

              <FileMenuButton
                icon={
                  theme === "dark" ? (
                    <FaSun className="text-xl text-teal" />
                  ) : (
                    <FaMoon className="text-xl text-teal" />
                  )
                }
                label={
                  theme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"
                }
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
              <FileMenuButton
                icon={<FaBookmark className="text-xl text-teal" />}
                label="Add to Bookmark"
                onClick={() => {}}
              />
            </aside>

            <div className="Document ">
              {/* <Image src={document} className='h-auto w-fit' alt='document'/> */}
              {/* <PdfViewer pdfUrl="https://poropointfreeport.gov.ph/wp-content/uploads/2023/02/PPFZ-Request-for-Inspection-Form.pdf" /> */}

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
            <p className="text-2xl font-bold">
              ReVault: A Version-Controlled Cloud Repository with SEO Metadata
              Tagging for Archiving Thesis Works of PLM CISTM Students
            </p>

            <div className="flex flex-row gap-3 items-center my-4 flex-wrap">
              <div className="flex flex-row gap-2 items-center">
                <Image src={avatar} className="w-8 rounded-full" alt="author" />
                <p>John Allen Troy Valena</p>
              </div>

              <div className="flex flex-row gap-2 items-center">
                <Image src={avatar} className="w-8 rounded-full" alt="author" />
                <p>Matthew Jacob Insigne</p>
              </div>

              <div className="flex flex-row gap-2 items-center">
                <Image src={avatar} className="w-8 rounded-full" alt="author" />
                <p>Jetthro Karl Yacub</p>
              </div>

              <div className="flex flex-row gap-2 items-center">
                <Image src={avatar} className="w-8 rounded-full" alt="author" />
                <p>Kristhia Lastra</p>
              </div>

              <div className="flex flex-row gap-2 items-center">
                <Image src={avatar} className="w-8 rounded-full" alt="author" />
                <p>KC Durante</p>
              </div>
            </div>

            <p>April 6, 2025</p>

            <span className="flex gap-2 flex-wrap overflow-hidden my-2">
              <p className="dark:bg-card-foreground p-2 rounded-md w-auto text-sm px-3">
                IT
              </p>
              <p className="dark:bg-card-foreground p-2 rounded-md w-auto text-sm px-3">
                SIA
              </p>
            </span>

            <p>Keywords: Cloud Repository, SEO</p>

            <div className="dark:bg-card-foreground border-2 border-white-5 p-6 rounded-md mt-4">
              <h1 className="text-xl font-bold">Abstract.md </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                blandit ex imperdiet, tristique erat non, luctus justo. In at
                facilisis metus. Donec volutpat nisi magna, sit amet dignissim
                neque imperdiet sit amet. 
              </p>
            </div>
          </div>
        </main>
      </ProtectedRoute>
    </div>
  );
}

export default ViewFile;
