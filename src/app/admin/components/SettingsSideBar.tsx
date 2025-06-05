"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const SettingsList = ({
  category,
  labels,
  icon, 
  categoryClassName = "",
  ulClassName = "",
  labelClassName = "text-white-75",
}) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const slugify = (text: string) =>
    text.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");

  const categoryPath = slugify(category);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div>
        <h1 className={categoryClassName}>{category}</h1>
        <ul className={ulClassName}>
          {labels.map((label, index) => (
            <li key={index} className={`${labelClassName} w-80 md:w-auto cursor-pointer`}>
              <div className="flex items-center gap-2">
                {icon[index]}
                {label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h1 className={categoryClassName}>{category}</h1>
      <ul className={ulClassName}>
        {labels.map((label, index) => {
          const path = slugify(label);
          const fullPath = `/admin/settings/${categoryPath}/${path}`;
          const isActive = pathname === fullPath;

          return (
            <li
              key={index}
              className={`${labelClassName} w-80 md:w-auto cursor-pointer hover:text-gold ${
                isActive && theme === 'light' ? "text-gold font-bold bg-tertiary rounded-md" : ""
              } ${isActive && theme === 'dark' ? 'bg-darker font-bold text-gold rounded-md' : ''}`}
            >
              <Link className="flex items-center gap-2" href={fullPath} prefetch={true}>
                {icon[index]}
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SettingsList;