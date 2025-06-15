// File: /app/admin/profile/AdminProfilePageClient.tsx
"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

import { FilterBar } from "../components/FilterBar";
import { PapersList } from "../components/PapersList";
import { PaginationControls } from "../components/PaginationControls";
import { StatsSection } from "../components/StatsSection";
import { ProfileCard } from "../../component/ProfileCard";
import avatar from "../../img/user.png";
import AdminNavBar from "../components/AdminNavBar";
import ProfileLoader from "@/app/component/ProfileLoader";

// Custom hook to safely access localStorage
const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This only runs on the client-side
    try {
      const authToken = window.localStorage.getItem("authToken");
      setToken(authToken);
    } catch (error) {
      console.error("Failed to access localStorage:", error);
      setToken(null);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  return { token, isLoaded };
};

// Component for the search params logic
function AdminProfileContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const { token, isLoaded: tokenLoaded } = useAuthToken();

  // ── URL-driven state (single source of truth)
  const [urlState, setUrlState] = useState({
    departments: [] as string[],
    courses: [] as string[],
    sortOpt: "recent", // Default sort
    currentPage: 1,
  });

  // ── Local filter state (for UI before "Apply")
  const [localFilters, setLocalFilters] = useState({
    departments: [] as string[],
    courses: [] as string[],
    sortOpt: "recent",
  });

  // ── Data state
  const [papers, setPapers] = useState<any[]>([]);
  const [loadingPapers, setLoadingPapers] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [allPapers, setAllPapers] = useState<any[]>([]);
  const [loadingAllPapers, setLoadingAllPapers] = useState<boolean>(true);
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  // ── Parse URL params into state (single source of truth)
  const parseUrlState = useCallback(() => {
    const depsParam = searchParams.get("department");
    const departments = depsParam?.split(",").filter(Boolean) || [];

    const coursesParam = searchParams.get("course");
    const courses = coursesParam?.split(",").filter(Boolean) || [];

    const sortOpt = searchParams.get("sort") || "recent"; // Default to recent

    const pageParam = searchParams.get("page");
    const currentPage = pageParam
      ? Math.max(1, parseInt(pageParam, 10) || 1)
      : 1;

    return { departments, courses, sortOpt, currentPage };
  }, [searchParams]);

  // ── Update URL state when search params change
  useEffect(() => {
    const newUrlState = parseUrlState();
    console.log("📄 URL state updated:", newUrlState);

    setUrlState(newUrlState);
    setLocalFilters({
      departments: [...newUrlState.departments],
      courses: [...newUrlState.courses],
      sortOpt: newUrlState.sortOpt,
    });
  }, [parseUrlState]);

  // ── Fetch profile & role check
  useEffect(() => {
    const fetchProfile = async () => {
      // Don't run until token is loaded
      if (!tokenLoaded) return;

      if (!token) {
        console.log("❌ No auth token found");
        setLoadingProfile(false);
        router.push("/login");
        return;
      }

      console.log("🔍 Fetching admin profile...");

      try {
        const res = await fetch("/admin/api/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        console.log("📨 Profile API response:", { status: res.status, data });

        if (!res.ok) {
          console.error(
            "❌ Profile fetch failed:",
            data?.error || res.statusText,
          );
          setLoadingProfile(false);
          return;
        }

        const allowedRoles = ["ADMIN", "ASSISTANT", "LIBRARIAN"];
        const userRole = data.users?.role || data.role;

        console.log(
          "🔍 Checking user role:",
          userRole,
          "Allowed:",
          allowedRoles,
        );

        if (!userRole || !allowedRoles.includes(userRole)) {
          console.log("❌ Access denied for role:", userRole);
          router.replace("/home");
          return;
        }

        console.log("✅ Profile loaded successfully for role:", userRole);
        setProfile(data);
      } catch (err) {
        console.error("💥 Error fetching profile:", err);
        setProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [router, token, tokenLoaded]);

  // ── Fetch paged papers based on URL state
  useEffect(() => {
    const fetchPapers = async () => {
      if (loadingProfile || !tokenLoaded) return; // Wait for profile to load and token to be available

      console.log("🔍 Fetching papers with state:", urlState);
      setLoadingPapers(true);

      try {
        const qp = new URLSearchParams();

        // Add filters
        if (urlState.departments.length) {
          qp.set("department", urlState.departments.join(","));
        }
        if (urlState.courses.length) {
          qp.set("course", urlState.courses.join(","));
        }

        // Always include sort (default to recent)
        qp.set("sort", urlState.sortOpt || "recent");
        qp.set("page", String(urlState.currentPage));

        const apiUrl = `/api/papers?${qp.toString()}`;
        console.log("📤 Fetching papers from:", apiUrl);

        const res = await fetch(apiUrl, { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Papers API returned ${res.status}`);
        }

        const json = await res.json();
        console.log("📋 Papers response:", {
          papersCount: Array.isArray(json.papers) ? json.papers.length : 0,
          totalPages: json.totalPages,
          currentPage: json.currentPage,
          sort: urlState.sortOpt,
        });

        setPapers(Array.isArray(json.papers) ? json.papers : []);
        setTotalPages(
          typeof json.totalPages === "number" ? json.totalPages : 1,
        );
      } catch (err) {
        console.error("💥 Failed to load papers:", err);
        setPapers([]);
        setTotalPages(1);
      } finally {
        setLoadingPapers(false);
      }
    };

    fetchPapers();
  }, [urlState, loadingProfile, tokenLoaded]);

  // ── Fetch all papers for stats (only once)
  useEffect(() => {
    const fetchAllPapers = async () => {
      if (loadingProfile || !tokenLoaded) return;

      console.log("🔍 Fetching all papers for stats...");
      setLoadingAllPapers(true);

      try {
        let allPapersData: any[] = [];
        let page = 1;
        let totalPagesCount = 1;

        do {
          const res = await fetch(`/api/papers?page=${page}&sort=recent`, {
            cache: "no-store",
          });

          if (!res.ok) {
            throw new Error(
              `Papers API returned ${res.status} for page ${page}`,
            );
          }

          const json = await res.json();
          const pagePapers = Array.isArray(json.papers) ? json.papers : [];
          allPapersData.push(...pagePapers);
          totalPagesCount =
            typeof json.totalPages === "number" ? json.totalPages : 1;

          console.log(`📋 Stats page ${page}: ${pagePapers.length} papers`);
          page += 1;
        } while (page <= totalPagesCount);

        console.log(`✅ Loaded ${allPapersData.length} total papers for stats`);
        setAllPapers(allPapersData);
      } catch (err) {
        console.error("💥 Failed to load all papers for stats:", err);
        setAllPapers([]);
      } finally {
        setLoadingAllPapers(false);
      }
    };

    fetchAllPapers();
  }, [loadingProfile, tokenLoaded]);

  // ── Filter handlers (update local state only)
  const toggleDepartment = (dept: string) => {
    console.log("🔄 Toggling department:", dept);
    setLocalFilters((prev) => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept],
    }));
  };

  const toggleCourse = (course: string) => {
    console.log("🔄 Toggling course:", course);
    setLocalFilters((prev) => ({
      ...prev,
      courses: prev.courses.includes(course)
        ? prev.courses.filter((c) => c !== course)
        : [...prev.courses, course],
    }));
  };

  const handleSortChange = (val: string) => {
    console.log("🔄 Sort changed to:", val);
    setLocalFilters((prev) => ({ ...prev, sortOpt: val }));
  };

  // ── Apply filters: update URL (reset to page 1)
  const applyFilters = () => {
    console.log("✅ Applying filters:", localFilters);

    const qp = new URLSearchParams();

    if (localFilters.departments.length) {
      qp.set("department", localFilters.departments.join(","));
    }
    if (localFilters.courses.length) {
      qp.set("course", localFilters.courses.join(","));
    }
    if (localFilters.sortOpt && localFilters.sortOpt !== "recent") {
      qp.set("sort", localFilters.sortOpt);
    }
    // Always reset to page 1 when applying filters
    // Don't set page=1 in URL, just omit it (cleaner URLs)

    const newUrl = `${pathname}${qp.toString() ? `?${qp.toString()}` : ""}`;
    console.log("📤 Applying filters, navigating to:", newUrl);
    router.replace(newUrl, { scroll: false });
  };

  // ── Clear all filters
  const clearAllFilters = () => {
    console.log("🗑️ Clearing all filters");
    setLocalFilters({
      departments: [],
      courses: [],
      sortOpt: "recent",
    });
    router.replace(pathname, { scroll: false });
  };

  // ── Pagination handler
  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    console.log("📄 Going to page:", newPage);

    const qp = new URLSearchParams();

    // Preserve current filters
    if (urlState.departments.length) {
      qp.set("department", urlState.departments.join(","));
    }
    if (urlState.courses.length) {
      qp.set("course", urlState.courses.join(","));
    }
    if (urlState.sortOpt && urlState.sortOpt !== "recent") {
      qp.set("sort", urlState.sortOpt);
    }

    // Only add page if not page 1 (cleaner URLs)
    if (newPage > 1) {
      qp.set("page", String(newPage));
    }

    const newUrl = `${pathname}${qp.toString() ? `?${qp.toString()}` : ""}`;
    console.log("📤 Pagination, navigating to:", newUrl);
    router.replace(newUrl, { scroll: false });
  };

  // ── Loading states
  if (loadingProfile || !tokenLoaded) {
    return <ProfileLoader />;
  }

  if (!profile) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl mb-4">Profile Loading Failed</h1>
        <p className="text-gray-600">
          Unable to load profile. You may not have access to this page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-gold px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // ── PDF download link (use URL state, not local filters)
  const pdfParams = new URLSearchParams();
  if (urlState.departments.length) {
    pdfParams.set("department", urlState.departments.join(","));
  }
  if (urlState.courses.length) {
    pdfParams.set("course", urlState.courses.join(","));
  }
  if (urlState.sortOpt && urlState.sortOpt !== "recent") {
    pdfParams.set("sort", urlState.sortOpt);
  }

  const previewHref = `/admin/papers-preview-pdf?${pdfParams.toString()}`;

  return (
    <div>
      <AdminNavBar/>

     {/* <ProfileCard/> */}
     {profile ? (
        <ProfileCard
          profile_picture={profile?.users?.profile_picture || avatar}
          name={`${profile.users.first_name} ${profile.users.last_name}`}
          number={profile.employee_id}
          position={profile.position}
          college={profile.college}
          programOrDept={profile.programOrDept}
        />
      ) : (
        <div>Failed to load profile.</div>
      )}
      <main className="flex flex-col dark:bg-secondary px-8 md:px-40 h-full">
        <StatsSection allPapers={allPapers} loading={loadingAllPapers} />
        
        <FilterBar
          departments={localFilters.departments}
          courses={localFilters.courses}
          sortOpt={localFilters.sortOpt}
          onToggleDepartment={toggleDepartment}
          onToggleCourse={toggleCourse}
          onSortChange={handleSortChange}
          onApplyFilters={applyFilters}
          onClearFilters={clearAllFilters}
          theme={theme}
          downloadComponent={
            <a href={previewHref} target="_blank" rel="noopener noreferrer">
              <button className="bg-gold p-2 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer">
                <p className="hidden md:block">Download</p>
              </button>
            </a>
          }
        />

        <div
          className={`flex flex-col gap-4 p-2 md:p-4 border-2 border-white-5 bg-white-100 rounded-3xl mt-4 mb-4 ${
            theme === "light" ? "border-white-50" : "border-white-5"
          }`}
        >
          <PapersList papers={papers} loading={loadingPapers} theme={theme} />

          <div
            className={`bg-dusk h-0.5 w-auto my-2 mx-4 ${
              theme === "light" ? "bg-white-50" : "bg-white-5"
            }`}
          />

          <PaginationControls
            currentPage={urlState.currentPage}
            totalPages={totalPages}
            onChangePage={goToPage}
          />
        </div>
      </main>

      {/* Debug Panel */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded text-xs max-w-sm">
          <h4 className="font-bold mb-2">Debug Info:</h4>
          <p>Profile: {profile ? "✅" : "❌"}</p>
          <p>Token Loaded: {tokenLoaded ? "✅" : "❌"}</p>
          <p>
            Papers: {papers.length} | Page: {urlState.currentPage}/{totalPages}
          </p>
          <p>All Papers: {allPapers.length}</p>
          <p>Sort: {urlState.sortOpt}</p>
          <p>
            URL Filters: D:{urlState.departments.length} C:
            {urlState.courses.length}
          </p>
          <p>
            Local Filters: D:{localFilters.departments.length} C:
            {localFilters.courses.length}
          </p>
          <p>
            Loading: P:{loadingPapers ? "⏳" : "✅"} A:
            {loadingAllPapers ? "⏳" : "✅"}
          </p>
          <p>
            Filters Match:{" "}
            {JSON.stringify(urlState.departments) ===
            JSON.stringify(localFilters.departments)
              ? "✅"
              : "❌"}
          </p>
        </div>
      )}
    </div>
  );
}

// Loading component for Suspense fallback
function ProfilePageLoading() {
  return <ProfileLoader />;
}

// Main component with Suspense wrapper
export default function AdminProfilePageClient() {
  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <AdminProfileContent />
    </Suspense>
  );
}