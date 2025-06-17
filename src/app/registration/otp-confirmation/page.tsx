"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function OTPContent() {
  const [otp, setOtp] = useState("");
  const [isSent, setIsSent] = useState(true); // Set to true since OTP was already sent from registration form
  const [timer, setTimer] = useState(30);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [role, setRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const emailFromQuery = searchParams.get("email");

  useEffect(() => {
    const storedRole = localStorage.getItem("userType") || "";
    setRole(storedRole.toUpperCase());
    
    const savedEmail = localStorage.getItem("regEmail");
    const finalEmail = savedEmail || emailFromQuery;
    
    if (finalEmail) {
      setUserEmail(finalEmail);
    }
    
    setIsInitialized(true);
  }, [emailFromQuery]);

  // Manual resend OTP function (only when user clicks resend button)
  const handleSendOTP = useCallback(async () => {
    if (!userEmail) return;

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, role: role.toUpperCase() }),
      });

      if (response.ok) {
        setIsSent(true);
        setTimer(30);
      }
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  }, [userEmail, role]);

  const handleConfirm = async () => {
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, otp, role: role.toUpperCase() }),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.verified) {
          const regRole = localStorage.getItem("userType");
          const regData = JSON.parse(localStorage.getItem("regForm") || "{}");

          regData.role = regRole.toUpperCase();

          const saveRes = await fetch("/api/save-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(regData),
          });

          if (saveRes.ok) {
            localStorage.removeItem("regForm");
            localStorage.removeItem("regEmail");
            setShowSuccessModal(true);
          } else {
            alert("Something went wrong saving info.");
          }
        } else {
          setShowFailureModal(true);
        }
      } else {
        setShowFailureModal(true);
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      setShowFailureModal(true);
    }
  };

  useEffect(() => {
    if (isSent && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isSent, timer]);

  // Show loading while initializing
  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-grow flex justify-center">
      <div className="flex flex-col items-center w-sm md:w-5xl mt-28">
        <h1 className="text-gold text-4xl md:text-5xl font-bold font-mono">
          Check your email!
        </h1>
        <p className="text-md md:text-xl text-center w-lg mt-3 text-wrap px-20 md:px-0">
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

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button
            disabled={timer > 0}
            onClick={handleSendOTP}
            className={`px-4 py-2 rounded-lg ${
              timer > 0
                ? "bg-white-25 text-white-50 cursor-not-allowed"
                : " border-2 border-gold hover:bg-gold transition-all text-gold duration-300 cursor-pointer"
            }`}
          >
            Resend OTP
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={otp.length !== 5}
            className={`font-bold w-sm h-14 rounded-lg font-sans z-10 px-6 text-white ${
              otp.length === 5
                ? "bg-gradient-to-r from-gold to-gold hover:bg-gradient-to-br cursor-pointer"
                : "bg-white-75 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-accent rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gold mb-4">
              Account Successfully Created!
            </h2>
            <p className="text-white-50 mb-6">
              You can now log in to your account.
            </p>
            <button
              className="px-6 py-2 bg-gold hover:brightness-125 transition-all duration-300 text-white rounded-lg font-semibold"
              onClick={() => router.push("../login")}
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {showFailureModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-accent rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gold mb-4">OTP Incorrect</h2>
            <p className=" mb-6">
              The OTP you entered is incorrect. Please try again.
            </p>
            <button
              className="cursor-pointer px-6 py-2 bg-gold hover:brightness-125 transition-all duration-300 text-white rounded-lg font-semibold"
              onClick={() => setShowFailureModal(false)}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OTP() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPContent />
    </Suspense>
  );
}