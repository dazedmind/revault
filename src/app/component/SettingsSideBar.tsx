"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsList = ({
  category,
  labels,
  categoryClassName = "",
  ulClassName = "",
  labelClassName = "text-white-75",
}) => {
  const pathname = usePathname();

  const slugify = (text: string) =>
    text.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");

  const categoryPath = slugify(category);

  return (
    <div>
      <h1 className={categoryClassName}>{category}</h1>
      <ul className={ulClassName}>
        <div className="bg-dusk h-0.5 w-5/6 mb-2"></div>
        {labels.map((label, index) => {
          const path = slugify(label);
          const fullPath = `/settings/${categoryPath}/${path}`;
          const isActive = pathname === fullPath;

          return (
            <li
              key={index}
              className={`${labelClassName} cursor-pointer hover:text-teal ${
                isActive ? "text-teal bg-darker rounded-md" : ""
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
