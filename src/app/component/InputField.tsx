import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputField = ({
  label,
  type,
  name,
  placeholder,
  required = true,
  inputClassName = "",
  labelClassName = "",
  containerClassName = "",
  disabled = true,
}) => (
<<<<<<< HEAD
  <div className={`flex flex-col w-full ${containerClassName}`}>
    <Label className={`text-sm mb-1 ${labelClassName}`}>{label}</Label>
=======
  <div className={`flex flex-col w-full cursor-not-allowed ${containerClassName}`}>
    <Label className={`text-sm text-gray-300 mb-1 ${labelClassName}`}>
      {label}
    </Label>
>>>>>>> 753988d7e87acf664078284a852501849e2dad3d
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`${inputClassName}`}
      required={required}
      disabled={disabled}
    />
  </div>
);

export default InputField;
