// src/app/admin/profile/components/PaginationControls.tsx
"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onChangePage: (newPage: number) => void;
  theme?: "light" | "dark";
}

export function PaginationControls({
  currentPage,
  totalPages,
  onChangePage,
  theme = "light",
}: PaginationControlsProps) {
  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage <= 1
                ? "dark:text-card opacity-50 pointer-events-none"
                : "dark:text-card"
            }
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onChangePage(currentPage - 1);
            }}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={p === currentPage}
              className={
                p === currentPage
                  ? "dark:text-card font-semibold pointer-events-none"
                  : "dark:text-card"
              }
              onClick={(e) => {
                e.preventDefault();
                if (p !== currentPage) onChangePage(p);
              }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            className={
              currentPage >= totalPages
                ? "dark:text-card opacity-50 pointer-events-none"
                : "dark:text-card"
            }
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onChangePage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
