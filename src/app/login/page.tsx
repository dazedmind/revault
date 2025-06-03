"use client";

import Background from "@/app/component/Background";
import Header from "@/app/component/Header";
import React, { useEffect, useState } from "react";
import LogInInputField from "../component/LogInInputField";
import { Button } from "@/components/ui/button";
import useAntiCopy from "../hooks/useAntiCopy";
import { Toaster } from "sonner";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import Image from "next/image";
import avatar from "../img/user.png";

const LogIn = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [theme, setTheme] = useState("light");

  // useAntiCopy();

  const [formData, setFormData] = useState({
    idNumber: "",
    password: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debugging line to log form data before sending it
    console.log("Form Data: ", formData);

    // Send login request to the server
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Content-Type set to JSON
      },
      body: JSON.stringify({
        idNumber: formData.idNumber, // Correctly using formData.idNumber
        password: formData.password, // Correctly using formData.password
      }),
    });

    // Check if response is OK (status 200-299)
    if (!response.ok) {
      setErrorMessage("Login failed. Please check your credentials.");
      setShowErrorModal(true);
      return;
    }

    // Try to parse the response body
    const result = await response.json().catch((error) => {
      console.error("Failed to parse JSON:", error);
      return null; // return null if parsing fails
    });

    // Parse the response from the API (assuming it's JSON)

    // Handle login result
    if (result.success) {
      // Store token in localStorage if login is successful
      localStorage.setItem("authToken", result.token); // 🔐 Store the token
      localStorage.setItem("userType", result.user.role); // 🔐 Store the token
      window.location.href = "/home"; // Redirect to home page
    } else {
      // Alert the user if login failed
      alert("Login failed: " + result.message);
    }
  };

  // ALWAYS CLEARS TOKEN ON LOGIN PAGE LOAD
  useEffect(() => {
    localStorage.removeItem("authToken");
  });

  return (
    <div className="font-Inter h-screen w-screen bg-tertiary overflow-hidden relative">
      {/* Background with Blur using background component */}
      <Background imageUrl="/login-bg.png" />

      {/* Header using header component */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex flex-col justify-center mt-20 items-center relative z-10">
        <div className="w-80 md:w-96 m-5 p-6 h-auto rounded-xl outline-1 bg-white relative z-10">
          {/* Title */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-mono font-bold text-gold">ReVault</h1>
          </div>

          {/* Form */}
          <div className="flex flex-col justify-center items-center">
            <form className="w-xs" onSubmit={handleSubmit}>
              <LogInInputField
                label="Student/Employee Number"
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-60 md:w-xs"
              />

              {/* <LogInInputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-68 md:w-xs"
              /> */}

              <div className="col-span-2 w-full relative">
                <LogInInputField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-68 md:w-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1/8 md:right-3 bottom-1/3 -translate-y-50% text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? (
                    <GoEyeClosed size={15} />
                  ) : (
                    <GoEye size={15} />
                  )}
                </button>
              </div>

              {/* Remember Password & Forgot Password */}
              <div className="flex flex-row justify-end items-end m-5 md:my-4 md:mx-1 mt-5">
                <p className="font-inter text-gold font-bold text-xs text-align cursor-pointer">
                  Forgot Password?
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex flex-row justify-center mt-5">
                <Button
                  type="submit"
                  className="w-68 md:w-xs h-12 rounded-lg bg-gradient-to-r from-[#8F8749] to-[#CFC369] hover:brightness-120 transition-all duration-300 font-inter cursor-pointer font-bold text-md md:text-lg text-white"
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
              <a
                href="/registration/user-selection"
                className="text-gold font-bold cursor-pointer"
              >
                Create account
              </a>
            </p>
          </div>
        </div>

        <footer className="flex flex-col justify-center items-center z-150">
          <p className="text-xs">&copy; 2025 Revault. All rights reserved.</p>
          <p
            className="text-xs text-gold-fg font-bold cursor-pointer"
            onClick={() => setShowAddModal(true)}
          >
            Developers
          </p>
        </footer>
      </main>

      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-accent border-2 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gold mb-4">Login Failed</h2>
            <p className=" mb-6">{errorMessage}</p>
            <button
              className="cursor-pointer px-6 py-2 bg-gold hover:brightness-105 text-white rounded-lg font-semibold"
              onClick={() => setShowErrorModal(false)}
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 flex items-center mx-4 justify-center z-50">
          <div
            className={`p-6 rounded-lg relative bg-dusk dark:bg-accent border-1 ${theme === "light" ? " border-white-50" : "border-white-5"} w-full max-w-md relative z-10`}
          >
            <h1 className="text-2xl w-full py-4 absolute top-0 left-0 rounded-t-lg bg-tertiary font-bold text-yale-blue text-center">
              System Developers
              <p className="text-sm text-white-5 italic text-center">
                Bachelor of Science in Information Technology
              </p>
            </h1>
            <div className="flex flex-col gap-4 mt-20">
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={avatar}
                  className="rounded-full"
                  alt="Durante"
                  width={40}
                  height={40}
                />
                <span>
                  <h3 className="text-lg font-bold text-midnight">
                    Durante, KC D.
                  </h3>
                  <span className="flex flex-row flex-wrap gap-2">
                    <p className=" rounded-md text-xs p-1.5 w-fit bg-gold/20 text-gold-fg">
                      Programmer
                    </p>
                    <p className=" rounded-md text-xs p-1.5 w-fit bg-gold/20 text-gold-fg">
                      Documentation Member
                    </p>
                  </span>
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={avatar}
                  className="rounded-full"
                  alt="Durante"
                  width={40}
                  height={40}
                />
                <span>
                  <h3 className="text-lg font-bold text-midnight">
                    Lastra, Kristhia Cayle F.
                  </h3>
                  <span className="flex flex-row gap-2">
                    <p className=" rounded-md text-xs p-1.5 w-fit bg-gold/20 text-gold-fg">
                      Team Leader
                    </p>
                    <p className=" rounded-md text-xs p-1.5 w-fit bg-gold/20 text-gold-fg">
                      Documentation Head
                    </p>
                  </span>
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={avatar}
                  className="rounded-full"
                  alt="Durante"
                  width={40}
                  height={40}
                />
                <span>
                  <h3 className="text-lg font-bold text-midnight">
                    Insigne, Matthew Jacob B.
                  </h3>
                  <span className="flex flex-row gap-2">
                    <p className=" rounded-md text-xs p-1.5 w-fit bg-gold/20 text-gold-fg">
                      System Programmer
                    </p>
                  </span>
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={avatar}
                  className="rounded-full"
                  alt="Durante"
                  width={40}
                  height={40}
                />
                <span>
                  <h3 className="text-lg font-bold text-midnight">
                    Valeña, John Allen Troy E.
                  </h3>
                  <span className="flex flex-row gap-2">
                    <p className=" rounded-md text-xs p-1.5 w-fit bg-gold/20 text-gold-fg">
                      Lead Developer
                    </p>
                    <p className=" rounded-md text-xs p-1.5 w-fit bg-gold/20 text-gold-fg">
                      System Designer
                    </p>
                  </span>
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={avatar}
                  className="rounded-full"
                  alt="Durante"
                  width={40}
                  height={40}
                />
                <span>
                  <h3 className="text-lg font-bold text-midnight">
                    Yacub, Jetthro Karl C.
                  </h3>
                  <span className="flex flex-row gap-2">
                    <p className=" rounded-md text-xs p-1.5 w-fit bg-gold/20 text-gold-fg">
                      Documentation Member
                    </p>
                  </span>
                </span>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white cursor-pointer hover:brightness-110 hover:dark:text-white-75 transition-all duration-300 bg-gold p-2 px-4 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default LogIn;
