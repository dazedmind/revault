import React from "react";
import { FiLink2 } from "react-icons/fi";
import Image from "next/image";
import {
  FaBook,
  FaBookmark,
  FaBookOpen,
  FaFlag,
  FaLink,
  FaPen,
  FaTrash,
} from "react-icons/fa6";
import { Eye, BookmarkX } from "lucide-react";

const tagColors = {
  IT: "",
  // Add more tags as needed
};

const DocsCardUser = (props) => {
  return (
    <div className="w-9xl flex flex-col md:flex-row align-middle items-center gap-2 p-4 md:p-6 md:px-8 rounded-xl border border-dusk dark:bg-primary">
      <div className="hidden md:block w-52 ">
        <a href={props.link}>
          <Image src={props.img} alt="Project 1" className="w-full h-full" />
        </a>
      </div>

      <div className="w-full flex flex-col p-4 gap-1 items-start">
        <h3 className="text-xl font-bold ">{props.title}</h3>
        <div className="flex gap-2 flex-wrap overflow-hidden mt-2">
          {/* Mapping over tags */}
          {props.tags && props.tags.length > 0 ? (
            props.tags.map((tag, index) => (
              <p
                key={index}
                className={`flex dark:text-white text-sm rounded-sm w-auto p-1 px-2 ${
                  tagColors[tag] || "dark:bg-dusk-foreground" // Default to gray if no color found
                }`}
              >
                {tag}
              </p>
            ))
          ) : (
            <p className="dark:text-white text-md italic">No tags available</p>
          )}
        </div>
        <p className="text-md">{props.description}</p>
        <div className="mt-6 flex flex-row items-center justify-between gap-4">
          {/* Left Side Buttons */}
          <span className="flex gap-4">
            <button className="transition-all duration-300 flex flex-row items-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:brightness-120 rounded-lg cursor-pointer">
              <Eye /> Read
            </button>
            <button className="transition-all duration-300 flex flex-row items-center gap-2 px-4 py-3 dark:bg-dusk-foreground dark:text-white rounded-lg cursor-pointer dark:hover:text-white hover:bg-dusk">
            <BookmarkX /> Unsave
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocsCardUser;
