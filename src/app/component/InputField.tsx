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
  <div
    className={`flex flex-col w-full cursor-not-allowed ${containerClassName}`}
  >
    <Label className={`text-sm mb-1 ${labelClassName}`}>{label}</Label>
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
