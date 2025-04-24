import React from "react";
import { FiLink2 } from "react-icons/fi";
import Image from "next/image";
import {
  FaBook,
  FaBookmark,
  FaBookOpen,
  FaFlag,
  FaLink,
} from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

const tagColors = {
  IT: "",
  // Add more tags as needed
};

const DocsCard = (props) => {
  return (
    <>
      <div className="w-9xl flex align-middle items-center gap-2 p-6 px-8 rounded-xl border border-dusk dark:bg-primary">
        <div className="w-52">
          <a href={props.link}>
            <Image src={props.img} alt="Project" />
          </a>
        </div>

        <div className="flex flex-col p-4 gap-1 items-start relative">
          <h3 className="text-xl font-bold">{props.title}</h3>
          <div className="flex gap-2 flex-wrap overflow-hidden mt-2">
            {/* Mapping over tags */}
            {props.tags && props.tags.length > 0 ? (
              props.tags.map((tag, index) => (
                <p
                  key={index}
                  className={`flex text-white text-sm rounded-sm w-auto p-1 px-2 ${
                    tagColors[tag] || "bg-dusk" // Default to gray if no color found
                  }`}
                >
                  {tag}
                </p>
              ))
            ) : (
              <p className="text-white text-md italic">No tags available</p>
            )}
          </div>
          <p className="text-md">{props.description}</p>
          <div className="mt-6 flex flex-row items-center justify-between gap-4">
            {/* Left Side Buttons */}
            <span className="flex gap-4">
              <Link href="/view-file">
                <button className="flex flex-row items-center align-middle gap-2 px-6 py-3 bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br rounded-lg cursor-pointer dark:text-primary">
                  <FaBookOpen /> Read
                </button>
              </Link>

              <button className="flex flex-row items-center align-middle gap-2 px-6 py-3 dark:bg-secondary rounded-lg cursor-pointer hover:bg-dusk-foreground">
                <FaBookmark /> Bookmark
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 gap-1 items-start relative">
        <h3 className="text-xl font-bold">{props.title}</h3>
        <div className="flex gap-2 flex-wrap overflow-hidden mt-2">
          {/* Mapping over tags */}
          {props.tags && props.tags.length > 0 ? (
            props.tags.map((tag, index) => (
              <p
                key={index}
                className={`flex text-sm rounded-sm w-auto p-1 px-2 ${
                  tagColors[tag] || "" // Default to gray if no color found
                }`}
              >
                {tag}
              </p>
            ))
          ) : (
            <p className="text-md italic">No tags available</p>
          )}
        </div>
        <p className="text-md">{props.description}</p>
        <div className="mt-6 flex flex-row items-center justify-between gap-4">
          {/* Left Side Buttons */}
          <span className="flex gap-4">
            <Link href="/view-file">
              <button className="flex flex-row items-center align-middle gap-2 px-6 py-3 bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br rounded-lg cursor-pointer">
                <FaBookOpen /> Read
              </button>
            </Link>
            <button className="flex flex-row items-center align-middle gap-2 px-6 py-3 rounded-lg cursor-pointer">
              <FaLink /> Cite
            </button>
            <button className="flex flex-row items-center align-middle gap-2 px-6 py-3 rounded-lg cursor-pointer">
              <FaBookmark /> Bookmark
            </button>
          </span>

          {/* Report Button */}
          <Popover align>
            <PopoverTrigger className="absolute right-0">
              <FaFlag className="text-dusk text-xl hover:text-teal cursor-pointer" />
            </PopoverTrigger>

            <PopoverContent align="end">
              <h1 className="text-2xl font-bold mb-2">Submit Report</h1>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Spam</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">False Information</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-three" id="option-three" />
                  <Label htmlFor="option-three">Plagiarized Content</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-four" id="option-four" />
                  <Label htmlFor="option-four">Misleading Title</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-five" id="option-five" />
                  <Label htmlFor="option-five">Duplicate</Label>
                </div>
              </RadioGroup>

              <div className="flex gap-2 pt-4">
                <button className="cursor-pointer rounded-md  py-2 px-4 w-full">
                  Cancel
                </button>
                <button className="cursor-pointer rounded-md bg-teal py-2 px-4 w-full">
                  Submit
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default DocsCard;
