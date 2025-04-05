const LogInInputField = ({
  label,
  type,
  name,
  value,
  onChange,
  className = "",
}) => (
  <div
    className={`flex flex-col justify-center items-center relative w-full mt-5 ${className}`}
  >
    <input
      className={`h-54px block px-2.5 pb-2.5 pt-4 text-sm bg-midnight rounded-lg border-1 outline-2 
          appearance-none dark:text-white dark:focus:border-teal focus:outline-none focus:ring-0 focus:border-teal peer ${className}`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=""
    />
    <label
      htmlFor={name}
      className="absolute font-inter text-xs text-white-25 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
          bg-midnight dark:bg-midnight px-2 peer-focus:px-2 peer-focus:text-teal peer-focus:dark:text-teal peer-placeholder-shown:scale-100 
          peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 
          rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
    >
      {label}
    </label>
  </div>
);

export default LogInInputField;
