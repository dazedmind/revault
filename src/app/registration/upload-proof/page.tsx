"use client";

import Link from "next/link";

const UploadProof = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="self-start text-4xl font-mono font-bold text-teal">
            Create Profile
          </h1>

          <div className="w-xl bg-midnight rounded-lg outline-2 pt-6 pl-8 pr-8 pb-6">
            <h3 className=" text-2xl font-mono font-bold text-teal pb-2">
              Upload Identification card
            </h3>

            <div className="bg-dusk h-0.5 w-full"></div>

            <p className="font-inter text-sm text-left pt-4">
              To complete your account registration, please submit proof of
              identity using your PLM Identification Card. Ensure the photo is
              taken in a well-lit environment with clear details for faster
              verification.
            </p>

            <div className="flex items-center justify-center w-full pt-7">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-32 border-2 cursor-pointer border-teal rounded-xl border-dashed"
              >
                <div className="flex flex-col items-center justify-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="25"
                    viewBox="0 0 19 25"
                    fill="none"
                  >
                    <path
                      d="M10.9375 6.64062V0H1.17188C0.522461 0 0 0.522461 0 1.17188V23.8281C0 24.4775 0.522461 25 1.17188 25H17.5781C18.2275 25 18.75 24.4775 18.75 23.8281V7.8125H12.1094C11.4648 7.8125 10.9375 7.28516 10.9375 6.64062ZM14.1201 17.188H10.9375V21.0942C10.9375 21.5259 10.5879 21.8755 10.1562 21.8755H8.59375C8.16211 21.8755 7.8125 21.5259 7.8125 21.0942V17.188H4.62988C3.93262 17.188 3.58447 16.3438 4.07959 15.8521L8.7876 11.1792C9.1123 10.8564 9.63672 10.8564 9.96143 11.1792L14.6694 15.8521C15.165 16.3438 14.8174 17.188 14.1201 17.188ZM18.4082 5.12695L13.6279 0.341797C13.4082 0.12207 13.1104 0 12.7979 0H12.5V6.25H18.75V5.95215C18.75 5.64453 18.6279 5.34668 18.4082 5.12695Z"
                      fill="#01B783"
                    />
                  </svg>

                  <p className="pb-1 pt-2 text-base ">Drag and Drop File or</p>
                  <p className="text-base underline text-teal cursor-pointer">
                    Choose File
                  </p>
                </div>

                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
            <button
              type="button"
              className="w-full mt-5 h-12 border-2 rounded-lg bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-inter cursor-pointer text-lg font-bold"
            >
              <Link href="/registration/otp-confirmation">Submit</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProof;
