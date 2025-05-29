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
          <div className={`p-6 rounded-lg relative bg-dusk dark:bg-accent border-1 ${theme === 'light' ? ' border-white-50' : 'border-white-5'} w-full max-w-md relative z-10`}>
            <h1 className="text-2xl w-full py-4 absolute top-0 left-0 rounded-t-lg bg-tertiary font-bold text-gold text-center">
              System Developers
              <p className="text-sm text-white-5 italic text-center">Bachelor of Science in Information Technology</p>

            </h1>
            <div className="flex flex-col gap-4 mt-20">
              <div className="flex flex-row gap-4 items-center">
                <Image src={avatar} className="rounded-full" alt="Durante" width={40} height={40} />
                <span>
                  <h3 className="text-lg font-bold text-yale-blue">Durante, KC D.</h3>
                  <span className="flex flex-row flex-wrap gap-2">
                    <p className=" rounded-md text-xs p-2 w-fit bg-yale-blue/20 text-yale-blue">Programmer</p>
                    <p className=" rounded-md text-xs p-2 w-fit bg-gold/20 text-gold-fg">Documentation Member</p>
                  </span>
                </span>
             
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image src={avatar} className="rounded-full" alt="Durante" width={40} height={40} />
                <span>
                  <h3 className="text-lg font-bold text-yale-blue">Lastra, Kristhia Cayle F.</h3>
                  <span className="flex flex-row gap-2">
                    <p className=" rounded-md text-xs p-2 w-fit bg-green-500/20 text-green-600">Team Leader</p>
                    <p className=" rounded-md text-xs p-2 w-fit bg-gold/20 text-gold-fg">Documentation Head</p>
                  </span>
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image src={avatar} className="rounded-full" alt="Durante" width={40} height={40} />
                <span>
                  <h3 className="text-lg font-bold text-yale-blue">Insigne, Matthew Jacob B.</h3>
                  <span className="flex flex-row gap-2">
                    <p className=" rounded-md text-xs p-2 w-fit bg-yale-blue/20 text-yale-blue">Programmer</p>
                  </span>
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image src={avatar} className="rounded-full" alt="Durante" width={40} height={40} />
                <span>
                  <h3 className="text-lg font-bold text-yale-blue">Valeña, John Allen Troy E.</h3>
                  <span className="flex flex-row gap-2">
                    <p className=" rounded-md text-xs p-2 w-fit bg-yale-blue/20 text-yale-blue">Lead Developer</p>
                    <p className=" rounded-md text-xs p-2 w-fit bg-purple-highlight/20 text-purple-highlight">System Designer</p>
                  </span>
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image src={avatar} className="rounded-full" alt="Durante" width={40} height={40} />
                <span>
                  <h3 className="text-lg font-bold text-yale-blue">Yacub, Jetthro Karl C.</h3>
                  <span className="flex flex-row gap-2">
                    <p className=" rounded-md text-xs p-2 w-fit bg-gold/20 text-gold-fg">Documentation Member</p>
                  </span>
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
