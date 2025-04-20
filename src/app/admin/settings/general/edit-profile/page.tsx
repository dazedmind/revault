import InputField from "@/app/component/InputField";
import Image from "next/image";
import avatar from "@/app/img/user.jpg";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import WarningMessage from "@/app/component/WarningMessage";
import { FaMicrosoft } from "react-icons/fa6";

const EditProfilePage = () => {
  return (
    <div className="flex flex-col pb-25 w-fit">
      <h1 className="text-2xl ml-1">Edit Profile</h1>
      {/* divider */}

      <div className="bg-dusk h-0.5 w-5xl mb-2 mt-2"></div>

      {/* Warning message from WarningMessage.tsx */}

      <div className="relative w-full mt-5">
        <WarningMessage
          containerClassName="w-xl"
          textClassName=" "
          message="Contact your admin if you want to request to change your Student Information"
        />

        {/* Image positioned absolutely */}
        <Image
          src={avatar}
          alt="Avatar"
          className="w-[124px] h-[124px] rounded-full absolute top-0 right-25"
        />
      </div>

      {/* Input Fields from InputField.tsx */}
      <InputField
        containerClassName="mt-5"
        label="Name"
        type="text"
        name="fullName"
        placeholder="John Allen Troy Valena"
        inputClassName="w-sm ml-5 h-14 "
        labelClassName="ml-5"
      />

      <InputField
        containerClassName="pt-4"
        label="Student Number"
        type="number"
        name="studentNumber"
        placeholder="202236115"
        inputClassName="w-sm ml-5 h-14 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        labelClassName="ml-5"
      />

      <InputField
        containerClassName="pt-4"
        label="Program"
        type="text"
        name="program"
        placeholder="Information Technology"
        inputClassName="w-sm ml-5 h-14 cursor-not-allowed"
        labelClassName="ml-5"
      />

      <span className="relative">
        <InputField
          containerClassName="pt-4"
          label="Email"
          type="email"
          name="email"
          placeholder="jatevalena2022@plm.edu.ph"
          inputClassName="w-sm ml-5 h-14 "
          labelClassName="ml-5"
          disabled={false}
        />

        <Button className="absolute bottom-0 right-30 bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-inter cursor-pointer text-white">
          Save Changes
        </Button>
      </span>


      <h1 className="text-2xl ml-1 mt-10">Manage Linked Accounts</h1>

      {/* divider */}
      <div className="bg-dusk h-0.5 w-5xl mb-2 mt-2"></div>

     <div className="w-3xl outline-2 bg-midnight  p-5 ml-5 rounded-md flex justify-between mt-5">
        <div className="flex flex-row justify-center items-center gap-2">
          <FaMicrosoft />
          <p className="text-white-100 text-base font-normal">Microsoft</p>
        </div>
        <Button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-inter cursor-pointer text-white w-[100px]">
          Link
        </Button>
      </div>


    </div>
  );
};

export default EditProfilePage;
