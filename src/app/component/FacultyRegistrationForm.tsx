"use client";

import { useState, useEffect } from "react";
import InputField from "./InputField";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation'
import WarningMessage from "./WarningMessage";


// FOR FACULTY REGISTRATION FORM
// This is the form that will be used for faculty registration. It includes fields for first name, middle name, last name, employee number, department, email address, and password. The form also includes a button to send an OTP to the user's email address.
export default function FacultyForm() {
  const [role, setRole] = useState("student");

  useEffect(() => {
    const storedRole = localStorage.getItem("userType");
    if (storedRole) setRole(storedRole);
  }, []);

  const router = useRouter()
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    ext: "",
    employeeID: "",
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
            department: selectedDepartment,
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
    console.log("Selected Deperatment: ", selectedDepartment);
    
    const query = new URLSearchParams({
      firstName: formData.firstName || '',
      middleName: formData.middleName || '',
      lastName: formData.lastName || '',
      ext: formData.ext || '',
      employeeID: formData.employeeID || '',
      department: selectedDepartment || '',
      email: formData.email || '',
      password: formData.password || '',
      confirmPassword: formData.confirmPassword || '',
    }).toString();    
  };

  return (
    <div className="max-w-lg mx-auto bg-accent border-2 p-10 rounded-lg shadow-lg mb-20">
      <form onSubmit={handleNext} className="grid grid-cols-2 gap-4 min-w-0">
        <h1 className="col-span-2 font-mono text-gold font-bold text-2xl">Personal Information</h1>
        <div className="bg-white-75 h-0.5 w-full col-span-2"></div>

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

        <h1 className="col-span-2 font-mono text-gold font-bold text-2xl">Employee Information</h1>
        <div className="bg-white-75 h-0.5 w-full col-span-2"></div>

        <InputField
          label="Employee Number"
          type="text"
          name="employeeID"
          value={formData.employeeID}
          onChange={handleChange}
          placeholder="1023456"
          inputClassName="w-full"
          disabled={false}
        />

        <div className="flex flex-col flex-grow">
          <Label className="text-sm text-gray-300 mb-1">Department</Label>
          <Select name="department" value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Computer Science">Computer Science Department</SelectItem>
                <SelectItem value="Information Technology">Information Technology Department</SelectItem>
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

        <h1 className="col-span-2 font-mono text-gold font-bold text-2xl">Password</h1>
        <div className="bg-white-75 h-0.5 w-full col-span-2"></div>

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
          containerClassName="col-span-2 w-auto h-auto "
          textClassName=" "
          message="Password should be a minimum of 9 characters, including uppercase
            letters, lowercase letters, numbers, and symbols."
        />

        <input type="hidden" id="role" name="role" value={role} />

        <div className="col-span-2">
          <button onClick={handleNext} className="block text-center w-full text-white py-2 rounded-md bg-gradient-to-r from-gold to-gold hover:bg-gradient-to-br font-inter cursor-pointer text-lg font-bold">Next</button>
        </div>
      </form>
    </div>
  );
}
