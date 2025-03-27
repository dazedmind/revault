"use client";
import { useState } from "react";

const InputField = ({ label, type, name, placeholder, className = "" }) => (
  <div className="flex flex-col w-full">
    <label className="text-sm text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`px-3 py-2 bg-black/30 border outline-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal ${className}`}
    />
  </div>
);

export default function Form() {
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
          className="border-0 w-full"
        />

        <InputField
          label="Middle Name"
          type="text"
          name="middleName"
          placeholder="Protacio"
          className="border-0 w-full"
        />

        {/* Last Name, Extension */}
        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Dela Cruz"
          className="border-0 w-full"
        />

        <InputField
          label="Ext. (e.g. III, Sr.)"
          type="text"
          name="ext"
          placeholder="Jr."
          className="border-0 w-1/3"
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
              className="border-0 w-full"
            />
          </div>

          <div className="flex flex-col flex-grow">
            <label className="text-sm text-gray-300 mb-1">Course</label>
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

              {/* Adjusted SVG size & spacing */}
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
            </div>
          </div>
        </div>

        {/* Email Address */}
        <div className="col-span-2">
          <InputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="jprizal@plm.edu.ph"
            className="border-0"
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
            className="border-0"
          />
        </div>

        <div className="col-span-2 w-full">
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Enter Password Again"
            className="border-0"
          />
        </div>

        <div className="col-span-2 flex items-center gap-4 h-12 mt-2 bg-teal-950 border border-teal-800 p-4 rounded-md">
          {/* Icon Container */}
          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M17 8.5C17 13.1955 13.1941 17 8.5 17C3.80591 17 0 13.1955 0 8.5C0 3.80728 3.80591 0 8.5 0C13.1941 0 17 3.80728 17 8.5ZM8.5 10.2137C7.62926 10.2137 6.92339 10.9196 6.92339 11.7903C6.92339 12.6611 7.62926 13.3669 8.5 13.3669C9.37074 13.3669 10.0766 12.6611 10.0766 11.7903C10.0766 10.9196 9.37074 10.2137 8.5 10.2137ZM7.00314 4.54661L7.25739 9.2079C7.26928 9.42602 7.44963 9.59677 7.66806 9.59677H9.33194C9.55037 9.59677 9.73072 9.42602 9.74261 9.2079L9.99686 4.54661C10.0097 4.31101 9.82213 4.1129 9.58618 4.1129H7.41378C7.17784 4.1129 6.99029 4.31101 7.00314 4.54661Z"
                fill="#D9D9D9"
              />
            </svg>
          </div>

          {/* Text Container with More Space */}
          <p className="text-white text-xs leading-tight w-full">
            Password should be minimum of 9 characters, including uppercase letters, lowercase letters, numbers, and symbols.
          </p>
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button className="w-full text-white py-3 cursor-pointer rounded-md bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
