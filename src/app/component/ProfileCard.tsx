import Image from "next/image";
import React from "react";
import avatar from "../img/user.png";

export const ProfileCard = ({ name, number, college, position, programOrDept, role }) => {

    return (
    <div className='bg-midnight dark:bg-secondary'>
      <div className='flex flex-row justify-between bg-dusk p-10 md:px-72'>
        <div className='flex flex-row align-middle items-center gap-6'>
          <div>
            <Image src={avatar} alt="user profile" className='w-18 md:w-28 rounded-full' />
          </div>
          <div>
            <h1 className='text-lg md:text-3xl font-bold'>{name}</h1>
            <p>{number}</p>
            <p>
              {position} {college} {position === "Librarian" || position === "Head Librarian" ? "" : `- ${programOrDept}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
