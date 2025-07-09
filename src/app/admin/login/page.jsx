"use client";

import Background from "@/app/component/Background";
import Header from "@/app/component/Header";
import React, { useEffect, useState } from "react";
import LogInInputField from "../../component/LogInInputField";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";

const AdminLogin = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showAccessDeniedModal, setShowAccessDeniedModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    idNumber: "",
    password: "",
  });

  const handleCloseErrorModal = () => {
    setIsLoading(false);
    setShowErrorModal(false);
  };

  const handleCloseAccessDeniedModal = () => {
    setIsLoading(false);
    setShowAccessDeniedModal(false);
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Debugging line to log form data before sending it
    console.log("Form Data: ", formData);

    // Send login request to the server
    const response = await fetch("/admin/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Content-Type set to JSON
      },
      body: JSON.stringify({
        idNumber: formData.idNumber, // Correctly using formData.idNumber
        password: formData.password, // Correctly using formData.password
      }),
    });


    if (response.status === 423) {
      setErrorMessage("Account locked. Please try again in 24 hours.");
      setShowAccessDeniedModal(true);
      return;
    }

    if (response.status === 404) {
      setErrorMessage("User not found. Please check your credentials.");
      setShowErrorModal(true);
      return;
    }
  
    if (response.status === 400) {
      setErrorMessage("Please enter your ID number and password.");
      setShowErrorModal(true);
      return;
    }


    // Check if response is OK (status 200-299)
    if (!response.ok) {
      // Try to parse the response to get specific error message
      const errorResult = await response.json().catch(() => null);
      
      if (errorResult && errorResult.status === "INACTIVE") {
        setErrorMessage("Account is disabled please contact your admin.");
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
      
      setShowErrorModal(true);
      setIsLoading(false);
      return;
    }

    // Try to parse the response body
    const result = await response.json().catch((error) => {
      console.error("Failed to parse JSON:", error);
      setIsLoading(false);
      return null; // return null if parsing fails
    });

    // Handle login result
    if (result.success) {
      // Store token and userType in localStorage if login is successful
      localStorage.setItem("authToken", result.token);
      localStorage.setItem("userType", result.user.role); // Use the role from the API response
      window.location.href = "/home"; // Redirect to home page
    } else {
      // Alert the user if login failed
      alert("Login failed: " + result.message);
      setIsLoading(false);
    }
  };

  // ALWAYS CLEARS TOKEN ON LOGIN PAGE LOAD
  useEffect(() => {
    localStorage.removeItem("authToken");
  });

  return (
    <div className="font-Inter h-screen w-screen overflow-hidden relative">
      {/* Background with Blur using background component */}
      <Background imageUrl="/login-bg.png" />

      {/* Header using header component */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex flex-col mt-20 items-center relative z-10">
      <div className={`w-80 md:w-96 m-5 p-6 h-auto rounded-md outline-1 bg-white relative z-10`}>
          <span className="absolute -top-10 -left-1 ">
              <Link href="/login" className="flex items-center gap-1 text-gold"><FaChevronLeft/> Back to regular sign in</Link>
              <h1 className="flex items-center"></h1>
          </span>
          {/* Title */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-mono font-bold text-yale-blue">ReVault</h1>

            <div className="text-center bg-gradient-to-r from-yale-blue-fg/80 to-yale-blue my-2 w-auto px-2 ">
              <h1 className="text-2xl font-mono font-bold text-white">
                for Librarian
              </h1>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col justify-center items-center">
            <form className="w-xs" onSubmit={handleSubmit}>
              <LogInInputField
                label="Employee ID"
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-68 md:w-xs "
              />

              <div className="col-span-2 w-full relative">
                <LogInInputField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-68 md:w-xs"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1/8 md:right-3 bottom-1/3 -translate-y-50% text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <GoEyeClosed size={15} /> : <GoEye size={15} />}
                </button>
              </div>

              {/* Submit Button */}
              <div className="flex flex-row justify-center mt-5">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-68 md:w-xs h-12 rounded-lg bg-gradient-to-r from-yale-blue-fg/70 to-yale-blue hover:bg-gradient-to-br font-inter cursor-pointer font-bold text-lg text-white ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-accent border-2 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-yale-blue mb-4">Login Failed</h2>
            <p className="mb-6">{errorMessage}</p>
            <button
              className="cursor-pointer px-6 py-2 bg-yale-blue hover:brightness-105 text-white rounded-lg font-semibold"
              onClick={handleCloseErrorModal}
            >
              Okay
            </button>
          </div>
        </div>
      )}

  {showAccessDeniedModal && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-accent border-2 rounded-2xl shadow-lg p-8 max-w-md w-full text-center animate-modal-in">
          <h2 className="text-2xl font-bold text-gold mb-4">Account Locked</h2>
          <p className=" mb-6">{errorMessage}</p>
          <button
            className="cursor-pointer px-6 py-2 bg-gold hover:brightness-105 text-white rounded-lg font-semibold"
            onClick={handleCloseAccessDeniedModal}
          >
            Okay
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default AdminLogin;
