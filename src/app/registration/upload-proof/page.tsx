"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { saveInformation } from "@/app/actions/saveInformation";
import { useSearchParams } from "next/navigation";

const UploadProof = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const data = {
      firstName: searchParams.get("fullName"),
      middleName: searchParams.get("middleName"),
      lastName: searchParams.get("lastName"),
      ext: searchParams.get("ext"),
      studentNumber: searchParams.get("studentNumber"),
      course: searchParams.get("course"),
      email: searchParams.get("email"),
      password: searchParams.get("password"),
      confirmPassword: searchParams.get("confirmPassword")
    };
  
    setFormData(data);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("middleName", formData.middleName);
    data.append("lastName", formData.lastName);
    data.append("ext", formData.ext);
    data.append("studentNumber", formData.studentNumber);
    data.append("course", formData.course);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);
  
    // if (proofFile) {
    //   data.append("proof", proofFile);
    // }
    await saveInformation(data);
  };

  if (!formData) return <p className="text-white">Loading...</p>;

  // const [proofFile, setProofFile] = useState<File | null>(null);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setProofFile(e.target.files[0]);
  //   }
  // };
  

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="self-start text-4xl font-mono font-bold text-teal">Create Profile</h1>

        <div className="w-xl bg-midnight rounded-lg outline-2 pt-6 pl-8 pr-8 pb-6">
          <h3 className=" text-2xl font-mono font-bold text-teal pb-2">Upload Identification card</h3>

          <div className="bg-dusk h-0.5 w-full"></div>

          <p className="font-inter text-sm text-left pt-4">
            To complete your account registration, please submit proof of identity using your PLM Identification Card.
          </p>

          <div className="flex items-center justify-center w-full pt-7">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 cursor-pointer border-teal rounded-xl border-dashed"
            >
              <input id="dropzone-file" type="file" className="hidden" /> 
              <div className="flex flex-col items-center justify-center">
                <p className="pb-1 pt-2 text-base ">Drag and Drop File or</p>
                <p className="text-base underline text-teal cursor-pointer">Choose File</p>
              </div>
            </label>
          </div>

          <button
            type="button"
            className="w-full mt-5 h-12 rounded-lg bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-inter cursor-pointer text-lg font-bold"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadProof;
