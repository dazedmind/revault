import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  required = true,
  onChange,
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
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${inputClassName}`}
      required={required}
      disabled={disabled}
    />
  </div>
);

export default InputField;
