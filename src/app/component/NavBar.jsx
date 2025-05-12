"use client";

import React from "react";
import { SearchInput } from "./SearchInput";
import avatar from "../img/user.png";
import icon from "../img/revault-icon.png";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "../utils/auth";

export default function NavBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
          
          <Image src={icon} className="md:hidden w-14" alt="revault-icon" />

          <SearchInput placeholder="Search paper" />
        </div>
        <ul className="flex flex-row items-center gap-8 text-lg">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={avatar}
                className="w-10 h-10 rounded-full cursor-pointer border-1 border-midnight"
                alt="User profile picture"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  <Link href="/settings">Settings</Link>
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
