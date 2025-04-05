import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { IoLogoMicrosoft } from "react-icons/io5";
import React from "react";

const ManageLinkedAccountsSettings = () => {
  return (
    <div>
      <h1 className="text-2xl ml-1">Edit Profile</h1>
      {/* divider */}
      <div className="bg-dusk h-0.5 w-5xl mb-2 mt-2"></div>

      <div className="w-3xl outline-2 bg-midnight  p-5 ml-5 rounded-md flex justify-between items-center mt-5">
        <div className="flex flex-row justify-center items-center gap-2">
          <FcGoogle />
          <p className="text-white-100 text-base font-normal">Google</p>
        </div>
        <Button className="bg-dusk font-inter cursor-pointer text-white w-[100px]">
          Unlink
        </Button>
      </div>

      <div className="w-3xl outline-2 bg-midnight  p-5 ml-5 rounded-md flex justify-between mt-5">
        <div className="flex flex-row justify-center items-center gap-2">
          <IoLogoMicrosoft />
          <p className="text-white-100 text-base font-normal">Microsoft</p>
        </div>
        <Button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-inter cursor-pointer text-white w-[100px]">
          Link
        </Button>
      </div>
    </div>
  );
};

export default ManageLinkedAccountsSettings;
