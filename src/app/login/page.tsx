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
import Image from "next/image";
import ulLogo from "../img/UL-logo-v2.png";

const LogIn = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Forgot Password States
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const [showForgotPasswordSuccess, setShowForgotPasswordSuccess] = useState(false);

  // useAntiCopy();

  const [formData, setFormData] = useState({
    idNumber: "",
    password: "",
  });

  const handleCloseErrorModal = () => {
    setIsLoading(false);
    setShowErrorModal(false);
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);

    e.preventDefault();

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

  // Forgot Password Handlers
  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
    setForgotPasswordEmail("");
    setForgotPasswordMessage("");
    setShowForgotPasswordSuccess(false);
  };

  const handleCloseForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
    setForgotPasswordEmail("");
    setForgotPasswordMessage("");
    setShowForgotPasswordSuccess(false);
    setIsForgotPasswordLoading(false);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsForgotPasswordLoading(true);
    setForgotPasswordMessage("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotPasswordEmail)) {
      setForgotPasswordMessage("Please enter a valid email address.");
      setIsForgotPasswordLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotPasswordEmail,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setShowForgotPasswordSuccess(true);
        setForgotPasswordMessage(result.message || "Password reset instructions have been sent to your email.");
      } else {
        setForgotPasswordMessage(result.error || "Failed to send reset instructions.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setForgotPasswordMessage("An error occurred. Please try again later.");
    } finally {
      setIsForgotPasswordLoading(false);
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
      <main className="flex flex-col justify-center mt-15 items-center relative z-10">
        <div className="w-80 md:w-96 m-5 p-4 h-auto rounded-xl outline-1 bg-white relative z-10">
          {/* Title */}
          <div className="flex flex-col justify-center gap-2 items-center pt-4">
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

              <div className="flex flex-row justify-end mt-5 mx-8 md:mx-0">
                <p 
                  className="text-xs text-gold font-bold cursor-pointer hover:underline"
                  onClick={handleForgotPasswordClick}
                >
                  Forgot password?
                </p>
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
          <p className="text-xs font-bold bg-yale-blue/30 text-yale-blue-fg p-2 rounded-lg mb-2">Beta Testing Version 1.2.0</p>
          <p className="text-xs">&copy; 2025 Revault. All rights reserved.</p>
          <p
            className="text-xs text-gold-fg font-bold cursor-pointer"
            onClick={() => setShowAddModal(true)}
          >
            Developers
          </p>
        </footer>
      </main>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-accent border-2 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gold mb-4">Login Failed</h2>
            <p className=" mb-6">{errorMessage}</p>
            <button
              className="cursor-pointer px-6 py-2 bg-gold hover:brightness-105 text-white rounded-lg font-semibold"
              onClick={handleCloseErrorModal}
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white border-2 rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
            {!showForgotPasswordSuccess ? (
              <form onSubmit={handleForgotPasswordSubmit}>
                <h2 className="text-2xl font-bold text-gold mb-4 text-center">Reset Password</h2>
                <p className="text-gray-600 mb-6 text-center text-sm">
                  Enter your email address and we&apos;ll send you instructions to reset your password.
                </p>
                
                <div className="mb-4">
                  <LogInInputField
                    label="Email Address"
                    type="email"
                    name="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="w-full"
                    
                  />
                </div>

                {forgotPasswordMessage && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{forgotPasswordMessage}</p>
                  </div>
                )}

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={handleCloseForgotPasswordModal}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    disabled={isForgotPasswordLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isForgotPasswordLoading || !forgotPasswordEmail.trim()}
                    className={`px-6 py-2 bg-gold hover:brightness-105 text-white rounded-lg font-semibold transition-all duration-300 ${
                      (isForgotPasswordLoading || !forgotPasswordEmail.trim()) 
                        ? 'opacity-70 cursor-not-allowed' 
                        : ''
                    }`}
                  >
                    {isForgotPasswordLoading ? "Sending..." : "Send Instructions"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gold mb-4">Instructions Sent!</h2>
                <p className="text-gray-600 mb-6 text-sm">
                  {forgotPasswordMessage}
                </p>
                <p className="text-gray-500 mb-6 text-xs">
                  If you don&apos;t receive an email within a few minutes, please check your spam folder.
                </p>
                <button
                  onClick={handleCloseForgotPasswordModal}
                  className="px-6 py-2 bg-gold hover:brightness-105 text-white rounded-lg font-semibold"
                >
                  Close
                </button>
              </div>
            )}
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