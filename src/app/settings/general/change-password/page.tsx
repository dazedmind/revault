"use client";
import InputField from "@/app/component/InputField";
import WarningMessage from "@/app/component/WarningMessage";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

const ChangePassword = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Form states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (!oldPassword || !newPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        body: JSON.stringify({ oldPassword, newPassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Password changed successfully!");
        // Clear form
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        toast.error(data.error || "Failed to change password.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
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
      <div>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 hover:text-gray-700 flex flex-row items-center gap-1 md:ml-5 mt-5 cursor-pointer"
        >
          {showPassword ? <GoEyeClosed size={15} /> : <GoEye size={15} />}
          <span className="text-gray-500 hover:text-gray-700">Show Password</span>
        </button>
      </div>

      <WarningMessage
        containerClassName="w-auto h-auto md:w-xl md:ml-4.5 mt-5"
        textClassName=""
        message="Password should be minimum of 9 characters with a mix of uppercase letters, lowercase letters, numbers, and symbols."
      />

      <span>
        <Button
          className="bg-gradient-to-r from-gold-fg to-gold hover:bg-gradient-to-br font-inter cursor-pointer text-white text-base p-6 md:ml-4.5 mt-5"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </span>
    </div>
  );
};

export default ChangePassword;
