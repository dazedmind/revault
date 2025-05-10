"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SettingsList = ({
  category,
  labels,
  categoryClassName = "",
  ulClassName = "",
  labelClassName = "text-white-75",
}) => {
  const pathname = usePathname();
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      setIsLightTheme(true);
    } else {
      setIsLightTheme(false);
    }
  }, []);

  const slugify = (text: string) =>
    text.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");

  const categoryPath = slugify(category);

  return (
    <div>
      <h1 className={categoryClassName}>{category}</h1>
      <ul className={ulClassName}>
        <div className={`bg-dusk h-0.5 w-5/6 mb-2 dark:bg-dusk`}></div>
        {labels.map((label, index) => {
          const path = slugify(label);
          const fullPath = `/admin/settings/${categoryPath}/${path}`;
          const isActive = pathname === fullPath;

          return (
            <li
              key={index}
              className={`${labelClassName} cursor-pointer hover:text-teal ${
                isActive ? `text-teal bg-dusk rounded-md` : ""
              }`}
            >
              <Link href={fullPath} prefetch={true}>
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
