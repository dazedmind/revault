"use client";
import InputField from "@/app/component/InputField";
import WarningMessage from "@/app/component/WarningMessage";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";   
import { getTokenClientSide } from "@/app/utils/getTokenClientSide";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { toast } from "sonner";

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
}

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
  const [showPassword, setShowPassword] = useState(false);

  // Validation states
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSymbol: false,
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Validate password requirements
  const validatePassword = (password: string): PasswordValidation => {
    return {
      minLength: password.length >= 9,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  // Check if password is valid
  const isPasswordValid = (validation: PasswordValidation): boolean => {
    return Object.values(validation).every(Boolean);
  };

  // Handle new password change
  useEffect(() => {
    if (formData.newPassword) {
      const validation = validatePassword(formData.newPassword);
      setPasswordValidation(validation);
    } else {
      setPasswordValidation({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSymbol: false,
      });
    }
  }, [formData.newPassword]);

  // Handle confirm password change
  useEffect(() => {
    if (formData.confirmNewPassword) {
      setPasswordsMatch(formData.newPassword === formData.confirmNewPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [formData.newPassword, formData.confirmNewPassword]);

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
      toast.error("All fields are required");
      return;
    }

    if (!isPasswordValid(passwordValidation)) {
      setError("New password does not meet all requirements");
      toast.error("New password does not meet all requirements");
      return;
    }

    if (!passwordsMatch) {
      setError("New passwords do not match");
      toast.error("New passwords do not match");
      return;
    }

    // Check if new password is same as old password
    if (formData.oldPassword === formData.newPassword) {
      setError("New password must be different from current password");
      toast.error("New password must be different from current password");
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
        toast.error("Authentication required. Please log in again.");
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
        toast.success("Password changed successfully!");
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        });
      } else {
        const errorMessage = data.error || "Failed to change password";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error changing password:", err);
      const errorMessage = "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
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

        <InputField
          containerClassName="mt-5"
          label="Enter Old Password"
          type={showPassword ? "text" : "password"}
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
          type={showPassword ? "text" : "password"}
          name="newPassword"
          placeholder="Enter New Password"
          inputClassName="w-auto md:w-sm md:ml-5 h-14 mt-1 dark:bg-secondary"
          labelClassName="md:ml-5"
          disabled={loading}
          value={formData.newPassword}
          onChange={handleInputChange}
        />

        {/* Password Requirements Indicator */}
        {formData.newPassword && (
          <div className="w-auto md:w-sm md:ml-5 mt-2">
            <div className="text-sm space-y-1">
              <div className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}`}>
                <span>{passwordValidation.minLength ? '✓' : '✗'}</span>
                <span>At least 9 characters</span>
              </div>
              <div className={`flex items-center gap-2 ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'}`}>
                <span>{passwordValidation.hasUppercase ? '✓' : '✗'}</span>
                <span>One uppercase letter</span>
              </div>
              <div className={`flex items-center gap-2 ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'}`}>
                <span>{passwordValidation.hasLowercase ? '✓' : '✗'}</span>
                <span>One lowercase letter</span>
              </div>
              <div className={`flex items-center gap-2 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                <span>{passwordValidation.hasNumber ? '✓' : '✗'}</span>
                <span>One number</span>
              </div>
              <div className={`flex items-center gap-2 ${passwordValidation.hasSymbol ? 'text-green-600' : 'text-red-600'}`}>
                <span>{passwordValidation.hasSymbol ? '✓' : '✗'}</span>
                <span>One symbol (!@#$%^&*)</span>
              </div>
            </div>
          </div>
        )}

        <InputField
          containerClassName="mt-5"
          label="Confirm New Password"
          type={showPassword ? "text" : "password"}
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          inputClassName="w-auto md:w-sm md:ml-5 h-14 mt-1 dark:bg-secondary"
          labelClassName="md:ml-5"
          disabled={loading}
          value={formData.confirmNewPassword}
          onChange={handleInputChange}
        />

        {/* Password Match Indicator */}
        {formData.confirmNewPassword && (
          <div className="w-auto md:w-sm md:ml-5 mt-2">
            <div className={`text-sm flex items-center gap-2 ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
              <span>{passwordsMatch ? '✓' : '✗'}</span>
              <span>{passwordsMatch ? 'Passwords match' : 'Passwords do not match'}</span>
            </div>
          </div>
        )}

        <div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-gray-700 flex flex-row items-center gap-1 md:ml-5 mt-5 cursor-pointer"
          >
            {showPassword ? <GoEyeClosed size={15} /> : <GoEye size={15} />}
            <span className="text-gray-500 hover:text-gray-700">
              {showPassword ? 'Hide Password' : 'Show Password'}
            </span>
          </button>
        </div>
      
        <WarningMessage
          containerClassName="w-auto h-auto md:w-xl md:ml-4.5 mt-5"
          textClassName=""
          message="Password should be minimum of 9 characters with combination of uppercase letters, lowercase letters, numbers, and symbols."
        />
        
        <span>
          <Button 
            type="submit"
            disabled={loading || !isPasswordValid(passwordValidation) || !passwordsMatch || !formData.oldPassword || !formData.newPassword || !formData.confirmNewPassword}
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