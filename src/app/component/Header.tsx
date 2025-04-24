import Image from "next/image";
import icon from "../img/revault-icon.png";
import Link from "next/link";
import { FaBuildingColumns } from "react-icons/fa6";
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

      {!pathname?.startsWith("/admin/login") && (
      <span>
        <Link href={"../admin/login"}>
          <FaBuildingColumns className="text-2xl hover:text-teal cursor-pointer"/>
        </Link>
      </span>
      )}
    </header>
  );
};

export default Header;
