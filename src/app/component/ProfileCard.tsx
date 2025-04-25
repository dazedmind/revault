import Image from "next/image";
import React from "react";
import avatar from "../img/user.png";

export const ProfileCard = () => {
  return (
    <div className="flex flex-row justify-between dark:bg-secondary p-16 px-72">
      <div className="flex flex-row align-middle items-center gap-6">
        <div>
          <Image
            src={avatar}
            alt="user profile"
            className="w-28 rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Juan Dela Cruz</h1>
          <p>202236115</p>
          <p>CISTM - IT</p>
        </div>
      </div>
    </div>
  );
};
