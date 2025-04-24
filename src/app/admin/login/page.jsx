"use client";

import Background from "@/app/component/Background";
import Header from "@/app/component/Header";
import React, { useEffect, useState } from "react";
import LogInInputField from "../../component/LogInInputField";
import { Button } from "@/components/ui/button";
import { LogInCheckBox } from "../../component/LogInCheckBox";
import { loginUser } from '../../actions/login'; // adjust path
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    studentNumber: "",
    password: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = new FormData();
    form.append('studentNumber', formData.studentNumber);
    form.append('password', formData.password);
  
    const result = await loginUser(form);
  
    if (result.success) {
      // Store token in localStorage (or sessionStorage)
      localStorage.setItem('authToken', result.token); // 🔐 Store the token
      window.location.href = '/home';
    } else {
      alert("Login failed: " + result.message);
    }
  };

  // ALWAYS CLEARS TOKEN ON LOGIN PAGE LOAD
   useEffect(() => { 
      localStorage.removeItem('authToken');
    },);

  return (
    <div className="font-Inter h-screen w-screen overflow-hidden relative">
      {/* Background with Blur using background component */}
      <Background imageUrl="/login-bg.png" />

      {/* Header using header component */}
      <Header />

   
      {/* Main Content */}
      <main className="flex flex-col mt-30 items-center relative z-10">
        
   
        <div className="w-96 m-5 p-6 h-auto rounded-md outline-1 bg-midnight relative z-10">

        <span className="absolute -top-10 -left-1 ">
            <Link href="/login" className="flex items-center gap-1 text-teal"><FaChevronLeft/> Back to regular sign in</Link>
            <h1 className="flex items-center"></h1>
        </span>
          {/* Title */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-mono font-bold text-teal">ReVault</h1>
          </div>

          <div className="text-center bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right mx-6 my-2 p-2 rounded-md w-auto">
            <h1 className="text-2xl font-mono font-bold text-midnight">Librarian Sign In</h1>
          </div>

          {/* Form */}
          <div className="flex flex-col justify-center items-center">
            <form className="w-xs" onSubmit={handleSubmit}>
              <LogInInputField
                label="Employee ID"
                type="text"
                name="employee_id"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-xs"
              />

              <LogInInputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-xs"
              />

              {/* Remember Password & Forgot Password */}
              <div className="flex flex-row justify-between items-center m-3 mt-5">
                <LogInCheckBox id="rememberMe" label="Remember password" />
      
                <p className="font-inter text-teal text-xs text-align cursor-pointer">
                  Forgot Password?
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex flex-row justify-center mt-5">
                <Button
                  type="submit"
                  className="w-xs h-12 rounded-lg bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-inter cursor-pointer font-bold text-lg text-white
                  "
                >
                  Log In
                </Button>
              </div>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
