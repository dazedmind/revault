"use client"
import React, { useEffect, useState } from 'react';
import NavBar from '../component/NavBar'
import {ProfileCard} from '../component/ProfileCard';
import Link from 'next/link';
import document from "../img/document.png"
import DocsCardUser from '../component/DocsCardUser';
import { FaPlus } from "react-icons/fa6";
import ProtectedRoute from '../component/ProtectedRoute';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {

      const token = localStorage.getItem('authToken');
      if (!token) return;
  
      try {
        const res = await fetch('/api/profile', {
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
      <ProtectedRoute> 
      <NavBar/>

      {/* <ProfileCard/> */}
      {profile ? (
          <ProfileCard
            name={`${profile.users.first_name} ${profile.users.last_name}`}
            number={profile.role === 'student' ? profile.student_num : profile.employee_id}
            college={profile.college}
            position={profile.position}
            programOrDept={profile.role === 'student' ? profile.program : profile.department}
            role={profile.role}
          />
        ) : (
          <div>Failed to load profile.</div>
        )}

      <div className='flex bg-midnight'>
        <aside className='flex flex-col gap-8 h-auto w-96 p-14'>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold">My Profile</h2>
                <div className="bg-dusk h-0.5 w-full"></div>
                
                <ul className="ml-4 flex flex-col gap-2">
                  <li>
                    <Link href="/"> My Bookmarks</Link>
                  </li>
                </ul>

              </div>

              <div className="flex flex-col gap-2">
                <h2 className="font-bold">Settings</h2>
                <div className="bg-dusk h-0.5 w-full"></div>
                <ul className="ml-4 flex flex-col gap-2">
                  <li>
                    <Link href="/">System Settings</Link>
                  </li>
                  <li>
                    <Link href="/">Logout</Link>
                  </li>
                </ul>
              </div>
        </aside>

        <main className='flex flex-col gap-5 mr-24 align-middle'>
          <div className='flex flex-col w-full gap-5 mx-2 my-6 align-middle p-8'>
            <div className='flex flex-row justify-between align-middle items-center'>
              <h1 className="text-3xl font-bold">My Bookmarks</h1>
            </div>

            <DocsCardUser
              img={document}
              title="ReVault: Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students" 
              description="Traditional systems for archiving research-based works rely on physical documentation or unstructured digital repositories, leading to inefficiencies in version tracking, categorization, and retrieval "
              tags={["IT", "Design", "UI/UX"]}
            />
            
            <DocsCardUser
              img={document}
              title="ReVault: Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students" 
              description="Traditional systems for archiving research-based works rely on physical documentation or unstructured digital repositories, leading to inefficiencies in version tracking, categorization, and retrieval "
              tags={["IT", "Design", "UI/UX"]}
            />
            
          </div>
        </main>
      </div>
      </ProtectedRoute>
    </div>
  )
}
