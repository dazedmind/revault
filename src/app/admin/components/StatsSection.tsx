// src/app/admin/profile/components/StatsSection.tsx
"use client";

import React from "react";
import StatsCard from "../components/StatsCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface StatsSectionProps {
  allPapers: Array<{ department: string }>;
}

export function StatsSection({ allPapers }: StatsSectionProps) {
  const itCount = allPapers.filter(
    (p) => p.department === "Information Technology",
  ).length;
  const csCount = allPapers.filter(
    (p) => p.department === "Computer Science",
  ).length;

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
