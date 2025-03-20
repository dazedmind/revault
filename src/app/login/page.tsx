"use client";

import Background from "@/components/ui/background";
import Header from "@/components/ui/header";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoMicrosoft } from "react-icons/io5";

const InputField = ({ label, type, name, value, onChange, className = "" }) => (
  <div
    className={`flex flex-col justify-center items-center relative w-full mt-5 ${className}`}
  >
    <input
      className={`h-54px block px-2.5 pb-2.5 pt-4 text-sm bg-midnight rounded-lg border-1 outline-2 
        appearance-none dark:text-white dark:focus:border-teal focus:outline-none focus:ring-0 focus:border-teal peer ${className}`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=""
    />
    <label
      htmlFor={name}
      className="absolute font-inter text-xs text-white-25 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
        bg-midnight dark:bg-midnight px-2 peer-focus:px-2 peer-focus:text-teal peer-focus:dark:text-teal peer-placeholder-shown:scale-100 
        peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 
        rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
    >
      {label}
    </label>
  </div>
);

const LogIn = () => {
  const [formData, setFormData] = useState({
    studentNumber: "",
    password: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Background with Blur using background component */}
      <Background imageUrl="/login-bg.png" />

      {/* Header using header component */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-row justify-center items-center relative z-10">
        <div className="w-96 m-5 p-6 h-136 rounded-md outline-1 bg-midnight relative z-10">
          {/* Title */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-mono font-bold text-teal">ReVault</h1>
          </div>

          {/* Form */}
          <div className="flex flex-col justify-center items-center">
            <form className="w-xs" onSubmit={handleSubmit}>
              <InputField
                label="Student Number"
                type="text"
                name="studentNumber"
                value={formData.studentNumber}
                onChange={handleChange}
                className="w-xs"
              />

              <InputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-xs"
              />

              {/* Remember Password & Forgot Password */}
              <div className="flex flex-row justify-between items-center m-3 mt-5">
                <div className="flex flex-row justify-center">
                  <input type="checkbox" />
                  <p className="font-inter text-xs text-align ml-1">
                    Remember Password
                  </p>
                </div>
                <p className="font-inter text-teal text-xs text-align cursor-pointer">
                  Forgot Password?
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex flex-row justify-center mt-5">
                <button
                  type="submit"
                  className="w-xs h-12 border-2 rounded-lg bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-sans cursor-pointer z-10"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>

          {/* Sign-Up Option */}
          <div className="flex flex-row justify-center mt-5 mb-4">
            <p className="text-xs">
              Don&#39;t have an account yet?{" "}
              <span className="text-teal cursor-pointer">Create account</span>
            </p>
          </div>

          {/* Divider */}
          <div className="flex flex-row justify-center items-center gap-2 text-base mt-5">
            <div className="bg-dusk h-0.5 w-full"></div>
            <p className="w-100">or Sign Up With</p>
            <div className="bg-dusk h-0.5 w-full"></div>
          </div>

          {/* Microsoft Login */}
          <div className="flex flex-row justify-center mt-4">
            <button
              type="button"
              className="bg-white-75 w-xs h-12 text-midnight rounded-lg border-2 cursor-pointer font-sans font-extrabold flex flex-row justify-center items-center mt-2 gap-2 relative z-10"
            >
              <IoLogoMicrosoft />
              Microsoft
            </button>
          </div>

          {/* Google Login */}
          <div className="flex flex-row justify-center mb-4 mt-3">
            <button
              type="button"
              className="bg-white-75 w-xs h-12 border-2 rounded-lg text-midnight cursor-pointer font-sans font-extrabold flex flex-row justify-center items-center gap-2 relative z-10"
            >
              <FcGoogle />
              Google
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LogIn;
