"use client";

import Background from "@/app/component/Background";
import Header from "@/app/component/Header";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoMicrosoft } from "react-icons/io5";
import LogInInputField from "../component/LogInInputField";
import { Button } from "@/components/ui/button";
import { LogInCheckBox } from "../component/LogInCheckBox";
import { FaMicrosoft } from "react-icons/fa6";

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
    <div className="font-Inter h-screen w-screen overflow-hidden relative">
      {/* Background with Blur using background component */}
      <Background imageUrl="/login-bg.png" />

      {/* Header using header component */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-row justify-center mt-20 items-center relative z-10">
        <div className="w-96 m-5 p-6 h-auto rounded-md outline-1 bg-midnight relative z-10">
          {/* Title */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-mono font-bold text-teal">ReVault</h1>
          </div>

          {/* Form */}
          <div className="flex flex-col justify-center items-center">
            <form className="w-xs" onSubmit={handleSubmit}>
              <LogInInputField
                label="Student Number"
                type="text"
                name="studentNumber"
                value={formData.studentNumber}
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

          {/* Sign-Up Option */}
          <div className="flex flex-row justify-center mt-5 mb-4">
            <p className="text-xs">
              Don&#39;t have an account yet?{" "}
              <a href="/registration" className="text-teal cursor-pointer">
                Create account
              </a>
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
              className="bg-white-75 w-xs h-12 text-midnight rounded-lg cursor-pointer font-sans font-extrabold flex flex-row justify-center items-center mt-2 gap-2 relative z-10"
            >
              <FaMicrosoft className="text-2xl" />
              Microsoft
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default LogIn;
