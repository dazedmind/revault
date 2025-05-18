"use client";
import React from "react";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";

const UserSelection = () => {
  const handleUserTypeSelection = (type: string) => {
    localStorage.setItem("userType", type); // Store user type in localStorage
    window.location.href = "registration-form"; // Redirect to registration form
  };

  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <h1 className="text-4xl font-mono text-center font-bold text-gold">
        Select what describes you
      </h1>

      <div className="flex md:flex-row flex-col justify-evenly gap-8 mt-10">
        <button
          onClick={handleUserTypeSelection.bind(null, "student")}
          className={`w-xs h-48 bg-accent border-2 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-center items-center p-6 cursor-pointer`}
        >
          <PiStudentBold className="size-12 mb-2" />

          {/* Main heading */}
          <p className="text-xl font-bold text-center text-gold leading-tight mb-1">
            I&apos;m a student
          </p>

          {/* Sub-text */}
          <p className="text-sm text-center w-[244px] leading-tight whitespace-normal break-words">
            I&apos;m a student of Pamantasan ng Lungsod ng Maynila
          </p>
        </button>

        <button
          onClick={handleUserTypeSelection.bind(null, "faculty")}
          className="w-xs h-48 bg-accent border-2 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-center items-center p-6 cursor-pointer"
        >
          <FaChalkboardTeacher className="size-12 mb-2" />

          {/* Main heading */}
          <p className="text-xl font-bold text-center text-gold leading-tight mb-1">
            I&apos;m an educator
          </p>

          {/* Sub-text */}
          <p className="text-sm text-center w-[244px] leading-tight whitespace-normal break-words">
            I&apos;m a faculty member of Pamantasan ng Lungsod ng Maynila
          </p>
        </button>
      </div>
    </div>
  );
};

export default UserSelection;
