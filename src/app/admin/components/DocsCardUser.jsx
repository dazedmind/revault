"use client";
import React from 'react'
import DocsLoader from "../../component/DocsLoader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaBookOpen, FaTrash, FaPen } from "react-icons/fa";
import document from "@/public/document.png";

const DocsCardUser = (props) => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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
                paper_id: paper.paper_id,
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
    
      if (loading) {
        return <DocsLoader message="Loading Recent Papers" />;
      }
    return (
    <div>
        <div className="flex justify-between gap-4 p-4">
              <div className="flex gap-4">
                <Image src={document} alt="document" className="w-24" />
                <span>
                  <h1 className="text-xl font-bold">
                    {props.title}
                  </h1>
                  <p className="text-sm">
                    {props.abstract}
                  </p>
                  <p className="text-sm mt-2 text-gray-600">
                    {props.author}
                  </p>
                </span>
              </div>

              <span className="flex items-center gap-2">
                <button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br p-4 flex items-center rounded-lg cursor-pointer text-2xl">
                  {" "}
                  <FaBookOpen />{" "}
                </button>
                <button className="bg-red-warning rounded-md p-4 text-2xl cursor-pointer">
                  {" "}
                  <FaTrash />{" "}
                </button>
                <button className="bg-dusk rounded-md p-4 text-2xl cursor-pointer">
                  {" "}
                  <FaPen />{" "}
                </button>
              </span>
            </div>
    </div>
  )
}

export default DocsCardUser