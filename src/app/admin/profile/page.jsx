"use client";
import React from "react";
import AdminNavBar from "../components/AdminNavBar";
import { ProfileCard } from "../../component/ProfileCard";
import { SearchInput } from "../../component/SearchInput";
import avatar from "../../img/user.png";
import { FaPlus, FaFilter, FaMagnifyingGlass } from "react-icons/fa6";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import DocsCardUser from "../components/DocsCardUser";
import document from "../../img/document.png";
import StatsCard from "../components/StatsCard";
import { useTheme } from 'next-themes'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function AdminProfile() {
  const { theme } = useTheme()
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null);
  const [papers, setPapers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await fetch("/admin/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json(); // <-- move this here regardless of res.ok

        if (!res.ok) {
          console.error(
            "Failed to fetch profile:",
            data?.error || res.statusText,
          );
          return;
        }

        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    async function init() {
      // 1. Auth check (simplified)
      const token = localStorage.getItem("authToken");
      if (!token) {
        return router.push("/login");
      }
      // you can re-use your decode(token) here…

      // 2. Fetch recent papers
      console.log("▶️ fetching /api/recent");
      try {
        const res = await fetch("/api/recent", { cache: "no-store" });
        if (!res.ok) {
          const text = await res.text();
          console.error("raw /api/recent response:", text);
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setPapers(
          data.map((paper) => ({
            ...paper,
            title: paper.title.replace(/"/g, ""),
            author: paper.author.replace(/"/g, ""),
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
            abstract: paper.abstract.replace(/"/g, ""),
          })),
        );
      } catch (err) {
        console.error("failed to load papers:", err);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [router]);

  if (loading) return <div>Loading profile...</div>;

  return (
    <div>
      <AdminNavBar />

      {/* <ProfileCard/> */}
      {profile ? (
        <ProfileCard
          profile_picture={profile?.users?.profile_picture || avatar}
          name={`${profile.users.first_name} ${profile.users.last_name}`}
          number={profile.employee_id}
          position={profile.position}
        />
      ) : (
        <div>Failed to load profile.</div>
      )}

      <main className="flex flex-col dark:bg-secondary px-4 md:px-40 h-full">
        <Carousel className="md:hidden p-5 mb-5">
          <h1 className="text-2xl font-bold mb-4">Usage Statistics</h1>
          <CarouselContent>
            <CarouselItem>
              <StatsCard  
                department="Information Technology" 
                description="Total Number of Papers" 
                totalPapers={120} 
                />
            </CarouselItem>
            <CarouselItem>
              <StatsCard 
                department="Computer Science" 
                description="Total Number of Papers" 
                totalPapers={134} 
                />
            </CarouselItem>
            <CarouselItem>
              <StatsCard 
                department="Usage Statistics" 
                description="Total Number of Users" 
                totalPapers={134} 
                />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="hidden md:flex flex-col mx-auto md:mx-0 md:flex-row gap-4 my-10 ">
            <StatsCard 
              department="Usage Statistics" 
              description="Total Number of Users" 
              totalPapers={134} 
            />
            <StatsCard 
              department="Usage Statistics" 
              description="Total Number of Users" 
              totalPapers={134} 
            />

            <StatsCard 
              department="Usage Statistics" 
              description="Total Number of Users" 
              totalPapers={134} 
            />
        </div>

        <div className="">
          <h1 className="text-2xl font-bold mb-4">Manage Published Papers</h1>

          {/* Published Paper Controls */}
          <div className="flex justify-between ">
            <div className="flex gap-4">
              <SearchInput placeholder="Search paper" />
              <button className="bg-gold p-2 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer">
                <FaMagnifyingGlass /> 
                <p className="hidden md:block">Search</p>
              </button>
              
                {/* Filter */}
                <Popover>
                  <PopoverTrigger className="flex items-center gap-2 cursor-pointer">
                    Filter <FaFilter />
                  </PopoverTrigger>
                  <PopoverContent className={`${theme === "light" ? "bg-accent border-white-50" : "bg-dusk border-white-5"}`} align="start">
                              <Select>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="title-asc">
                                      Paper Title (A-Z)
                                    </SelectItem>
                                    <SelectItem value="title-des">
                                      Paper Title (Z-A)
                                    </SelectItem>
                                    <SelectItem value="year-recent">
                                      Publish Year (Most recent)
                                    </SelectItem>
                                    <SelectItem value="year-oldest">
                                      Publish Year (Oldest)
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>

                              {/* divider */}
                              <div className="bg-dusk h-0.5 w-auto mb-2 mt-2 mx-1"></div>

                              <p className="text-lg">Department</p>
                              <ul className="ml-1 flex flex-col gap-1">
                                <li>
                                  <Checkbox id="it-courses" />
                                  <label htmlFor="it-courses">
                                    {" "}
                                    Information Technology
                                  </label>
                                </li>
                                <li>
                                  <Checkbox id="cs-courses" />
                                  <label htmlFor="cs-courses"> Computer Science</label>
                                </li>
                              </ul>
                              {/* divider */}
                              <div className="bg-dusk h-0.5 w-auto mb-2 mt-2 mx-2"></div>

                              <p className="text-lg">Course</p>
                              <ul className="ml-1 flex flex-col gap-1">
                                <li>
                                  <Checkbox id="it-courses" />
                                  <label htmlFor="it-courses"> SIA</label>
                                </li>
                                <li>
                                  <Checkbox id="cs-courses" />
                                  <label htmlFor="cs-courses"> Capstone</label>
                                </li>
                                <li>
                                  <Checkbox id="cs-courses" />
                                  <label htmlFor="cs-courses"> CS Thesis Writing</label>
                                </li>
                                <li>
                                  <Checkbox id="cs-courses" />
                                  <label htmlFor="cs-courses"> Research Writing</label>
                                </li>
                              </ul>
                              <span className="flex gap-2">
                                <button className={`${theme === "light" ? "bg-white-50" : "bg-white-5"} p-2 mt-3 w-full rounded-sm cursor-pointer`}>
                                  Clear Filters
                                </button>
                                <button className="bg-gold p-2 mt-3 w-full rounded-sm cursor-pointer">
                                  Apply Filters
                                </button>
                              </span>
                            </PopoverContent>
                  </Popover>
            </div>

            {/* Upload Paper Button */}
            <button className="hidden md:flex bg-gradient-to-r from-gold to-gold-fg hover:brightness-120 transition-all duration-300 p-2 px-4 font-sans items-center gap-2 rounded-lg cursor-pointer">
              <FaPlus /> <p className="hidden md:block">Upload Paper</p>
            </button>
          </div>

          <div className={`p-2 md:p-4 border-2 border-white-5 bg-white-100 rounded-xl mt-4 mb-4 ${theme == "light" ? "border-white-50" : "border-white-5"}`}>
          {papers.length > 0 ? (
            papers.map((paper, index) => (
              <React.Fragment key={paper.paper_id}>
                <DocsCardUser
                  img={document}
                  title={paper.title || "Untitled"}
                  abstract={paper.abstract || "No abstract available"}
                  author={paper.author || "No author available"}
                  department={paper.department || "No department available"}
                  year={paper.year || "No year available"}
                  paper_id={paper.paper_id}
                />
                {index < papers.length - 1 && (
                  <div className={`bg-dusk h-0.5 w-auto mb-2 mt-2 mx-4 ${theme == "light" ? "bg-white-50" : "bg-white-5"}`}></div>
                )}
              </React.Fragment>
            ))
          ) : (
            <p>No papers found.</p>
          )}

            {/* divider */}
            <div className={`bg-dusk h-0.5 w-auto mb-2 mt-2 mx-4 ${theme == "light" ? "bg-white-50" : "bg-white-5"}`}></div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
    </div>
  );
}
