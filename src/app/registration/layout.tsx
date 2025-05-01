"use client";
import React, { ReactNode } from "react";
import Background from "../component/Background";
import Header from "../component/Header";


const RegistrationLayout = ({ children }: { children: React.ReactNode }) => {
  // return (<RegistrationProvider>{children}</RegistrationProvider>;)
  return (
    <>
      <Background imageUrl="/login-bg.png" />

      <Header />

      <main>{children}</main>
    </>
  );
};

export default RegistrationLayout;
