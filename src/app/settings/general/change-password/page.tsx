"use client";

import InputField from "@/app/component/InputField";
import WarningMessage from "@/app/component/WarningMessage";
import { Button } from "@/components/ui/button";
import React from "react";

const ChangePassword = () => {
  return (
    <>
      <h1 className="text-2xl ml-1">Change</h1>
      {/* divider */}
      <div className="bg-dusk h-0.5 w-5xl mb-2 mt-2"></div>

      <InputField
        containerClassName="mt-5"
        label="Enter Old Password"
        type="password"
        name="oldPassword"
        placeholder="Enter Old Password"
        inputClassName="w-sm ml-5 h-14 mt-1"
        labelClassName="ml-5"
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
        inputClassName="w-sm ml-5 h-14 mt-1"
        labelClassName="ml-5"
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
        inputClassName="w-sm ml-5 h-14 mt-1"
        labelClassName="ml-5"
        disabled={false}
        value={undefined}
        onChange={undefined}
      />

      <WarningMessage
        containerClassName="w-xl ml-4.5 mt-5"
        textClassName=""
        message="Password should be minimum of 9 Characters with combination of uppercase letters, lowercase letters, numbers, and symbols."
      />

      <Button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-inter cursor-pointer text-base ml-4.5 mt-5">
        Save Changes
      </Button>
    </>
  );
};

export default ChangePassword;
