// File: /app/admin/profile/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

import { FilterBar } from "../components/FilterBar";
import { PapersList } from "../components/PapersList";
import { PaginationControls } from "../components/PaginationControls";
import { ProfileHeader } from "../components/ProfileHeader";
import { StatsSection } from "../components/StatsSection";

export default function AdminProfilePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useTheme();

  // ── Filter & Sort UI State (mirrors URL)
  const [departments, setDepartments] = useState<string[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [sortOpt, setSortOpt] = useState<string>("");

  // ── Pagination State
  const rawPageParam = searchParams.get("page");
  const initialPage = rawPageParam ? parseInt(rawPageParam, 10) || 1 : 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // ── Paged Results for display
  const [papers, setPapers] = useState<any[]>([]);
  const [loadingPapers, setLoadingPapers] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);

  // ── All Papers for Stats
  const [allPapers, setAllPapers] = useState<any[]>([]);
  const [loadingAllPapers, setLoadingAllPapers] = useState<boolean>(true);

  // ── Profile/Auth
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  // ── Sync filter/sort/page from URL → local state
  useEffect(() => {
    const depsParam = searchParams.get("department");
    const depsArray = depsParam?.split(",").filter(Boolean) || [];
    setDepartments(depsArray);

    const crsParam = searchParams.get("course");
    const crsArray = crsParam?.split(",").filter(Boolean) || [];
    setCourses(crsArray);

    const sParam = searchParams.get("sort") || "";
    setSortOpt(sParam);

    const p = rawPageParam ? parseInt(rawPageParam, 10) : 1;
    setCurrentPage(isNaN(p) || p < 1 ? 1 : p);
  }, [searchParams, rawPageParam]);

  // ── Fetch profile & role check (same as before) ────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoadingProfile(false);
        router.push("/login");
        return;
      }
      try {
        const res = await fetch("/admin/api/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setLoadingProfile(false);
          return;
        }
        if (data.users.role !== "librarian") {
          router.replace("/");
          return;
        }
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [router]);

  // ── Fetch 1 page of /api/papers?… (as before) ──────────────────────────────
  useEffect(() => {
    const fetchPaged = async () => {
      setLoadingPapers(true);
      const qp = new URLSearchParams();
      if (searchParams.get("department")) {
        qp.set("department", searchParams.get("department")!);
      }
      if (searchParams.get("course")) {
        qp.set("course", searchParams.get("course")!);
      }
      if (searchParams.get("sort")) {
        qp.set("sort", searchParams.get("sort")!);
      }
      qp.set("page", String(currentPage));

      try {
        const res = await fetch(`/api/papers?${qp.toString()}`, {
          cache: "no-store",
        });
        const json = await res.json();
        setPapers(Array.isArray(json.papers) ? json.papers : []);
        setTotalPages(
          typeof json.totalPages === "number" ? json.totalPages : 1,
        );
      } catch (err) {
        console.error("failed to load paged papers:", err);
        setPapers([]);
        setTotalPages(1);
      } finally {
        setLoadingPapers(false);
      }
    };

    if (!loadingProfile && profile) {
      fetchPaged();
    }
  }, [searchParams, currentPage, loadingProfile, profile]);

  // ── Fetch all papers once (for StatsSection) ───────────────────────────────
  useEffect(() => {
    const fetchAll = async () => {
      setLoadingAllPapers(true);
      let accumulated: any[] = [];
      let page = 1;
      let pages = 1;

      try {
        do {
          const res = await fetch(`/api/papers?page=${page}`, {
            cache: "no-store",
          });
          const json = await res.json();
          accumulated.push(...(Array.isArray(json.papers) ? json.papers : []));
          pages = typeof json.totalPages === "number" ? json.totalPages : 1;
          page += 1;
        } while (page <= pages);

        setAllPapers(accumulated);
      } catch (err) {
        console.error("failed to load all papers for stats:", err);
        setAllPapers([]);
      } finally {
        setLoadingAllPapers(false);
      }
    };

    if (!loadingProfile && profile) {
      fetchAll();
    }
  }, [loadingProfile, profile]);

  // ── Handlers: toggle local filter state (before “Apply”) ────────────────
  const toggleDepartment = (dept: string) => {
    setDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept],
    );
  };
  const toggleCourse = (course: string) => {
    setCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course],
    );
  };
  const handleSortChange = (val: string) => {
    setSortOpt(val);
  };

  // ── Apply Filters: overwrite URL (reset page=1) ──────────────────────────
  const applyFilters = () => {
    const qp = new URLSearchParams();
    if (departments.length) qp.set("department", departments.join(","));
    if (courses.length) qp.set("course", courses.join(","));
    if (sortOpt) qp.set("sort", sortOpt);
    qp.set("page", "1");

    router.replace(`${pathname}?${qp.toString()}`, { scroll: false });
  };

  // ── Clear Filters completely ⟶ clear URL entirely ───────────────────────
  const clearAllFilters = () => {
    setDepartments([]);
    setCourses([]);
    setSortOpt("");
    router.replace(pathname, { scroll: false });
  };

  // ── Pagination: adjust only ?page= ─────────────────────────────────────
  const goToPage = (newPage: number) => {
    if (newPage < 1) newPage = 1;
    if (newPage > totalPages) newPage = totalPages;

    const qp = new URLSearchParams(Object.fromEntries(searchParams.entries()));
    if (newPage === 1) {
      qp.delete("page");
    } else {
      qp.set("page", String(newPage));
    }
    router.replace(`${pathname}?${qp.toString()}`, { scroll: false });
  };

  if (loadingProfile) {
    return <ProfileHeader profile={null} loading={true} />;
  }
  if (!profile) {
    return <div className="p-8 text-center">Unable to load profile.</div>;
  }

  // ── Build “preview PDF” link (omit page= so backend returns all matches) ──
  const pdfParams = new URLSearchParams();
  if (departments.length) pdfParams.set("department", departments.join(","));
  if (courses.length) pdfParams.set("course", courses.join(","));
  if (sortOpt) pdfParams.set("sort", sortOpt);
  // intentionally do NOT append “page” here

  const previewHref = `/admin/papers-preview-pdf?${pdfParams.toString()}`;

  return (
    <div>
      <ProfileHeader profile={profile} loading={false} />

      <main className="flex flex-col dark:bg-secondary px-8 md:px-40 h-full">
        <StatsSection allPapers={allPapers} />

        <FilterBar
          departments={departments}
          courses={courses}
          sortOpt={sortOpt}
          onToggleDepartment={toggleDepartment}
          onToggleCourse={toggleCourse}
          onSortChange={handleSortChange}
          onApplyFilters={applyFilters}
          onClearFilters={clearAllFilters}
          theme={theme}
          downloadComponent={
            <a href={previewHref} target="__blank">
              <button
                className="bg-gold p-2 px-4 font-sans flex items-center 
            gap-2 rounded-lg cursor-pointer"
              >
                <p className="hidden md:block">Download</p>
              </button>
            </a>
          }
        />

        <div
          className={`p-2 md:p-4 border-2 border-white-5 bg-white-100 rounded-xl mt-4 mb-4 ${
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
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={goToPage}
          />
        </div>
      </main>
    </div>
  );
}
