"use client";
import InputField from "@/app/component/InputField";
import WarningMessage from "@/app/component/WarningMessage";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

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

  // Form states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
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
  const [formError, setFormError] = useState("");

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
    if (newPassword) {
      const validation = validatePassword(newPassword);
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
  }, [newPassword]);

  // Handle confirm password change
  useEffect(() => {
    if (confirmNewPassword) {
      setPasswordsMatch(newPassword === confirmNewPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [newPassword, confirmNewPassword]);

  // Clear form error when user starts typing
  useEffect(() => {
    if (formError && (oldPassword || newPassword || confirmNewPassword)) {
      setFormError("");
    }
  }, [oldPassword, newPassword, confirmNewPassword, formError]);

  const handleSave = async () => {
    // Reset form error
    setFormError("");

    // Validate all fields are filled
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setFormError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    // Validate password requirements
    if (!isPasswordValid(passwordValidation)) {
      setFormError("New password does not meet all requirements.");
      toast.error("New password does not meet all requirements.");
      return;
    }

    // Validate passwords match
    if (!passwordsMatch) {
      setFormError("New passwords do not match.");
      toast.error("New passwords do not match.");
      return;
    }

    // Check if new password is same as old password
    if (oldPassword === newPassword) {
      setFormError("New password must be different from current password.");
      toast.error("New password must be different from current password.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setFormError("Authentication required. Please login again.");
        toast.error("Authentication required. Please login again.");
        return;
      }

      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        body: JSON.stringify({ oldPassword, newPassword }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success("Password changed successfully!");
        // Clear form
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setFormError("");
      } else {
        const errorMessage = data.error || "Failed to change password.";
        setFormError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage = "Something went wrong. Please try again.";
      setFormError(errorMessage);
      toast.error(errorMessage);
      console.error("Change password error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div
      className={`flex flex-col pb-10 w-auto ${
        theme === "light"
          ? "bg-secondary border-white-50"
          : "bg-midnight"
      } p-6 mb-10 rounded-xl border-1 border-white-5`}
    >
      <h1 className="text-2xl ml-1">Change Password</h1>

      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`} />

      {/* Error Message */}
      {formError && (
        <div className="w-auto h-auto md:w-xl md:ml-4.5 mt-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {formError}
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
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
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
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      {/* Password Requirements Indicator */}
      {newPassword && (
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
        label="Confirm New Password"
        containerClassName="mt-5"
        labelClassName="md:ml-5"
        type={showPassword ? "text" : "password"}
        name="confirmNewPassword"
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        inputClassName="w-auto md:w-sm md:ml-5 h-14 mt-1 dark:bg-secondary"
        disabled={loading}
      />

      {/* Password Match Indicator */}
      {confirmNewPassword && (
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
        message="Password should be minimum of 9 characters with a mix of uppercase letters, lowercase letters, numbers, and symbols."
      />

      <span>
        <Button
          className="bg-gradient-to-r from-gold-fg to-gold hover:bg-gradient-to-br font-inter cursor-pointer text-white text-base p-6 md:ml-4.5 mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSave}
          disabled={loading || !isPasswordValid(passwordValidation) || !passwordsMatch || !oldPassword || !newPassword || !confirmNewPassword}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </span>
    </div>
  );
};

export default ChangePassword;