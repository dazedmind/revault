"use client";

import WarningMessage from "@/app/component/WarningMessage";
import { useState } from "react";
import InputField from "./InputField";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Form({ link }) {
  const [selectedCourse, setSelectedCourse] = useState("");

  return (
    <div className="max-w-lg mx-auto bg-midnight p-10 rounded-lg shadow-lg mb-20">
      <form className="grid grid-cols-2 gap-4 min-w-0">
        {/* Full Name, Middle Name */}
        <h1 className="col-span-2 font-mono text-teal font-bold text-2xl">
          Personal Information
        </h1>

        <div className="bg-dusk h-0.5 w-full col-span-2"></div>

        <InputField
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Juan"
          inputClassName="w-full"
        />

        <InputField
          label="Middle Name"
          type="text"
          name="middleName"
          placeholder="Protacio"
          inputClassName="w-full"
        />

        {/* Last Name, Extension */}
        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Dela Cruz"
          inputClassName="w-full"
        />

        <InputField
          label="Ext. (e.g. III, Sr.)"
          type="text"
          name="ext"
          placeholder="Jr."
          inputClassName="w-1/3"
          required={false}
        />

        <h1 className="col-span-2 font-mono text-teal font-bold text-2xl">
          Student Information
        </h1>
        <div className="bg-dusk h-0.5 w-full col-span-2"></div>

        <div className="col-span-2 flex gap-4">
          {/* Student Number, Course */}
          <div className="w-1/3">
            <InputField
              label="Student Number"
              type="text"
              name="studentNumber"
              placeholder="202512345"
              inputClassName="w-full"
            />
          </div>

          <div className="flex flex-col flex-grow">
            <Label className="text-sm text-gray-300 mb-1">Course</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your course" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Course</SelectLabel>
                  <SelectItem value="apple">Computer Science</SelectItem>
                  <SelectItem value="banana">Information Technology</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* <label className="text-sm text-gray-300 mb-1">Course</label>
            <div className="relative w-full">
              <select
                name="course"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="border-0 peer w-full pb-2 pt-2 pl-3 pr-8 bg-midnight outline-2 rounded-md text-white dark:focus:border-teal focus:ring-2 focus:ring-teal focus:border-teal appearance-none focus:outline-none "
              >
                <option value="">Select Course</option>
                <option value="CS">Computer Science</option>
                <option value="IT">Information Technology</option>
                <option value="IS">Information Systems</option>
              </select>

              {/* Adjusted SVG size & spacing 
              <div className="pointer-events-none absolute inset-y-0 right-2 pl-1 border-l-2 flex items-center peer-focus:border-l-teal">
                <svg
                  className="border-0 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>*/}
          </div>
        </div>

        {/* Email Address */}
        <div className="col-span-2">
          <InputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="jprizal@plm.edu.ph"
          />
        </div>

        <h1 className="col-span-2 font-mono text-teal font-bold text-2xl">
          Password
        </h1>

        <div className="bg-dusk h-0.5 w-full col-span-2"></div>

        {/* Passwords */}
        <div className="col-span-2 w-full">
          {" "}
          <InputField
            label="Create Password"
            type="password"
            name="password"
            placeholder="Enter Password"
          />
        </div>

        <div className="col-span-2 w-full">
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>

        {/* Warning message from WarningMessage.tsx */}
        <WarningMessage
          containerClassName="col-span-2"
          textClassName=" "
          message="Password should be a minimum of 9 characters, including uppercase
            letters, lowercase letters, numbers, and symbols."
        />

        {/* Submit Button */}
        <div className="col-span-2">
          <button className="w-full text-white py-2 rounded-md bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-inter cursor-pointer text-lg font-bold">
            <Link href={link}> Next </Link>
          </button>
        </div>
      </form>
    </div>
  );
}
