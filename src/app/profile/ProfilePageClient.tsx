// File: /app/profile/ProfilePageClient.tsx
"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import { ProfileCard } from "../component/ProfileCard";
import document from "../img/document.png";
import noBookmarks from "../img/bird.png";
import DocsCard from "../component/DocsCard";
import ProtectedRoute from "../component/ProtectedRoute";
import LoadingScreen from "../component/LoadingScreen";
import avatar from "../img/user.png";
import Image from "next/image";

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

export default function ProfilePageClient() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const { token, isLoaded: tokenLoaded } = useAuthToken();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!tokenLoaded) return;
      
      if (!token) return;

      try {
        const res = await fetch("/api/profile", {
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

    const fetchBookmarks = async () => {
      if (!tokenLoaded) return;
      
      if (!token) return;

      try {
        const res = await fetch("/api/get-bookmark", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setBookmarks(
          data.map((paper) => ({
            ...paper,
            title: paper.title.replace(/"/g, ""),
            author: paper.author.replace(/"/g, ""),
            department: paper.department.replace(/"/g, ""), 
            year: String(paper.year).replace(/"/g, ""),
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
        if (!res.ok) {
          console.error(
            "Failed to fetch bookmarks:",
            data?.error || res.statusText,
          );
          return;
        }
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    fetchBookmarks();
  }, [token, tokenLoaded]);

  if (loading || !tokenLoaded) return <LoadingScreen />;

  return (
    <div>
      <ProtectedRoute>
        <NavBar />

        {/* <ProfileCard/> */}
        {profile ? (
          <ProfileCard
            name={`${profile.users.first_name} ${profile.users.last_name}`}
            profile_picture={profile.users.profile_picture || avatar}
            number={
              profile.role === "STUDENT"
                ? profile.student_num
                : profile.employee_id
            }
            college={profile.college}
            position={profile.position}
            programOrDept={
              profile.role === "STUDENT" ? profile.program : profile.department
            }
          />
        ) : (
          <div>Failed to load profile.</div>
        )}

        <main className="dark:bg-secondary h-fit-content">
          <div className="flex flex-col gap-5 md:mx-24 align-middle">
            <div className="flex flex-col w-full gap-5 my-6 align-middle p-8">
              <div className="flex flex-row justify-between align-middle items-center">
                <h1 className="text-3xl font-bold">My Bookmarks</h1>
              </div>
              {bookmarks.length > 0 ? (
                bookmarks.map((paper, idx) => (
                  <DocsCard
                    key={idx}
                    paper_id={paper.paper_id}
                    img={document} // or paper.image_url if available
                    title={paper.title}
                    author={paper.author}
                    department={paper.department}
                    year={paper.year}
                    description={paper.abstract || "No abstract available"}
                    tags={paper.tags || []}
                    savedFromProfile={true}
                  />
                ))
              ) : (
                <>
                  <div className="flex flex-col justify-center items-center my-15">
                    <Image src={noBookmarks} alt="No bookmarks yet" className="w-40 h-40" />
                    <p className="text-center text-xl mt-5">No bookmarks yet.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </ProtectedRoute>
    </div>
  );
}