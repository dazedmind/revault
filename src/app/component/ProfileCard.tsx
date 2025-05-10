import Image from "next/image";
import React from "react";
import avatar from "../img/user.png";

export const ProfileCard = ({
  name,
  number,
  college,
  position,
  programOrDept,
  role,
}) => {
  return (
    <div className="flex flex-row justify-between dark:bg-card-foreground p-16 px-72">
      <div className="flex flex-row align-middle items-center gap-6">
        <div>
          <Image
            src={avatar}
            alt="user profile"
            className="w-28 rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p>{number}</p>
          <p>
            {position} {college}{" "}
            {position === "Librarian" || position === "Head Librarian"
              ? ""
              : `- ${programOrDept}`}
          </p>
        </div>
      </div>
    </div>
  );
};
