"use client";
import React from "react";
import { useTheme } from "next-themes";

const AboutRevault = () => {
  const { theme } = useTheme();

  return <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 pb-10 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl ml-1">About Revault</h1>
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>
      <div className="text-center">
        <p className="text-lg">Revault is a platform for PLM CISTM Students to browse archived research-based works</p>
        <p>All rights reserved.</p>
        <p>© 2025 Revault</p>
        <p>Developed by: Keyboard Warriors</p>
        <p>Version 1.1.0-alpha</p>
      </div>

  </div>;
};

export default AboutRevault;
