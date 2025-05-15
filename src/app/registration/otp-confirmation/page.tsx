"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { useEffect, useState, useCallback } from "react";
import { generateOTP } from "@/lib/generateOtp"; // Make sure this exists
import { useSearchParams, useRouter } from "next/navigation";

const OTP = () => {
  // const [userEmail, setUserEmail] = useState("j********@plm.edu.ph"); // Replace or fetch from localStorage/cookie/session
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const role = localStorage.getItem("userType") || "";

  const searchParams = useSearchParams();
  const router = useRouter();
  const emailFromQuery = searchParams.get("email");

  const [userEmail, setUserEmail] = useState(emailFromQuery || "");

  const handleSendOTP = useCallback(async () => {
    const code = generateOTP();
    setGeneratedOTP(code);
    setIsSent(true);
    setTimer(30);

    await fetch("/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, otp: code, role: role }),
    });
  }, [userEmail, role]);

  const handleConfirm = async () => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, otp, role }),
    });

    if (res.ok) {
      const result = await res.json();
      if (result.verified) {
        // 🔥 STEP 1: Retrieve saved form data from localStorage
        const regRole = localStorage.getItem("userType"); // Assuming it's stored as a string
        const regData = JSON.parse(localStorage.getItem("regForm") || "{}");

        // 🔥 STEP 2: Send data to our new API route
        regData.role = regRole;

        const saveRes = await fetch("/api/save-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(regData), // ✅ Just send one object
        });

        if (saveRes.ok) {
          localStorage.removeItem("regForm");
          localStorage.removeItem("regEmail");
          setShowSuccessModal(true); // Show the success modal
        } else {
          alert("Something went wrong saving info.");
        }
      } else {
        setShowFailureModal(true); // Show the success modal
      }
    } else {
      setShowFailureModal(true); // Show the success modal
    }
  };

  useEffect(() => {
    if (isSent && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isSent, timer]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("regEmail");
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

  useEffect(() => {
    handleSendOTP(); // auto-send on mount
  }, [handleSendOTP]);

  return (
    <div className="flex-grow flex justify-center">
      <div className="flex flex-col items-center w-5xl mt-28">
        <h1 className="text-teal text-5xl font-bold font-mono">
          Check your email!
        </h1>
        <p className="text-xl text-center w-lg mt-3">
          We have sent an email to{" "}
          <span className="font-bold">{userEmail}</span>. Check your inbox for
          the One-Time-Passcode (OTP).
        </p>

        <div className="flex flex-col items-start mt-6">
          <InputOTP
            maxLength={5}
            value={otp}
            onChange={setOtp}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              {[0, 1, 2, 3, 4].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm mt-2 text-gray-400">Resend in {timer}s</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            disabled={timer > 0}
            onClick={handleSendOTP}
            className={`px-4 py-2 rounded-lg ${
              timer > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-dusk hover:bg-dusk-foreground text-white cursor-pointer"
            }`}
          >
            Resend OTP
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="font-bold w-sm h-14 rounded-lg bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-sans cursor-pointer z-10 px-6 text-white"
          >
            Confirm
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-midnight rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-teal mb-4">
              Account Successfully Created!
            </h2>
            <p className="text-white-50 mb-6">
              You can now log in to your account.
            </p>
            <button
              className="px-6 py-2 bg-teal hover:bg-teal-600 text-white rounded-lg font-semibold"
              onClick={() => router.push("../login")}
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {showFailureModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-midnight rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-teal mb-4">OTP Incorrect</h2>
            <p className="text-white-50 mb-6">
              The OTP you entered is incorrect. Please try again.
            </p>
            <button
              className="cursor-pointer px-6 py-2 bg-teal hover:bg-teal-600 text-white rounded-lg font-semibold"
              onClick={() => setShowFailureModal(false)}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OTP;
