"use client";

import React, { useEffect, useState } from "react";
import DocsCard from "../component/DocsCard";
import LoadingScreen from "../component/LoadingScreen"; // or your own skeleton/loading component
import document from "../img/document.png";

interface Filters {
  department?: string[];
  year?: string[];
  start?: string;
  end?: string;
  course?: string[];
  sort?: string;
}

interface PapersAreaProps {
  filters: Filters;
  /** The current page (1-indexed) */
  page: number;
  /**
   * Called as soon as we know how many total pages exist.
   * Example: if API returns totalPages = 7, then onTotalPages(7).
   */
  onTotalPages: (n: number) => void;
}

export default function PapersArea({
  filters,
  page,
  onTotalPages,
}: PapersAreaProps) {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pull userType from localStorage (for viewFromAdmin toggle)
  const [userType, setUserType] = useState<string | null>(null);
  useEffect(() => {
    // Only run on client
    const ut = localStorage.getItem("userType");
    setUserType(ut);
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);

      // Build query params based on filters + page
      const qp = new URLSearchParams();
      if (filters.department?.length) {
        qp.set("department", filters.department.join(","));
      }
      if (filters.year?.length) {
        qp.set("year", filters.year.join(","));
      }
      if (filters.course?.length) {
        qp.set("course", filters.course.join(","));
      }
      if (filters.start && filters.end) {
        qp.set("start", filters.start);
        qp.set("end", filters.end);
      }
      if (filters.sort) {
        qp.set("sort", filters.sort);
      }

      // Always set "page" param
      qp.set("page", String(page));

      // Decide which endpoint: if any filter exists, call /api/papers, otherwise fallback to /api/recent
      // (Your /api/recent might not support pagination; if so, always call /api/papers so pagination works consistently.)
      const url = qp.toString()
        ? `/api/papers?${qp.toString()}`
        : `/api/papers?page=${page}`; // default to /api/papers so pagination still works

      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(await res.text());
        }
        const json = await res.json();

        // Our API shape: { papers: [ … ], totalPages: number }
        let rawArray: any[] = [];

        if (Array.isArray(json)) {
          // (In case your API ever returns a raw array by mistake)
          rawArray = json as any[];
          // But if it's a raw array, totalPages is "1" by default
          onTotalPages(1);
        } else if (Array.isArray((json as any).papers)) {
          rawArray = (json as any).papers;
          onTotalPages((json as any).totalPages ?? 1);
        } else {
          console.error(
            "[PapersArea] Unexpected JSON shape:",
            json,
            "⟶ treating as empty array",
          );
          rawArray = [];
          onTotalPages(1);
        }

        // Helper to strip leading/trailing quotes
        const stripQuotes = (str: string) => str.replace(/^"|"$/g, "");

        const normalized = rawArray.map((paper: any) => ({
          ...paper,
          title: stripQuotes(paper.title),
          author: stripQuotes(paper.author),
          keywords: Array.isArray(paper.keywords)
            ? paper.keywords.flatMap((k: string) =>
                k.split(",").map((item) => item.trim()),
              )
            : [],
          tags: Array.isArray(paper.tags)
            ? paper.tags.flatMap((t: string) =>
                t.split(",").map((item) => item.trim()),
              )
            : [],
          abstract: stripQuotes(paper.abstract),
        }));

        setPapers(normalized);
      } catch (err) {
        console.error("Error loading papers:", err);
        setPapers([]);
        // If the request fails, we can default to 1 page
        onTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filters, page, onTotalPages]);

  if (!papers.length) {
    return <p>No papers match your filters or page.</p>;
  }

  return (
    <>
      {papers.map((paper) => (
        <DocsCard
          key={paper.paper_id}
          img={document}
          title={paper.title || "Untitled"}
          author={paper.author || "No author available"}
          description={paper.abstract || "No abstract available"}
          tags={paper.keywords || []}
          department={paper.department || "No department available"}
          paper_id={paper.paper_id}
          viewFromAdmin={userType === "librarian"}
          year={paper.year || "No year available"}
          course={paper.course || "No course available"}
        />
      ))}
    </>
  );
}
