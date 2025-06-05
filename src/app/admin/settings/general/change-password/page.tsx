"use client";
import InputField from "@/app/component/InputField";
import WarningMessage from "@/app/component/WarningMessage";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";   
import { getTokenClientSide } from "@/app/utils/getTokenClientSide";

const ChangePassword = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    // Validation
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmNewPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 9) {
      setError("Password should be minimum of 9 characters");
      return;
    }

    // Check password complexity
    const hasUppercase = /[A-Z]/.test(formData.newPassword);
    const hasLowercase = /[a-z]/.test(formData.newPassword);
    const hasNumbers = /\d/.test(formData.newPassword);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword);

    if (!hasUppercase || !hasLowercase || !hasNumbers || !hasSymbols) {
      setError("Password must contain uppercase letters, lowercase letters, numbers, and symbols");
      return;
    }

    if (!mounted) {
      return;
    }
    setLoading(true);

    try {
      const token = getTokenClientSide();
      if (!token) {
        setError("Authentication required. Please log in again.");
        return;
      }

      const response = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password changed successfully!");
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        });
      } else {
        setError(data.error || "Failed to change password");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <div className={`flex flex-col pb-10 w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 mb-8 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl ml-1">Change Password</h1>
      {/* divider */}
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>

      <form onSubmit={handleSubmit}>
        <InputField
          containerClassName="mt-5"
          label="Enter Old Password"
          type="password"
          name="oldPassword"
          placeholder="Enter Old Password"
          inputClassName="w-auto md:w-sm md:ml-5 h-14 mt-1 dark:bg-secondary"
          labelClassName="md:ml-5"
          disabled={loading}
          value={formData.oldPassword}
          onChange={handleInputChange}
        />

        <InputField
          containerClassName="mt-5"
          label="Enter New Password"
          type="password"
          name="newPassword"
          placeholder="Enter New Password"
          inputClassName="w-auto md:w-sm md:ml-5 h-14 mt-1 dark:bg-secondary"
          labelClassName="md:ml-5"
          disabled={loading}
          value={formData.newPassword}
          onChange={handleInputChange}
        />

        <InputField
          containerClassName="mt-5"
          label="Confirm New Password"
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          inputClassName="w-auto md:w-sm md:ml-5 h-14 mt-1 dark:bg-secondary"
          labelClassName="md:ml-5"
          disabled={loading}
          value={formData.confirmNewPassword}
          onChange={handleInputChange}
        />

        {/* Error Message */}
        {error && (
          <div className="w-auto h-auto md:w-xl md:ml-4.5 mt-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="w-auto h-auto md:w-xl md:ml-4.5 mt-5 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
      
        <WarningMessage
          containerClassName="w-auto h-auto md:w-xl md:ml-4.5 mt-5"
          textClassName=""
          message="Password should be minimum of 9 Characters with combination of uppercase letters, lowercase letters, numbers, and symbols."
        />
        
        <span>
          <Button 
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-gold-fg to-gold hover:bg-gradient-to-br font-inter cursor-pointer text-white text-base p-6 md:ml-4.5 mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </span>
      </form>
    </div>
  );
};

export default ChangePassword;