"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DocsCard from "../component/DocsCard";
import NavBar from "../component/NavBar";
import document from "../img/document.png";
import AdminNavBar from "../admin/components/AdminNavBar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import LoadingScreen from "../component/LoadingScreen";

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

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null);
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const storedUserType = localStorage.getItem("userType");

      if (!token) {
        window.location.href = "/login";
      }

      if (token) {
        try {
          const decoded = decode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp > currentTime) {
            setIsAuthenticated(true); // ✅ Token is valid
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
  }, [router]);

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
          data.map((paper: any) => ({
            ...paper,
            title: paper.title.replace(/"/g, ""),
            author: paper.author.replace(/"/g, ""),
            keywords: Array.isArray(paper.keywords)
              ? paper.keywords.flatMap((k) =>
                  k.split(",").map((item) => item.trim()),
                )
              : [],
            tags: Array.isArray(paper.tags)
              ? paper.tags.flatMap((t) =>
                  t.split(",").map((item) => item.trim()),
                )
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
  }, [router]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="font-[family-name:'Inter'] dark:bg-secondary">
      {userType === "librarian" ? <AdminNavBar /> : <NavBar />}

      <main className="flex flex-row">
        <aside className="flex h-auto w-96 p-8">
          <div className="flex flex-col gap-4 m-2">
            <h1 className="text-2xl font-bold">Filter Results</h1>

            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-teal">Program</h2>
              <div className="bg-dusk h-0.5 w-full dark:bg-white-25"></div>

              <ul className="ml-2 flex flex-col gap-2">
                <li>
                  <Checkbox id="it-courses" />
                  <label htmlFor="it-courses"> Information Technology</label>
                </li>
                <li>
                  <Checkbox id="cs-courses" />
                  <label htmlFor="cs-courses"> Computer Science</label>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-teal">Publication Date</h2>
              <div className="bg-dusk h-0.5 w-full dark:bg-white-25"></div>
              <ul className="ml-2 flex flex-col gap-2">
                <li>
                  <Checkbox id="year-2025" />
                  <label htmlFor="year-2025"> 2025</label>
                </li>
                <li>
                  <Checkbox id="year-2024" />
                  <label htmlFor="year-2024"> 2024</label>
                </li>
                <li>Custom range...</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-teal">Course</h1>
              <div className="bg-dusk h-0.5 w-full dark:bg-white-25"></div>
              <ul className="ml-2 flex flex-col gap-2">
                <li>
                  <Checkbox id="sia-course" />
                  <label htmlFor="sia-course"> SIA</label>
                </li>
                <li>
                  <Checkbox id="capstone-course" />
                  <label htmlFor="capstone-course"> Capstone</label>
                </li>{" "}
                <li>
                  <Checkbox id="research-course" />
                  <label htmlFor="research-course"> Research Writing</label>
                </li>{" "}
                <li>
                  <Checkbox id="thesiswriting-course" />
                  <label htmlFor="thesiswriting-course">
                    {" "}
                    CS Thesis Writing
                  </label>
                </li>
              </ul>
            </div>

            <button className="bg-teal p-2 rounded-md mt-4 cursor-pointer">
              Apply Filter
            </button>
          </div>
        </aside>

        <div className="flex flex-col w-full gap-5 mx-12 my-2 align-middle p-8">
          <h1 className="text-3xl font-bold">Recent Papers</h1>

          {papers.length > 0 ? (
            papers.map((paper) => (
              <DocsCard
                key={paper.paper_id}
                img={document}
                title={paper.title || "Untitled"}
                description={paper.abstract || "No abstract available"}
                tags={paper.keywords || []}
                paper_id={paper.paper_id}
              />
            ))
          ) : (
            <p>No recent papers found.</p>
          )}

          <div className="flex flex-col justify-between gap-4"></div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="dark:text-card" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="dark:text-card">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="dark:text-card">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="dark:text-card">
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis className="dark:text-card" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="dark:text-card" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  );
}
