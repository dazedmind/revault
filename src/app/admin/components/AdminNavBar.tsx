import React from "react";
import SearchInput from "@/app/component/SearchInput";
import avatar from "../../img/user.png";
import icon from "../../img/revault-icon.png";
import { FaPlus } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { logout } from "../../utils/auth";
import { useEffect, useState } from "react";
import {
  LogOut,
  Settings,
  SunMoon,
  ChevronRight,
  ChevronDown,
  IdCard,
  File,
  Plus,
  Bookmark,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingScreen from "@/app/component/LoadingScreen";
import { useTheme } from "next-themes";
import ulLogo from "../../img/UL-logo-v1.png";

export default function AdminNavBar() {
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

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

  if (loading) return <LoadingScreen />;

  if (!mounted) return null;
  return (
    <>
      <header className="flex flex-row align-middle z-50 items-center justify-between text-xl font-mono w-full p-8 px-10 md:px-16 dark:bg-primary">
        <div className="flex align-middle items-center gap-5">
          <Link
            href="/home"
            className="hidden md:flex gap-4 items-center font-bold text-3xl text-gold"
          >
            <Image src={ulLogo} alt="revault-icon" width={45} height={45} />
             <div className="w-0.5 h-10 bg-gold"></div>
            <Image src={icon} alt="revault-icon" className="w-14 h-9" width={70} height={45} />

            ReVault
          </Link>

          <Link href="/home" className="flex items-center gap-2">
            <Image src={ulLogo} alt="revault-icon" className="md:hidden" width={45} height={45} />
            <div className="w-0.5 h-10 bg-gold md:hidden"></div>

            <Image src={icon} className="md:hidden w-14" alt="revault-icon" />
          </Link>

          <SearchInput placeholder="Search paper" />
        </div>
        <ul className="flex flex-row items-center gap-2 md:gap-4 text-lg">
          {(() => {
            const userType = localStorage.getItem("userType");
            if (
              userType !== "ADMIN" &&
              userType !== "ASSISTANT" &&
              userType == "LIBRARIAN"
            ) {
              return (
                <Link href="/upload">
                  <button className="bg-gradient-to-r from-gold to-gold-fg text-white hover:brightness-120 hover:shadow-lg hover:shadow-gold/80 transition-all duration-300 p-2 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer">
                    <Plus className="w-4 h-4" /> 
                    <span className="text-md hidden md:block">Upload</span>
                  </button>
                </Link>
              );
            }
            return null;
          })()}

          {(() => {
            const userType = localStorage.getItem("userType");
            if (
              userType !== "ADMIN" &&
              userType !== "ASSISTANT" &&
              userType == "LIBRARIAN"
            ) {
              return (
                <Link href="/admin/profile#manage-papers">
                  <button className="hidden md:flex bg-yale-blue hover:brightness-120 hover:shadow-lg hover:shadow-yale-blue/80 transition-all duration-200 text-white p-2 px-4 font-sans  items-center gap-2 rounded-lg cursor-pointer">
                    <File className="w-4 h-4" /> 
                    <span className="text-md hidden md:block">Manage</span>
                  </button>
                </Link>
              );
            }
            return null;
          })()}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 md:bg-accent rounded-lg p-2 cursor-pointer hover:bg-gold/80 transition-all duration-300">
                <Image
                  src={profile?.users?.profile_picture || avatar}
                  className="w-10 h-10 md:w-8 md:h-8 rounded-full cursor-pointer border-yale-blue border-3 object-cover"
                  alt="User profile picture"
                  width={50}
                  height={50}
                />
                <span className="text-sm font-[Inter] hidden md:block">
                  {profile.users.first_name}
                </span>
                <ChevronDown className="h-4 w-4 hidden md:block" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="end">
              <DropdownMenuGroup>
              <Link
                    href="/admin/profile"
                    className="flex items-center gap-2"
                  >
                  <DropdownMenuItem className="p-2 cursor-pointer">
                    <Image
                      src={profile?.users?.profile_picture || avatar}
                      alt="User profile picture"
                      width={40}
                      height={40}
                      className="rounded-full border-yale-blue border-3 w-10 h-10 object-cover"
                    />
                  
                      <span className="flex flex-col">
                        <p className="text-sm font-[Inter]">
                          {profile.users.name}
                        </p>
                        <p className="text-xs font-[Inter] flex items-center gap-1 text-gray-500">
                          <IdCard className="text-xxs" strokeWidth={1.5} />
                          {profile.employee_id}
                        </p>
                      </span>
                      <ChevronRight className="h-4 w-4" />
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />
                <Link href="/admin/bookmarks">
                  <DropdownMenuItem className="cursor-pointer">
                    <Bookmark />
                      My Bookmarks
                  </DropdownMenuItem>
                </Link>
                <Link href="/admin/settings/general/edit-profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings />
                      Settings
                  </DropdownMenuItem>
                </Link>
                
                <DropdownMenuItem
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="cursor-pointer"
                >
                  <SunMoon className="h-4 w-4" />
                  <span>
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
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
