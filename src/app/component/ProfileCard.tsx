import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ProfileCard = ({ name, number, college, position, programOrDept, profile_picture }) => {

    return (
    <div className='bg-midnight dark:bg-secondary'>
      <div className='flex flex-col md:flex-row md:justify-between items-center gap-4 bg-dusk p-6 md:p-10 md:px-48'>

        <div className='flex flex-col md:flex-row align-middle text-center md:text-start items-center justify-between gap-2 md:gap-6'>
          <div>
            <Image src={profile_picture} alt="user profile" width={100} height={100} className='w-18 md:w-28 rounded-full' />
          </div>
          <div>
            <h1 className='text-lg md:text-3xl font-bold'>{name}</h1>
            <p className="text-xs md:text-lg">
              {position} {college} {position === "Librarian" || position === "Head Librarian" ? "" : `- ${programOrDept}`}
            </p>
            <p className="text-xs md:text-lg">{number}</p>

          </div>
        </div>

        <div>
          <Link href={` ${position === "Librarian" || position === "Head Librarian" ? `/admin/settings/general/edit-profile` : `/settings/general/edit-profile`} `}>
            <button className="py-2 px-4 outline-2 outline-white-50 rounded-md cursor-pointer hover:bg-white-50 hover:text-midnight">
              Edit Profile
            </button>
          </Link>
          </div>
      </div>
    </div>
  );
};
