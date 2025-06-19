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
import DeveloperList from "../component/DeveloperList";

const LogIn = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

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
    <div className="font-Inter h-screen w-screen bg-white overflow-hidden relative">
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

              {/* Submit Button */}
              <div className="flex flex-row justify-center mt-5">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-68 md:w-xs h-12 rounded-lg bg-gradient-to-r from-[#8F8749] to-[#CFC369] hover:brightness-120 transition-all duration-300 font-inter cursor-pointer font-bold text-md md:text-lg text-white ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? "Logging in..." : "Log In"}
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
        <DeveloperList onClick={() => setShowAddModal(false)} />
      )}

      <Toaster />
    </div>
  );
};

export default LogIn;
