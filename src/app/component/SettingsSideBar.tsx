import Link from "next/link";

const SettingsList = ({
  category,
  labels,
  categoryClassName = "",
  ulClassName = "",
  labelClassName = "text-white-75",
}) => {
  const slugify = (text: string) =>
    text.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");

  const categoryPath = slugify(category);

  return (
    <div>
      <h1 className={categoryClassName}>{category}</h1>
      <ul className={ulClassName}>
        {/* Divider */}
        <div className="bg-dusk h-0.5 w-5/6 mb-2"></div>
        {labels.map((label, index) => {
          // Convert label to a URL-friendly string (example)
          const path = label.toLowerCase().replace(/ /g, "-");
          return (
            <li
              key={index}
              className={`${labelClassName} cursor-pointer hover:text-teal`}
            >
              <Link href={`/settings/${categoryPath}/${path}`} prefetch={true}>
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
