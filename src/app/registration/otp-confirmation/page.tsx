import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

const OTP = () => {
  return (
    <div className="flex-grow flex justify-center">
      <div className="flex flex-col items-center w-5xl mt-28">
        <h1 className="text-teal text-5xl font-bold font-mono">
          Check your email!
        </h1>
        <p className="text-xl text-center w-lg mt-3">
          We have sent an email to j********@plm.edu.ph. Check your inbox for
          the One-Time-Passcode (OTP).
        </p>

        <div className="flex flex-col items-start">
          <InputOTP maxLength={5}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm mt-2">Resend in 30s</p>
        </div>

        <button
          type="submit"
          className="font-bold mt-4 w-sm h-14 border-2 rounded-lg bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-sans cursor-pointer z-10"
        >
          <Link href="/registration/registration-form">Confirm</Link>
        </button>
      </div>
    </div>
  );
};

export default OTP;
