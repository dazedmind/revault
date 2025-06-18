// src/app/admin/components/StatsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import StatsCard from "./StatsCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface StatsData {
  totalPapers: number;
  departments: {
    "Information Technology": number;
    "Computer Science": number;
  };
  totalUsers: number;
  recentPapers: number;
  lastUpdated: string;
}

interface StatsSectionProps {
  // ❌ REMOVED: No longer needs allPapers prop
  // allPapers: Array<{ department: string }>;
  loading?: boolean;
}

export function StatsSection({ loading = false }: StatsSectionProps) {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ OPTIMIZED: Single API call for all statistics
  useEffect(() => {
    const fetchStats = async () => {
      if (loading) return; // Wait for parent loading to complete

      try {
        console.log("📊 Fetching optimized stats...");
        setStatsLoading(true);
        setError(null);

        // Get token from localStorage
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await fetch("/admin/api/stats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Stats API failed (${response.status}): ${errorText}`,
          );
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || "Failed to fetch statistics");
        }

        console.log("✅ Stats loaded successfully:", result.data);
        setStats(result.data);
      } catch (err) {
        console.error("💥 Error fetching stats:", err);
        setError(err instanceof Error ? err.message : "Unknown error");

        // ✅ Fallback: Set default stats to prevent UI breaking
        setStats({
          totalPapers: 0,
          departments: {
            "Information Technology": 0,
            "Computer Science": 0,
          },
          totalUsers: 0,
          recentPapers: 0,
          lastUpdated: new Date().toISOString(),
        });
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [loading]); // Only depends on parent loading state

  // ✅ IMPROVED: Better loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse my-10">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 my-4"></div>
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

  // Show loading state
  if (loading || statsLoading) {
    return <LoadingSkeleton />;
  }

  // Show error state with retry option
  if (error) {
    return (
      <div className="my-10 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
          Statistics Unavailable
        </h3>
        <p className="text-red-600 dark:text-red-300 text-sm mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Ensure stats exist before rendering
  if (!stats) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {/* Mobile: Carousel */}
      <Carousel className="md:hidden p-5 mb-5">
        <h1 className="text-2xl font-bold mb-4">Statistics</h1>
        <CarouselContent>
          <CarouselItem>
            <StatsCard
              department="Total Papers"
              description="All Uploaded Papers"
              totalPapers={stats.totalPapers}
            />
          </CarouselItem>
          <CarouselItem>
            <StatsCard
              department="Information Technology"
              description="IT Department Papers"
              totalPapers={stats.departments["Information Technology"]}
            />
          </CarouselItem>
          <CarouselItem>
            <StatsCard
              department="Computer Science"
              description="CS Department Papers"
              totalPapers={stats.departments["Computer Science"]}
            />
          </CarouselItem>
          <CarouselItem>
            <StatsCard
              department="Total Users"
              description="Registered Users"
              totalPapers={stats.totalUsers}
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* Desktop: Grid */}
      <div className="hidden md:flex flex-row gap-4 my-10">
        <StatsCard
          department="Total Users"
          description="Registered Users"
          totalPapers={stats.totalUsers}
        />

        <StatsCard
          department="Information Technology"
          description="IT Department Papers"
          totalPapers={stats.departments["Information Technology"]}
        />
        <StatsCard
          department="Computer Science"
          description="CS Department Papers"
          totalPapers={stats.departments["Computer Science"]}
        />

        <StatsCard
          department="Total Papers"
          description="All Uploaded Papers"
          totalPapers={stats.totalPapers}
        />
      </div>

      {/* ✅ BONUS: Show last updated time */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">
        Last updated: {new Date(stats.lastUpdated).toLocaleString()}
      </div>
    </>
  );
}
