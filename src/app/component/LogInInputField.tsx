const LogInInputField = ({
  label,
  type,
  name,
  value,
  onChange,
  className = "",
}) => (
  <div
    className={`flex flex-col justify-center items-center relative mx-auto w-68 md:w-full mt-5 ${className}`}
  >
    <input
      className={`h-13 w-full block px-4 pb-2.5 pt-4 text-sm bg-white rounded-lg border-1 outline-1 
          appearance-none dark:text-midnight dark:focus:border-gold focus:outline-none focus:ring-0 focus:border-gold peer transition-colors duration-300 ${className}`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
    />
    <label
      htmlFor={name}
      className="absolute text-sm text-white-25 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
          bg-white px-2 peer-focus:px-2 peer-focus:text-gold peer-focus:dark:text-gold 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
          peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 transition-all duration-300 ease-in-out"
    >
      {label}
    </label>
  </div>
);

export default LogInInputField;
