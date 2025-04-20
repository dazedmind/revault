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
          disabled={false}

        />

        <InputField
          label="Middle Name"
          type="text"
          name="middleName"
          placeholder="Protacio"
          inputClassName="w-full"
          disabled={false}

        />

        {/* Last Name, Extension */}
        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Dela Cruz"
          inputClassName="w-full"
          disabled={false}

        />

        <InputField
          label="Ext. (e.g. III, Sr.)"
          type="text"
          name="ext"
          placeholder="Jr."
          inputClassName="w-1/3"
          required={false}
          disabled={false}

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
              disabled={false}

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
                  <SelectItem value="apple">Computer Science</SelectItem>
                  <SelectItem value="banana">Information Technology</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
        </div>
        </div>
        {/* Email Address */}
        <div className="col-span-2">
          <InputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="jprizal@plm.edu.ph"
            disabled={false}

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
            disabled={false}

          />
        </div>

        <div className="col-span-2 w-full">
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            disabled={false}

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
