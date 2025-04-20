import React from "react";
import { SearchInput } from "../../component/SearchInput"
import avatar from "../../img/user.png";
import icon from "../../img/revault-icon.png";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

import {
    LogOut,
    Settings,
    User,
  } from "lucide-react"
   
  import { Button } from "@/components/ui/button"
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
  } from "@/components/ui/dropdown-menu"

export default function AdminNavBar() {
    return (
        <>
            <header className="flex flex-row align-middle z-50 items-center justify-between text-xl font-mono  w-full bg-dark p-8 px-16">
                <div className="flex align-middle items-center gap-10">     
                    <Link href="/home" className="flex gap-4 font-bold text-3xl text-teal">
                    <Image 
                    src={icon} 
                    className="w-14"
                    alt="revault-icon"/>
                    ReVault
                    </Link>
                <SearchInput placeholder="Search paper"/>
                </div>
                <ul className="flex flex-row items-center gap-8 text-lg">

                <Link href="/upload">
                    <button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br p-2 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer">
                        <FaPlus /> Upload
                    </button>
                </Link>      
                
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Image
                                src={avatar}
                                className="w-10 h-10 rounded-full cursor-pointer"
                                alt="User profile picture"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-dark" align="end">
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
                            <DropdownMenuItem>
                                <LogOut />
                                <Link href="/login">Log Out</Link>
                                </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ul>
            </header>
        </>
    )
}