import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React from "react";

const TwoFactorAuthSettings = () => {
  return (
    <div className="pb-25">
      <h1 className="text-2xl ml-1">Two-Factor Authentication</h1>
      {/* divider */}
      <div className="bg-dusk h-0.5 w-5xl mb-2 mt-2"></div>

      <div className="w-3xl outline-2 bg-midnight  p-5 ml-5 rounded-md flex justify-between items-center mt-5">
        <div>
          <p className="text-white-100 text-base font-normal">
            Enable Two-Factor Authenticaiton
          </p>
          <p className="text-white-25 text-xs font-normal">
            Add an additional layer of security to your account
          </p>
        </div>
        <Switch />
      </div>

      <div className="w-3xl outline-2 bg-midnight  p-5 ml-5 rounded-md flex flex-col items-star mt-5">
        <p className="text-white-100 text-base font-normal">
          Set-up Authenticator App
        </p>
        <p className="text-white-100 text-base font-normal mt-5">
          Scan the QR Code
        </p>
        <p className="text-white-25 text-xs font-normal">
          Use an authenticator app to scan the QR code.
        </p>

        {/* Container for qr code/ Replace with qr code */}
        <div className="border-1 outline-2 w-3/20 h-30  mt-5 ml-5"></div>

        <p className="text-white-100 text-base font-normal mt-5">
          Verify code from app
        </p>
        <p className="text-white-25 text-xs font-normal">
          Enter the verification code from the app.
        </p>

        <div className="flex justify-between items-center">
          <Input
            type="text"
            placeholder="XXXXX"
            name="verification"
            className="mt-2 w-1/4"
          ></Input>

          <Button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-inter cursor-pointer text-white">
            Continue
          </Button>
        </div>
      </div>

      <div className="w-3xl outline-2 bg-midnight  p-5 ml-5 rounded-md flex justify-between items-center mt-5">
        <div>
          <p className="text-white-100 text-base font-normal">
            SMS Authenticaion
          </p>
          <p className="text-white-25 text-xs font-normal">
            Get one-time codes sent from your phone to complete account
            authentication
          </p>
        </div>
        <Switch />
      </div>
    </div>
  );
};

export default TwoFactorAuthSettings;
