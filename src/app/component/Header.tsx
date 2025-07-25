'use client';

import Image from "next/image";
import icon from "../img/revault-icon.png";
import Link from "next/link";
import { FaBuildingColumns, FaChevronRight } from "react-icons/fa6";
import { usePathname } from "next/navigation"; // Import the hook
import ulLogo from "../img/UL-logo-v1.png";


const Header = () => {
  const pathname = usePathname(); // Get current route

  return (
    <header className="flex flex-row align-middle bg-white z-50 items-center justify-between text-xl font-mono w-full p-6 px-8">
        <div className="flex align-middle items-center md:pl-4 gap-10">
          <Link
            href="/home"
            className="hidden md:flex items-center gap-2 font-bold text-3xl text-gold"
          >
            <Image src={ulLogo} alt="revault-icon" width={45} height={45} />
             <div className="w-0.5 h-10 bg-gold"></div>
            <Image src={icon} alt="revault-icon" width={60} height={60} />
            ReVault
          </Link>

          <Link href="/home" className="flex items-center gap-2">
            <Image src={ulLogo} className="md:hidden" alt="revault-icon" width={45} height={45} />
            <div className="w-0.5 h-10 bg-gold md:hidden"></div>
            <Image src={icon} className="md:hidden w-14" alt="revault-icon" />
          </Link>
        </div>

      {pathname && !pathname.startsWith("/admin/login") && (
      <span className="flex items-center gap-4">
  
        <Link href={"../admin/login"} className="flex items-center gap-4 text-sm text-midnight hover:text-yale-blue cursor-pointer group">
          <FaBuildingColumns className="text-2xl hover:text-yale-blue cursor-pointer"/>
          <p className="hidden md:block text-sm">Sign in as Librarian</p>
          <FaChevronRight className="hidden md:block text-md hover:text-yale-blue cursor-pointer opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"/>
        </Link>
      </span>
      )}
    </header>
  );
};

export default Header;
