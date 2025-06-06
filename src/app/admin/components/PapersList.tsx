// src/app/admin/profile/components/PapersList.tsx
"use client";

import React from "react";
import DocsCardUser from "../components/DocsCardUser";
import document from "@/app/img/document.png";
import LoadingScreen from "@/app/component/DocsLoader";

interface PapersListProps {
  papers: Array<{
    paper_id: string;
    title: string;
    abstract: string;
    author: string;
    department: string;
    year: string | number;
  }>;
  loading: boolean;
  theme: string;
}

export function PapersList({ papers, loading, theme }: PapersListProps) {
  if (loading) {
    return <LoadingScreen />;
  }

  if (!papers.length) {
    return <p>No papers found.</p>;
  }

  return (
    <>
      {papers.map((paper) => (
        <React.Fragment key={paper.paper_id}>
          <DocsCardUser
            img={document}
            title={paper.title || "Untitled"}
            abstract={paper.abstract || "No abstract available"}
            author={paper.author || "No author available"}
            department={paper.department || "No department available"}
            year={paper.year}
            paper_id={paper.paper_id}
          />
   
        </React.Fragment>
      ))}
    </>
  );
}
