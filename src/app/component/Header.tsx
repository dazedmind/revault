'use client';

import Image from "next/image";
import icon from "../img/revault-icon.png";
import Link from "next/link";
import { FaBuildingColumns, FaChevronRight } from "react-icons/fa6";
import { usePathname } from "next/navigation"; // Import the hook


const Header = () => {
  const pathname = usePathname(); // Get current route

  return (
    <header className="flex flex-row align-middle z-50 items-center justify-between text-xl font-mono w-full bg-transparent p-8 px-16">
      <div className="flex align-middle items-center gap-10">
          <Link href="/login" className="flex gap-4 font-bold text-3xl text-teal">
            <Image 
            src={icon} 
            className="w-14"
            alt="revault-icon"/>
            ReVault
          </Link>
      </div>

      {pathname && !pathname.startsWith("/admin/login") && (
      <span>
        <Link href={"../admin/login"} className="flex items-center gap-4 text-sm text-white-75 hover:text-teal cursor-pointer group">
          <FaBuildingColumns className="text-2xl hover:text-teal cursor-pointer"/>
          Sign in as Librarian
          <FaChevronRight className="text-md hover:text-teal cursor-pointer opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"/>
        </Link>
      </span>
      )}
    </header>
  );
};

export default Header;
