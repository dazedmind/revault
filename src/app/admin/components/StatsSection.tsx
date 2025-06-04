// src/app/admin/components/StatsSection.tsx
"use client";

import React from "react";
import StatsCard from "./StatsCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface StatsSectionProps {
  allPapers: Array<{ department: string }>;
  loading?: boolean; // Added loading prop
}

export function StatsSection({
  allPapers,
  loading = false,
}: StatsSectionProps) {
  const itCount = allPapers.filter(
    (p) => p.department === "Information Technology",
  ).length;
  const csCount = allPapers.filter(
    (p) => p.department === "Computer Science",
  ).length;

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {/* Mobile: Carousel */}
      <Carousel className="md:hidden p-5 mb-5">
        <h1 className="text-2xl font-bold mb-4">Usage Statistics</h1>
        <CarouselContent>
          <CarouselItem>
            <StatsCard
              department="Information Technology"
              description="Total Number of Papers"
              totalPapers={itCount}
            />
          </CarouselItem>
          <CarouselItem>
            <StatsCard
              department="Computer Science"
              description="Total Number of Papers"
              totalPapers={csCount}
            />
          </CarouselItem>
          <CarouselItem>
            <StatsCard
              department="Usage Statistics"
              description="Total Number of Users"
              totalPapers={512}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Desktop: Grid */}
      <div className="hidden md:flex flex-row gap-4 my-10">
        <StatsCard
          department="Information Technology"
          description="Total Number of Papers"
          totalPapers={itCount}
        />
        <StatsCard
          department="Computer Science"
          description="Total Number of Papers"
          totalPapers={csCount}
        />
        <StatsCard
          department="Usage Statistics"
          description="Total Number of Users"
          totalPapers={512}
        />
        <StatsCard
          department="Uploaded Papers"
          description="Total Number of Papers"
          totalPapers={allPapers.length}
        />
      </div>
    </>
  );
}
