// app/home/PapersArea.tsx
"use client";

import React, { useEffect, useState } from "react";
import DocsCard from "../component/DocsCard";
import LoadingScreen from "../component/LoadingScreen"; // or your SkeletonLoader
import document from "../img/document.png";

interface Filters {
  department?: string[];
  year?: string[];
  start?: string;
  end?: string;
  course?: string[];
  sort?: string;
}

export default function PapersArea({ filters }: { filters: Filters }) {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<string | null>(null);
  
  const storedUserType = localStorage.getItem("userType");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const qp = new URLSearchParams();
      if (filters.department?.length)
        qp.set("department", filters.department.join(","));
      if (filters.year?.length) qp.set("year", filters.year.join(","));
      if (filters.course?.length) qp.set("course", filters.course.join(","));
      if (filters.start && filters.end) {
        qp.set("start", filters.start);
        qp.set("end", filters.end);
      }
      if (filters.sort) qp.set("sort", filters.sort);

      const stripQuotes = (str: string) => str.replace(/^"|"$/g, "");

      const url = qp.toString() ? `/api/papers?${qp}` : `/api/recent`;
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        setPapers(
          json.map((paper: any) => ({
            ...paper,
            title: stripQuotes(paper.title),
            author: stripQuotes(paper.author),
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
            abstract: stripQuotes(paper.abstract),
          })),
        );
      } catch (err) {
        console.error("Error loading papers:", err);
        setPapers([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filters]);

  if (!papers.length) {
    return <p>No papers match your filters.</p>;
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
          viewFromAdmin={storedUserType === "librarian"}
          year={paper.year || "No year available"}
        />
      ))}
    </>
  );
}
