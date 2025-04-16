import React from "react";
import { FiLink2 } from 'react-icons/fi'
import Image from "next/image";
import { FaBook, FaBookmark, FaBookOpen, FaFlag, FaLink } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link";


const tagColors = {
    IT: "bg-dusk"
    // Add more tags as needed
  };

const DocsCard = (props) => {
    return (  
      <div className='w-9xl flex align-middle items-center gap-2 p-6 px-8 rounded-xl border border-dusk bg-dark'>
          <div className='w-52'>
            <a href={props.link}>
              <Image src={props.img} alt="Project"/>
            </a>
          </div>
  
          <div className='flex flex-col p-4 gap-1 items-start relative'>
              <h3 className='text-xl font-bold'>{props.title}</h3>
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
              <p className='text-white text-md'>{props.description}</p>
              <div className="mt-6 flex flex-row items-center justify-between gap-4">
                {/* Left Side Buttons */}
                <span className="flex gap-4">
                    <Link href="/view-file">
                      <button className="flex flex-row items-center align-middle gap-2 px-6 py-3 bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br rounded-lg cursor-pointer">
                        <FaBookOpen /> Read
                      </button>
                    </Link>

                    <button className="flex flex-row items-center align-middle gap-2 px-6 py-3 bg-dusk rounded-lg cursor-pointer hover:bg-dusk-foreground">
                    <FaBookmark /> Bookmark
                    </button>
                </span>

                </div>
          </div>
      </div>
    )
  }
  
  export default DocsCard