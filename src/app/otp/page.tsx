import Background from "@/components/ui/background";
import Header from "@/components/ui/header";

const InputBox = () => {
  return (
    <input
      type="text"
      maxLength={1}
      className="relative z-10 border-2 h-[70px] w-[70px] rounded-md border-gray-200 bg-midnight text-white text-3xl font-bold text-center outline-none"
    />
  );
};

const OTP = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex justify-center">
        <div className="flex flex-col items-center w-5xl mt-28">
          <h1 className="text-teal text-5xl font-bold font-mono">
            Check your email!
          </h1>
          <p className="text-xl text-center w-lg mt-3">
            We have sent an email to j********@plm.edu.ph. Check your inbox for
            the One-Time-Passcode (OTP).
          </p>

          {/* Wrapper aligns "Resend in 30s" left of input boxes */}
          <div className="flex flex-col items-start mt-4">
            <div className="flex flex-row gap-2">
              <InputBox />
              <InputBox />
              <InputBox />
              <InputBox />
              <InputBox />
            </div>
            <p className="text-sm mt-2">Resend in 30s</p>
          </div>

          <button
            type="submit"
            className="font-bold mt-4 w-xs h-12 border-2 rounded-lg bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-sans cursor-pointer z-10"
          >
            Confirm
          </button>
        </div>
      </main>
    </div>
  );
};

export default OTP;
