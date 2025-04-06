import React from "react";
import DocsCard from "../component/DocsCard";
import { SearchInput } from "../component/SearchInput";
import NavBar from "../component/NavBar";
import document from "../img/document.png";
import Image from "next/image";
import { fetchPosts } from '@/lib/api';
import { Checkbox } from "@/components/ui/checkbox";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import AdminNavBar from "../component/AdminNavBar";

export default async function Home() {
  const data = await fetchPosts(1, 5);
  
  return (
    <div className="font-[family-name:'Inter'] bg-midnight">
      <NavBar/>

      <main className="flex flex-row">
        <aside className="flex h-auto w-96 bg-darker p-8">

          <div className="flex flex-col gap-4 m-2">
          <h1 className="text-2xl font-bold">Filter Results</h1>

            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-teal">Program</h2>
              <div className="bg-dusk h-0.5 w-full"></div>

              <ul className="ml-2 flex flex-col gap-2">
                <li>
                <Checkbox id="it-courses"/>
                <label htmlFor="it-courses"> Information Technology</label>
                </li>
                <li>
                <Checkbox id="cs-courses"/>
                <label htmlFor="cs-courses"> Computer Science</label>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-teal">Publication Date</h2>
              <div className="bg-dusk h-0.5 w-full"></div>
              <ul className="ml-2 flex flex-col gap-2">
                <li>
                  <Checkbox id="year-2025"/>
                  <label htmlFor="year-2025"> 2025</label>
                </li>
                <li>
                  <Checkbox id="year-2024"/>
                  <label htmlFor="year-2024"> 2024</label>
                </li>
                <li>Custom range...</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-teal">Course</h1>
              <div className="bg-dusk h-0.5 w-full"></div>
              <ul className="ml-2 flex flex-col gap-2">
              <li>
                  <Checkbox id="sia-course"/>
                  <label htmlFor="sia-course"> SIA</label>
                </li>
                <li>
                  <Checkbox id="capstone-course"/>
                  <label htmlFor="capstone-course"> Capstone</label>
                </li>  <li>
                  <Checkbox id="research-course"/>
                  <label htmlFor="research-course"> Research Writing</label>
                </li>  <li>
                  <Checkbox id="thesiswriting-course"/>
                  <label htmlFor="thesiswriting-course"> CS Thesis Writing</label>
                </li>
              </ul>
            </div>
            
            <button className="bg-teal p-2 rounded-md mt-4 cursor-pointer">Apply Filter</button>
          </div>
        </aside>

        <div className="flex flex-col w-full gap-5 mx-12 my-2 align-middle bg-midnight p-8">
          <h1 className="text-3xl font-bold">Recent Papers</h1>
            <DocsCard
              img={document}
              title="ReVault: Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students" 
              description="Traditional systems for archiving research-based works rely on physical documentation or unstructured digital repositories, leading to inefficiencies in version tracking, categorization, and retrieval "
              tags={["IT", "SIA", "Cloud"]}
            />
            
            <DocsCard 
              img={document}
              title="ReVault: Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students" 
              description="Traditional systems for archiving research-based works rely on physical documentation or unstructured digital repositories, leading to inefficiencies in version tracking, categorization, and retrieval "
              tags={["CS", "Research Writing", "Algorithms"]}
            />

            <DocsCard 
              img={document}
              title="ReVault: Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students" 
              description="Traditional systems for archiving research-based works rely on physical documentation or unstructured digital repositories, leading to inefficiencies in version tracking, categorization, and retrieval "
              tags={["IT", "Design", "UI/UX"]}
            />
            
            <DocsCard 
              img={document}
              title="ReVault: Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students" 
              description="Traditional systems for archiving research-based works rely on physical documentation or unstructured digital repositories, leading to inefficiencies in version tracking, categorization, and retrieval "
              tags={["IT", "Design", "UI/UX"]}
            />

            <DocsCard 
              img={document}
              title="ReVault: Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students" 
              description="Traditional systems for archiving research-based works rely on physical documentation or unstructured digital repositories, leading to inefficiencies in version tracking, categorization, and retrieval "
              tags={["IT", "Design", "UI/UX"]}
            />

          <div className="flex flex-col justify-between gap-4">
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
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
      </main>

    </div>
  );
}
