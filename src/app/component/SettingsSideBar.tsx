"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const SettingsList = ({
  category,
  labels,
  categoryClassName = "",
  ulClassName = "",
  labelClassName = "text-white-75",
}) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const slugify = (text: string) =>
    text.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");

  const categoryPath = slugify(category);

  return (
    <div>
      <h1 className={categoryClassName}>{category}</h1>
      <ul className={ulClassName}>
        {labels.map((label, index) => {
          const path = slugify(label);
          const fullPath = `/settings/${categoryPath}/${path}`;
          const isActive = pathname === fullPath;

          return (
            <li
            key={index}
            className={`${labelClassName} cursor-pointer hover:text-teal ${
              isActive && theme === 'light' ? "text-teal font-bold bg-tertiary rounded-md" : ""
            } ${ isActive && theme === 'dark' ? 'bg-darker font-bold text-teal rounded-md' : ''}`}
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
