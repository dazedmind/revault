"use client";

import Background from "@/app/component/Background";
import Header from "@/app/component/Header";
import React, { useEffect, useState } from "react";
import LogInInputField from "../component/LogInInputField";
import { Button } from "@/components/ui/button";
import { LogInCheckBox } from "../component/LogInCheckBox";
import { FaMicrosoft } from "react-icons/fa6";

const LogIn = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        password: formData.password,  // Correctly using formData.password
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
      localStorage.setItem('authToken', result.token); // 🔐 Store the token
      localStorage.setItem('userType', result.user.role); // 🔐 Store the token
      window.location.href = '/home'; // Redirect to home page
    } else {
      // Alert the user if login failed
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
                label="Student/Employee Number"
                type="text"
                name="idNumber"
                value={formData.idNumber}
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
              <a href="/registration/user-selection" className="text-teal cursor-pointer">
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

      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-midnight rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-teal mb-4">Login Failed</h2>
            <p className="text-white-50 mb-6">{errorMessage}</p>
            <button
              className="px-6 py-2 bg-teal hover:bg-teal-600 text-white rounded-lg font-semibold"
              onClick={() => setShowErrorModal(false)}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogIn;
