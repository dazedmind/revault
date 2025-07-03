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
    is_deleted: boolean;
  }>;
  loading: boolean;
  theme: string;
  onRefresh?: () => void; // Add refresh callback prop
}

export function PapersList({ papers, loading, theme, onRefresh }: PapersListProps) {
  if (loading) {
    return <LoadingScreen />;
  }

  if (!papers.length) {
    return <p>No papers found.</p>;
  }

  // Filter out deleted papers
  const activePapers = papers.filter(paper => !paper.is_deleted);

  if (!activePapers.length) {
    return <p>No papers found.</p>;
  }

  return (
    <>
      {activePapers.map((paper) => (
        <React.Fragment key={paper.paper_id}>
          <DocsCardUser
            img={document}
            title={paper.title || "Untitled"}
            abstract={paper.abstract || "No abstract available"}
            author={paper.author || "No author available"}
            department={paper.department || "No department available"}
            year={paper.year}
            paper_id={paper.paper_id}
            is_deleted={paper.is_deleted}
            onPaperDeleted={(paperId) => {
              // Handle paper deletion - refresh list, show message, etc.
              console.log(`Paper ${paperId} was deleted`);
              // Call the refresh callback to update the papers list
              if (onRefresh) {
                onRefresh();
              }
            }}
          />
   
        </React.Fragment>
      ))}
    </>
  );
}
