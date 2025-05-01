"use client";

import { useState } from "react";
import InputField from "./InputField";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation'
import WarningMessage from "./WarningMessage";

export default function Form() {
  const router = useRouter()
  const [selectedProgram, setSelectedProgram] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    ext: "",
    studentNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNext = async (e) => {
    e.preventDefault(); 
      // Send OTP before navigating to confirmation
      try {
        const res = await fetch('/api/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email }),
        });

        const result = await res.json();

        if (result.success) {
          localStorage.setItem("regEmail", formData.email);
          localStorage.setItem("regForm", JSON.stringify({
            ...formData,
            program: selectedProgram,
          }));
          router.push("/registration/otp-confirmation");
        } else {
          alert("Failed to send OTP. Try again.");
        }
      } catch (err) {
        console.error("OTP Send Error:", err);
        alert("Something went wrong while sending OTP.");
      }

    // Check if the form data is properly populated
    console.log("Form Data: ", formData);  // For debugging
    console.log("Selected Course: ", selectedProgram);

    const query = new URLSearchParams({
      firstName: formData.firstName || '',
      middleName: formData.middleName || '',
      lastName: formData.lastName || '',
      ext: formData.ext || '',
      studentNumber: formData.studentNumber || '',
      program: selectedProgram || '',
      email: formData.email || '',
      password: formData.password || '',
      confirmPassword: formData.confirmPassword || '',
    }).toString();    
  };

  return (
    <div className="max-w-lg mx-auto bg-midnight p-10 rounded-lg shadow-lg mb-20">
      <form onSubmit={handleNext} className="grid grid-cols-2 gap-4 min-w-0">
        <h1 className="col-span-2 font-mono text-teal font-bold text-2xl">Personal Information</h1>
        <div className="bg-dusk h-0.5 w-full col-span-2"></div>

        <InputField
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Juan"
          inputClassName="w-full"
          disabled={false}
        />

        <InputField
          label="Middle Name"
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          placeholder="Protacio"
          inputClassName="w-full"
          disabled={false}
        />

        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Dela Cruz"
          inputClassName="w-full"
          disabled={false}
        />

        <InputField
          label="Ext. (e.g. III, Sr.)"
          type="text"
          name="ext"
          value={formData.ext}
          onChange={handleChange}
          placeholder="Jr."
          inputClassName="w-1/3"
          required={false}
          disabled={false}
        />

        <h1 className="col-span-2 font-mono text-teal font-bold text-2xl">Student Information</h1>
        <div className="bg-dusk h-0.5 w-full col-span-2"></div>

        <InputField
          label="Student Number"
          type="text"
          name="studentNumber"
          value={formData.studentNumber}
          onChange={handleChange}
          placeholder="202512345"
          inputClassName="w-full"
          disabled={false}
        />

        <div className="flex flex-col flex-grow">
          <Label className="text-sm text-gray-300 mb-1">Course</Label>
          <Select name="program" value={selectedProgram} onValueChange={setSelectedProgram}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your course" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="CS">Computer Science</SelectItem>
                <SelectItem value="IT">Information Technology</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jprizal@plm.edu.ph"
          inputClassName="w-full"
          disabled={false}
        />

        <h1 className="col-span-2 font-mono text-teal font-bold text-2xl">Password</h1>
        <div className="bg-dusk h-0.5 w-full col-span-2"></div>

        {/* Passwords */}
        <div className="col-span-2 w-full">
          <InputField
            label="Create Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            inputClassName="w-full"
            disabled={false}
          />
        </div>

        <div className="col-span-2 w-full">
          <InputField
           label="Confirm Password"
           type="password"
           name="confirmPassword"
           value={formData.confirmPassword}
           onChange={handleChange}
           placeholder="Confirm Password"
           inputClassName="w-full"
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

        <div className="col-span-2">
          <button onClick={handleNext} className="block text-center w-full text-white py-2 rounded-md bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-inter cursor-pointer text-lg font-bold">Next</button>
        </div>
      </form>
    </div>
  );
}
