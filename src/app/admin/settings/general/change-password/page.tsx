"use client";
import InputField from "@/app/component/InputField";
import WarningMessage from "@/app/component/WarningMessage";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";   

const ChangePassword = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`flex flex-col pb-10 w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 mb-8 mr-10 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl ml-1">Change Password</h1>
      {/* divider */}
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>

      <InputField
        containerClassName="mt-5"
        label="Enter Old Password"
        type="password"
        name="oldPassword"
        placeholder="Enter Old Password"
        inputClassName="w-auto md:w-sm md:ml-5 h-14 mt-1 dark:bg-secondary"
        labelClassName="md:ml-5"
        disabled={false}
        value={undefined}
        onChange={undefined}
      />

      <InputField
        containerClassName="mt-5"
        label="Enter New Password"
        type="password"
        name="newPassword"
        placeholder="Enter New Password"
        inputClassName="w-auto md:w-sm md:ml-5 h-14 mt-1 dark:bg-secondary"
        labelClassName="md:ml-5"
        disabled={false}
        value={undefined}
        onChange={undefined}
      />

      <InputField
        containerClassName="mt-5"
        label="Confirm New Password"
        type="password"
        name="confirmNewPassword"
        placeholder="Confirm New Password"
        inputClassName="w-auto md:w-sm md:ml-5 h-14 mt-1 dark:bg-secondary"
        labelClassName="md:ml-5"
        disabled={false}
        value={undefined}
        onChange={undefined}
      />

    
      <WarningMessage
        containerClassName="w-auto h-auto md:w-xl md:ml-4.5 mt-5"
        textClassName=""
        message="Password should be minimum of 9 Characters with combination of uppercase letters, lowercase letters, numbers, and symbols."
      />
      
      <span>
        <Button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-inter cursor-pointer text-white text-base p-6 md:ml-4.5 mt-5">
          Save Changes
        </Button>
      </span>

    </div>
  );
};

export default ChangePassword;
