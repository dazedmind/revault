'use client'
import React from 'react'
import AdminNavBar from '../components/AdminNavBar'
import { ProfileCard } from '../../component/ProfileCard'
import { SearchInput } from "../../component/SearchInput"
import Image from 'next/image'
import document from "../../img/document.png"
import { FaTrash, FaPen, FaBookOpen, FaPlus, FaFilter, FaMagnifyingGlass } from 'react-icons/fa6'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from 'react';
import { RadioGroup } from '@radix-ui/react-dropdown-menu'
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

  export default function AdminProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchProfile = async () => {
  
        const token = localStorage.getItem('authToken');
        if (!token) return;
    
        try {
          const res = await fetch('/admin/api/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json(); // <-- move this here regardless of res.ok
  
          if (!res.ok) {
            console.error("Failed to fetch profile:", data?.error || res.statusText);
            return;
          }
    
          setProfile(data);
        } catch (err) {
          console.error('Error fetching profile:', err);
        } finally {
          setLoading(false);
        }
      };
    
      fetchProfile();
    }, []);
    
    if (loading) return <div>Loading profile...</div>;
  
  return (
    <div>
        <AdminNavBar/>

      {/* <ProfileCard/> */}
      {profile ? (
          <ProfileCard
            name={`${profile.users.first_name} ${profile.users.last_name}`}
            number={profile.employee_id}
            position={profile.position}
          />
        ) : (
          <div>Failed to load profile.</div>
        )}


        <main className='flex flex-col px-40 bg-midnight h-full'>
            <div className='flex gap-4 my-10'>
                <div className=' bg-dusk border-2 border-white-5 p-4 w-82 rounded-md'>
                    <p className='font-bold text-xl'>Information Technology</p>
                    <p>Total No. of Papers</p>
                    <p className='font-bold text-5xl mt-2'>120</p>
                </div>

                <div className='bg-dusk border-2 border-white-5 p-4 w-82 rounded-md'>
                    <p className='font-bold text-xl'>Computer Science</p>
                    <p>Total No. of Papers</p>
                    <p className='font-bold text-5xl mt-2'>134</p>
                </div>
            </div>
            
            <div>
                <h1 className='text-2xl font-bold mb-4'>Manage Published Papers</h1>
                
                {/* Published Paper Controls */}
                <div className='flex justify-between'>
                    <div className='flex gap-4'>
                        <SearchInput placeholder="Search paper"/>
                        <button className="bg-teal p-2 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer">
                            <FaMagnifyingGlass /> Search
                        </button>       
                        {/* Filter */}
                        <Popover>
                            <PopoverTrigger className="cursor-pointer flex items-center gap-2">Filter <FaFilter /></PopoverTrigger>
                            <PopoverContent className='bg-dark' align='start'>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sort by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="title-asc">Paper Title (A-Z)</SelectItem>
                                            <SelectItem value="title-des">Paper Title (Z-A)</SelectItem>
                                            <SelectItem value="year-recent">Publish Year (Most recent)</SelectItem>
                                            <SelectItem value="year-oldest">Publish Year (Oldest)</SelectItem>
                                        </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    {/* divider */}
                                    <div className="bg-dusk h-0.5 w-auto mb-2 mt-2 mx-1"></div>

                                <p className='text-lg'>Department</p>
                                    <ul className="ml-1 flex flex-col gap-1">
                                        <li>
                                        <Checkbox id="it-courses"/>
                                        <label htmlFor="it-courses"> Information Technology</label>
                                        </li>
                                        <li>
                                        <Checkbox id="cs-courses"/>
                                        <label htmlFor="cs-courses"> Computer Science</label>
                                        </li>
                                    </ul>
                                    {/* divider */}
                                    <div className="bg-dusk h-0.5 w-auto mb-2 mt-2 mx-2"></div>

                                <p className='text-lg'>Course</p>
                                    <ul className="ml-1 flex flex-col gap-1">
                                        <li>
                                        <Checkbox id="it-courses"/>
                                        <label htmlFor="it-courses"> SIA</label>
                                        </li>
                                        <li>
                                        <Checkbox id="cs-courses"/>
                                        <label htmlFor="cs-courses"> Capstone</label>
                                        </li>
                                        <li>
                                        <Checkbox id="cs-courses"/>
                                        <label htmlFor="cs-courses"> CS Thesis Writing</label>
                                        </li>
                                        <li>
                                        <Checkbox id="cs-courses"/>
                                        <label htmlFor="cs-courses"> Research Writing</label>
                                        </li>
                                    </ul>
                            <span className='flex gap-2'>
                                <button className="bg-dusk p-2 mt-3 w-full rounded-sm cursor-pointer">Clear Filters</button>
                                <button className="bg-teal p-2 mt-3 w-full rounded-sm cursor-pointer">Apply Filters</button>
                            </span>
                    

                            </PopoverContent>
                        </Popover>
                    </div>
   

                    {/* Upload Paper Button */}
                    <button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br p-2 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer">
                        <FaPlus /> Upload Paper
                    </button>                    
                </div>
                
                <div className='p-2 border-2 border-white-5 bg-darker rounded-md mt-4 mb-4'>
                    <div className='flex justify-between gap-4 p-4'>
                        <div className='flex gap-4'>
                            <Image src={document} alt="document" className='w-24' />
                            <span>
                                <h1 className='text-xl font-bold'>ReVault: A Version-Controlled Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students</h1>
                                <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit ex imperdiet, tristique erat non, luctus justo. In at facilisis metus. Donec volutpat nisi magna, sit amet dignissim neque imperdiet sit amet.</p>   
                            </span>
                        </div>
            

                        <span className='flex items-center gap-2'>
                            <button className='bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br p-4 flex items-center rounded-lg cursor-pointer text-2xl'> <FaBookOpen/> </button>
                            <button className='bg-red-warning rounded-md p-4 text-2xl cursor-pointer'> <FaTrash /> </button>
                            <button className='bg-dusk rounded-md p-4 text-2xl cursor-pointer'> <FaPen /> </button>
                        </span>
                    </div>

                    {/* divider */}
                    <div className="bg-dusk h-0.5 w-auto mb-2 mt-2 mx-4"></div>

                    <div className='flex justify-between gap-4 p-4'>
                        <div className='flex gap-4'>
                            <Image src={document} alt="document" className='w-24' />
                            <span>
                                <h1 className='text-xl font-bold'>ReVault: A Version-Controlled Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students</h1>
                                <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit ex imperdiet, tristique erat non, luctus justo. In at facilisis metus. Donec volutpat nisi magna, sit amet dignissim neque imperdiet sit amet.</p>   
                            </span>
                        </div>
                

                        <span className='flex items-center gap-2'>
                            <button className='bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br p-4 flex items-center rounded-lg cursor-pointer text-2xl'> <FaBookOpen/> </button>
                            <button className='bg-red-warning rounded-md p-4 text-2xl cursor-pointer'> <FaTrash /> </button>
                            <button className='bg-dusk rounded-md p-4 text-2xl cursor-pointer'> <FaPen /> </button>
                        </span>
                    </div>
            
                    {/* divider */}
                    <div className="bg-dusk h-0.5 w-auto mb-2 mt-2 mx-4"></div>

                    <div className='flex justify-between gap-4 p-4'>
                        <div className='flex gap-4'>
                            <Image src={document} alt="document" className='w-24' />
                            <span>
                                <h1 className='text-xl font-bold'>ReVault: A Version-Controlled Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students</h1>
                                <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit ex imperdiet, tristique erat non, luctus justo. In at facilisis metus. Donec volutpat nisi magna, sit amet dignissim neque imperdiet sit amet.</p>   
                            </span>
                        </div>
                

                        <span className='flex items-center gap-2'>
                            <button className='bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br p-4 flex items-center rounded-lg cursor-pointer text-2xl'> <FaBookOpen/> </button>
                            <button className='bg-red-warning rounded-md p-4 text-2xl cursor-pointer'> <FaTrash /> </button>
                            <button className='bg-dusk rounded-md p-4 text-2xl cursor-pointer'> <FaPen /> </button>
                        </span>
                    </div>

                    {/* divider */}
                    <div className="bg-dusk h-0.5 w-auto mb-2 mt-2 mx-4"></div>

                    <div className='flex justify-between gap-4 p-4'>
                        <div className='flex gap-4'>
                            <Image src={document} alt="document" className='w-24' />
                            <span>
                                <h1 className='text-xl font-bold'>ReVault: A Version-Controlled Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students</h1>
                                <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit ex imperdiet, tristique erat non, luctus justo. In at facilisis metus. Donec volutpat nisi magna, sit amet dignissim neque imperdiet sit amet.</p>   
                            </span>
                        </div>
                

                        <span className='flex items-center gap-2'>
                            <button className='bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br p-4 flex items-center rounded-lg cursor-pointer text-2xl'> <FaBookOpen/> </button>
                            <button className='bg-red-warning rounded-md p-4 text-2xl cursor-pointer'> <FaTrash /> </button>
                            <button className='bg-dusk rounded-md p-4 text-2xl cursor-pointer'> <FaPen /> </button>
                        </span>
                    </div>

                       {/* divider */}
                       <div className="bg-dusk h-0.5 w-auto mb-2 mt-2 mx-4"></div>

                        <div className='flex justify-between gap-4 p-4'>
                            <div className='flex gap-4'>
                                <Image src={document} alt="document" className='w-24' />
                                <span>
                                    <h1 className='text-xl font-bold'>ReVault: A Version-Controlled Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students</h1>
                                    <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit ex imperdiet, tristique erat non, luctus justo. In at facilisis metus. Donec volutpat nisi magna, sit amet dignissim neque imperdiet sit amet.</p>   
                                </span>
                            </div>


                            <span className='flex items-center gap-2'>
                                <button className='bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br p-4 flex items-center rounded-lg cursor-pointer text-2xl'> <FaBookOpen/> </button>
                                <button className='bg-red-warning rounded-md p-4 text-2xl cursor-pointer'> <FaTrash /> </button>
                                <button className='bg-dusk rounded-md p-4 text-2xl cursor-pointer'> <FaPen /> </button>
                            </span>
                        </div>

                        
                       {/* divider */}
                       <div className="bg-dusk h-0.5 w-auto mb-2 mt-2 mx-4"></div>
                       
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
  )
}
