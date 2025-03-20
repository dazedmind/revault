"use client";

import Background from "@/components/ui/background";
import Header from "@/components/ui/header";
import Form from "@/components/ui/registration-form";

const Register = () => {
  return (
    <div>
      <Background imageUrl="/login-bg.png" />

      <Header />

      <main className="z-10">
        <div className="flex flex-col justify-center items-center z-10">
          <div className="flex flex-col justify-items-start z-10 w-xl">
            <h1 className="self-start text-4xl font-mono font-bold text-teal mb-2 z-10 ml-8">
              Create Account
            </h1>

            <Form />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
