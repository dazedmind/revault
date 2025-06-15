// src/app/admin/components/StatsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
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
  loading?: boolean;
}

export function StatsSection({
  allPapers,
  loading = false,
}: StatsSectionProps) {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);

  // Calculate paper statistics
  const itCount = allPapers.filter(
    (p) => p.department === "Information Technology",
  ).length;
  const csCount = allPapers.filter(
    (p) => p.department === "Computer Science",
  ).length;

  // Fetch total users count
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        console.log("📊 Fetching total users count...");
        
        // Get token from localStorage
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.log("❌ No auth token found");
          setUserError("Authentication required");
          setUserLoading(false);
          return;
        }
        
        const response = await fetch("/admin/api/total-users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        console.log("📨 User count API response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ User count API error:", response.status, errorText);
          throw new Error(`Failed to fetch user count (${response.status})`);
        }

        const data = await response.json();
        console.log("✅ User count API response:", data);

        if (data.success && typeof data.total_users === 'number') {
          setTotalUsers(data.total_users);
          setUserError(null);
        } else {
          console.error("❌ Invalid user count response format:", data);
          setUserError("Invalid response format");
        }
      } catch (error) {
        console.error("💥 Error fetching user count:", error);
        setUserError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setUserLoading(false);
      }
    };

    // Only fetch if not already loading other data
    if (!loading) {
      fetchUserCount();
    }
  }, [loading]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse my-10">
      <div className="h-6 bg-gray-300 rounded w-48 my-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-200  p-6 rounded-lg">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Show loading state if either papers or user count are loading
  if (loading || userLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {/* Error message for user count (if any) */}
      {userError && (
        <div className="my-4 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg">
          <p className="text-red-700 dark:text-red-300 text-sm">
            ⚠️ User count unavailable: {userError}
          </p>
        </div>
      )}

      {/* Mobile: Carousel */}
      <Carousel className="md:hidden p-5 mb-5">
        <h1 className="text-2xl font-bold mb-4">Statistics</h1>
        <CarouselContent>
          <CarouselItem>
            <StatsCard
              department="Uploaded Papers"
              description="Total Number of Papers"
              totalPapers={allPapers.length}
            />
          </CarouselItem>
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
              department="Total Users"
              description="All Registered Users"
              totalPapers={totalUsers}
            />
          </CarouselItem>
        </CarouselContent>

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
          department="Total Users"
          description="All Registered Users"
          totalPapers={totalUsers}
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