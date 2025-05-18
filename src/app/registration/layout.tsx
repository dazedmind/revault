"use client";
import React, { ReactNode } from "react";
import Background from "../component/Background";
import Header from "../component/Header";


const RegistrationLayout = ({ children }: { children: React.ReactNode }) => {
  // return (<RegistrationProvider>{children}</RegistrationProvider>;)
  return (
    <>
      <div className="relative -z-10">
        <Background imageUrl="/login-bg.png" />
      </div>
      
      <div className="relative z-20">
        <Header />
      </div>

      <main>{children}</main>
    </>
  );
};

export default RegistrationLayout;
