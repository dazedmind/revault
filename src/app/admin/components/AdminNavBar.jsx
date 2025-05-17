import React from "react";
import { SearchInput } from "../../component/SearchInput";
import avatar from "../../img/user.png";
import icon from "../../img/revault-icon.png";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { logout } from "../../utils/auth";
import { useEffect, useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingScreen from "@/app/component/LoadingScreen";

export default function AdminNavBar() {
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => setMounted(true), []);

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
  
  if (loading) return <LoadingScreen />;

  if (!mounted) return null;
  return (
    <>
      <header className="flex flex-row align-middle z-50 items-center justify-between text-xl font-mono w-full p-8 px-10 md:px-16 dark:bg-primary">
      <div className="flex align-middle items-center gap-10">
          <Link
            href="/home"
            className="hidden md:flex gap-4 font-bold text-3xl text-teal"
          >
            <Image src={icon} className="w-14" alt="revault-icon" />
            ReVault
          </Link>
          
          <Link href="/home">
            <Image src={icon} className="md:hidden w-14" alt="revault-icon" />
          </Link>

          <SearchInput placeholder="Search paper" />
        </div>
        <ul className="flex flex-row items-center gap-8 text-lg">
          <Link href="/upload">
            <button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:brightness-120 transition-all duration-300 p-2 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer">
              <FaPlus /> Upload
            </button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Image
                src={profile?.users?.profile_picture || avatar}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt="User profile picture"
                width={100}
                height={100}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  <Link href="/admin/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  <Link href="/admin/settings/general/edit-profile">
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ul>
      </header>
    </>
  );
}
