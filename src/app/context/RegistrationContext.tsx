'use client';

import React, { createContext, useContext, useState } from "react";

// 1. Type your form data
interface RegistrationFormData {
  fullName: string;
  middleName: string;
  lastName: string;
  ext: string;
  studentNumber: string;
  course: string;
  email: string;
  password: string;
  confirmPassword: string;
  idProof: File | null;
  otp: string;
}

// 2. Type the context
interface RegistrationContextType {
  formData: RegistrationFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationFormData>>;
}

// 3. Default value
const defaultFormData: RegistrationFormData = {
  fullName: "",
  middleName: "",
  lastName: "",
  ext: "",
  studentNumber: "",
  course: "",
  email: "",
  password: "",
  confirmPassword: "",
  idProof: null,
  otp: "",
};

// 4. Create context with default (you can also throw error for missing provider)
const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

// 5. Custom hook
export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) throw new Error("useRegistration must be used within a RegistrationProvider");
  return context;
};

// 6. Provider
export const RegistrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<RegistrationFormData>(defaultFormData);

  return (
    <RegistrationContext.Provider value={{ formData, setFormData }}>
      {children}
    </RegistrationContext.Provider>
  );
};
