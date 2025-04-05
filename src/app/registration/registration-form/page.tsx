import Form from "@/app/component/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center z-10">
        <div className="flex flex-col justify-items-start z-10 w-xl">
          <h1 className="self-start text-4xl font-mono font-bold text-teal mb-2 z-10 ml-8">
            Create Account
          </h1>
          <Form link="/registration/upload-proof" />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
