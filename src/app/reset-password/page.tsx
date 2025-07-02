"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Background from "@/app/component/Background";
import Header from "@/app/component/Header";
import LogInInputField from "@/app/component/LogInInputField";
import { Button } from "@/components/ui/button";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Toaster, toast } from "sonner";

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
}

// Separate component for the form content that uses useSearchParams
const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSymbol: false,
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

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

  // Handle password validation
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

  // Handle confirm password validation
  useEffect(() => {
    if (formData.confirmPassword) {
      setPasswordsMatch(formData.newPassword === formData.confirmPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [formData.newPassword, formData.confirmPassword]);

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenValid(false);
        return;
      }

      try {
        const response = await fetch("/api/verify-reset-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();
        setTokenValid(result.valid);

        if (!result.valid) {
          setError(result.error || "Invalid or expired reset link");
        }
      } catch (error) {
        console.error("Token verification error:", error);
        setTokenValid(false);
        setError("Failed to verify reset link");
      }
    };

    verifyToken();
  }, [token]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (error) setError("");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!formData.newPassword || !formData.confirmPassword) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (!isPasswordValid(passwordValidation)) {
      setError("Password does not meet all requirements");
      setIsLoading(false);
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: formData.newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        toast.success("Password reset successfully!");
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(result.error || "Failed to reset password");
        toast.error(result.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while verifying token
  if (tokenValid === null) {
    return (
      <div className="w-80 md:w-96 p-8 rounded-xl bg-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
        <p className="text-gray-600">Verifying reset link...</p>
      </div>
    );
  }

  // Invalid token state
  if (tokenValid === false) {
    return (
      <div className="w-80 md:w-96 p-8 rounded-xl bg-white text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Reset Link</h2>
        <p className="text-gray-600 mb-6 text-sm">
          {error || "This password reset link is invalid or has expired. Please request a new one."}
        </p>
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-2 bg-gold hover:brightness-105 text-white rounded-lg font-semibold"
        >
          Back to Login
        </button>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="w-80 md:w-96 p-8 rounded-xl bg-white text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-green-600 mb-4">Password Reset Successful!</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Your password has been successfully updated. You can now log in with your new password.
        </p>
        <p className="text-gold font-semibold text-sm mb-6">
          Redirecting to login page in 3 seconds...
        </p>
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-2 bg-gold hover:brightness-105 text-white rounded-lg font-semibold"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Main reset password form
  return (
    <div className="w-80 md:w-96 m-5 p-6 h-auto rounded-xl bg-white relative z-10">
      {/* Title */}
      <div className="flex flex-col justify-center gap-2 items-center pt-4 mb-6">
        <h1 className="text-3xl font-mono font-bold text-gold">Reset Password</h1>
        <p className="text-gray-600 text-sm text-center">
          Enter your new password below
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password */}
        <div className="relative">
          <LogInInputField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="w-full"
        
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 bottom-1/3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showNewPassword ? <GoEyeClosed size={15} /> : <GoEye size={15} />}
          </button>
        </div>

        {/* Password Requirements */}
        {formData.newPassword && (
          <div className="bg-gray-50 p-4 rounded-lg text-xs">
            <p className="font-semibold text-gray-700 mb-2">Password Requirements:</p>
            <div className="space-y-1">
              <div className={`flex items-center ${passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}`}>
                <span className="mr-2">{passwordValidation.minLength ? '✓' : '✗'}</span>
                At least 9 characters
              </div>
              <div className={`flex items-center ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'}`}>
                <span className="mr-2">{passwordValidation.hasUppercase ? '✓' : '✗'}</span>
                One uppercase letter
              </div>
              <div className={`flex items-center ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'}`}>
                <span className="mr-2">{passwordValidation.hasLowercase ? '✓' : '✗'}</span>
                One lowercase letter
              </div>
              <div className={`flex items-center ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                <span className="mr-2">{passwordValidation.hasNumber ? '✓' : '✗'}</span>
                One number
              </div>
              <div className={`flex items-center ${passwordValidation.hasSymbol ? 'text-green-600' : 'text-red-600'}`}>
                <span className="mr-2">{passwordValidation.hasSymbol ? '✓' : '✗'}</span>
                One symbol (!@#$%^&*(),.?`&quot;`:{}|&lt;&gt;)
              </div>
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <div className="relative">
          <LogInInputField
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 bottom-1/3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <GoEyeClosed size={15} /> : <GoEye size={15} />}
          </button>
        </div>

        {/* Password Match Indicator */}
        {formData.confirmPassword && (
          <div className={`text-xs ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
            {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isLoading || !isPasswordValid(passwordValidation) || !passwordsMatch}
            className={`w-full h-12 rounded-lg bg-gradient-to-r from-[#8F8749] to-[#CFC369] hover:brightness-120 transition-all duration-300 font-inter font-bold text-lg text-white ${
              (isLoading || !isPasswordValid(passwordValidation) || !passwordsMatch) 
                ? 'opacity-70 cursor-not-allowed' 
                : ''
            }`}
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </Button>
        </div>

        {/* Back to Login */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-gold font-bold text-sm hover:underline"
          >
            ← Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

// Loading component for Suspense fallback
const LoadingResetForm = () => (
  <div className="w-80 md:w-96 p-8 rounded-xl bg-white text-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
    <p className="text-gray-600">Loading...</p>
  </div>
);

// Main page component
const ResetPasswordPage = () => {
  return (
    <div className="font-Inter h-screen w-screen bg-white overflow-hidden relative">
      <Background imageUrl="/login-bg.png" />
      
      <div className="relative z-20">
        <Header />
      </div>

      <main className="flex flex-col justify-center mt-15 items-center relative z-10">
        <Suspense fallback={<LoadingResetForm />}>
          <ResetPasswordForm />
        </Suspense>
      </main>

      <Toaster />
    </div>
  );
};

export default ResetPasswordPage;