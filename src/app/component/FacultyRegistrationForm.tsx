"use client";

import { useState, useEffect } from "react";
import InputField from "./InputField";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation'
import WarningMessage from "./WarningMessage";
import { GoEye, GoEyeClosed } from "react-icons/go";


// FOR FACULTY REGISTRATION FORM
// This is the form that will be used for faculty registration. It includes fields for first name, middle name, last name, employee number, department, email address, and password. The form also includes a button to send an OTP to the user's email address.
export default function FacultyForm() {
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRequirementsError, setPasswordRequirementsError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [employeeNumberError, setEmployeeNumberError] = useState(false);
  const [employeeNumberUniqueError, setEmployeeNumberUniqueError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isCheckingEmployeeNumber, setIsCheckingEmployeeNumber] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("userType");
    if (storedRole) setRole(storedRole);
  }, []);

  const router = useRouter()
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    ext: "",
    employeeID: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const validateEmployeeNumber = (number) => {
    return /^\d{10}$/.test(number);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(plm\.edu\.ph|gmail\.com)$/;
    return emailRegex.test(email);
  };

  // Function to check if employee number is unique
  const checkEmployeeNumberUniqueness = async (employeeNumber) => {
    if (!validateEmployeeNumber(employeeNumber)) return;
    
    setIsCheckingEmployeeNumber(true);
    try {
      const response = await fetch('/api/check-faculty-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeNumber }),
      });

      if (!response.ok) {
        console.error('API response not ok:', response.status);
        setEmployeeNumberUniqueError(false);
        return;
      }

      const result = await response.json();
      console.log('API result:', result); // Debug log
      
      // Only set error if the API explicitly says it's not unique
      if (result.hasOwnProperty('isUnique')) {
        setEmployeeNumberUniqueError(!result.isUnique);
      } else {
        setEmployeeNumberUniqueError(false);
      }
    } catch (error) {
      console.error('Error checking employee number:', error);
      // Don't block the form if there's a network error
      setEmployeeNumberUniqueError(false);
    } finally {
      setIsCheckingEmployeeNumber(false);
    }
  };

  // Check if all required fields are filled
  useEffect(() => {
    const requiredFields = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      employeeID: formData.employeeID.trim(),
      email: formData.email.trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    const isAllFieldsFilled = Object.values(requiredFields).every(value => value !== "");
    const isPasswordValid = validatePassword(formData.password);
    const doPasswordsMatch = formData.password === formData.confirmPassword;
    const isDepartmentSelected = selectedDepartment !== "";
    const isEmployeeNumberValid = validateEmployeeNumber(formData.employeeID);
    const isEmailValid = validateEmail(formData.email);

    setIsFormValid(
      isAllFieldsFilled && 
      isPasswordValid && 
      doPasswordsMatch && 
      isDepartmentSelected && 
      isEmployeeNumberValid && 
      isEmailValid &&
      !employeeNumberUniqueError &&
      !isCheckingEmployeeNumber
    );
  }, [formData, selectedDepartment, employeeNumberUniqueError, isCheckingEmployeeNumber]);

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 9;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasMinLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Validate employee number
    if (name === 'employeeID') {
      const isFormatValid = validateEmployeeNumber(value);
      setEmployeeNumberError(!isFormatValid);
      
      // Reset uniqueness error when format is invalid
      if (!isFormatValid) {
        setEmployeeNumberUniqueError(false);
      } else {
        // Check uniqueness with debounce
        const timeoutId = setTimeout(() => {
          checkEmployeeNumberUniqueness(value);
        }, 500);
        
        return () => clearTimeout(timeoutId);
      }
    }

    // Validate email
    if (name === 'email') {
      setEmailError(!validateEmail(value));
    }

    // Check password match when either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      
      if (password && confirmPassword) {
        setPasswordError(password !== confirmPassword);
      }

      // Check password requirements when password field changes
      if (name === 'password') {
        setPasswordRequirementsError(!validatePassword(value));
      }
    }
  };

  // Updated handleNext function for FacultyRegistrationForm.tsx (Faculty Registration)
  const handleNext = async (e) => {
    setIsLoading(true);

    e.preventDefault(); 

    if (!isFormValid) {
      return;
    }

    // Check if passwords match before proceeding
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      setIsLoading(false);
      return;
    }

    // Check password requirements
    if (!validatePassword(formData.password)) {
      setPasswordRequirementsError(true);
      setIsLoading(false);
      return;
    }

    // Check employee number format
    if (!validateEmployeeNumber(formData.employeeID)) {
      setEmployeeNumberError(true);
      setIsLoading(false);
      return;
    }

    // Check email format
    if (!validateEmail(formData.email)) {
      setEmailError(true);
      setIsLoading(false);
      return;
    }

    // Final check for employee number uniqueness
    if (employeeNumberUniqueError) {
      return;
    }

    // Send OTP before navigating to confirmation
    try {
      const userRole = localStorage.getItem("userType") || "FACULTY";
      
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email,
          role: userRole.toUpperCase()
        }),
      });

      const result = await res.json();

      if (result.success) {
        // Save form data and email to localStorage
        localStorage.setItem("regEmail", formData.email);
        localStorage.setItem("regForm", JSON.stringify({
          ...formData,
          department: selectedDepartment,
        }));
        
        // Navigate to OTP confirmation page
        router.push("/registration/otp-confirmation");
      } else {
        alert("Failed to send OTP. Try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("OTP Send Error:", err);
      alert("Something went wrong while sending OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-accent border-2 p-6 md:p-10 rounded-lg shadow-lg mb-20">
      <form onSubmit={handleNext} className="grid grid-cols-2 gap-4 min-w-0">
        <h1 className="col-span-2 font-mono text-gold font-bold text-2xl">Personal Information</h1>
        <div className="bg-white-75 h-0.5 w-full col-span-2"></div>

        <InputField
          label="First Name*"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Juan"
          inputClassName="w-full"
          disabled={false}
        />

        <InputField
          label="Middle Name"
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          placeholder="Protacio"
          inputClassName="w-full"
          disabled={false}
          required={false}
        />

        <InputField
          label="Last Name*"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Dela Cruz"
          inputClassName="w-full"
          disabled={false}
        />

        <InputField
          label="Ext. (e.g. III, Sr.)"
          type="text"
          name="ext"
          value={formData.ext}
          onChange={handleChange}
          placeholder="Jr."
          inputClassName="w-1/3"
          required={false}
          disabled={false}
        />

        <h1 className="col-span-2 font-mono text-gold font-bold text-2xl">Employee Information</h1>
        <div className="bg-white-75 h-0.5 w-full col-span-2"></div>

        <InputField
          label="Employee Number*"
          type="text"
          name="employeeID"
          value={formData.employeeID}
          onChange={handleChange}
          placeholder="1023456789"
          inputClassName="w-full"
          disabled={false}
        />

        <div className="flex flex-col flex-grow">
          <Label className="text-sm mb-1">Department*</Label>
          <Select name="department" value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Computer Science">Computer Science Department</SelectItem>
                <SelectItem value="Information Technology">Information Technology Department</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <InputField
          label="Email Address*"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jprizal@plm.edu.ph"
          inputClassName="w-full"
          disabled={false}
        />

        {employeeNumberError && (
          <WarningMessage
            containerClassName="col-span-2 w-auto h-auto"
            textClassName="text-red-500"
            message="Employee number must be exactly 10 digits."
          />
        )}

        {employeeNumberUniqueError && (
          <WarningMessage
            containerClassName="col-span-2 w-auto h-auto"
            textClassName="text-red-500"
            message="This employee number is already registered."
          />
        )}

        {isCheckingEmployeeNumber && (
          <WarningMessage
            containerClassName="col-span-2 w-auto h-auto"
            textClassName="text-blue-500"
            message="Checking existing employee number..."
          />
        )}

        {emailError && (
          <WarningMessage
            containerClassName="col-span-2 w-auto h-auto"
            textClassName="text-red-500"
            message="Email must be a valid PLM email (@plm.edu.ph) or Gmail address (@gmail.com)."
          />
        )}

        <h1 className="col-span-2 font-mono text-gold font-bold text-2xl">Password</h1>
        <div className="bg-white-75 h-0.5 w-full col-span-2"></div>

        {/* Passwords */}
        <div className="col-span-2 w-full relative">
          <InputField
            label="Create Password*"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            inputClassName="w-full pr-10"
            disabled={false}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className=" absolute right-3 bottom-1/5 -translate-y-50% text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {showPassword ? <GoEyeClosed size={15} /> : <GoEye size={15} />}
          </button>
        </div>

        <div className="col-span-2 w-full relative">
          <InputField
           label="Confirm Password*"
           type={showConfirmPassword ? "text" : "password"}
           name="confirmPassword"
           value={formData.confirmPassword}
           onChange={handleChange}
           placeholder="Confirm Password"
           inputClassName="w-full pr-10"
           disabled={false}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className=" absolute right-3 bottom-1/5 -translate-y-50% text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {showConfirmPassword ? <GoEyeClosed size={15} /> : <GoEye size={15} />}
          </button>
        </div>

        {/* Password requirements error */}
        {passwordRequirementsError && (
          <WarningMessage
            containerClassName="col-span-2 w-auto h-auto"
            textClassName="text-red-500"
            message="Password must be at least 9 characters long and include uppercase letters, lowercase letters, numbers, and symbols."
          />
        )}

        {/* Password match warning */}
        {passwordError && (
          <WarningMessage
            containerClassName="col-span-2 w-auto h-auto"
            textClassName="text-red-500"
            message="Passwords does not match."
          />
        )}

        <input type="hidden" id="role" name="role" value={role} />

        <div className="col-span-2">
          <button
            onClick={handleNext}
            disabled={!isFormValid || isLoading}
            className={`block text-center w-full text-white mt-4 py-2 rounded-md font-inter text-lg font-bold ${
              isFormValid && !isLoading
              ? "bg-gradient-to-r from-gold to-gold hover:bg-gradient-to-br cursor-pointer" 
              : "bg-gray-400 cursor-not-allowed opacity-70"
          }`}
          >
            {isLoading ? "Please wait..." : "Next"}
            </button>
        </div>
      </form>
    </div>
  );
}