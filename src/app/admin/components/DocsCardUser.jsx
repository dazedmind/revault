"use client";
import React from 'react'
import DocsLoader from "../../component/DocsLoader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaBookOpen, FaPen } from "react-icons/fa";
import { Archive, Eye, PencilLine } from "lucide-react";

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
    
      const truncateText = (text, maxWords = 40) => {
        if (!text) return "No description available";
        const words = text.split(" ");
        if (words.length > maxWords) {
          return words.slice(0, maxWords).join(" ") + "...";
        }
        return text;
      };

      const truncateAuthor = (text, maxWords = 24) => {
        if (!text) return "No description available";
        const words = text.split(" ");
        if (words.length > maxWords) {
          return words.slice(0, maxWords).join(" ") + "...";
        }
        return text;
      };

      if (loading) {
        return <DocsLoader message="Loading Recent Papers" />;
      }
    return (
    <div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
              <div className="flex items-start  gap-4">
                <div className="md:w-40">
                  <a href={props.link}>
                    <Image
                      src={props.img}
                      alt="Project"
                      className="hidden md:flex w-full h-full"
                    />
                  </a>
                </div>

                <div className="w-full">
                  {/* <Image src={document} alt="document" className="w-24" /> */}
                  <span className="flex flex-col">
                    <h1 className="text-xl font-bold mb-2">
                      {props.title}
                    </h1>

                    <p className="text-sm italic">
                      {truncateAuthor(props.author)}
                    </p>

                    <p className="hidden md:block text-sm py-2 line-clamp-4 text-justify dark:text-card">
                      {truncateText(props.abstract)}
                    </p>
                    
                    <span className="flex gap-2 py-2 md:py-0">
                      <p className="px-3 py-1 bg-teal/10 text-teal rounded-md text-sm">
                        {props.department}
                      </p>
                      <p className="px-3 py-1 bg-teal/10 text-teal rounded-md text-sm">
                        {props.year}
                      </p>
                    </span>
                  </span>
                </div>
              </div>

              <span className="flex md:flex-col gap-2 w-full md:w-auto">
                <button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br px-4 py-3 flex items-center justify-center gap-2 rounded-lg cursor-pointer text-md flex-1 md:flex-none">
                  {" "}
                  <Eye /> 
                </button>
                <button className="flex items-center justify-center gap-2 bg-white-5 rounded-md px-4 py-3 text-md cursor-pointer flex-1 md:flex-none">
                  <Archive />
                </button>
                <button className="flex items-center justify-center gap-2 bg-dusk rounded-md px-4 py-3 text-md cursor-pointer flex-1 md:flex-none">
                  <PencilLine /> 
                </button>
              </span>
            </div>
            
    </div>
  )
}

export default DocsCardUser