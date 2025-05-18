"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import avatar from "../../../img/user.png"
import Image from "next/image";

const AboutRevault = () => {
  const { theme } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  
  const handleAddLibrarian = () => {
    setShowAddModal(true);
  };
    
  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 pb-10 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl ml-1">About Revault</h1>
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>
      <div className="text-center">
        <p className="text-lg">Revault is a platform for PLM CISTM Students to browse archived research-based works</p>
        <p>All rights reserved.</p>
        <p>© 2025 Revault</p>
        <p>Developed by: <span onClick={handleAddLibrarian} className="font-bold cursor-pointer hover:text-gold transition-all duration-300">Keyboard Warriors</span></p>
        <p>Version 1.3.0-alpha</p>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 flex items-center mx-4 justify-center z-50">
          <div className={`p-6 rounded-lg bg-dusk dark:bg-accent border-1 ${theme === 'light' ? ' border-white-50' : 'border-white-5'} w-full max-w-md relative z-10`}>
            <h1 className="text-2xl font-bold text-gold text-center">
              System Developers
            </h1>
              <p className="text-sm italic text-center mb-4">Bachelor of Science in Information Technology</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 items-center">
                <Image src={avatar} className="rounded-full" alt="Durante" width={40} height={40} />
                <span>
                  <h3 className="text-lg font-bold text-yale-blue">Durante, KC D.</h3>
                  <p className="text-sm italic">System Programmer and Documentation Member</p>
                </span>
             
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image src={avatar} className="rounded-full" alt="Durante" width={40} height={40} />
                <span>
                  <h3 className="text-lg font-bold text-yale-blue">Lastra, Kristhia Cayle F.</h3>
                  <p className="text-sm italic">Team Leader and Documentation Head</p>
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image src={avatar} className="rounded-full" alt="Durante" width={40} height={40} />
                <span>
                  <h3 className="text-lg font-bold text-yale-blue">Insigne, Matthew Jacob B.</h3>
                  <p className="text-sm italic">System Programmer</p>
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image src={avatar} className="rounded-full" alt="Durante" width={40} height={40} />
                <span>
                  <h3 className="text-lg font-bold text-yale-blue">Valeña, John Allen Troy E.</h3>
                  <p className="text-sm italic">System Programmer and Designer</p>
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image src={avatar} className="rounded-full" alt="Durante" width={40} height={40} />
                <span>
                  <h3 className="text-lg font-bold text-yale-blue">Yacub, Jetthro Karl C.</h3>
                  <p className="text-sm italic">Documentation Member</p>
                </span>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button onClick={() => setShowAddModal(false)} className="text-white cursor-pointer hover:brightness-110 hover:dark:text-white-75 transition-all duration-300 bg-gold p-2 px-4 rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutRevault;
