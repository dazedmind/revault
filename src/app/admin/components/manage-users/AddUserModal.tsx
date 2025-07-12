// app/admin/components/manage-users/AddUserModal.tsx
"use client";
import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { X, AlertCircle, CheckCircle } from "lucide-react";

interface NewUser {
  fullName: string;
  middleName: string;
  lastName: string;
  extension: string;
  employeeID: string;
  email: string;
  userAccess: string;
  contactNum: string;
  position: string;
  status: string;
}

interface FormErrors {
  fullName?: string;
  lastName?: string;
  email?: string;
  employeeID?: string;
  userAccess?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
}

interface AddUserModalProps {
  theme: string;
  show: boolean;
  newUser: NewUser;
  newUserPasswords: { password: string; confirmPassword: string };
  newUserPasswordError: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onAddUser: () => void;
}

export default function AddUserModal({
  theme,
  show,
  newUser,
  newUserPasswords,
  newUserPasswordError,
  onInputChange,
  onPasswordChange,
  onCancel,
  onAddUser,
}: AddUserModalProps) {
  // Form validation states
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      minLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSymbol: false,
    });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  // Field interaction tracking
  const [touchedFields, setTouchedFields] = useState<{
    [key: string]: boolean;
  }>({});

  // Role validation states
  const [roleValidationMessage, setRoleValidationMessage] = useState("");
  const [roleValidationError, setRoleValidationError] = useState("");

  // Employee ID validation states
  const [employeeIDChecking, setEmployeeIDChecking] = useState(false);
  const [employeeIDExists, setEmployeeIDExists] = useState(false);

  // RBAC pattern - Get current user role from localStorage
  const currentUserRole =
    typeof window !== "undefined" ? localStorage.getItem("userType") : null;

  // Password validation function
  const validatePassword = (password: string): PasswordValidation => {
    return {
      minLength: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Employee ID validation function
  const validateEmployeeID = (id: string): boolean => {
    return /^\d{10}$/.test(id);
  };

  // Employee ID validation function with database check
  const checkEmployeeIDExists = async (
    employeeID: string,
  ): Promise<boolean> => {
    if (!validateEmployeeID(employeeID)) {
      console.log("Employee ID format invalid:", employeeID);
      return false;
    }

    console.log("Starting database check for employee ID:", employeeID);

    try {
      const response = await fetch("/admin/api/check-employee-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeID }),
      });

      console.log("API response status:", response.status);

      if (!response.ok) {
        console.error(
          "API request failed:",
          response.status,
          response.statusText,
        );
        return false;
      }

      const data = await response.json();
      console.log("Employee ID check API response:", data);

      const exists = !data.isUnique;
      console.log("Employee ID exists in database:", exists);

      return exists; // Returns true if employee ID exists
    } catch (error) {
      console.error("Error checking employee ID:", error);
      return false;
    }
  };

  // Handle field blur (when user leaves a field)
  const handleFieldBlur = (fieldName: string) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  // Handle employee ID change with database validation
  const handleEmployeeIDChange = useCallback(async (value: string) => {
    console.log("handleEmployeeIDChange called with:", value);
    if (validateEmployeeID(value)) {
      setEmployeeIDChecking(true);
      try {
        const exists = await checkEmployeeIDExists(value);
        console.log("Employee ID exists:", exists);
        setEmployeeIDExists(exists);

        // Mark field as touched when validation completes so error can show
        if (exists) {
          setTouchedFields((prev) => ({ ...prev, employeeID: true }));
        }
      } catch (error) {
        console.error("Error checking employee ID:", error);
        setEmployeeIDExists(false);
      } finally {
        setEmployeeIDChecking(false);
      }
    } else {
      setEmployeeIDExists(false);
      setEmployeeIDChecking(false);
    }
  }, []);

  const validateRoleSelection = useCallback(async () => {
    if (!newUser.userAccess) return;

    const roleMapping: { [key: string]: string } = {
      Admin: "ADMIN",
      "Admin Assistant": "ASSISTANT",
      "Librarian-in-Charge": "LIBRARIAN",
    };

    const role = roleMapping[newUser.userAccess];
    if (!role) return;

    try {
      const response = await fetch("/admin/api/role-validation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "validateNewUser",
          role: role,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to validate role");
      }

      const data = await response.json();

      if (data.success && data.validation) {
        if (data.validation.isValid) {
          setRoleValidationMessage(data.validation.message);
          setRoleValidationError("");
        } else {
          setRoleValidationError(data.validation.message);
          setRoleValidationMessage("");
        }
      }
    } catch (error) {
      console.error("Role validation error:", error);
      setRoleValidationError("Failed to validate role availability");
      setRoleValidationMessage("");
    }
  }, [newUser.userAccess]);

  const validateForm = useCallback(() => {
    const errors: FormErrors = {};

    // Required field validations
    if (!newUser.fullName.trim()) {
      errors.fullName = "First name is required";
    }

    if (!newUser.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!newUser.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(newUser.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!newUser.employeeID.trim()) {
      errors.employeeID = "Employee ID is required";
    } else if (!validateEmployeeID(newUser.employeeID)) {
      errors.employeeID = "Employee ID must be exactly 10 digits";
    }

    if (!newUser.userAccess) {
      errors.userAccess = "User access level is required";
    }

    if (!newUserPasswords.password) {
      errors.password = "Password is required";
    } else if (!Object.values(passwordValidation).every(Boolean)) {
      errors.password = "Password does not meet requirements";
    }

    if (!newUserPasswords.confirmPassword) {
      errors.confirmPassword = "Please confirm password";
    } else if (!passwordsMatch) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (roleValidationError) {
      errors.role = roleValidationError;
    }

    setFormErrors(errors);

    // Form is valid if no errors and role validation passes
    setIsFormValid(
      Object.keys(errors).length === 0 &&
        !roleValidationError &&
        roleValidationMessage !== "",
    );
  }, [
    newUser,
    newUserPasswords,
    passwordValidation,
    passwordsMatch,
    roleValidationError,
    roleValidationMessage,
  ]);

  // Validate password in real-time
  useEffect(() => {
    if (newUserPasswords.password) {
      const validation = validatePassword(newUserPasswords.password);
      setPasswordValidation(validation);
    } else {
      setPasswordValidation({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSymbol: false,
      });
    }
  }, [newUserPasswords.password]);

  // Check if passwords match
  useEffect(() => {
    setPasswordsMatch(
      newUserPasswords.password === newUserPasswords.confirmPassword ||
        newUserPasswords.confirmPassword === "",
    );
  }, [newUserPasswords.password, newUserPasswords.confirmPassword]);

  // Validate role selection when role changes
  useEffect(() => {
    if (newUser.userAccess) {
      validateRoleSelection();
    } else {
      setRoleValidationMessage("");
      setRoleValidationError("");
    }
  }, [newUser.userAccess, validateRoleSelection]);

  // Check employee ID when it changes (with debounce)
  useEffect(() => {
    if (newUser.employeeID && validateEmployeeID(newUser.employeeID)) {
      console.log(
        "Employee ID changed, setting up check for:",
        newUser.employeeID,
      );

      // Debounce the API call
      const timeoutId = setTimeout(() => {
        console.log(
          "Debounce timeout reached, checking employee ID:",
          newUser.employeeID,
        );
        handleEmployeeIDChange(newUser.employeeID);
      }, 500);

      return () => {
        console.log("Clearing timeout for employee ID check");
        clearTimeout(timeoutId);
      };
    } else {
      console.log("Employee ID invalid or empty, clearing states");
      setEmployeeIDExists(false);
      setEmployeeIDChecking(false);
    }
  }, [newUser.employeeID, handleEmployeeIDChange]);

  // Overall form validation
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // Reset form when modal closes
  useEffect(() => {
    if (!show) {
      setTouchedFields({});
      setFormErrors({});
      setRoleValidationMessage("");
      setRoleValidationError("");
      setEmployeeIDExists(false);
      setEmployeeIDChecking(false);
    }
  }, [show]);

  // Early return AFTER all hooks
  if (!show) return null;

  // Function to get automatic position based on user access
  const getPositionFromUserAccess = (userAccess: string): string => {
    const positionMapping: { [key: string]: string } = {
      Admin: "Chief Librarian",
      "Admin Assistant": "Chief's Secretary",
      "Librarian-in-Charge": "Librarian-in-Charge",
    };
    return positionMapping[userAccess] || "";
  };

  // Get the automatic position for the current user access
  const automaticPosition = getPositionFromUserAccess(newUser.userAccess);

  const handleSubmit = () => {
    console.log("Submit button clicked, isFormValid:", isFormValid);

    // Mark all fields as touched on submit attempt
    setTouchedFields({
      fullName: true,
      lastName: true,
      email: true,
      employeeID: true,
      userAccess: true,
      password: true,
      confirmPassword: true,
    });

    // Force validation check
    setTimeout(() => {
      const currentlyValid =
        newUser.fullName.trim() &&
        newUser.lastName.trim() &&
        newUser.email.trim() &&
        validateEmail(newUser.email) &&
        newUser.employeeID.trim() &&
        validateEmployeeID(newUser.employeeID) &&
        !employeeIDExists &&
        !employeeIDChecking &&
        newUser.userAccess &&
        newUserPasswords.password &&
        Object.values(passwordValidation).every(Boolean) &&
        newUserPasswords.confirmPassword &&
        passwordsMatch &&
        !roleValidationError;

      console.log("Form validation on submit:", {
        fullName: newUser.fullName.trim(),
        lastName: newUser.lastName.trim(),
        email: newUser.email.trim(),
        emailValid: validateEmail(newUser.email),
        employeeID: newUser.employeeID.trim(),
        employeeIDValid: validateEmployeeID(newUser.employeeID),
        employeeIDExists,
        employeeIDChecking,
        userAccess: newUser.userAccess,
        password: newUserPasswords.password,
        passwordValid: Object.values(passwordValidation).every(Boolean),
        confirmPassword: newUserPasswords.confirmPassword,
        passwordsMatch,
        roleValidationError,
        currentlyValid,
      });

      if (currentlyValid) {
        console.log("Form is valid, calling onAddUser");
        onAddUser();
      } else {
        console.log("Form is not valid, cannot submit");
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 flex items-center bg-black/50 backdrop-blur-sm justify-center z-50">
      <div
        className={`p-6 rounded-lg bg-accent border-1 ${
          theme === "light" ? "border-white-50" : "border-white-5"
        } w-full max-w-md relative z-10 max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Close Button - Fixed Position */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-10 p-1 rounded-full hover:bg-tertiary cursor-pointer transition-colors z-30"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gold">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={newUser.fullName}
                    onChange={onInputChange}
                    onBlur={() => handleFieldBlur("fullName")}
                    className={`w-full p-2 pl-3 bg-accent border rounded-md text-sm h-[45px] ${
                      touchedFields.fullName && formErrors.fullName
                        ? "border-red-500"
                        : "border-[#444]"
                    }`}
                    required
                  />
                  {touchedFields.fullName && formErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={newUser.middleName}
                    onChange={onInputChange}
                    className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={newUser.lastName}
                    onChange={onInputChange}
                    onBlur={() => handleFieldBlur("lastName")}
                    className={`w-full p-2 pl-3 bg-accent border rounded-md text-sm h-[45px] ${
                      touchedFields.lastName && formErrors.lastName
                        ? "border-red-500"
                        : "border-[#444]"
                    }`}
                    required
                  />
                  {touchedFields.lastName && formErrors.lastName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ext. (e.g. III, Sr.)
                  </label>
                  <input
                    type="text"
                    name="extension"
                    value={newUser.extension}
                    onChange={onInputChange}
                    className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
                  />
                </div>
              </div>
            </div>

            {/* Email Field - I accidentally removed this! */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={onInputChange}
                onBlur={() => handleFieldBlur("email")}
                className={`w-full p-2 pl-3 bg-accent border rounded-md text-sm h-[45px] ${
                  touchedFields.email && formErrors.email
                    ? "border-red-500"
                    : "border-[#444]"
                }`}
                required
              />
              {touchedFields.email && formErrors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {formErrors.email}
                </p>
              )}
            </div>

            <div
              className={`h-0.5 w-auto my-4 ${
                theme === "light" ? "bg-white-50" : "bg-white-5"
              }`}
            ></div>

            {/* Employee Information Section */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gold">
                Employee Information
              </h3>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    name="employeeID"
                    value={newUser.employeeID}
                    onChange={onInputChange}
                    onBlur={() => handleFieldBlur("employeeID")}
                    placeholder="e.g. 1234567890"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className={`w-full p-2 pl-3 bg-accent border rounded-md text-sm h-[45px] ${
                      (touchedFields.employeeID && formErrors.employeeID) ||
                      employeeIDExists
                        ? "border-red-500"
                        : "border-[#444]"
                    }`}
                    required
                  />
                  {/* Real-time validation indicators */}
                  {employeeIDChecking ? (
                    <p className="text-blue-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Checking employee ID...
                    </p>
                  ) : employeeIDExists ? (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Employee ID already exists in database
                    </p>
                  ) : touchedFields.employeeID && formErrors.employeeID ? (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.employeeID}
                    </p>
                  ) : newUser.employeeID &&
                    validateEmployeeID(newUser.employeeID) &&
                    !employeeIDExists &&
                    !employeeIDChecking ? (
                    <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Employee ID is available
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400 mt-1">
                      Must be exactly 10 digits starting with 1
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    User Access *
                  </label>
                  <div className="relative">
                    <select
                      name="userAccess"
                      value={newUser.userAccess}
                      onChange={onInputChange}
                      className={`w-full p-2 pl-3 bg-accent border rounded-md text-sm h-[45px] pr-8 appearance-none ${
                        formErrors.userAccess
                          ? "border-red-500"
                          : "border-[#444]"
                      }`}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Librarian-in-Charge">
                        Librarian-in-Charge
                      </option>
                      <option value="Admin Assistant">Admin Assistant</option>
                      {/* Only show Admin option if current user is ADMIN */}
                      {currentUserRole === "ADMIN" && (
                        <option value="Admin">Admin</option>
                      )}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  {formErrors.userAccess && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.userAccess}
                    </p>
                  )}
                </div>

                {/* Role Validation Messages */}
                {roleValidationMessage && (
                  <div
                    className={`p-3 rounded-lg border ${
                      theme === "light"
                        ? "bg-green-50 border-green-200"
                        : "bg-green-950/20 border-green-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-700 dark:text-green-300">
                        {roleValidationMessage}
                      </span>
                    </div>
                  </div>
                )}

                {roleValidationError && (
                  <div
                    className={`p-3 rounded-lg border ${
                      theme === "light"
                        ? "bg-red-50 border-red-200"
                        : "bg-red-950/20 border-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-700 dark:text-red-300">
                        {roleValidationError}
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={automaticPosition}
                    readOnly
                    className="w-full p-2 pl-3 border border-[#444] rounded-md text-sm h-[45px] cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Automatically set based on user access level
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contactNum"
                    value={newUser.contactNum}
                    onChange={onInputChange}
                    placeholder="e.g. +639123456789"
                    className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Optional contact information
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`h-0.5 w-auto my-4 ${
                theme === "light" ? "bg-white-50" : "bg-white-5"
              }`}
            ></div>

            {/* Password Section */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gold">
                Account Security
              </h3>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={newUserPasswords.password}
                    onChange={onPasswordChange}
                    onBlur={() => handleFieldBlur("password")}
                    className={`w-full p-2 pl-3 bg-accent border rounded-md text-sm h-[45px] ${
                      touchedFields.password && formErrors.password
                        ? "border-red-500"
                        : "border-[#444]"
                    }`}
                    required
                  />
                  {touchedFields.password && formErrors.password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.password}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={newUserPasswords.confirmPassword}
                    onChange={onPasswordChange}
                    className={`w-full p-2 pl-3 bg-accent border rounded-md text-sm h-[45px] ${
                      formErrors.confirmPassword
                        ? "border-red-500"
                        : "border-[#444]"
                    }`}
                    required
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Requirements */}
              {newUserPasswords.password && (
                <div
                  className={`mb-4 p-3 rounded-lg border ${
                    theme === "light"
                      ? "bg-gray-50 border-gray-200"
                      : "bg-gray-900/20 border-gray-700"
                  }`}
                >
                  <p className="text-sm font-medium mb-2">
                    Password Requirements:
                  </p>
                  <div className="space-y-1">
                    {Object.entries({
                      "At least 6 characters": passwordValidation.minLength,
                      "One uppercase letter": passwordValidation.hasUppercase,
                      "One lowercase letter": passwordValidation.hasLowercase,
                      "One number": passwordValidation.hasNumber,
                      "One special character": passwordValidation.hasSymbol,
                    }).map(([requirement, met]) => (
                      <div
                        key={requirement}
                        className="flex items-center gap-2"
                      >
                        {met ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-gray-400" />
                        )}
                        <span
                          className={`text-xs ${met ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}`}
                        >
                          {requirement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 bg-accent sticky bottom-0">
              <button
                onClick={onCancel}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  theme === "light"
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={employeeIDChecking}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  !employeeIDChecking &&
                  newUser.fullName.trim() &&
                  newUser.lastName.trim() &&
                  newUser.email.trim() &&
                  validateEmail(newUser.email) &&
                  newUser.employeeID.trim() &&
                  validateEmployeeID(newUser.employeeID) &&
                  !employeeIDExists &&
                  newUser.userAccess &&
                  newUserPasswords.password &&
                  newUserPasswords.password.length >= 6 &&
                  /[A-Z]/.test(newUserPasswords.password) &&
                  /[a-z]/.test(newUserPasswords.password) &&
                  /\d/.test(newUserPasswords.password) &&
                  /[!@#$%^&*(),.?":{}|<>]/.test(newUserPasswords.password) &&
                  newUserPasswords.confirmPassword &&
                  newUserPasswords.password ===
                    newUserPasswords.confirmPassword &&
                  !roleValidationError
                    ? "bg-gold text-white hover:bg-gold/90 cursor-pointer"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
              >
                {employeeIDChecking ? "Checking..." : "Add User"}
              </button>

              {/* Debug Info */}
              {/* <div className="text-xs text-gray-500 p-2 bg-gray-100 dark:bg-gray-800 rounded">
                Debug: fullName: {newUser.fullName.trim() ? "✓" : "✗"} |
                lastName: {newUser.lastName.trim() ? "✓" : "✗"} | email:{" "}
                {newUser.email.trim() && validateEmail(newUser.email)
                  ? "✓"
                  : "✗"}{" "}
                | employeeID:{" "}
                {newUser.employeeID.trim() &&
                validateEmployeeID(newUser.employeeID) &&
                !employeeIDExists &&
                !employeeIDChecking
                  ? "✓"
                  : "✗"}{" "}
                | userAccess: {newUser.userAccess ? "✓" : "✗"} | password:{" "}
                {newUserPasswords.password &&
                Object.values(passwordValidation).every(Boolean)
                  ? "✓"
                  : "✗"}{" "}
                | confirmPassword:{" "}
                {newUserPasswords.confirmPassword && passwordsMatch ? "✓" : "✗"}{" "}
                | roleValidation: {!roleValidationError ? "✓" : "✗"} |
                employeeIDExists: {employeeIDExists ? "TRUE" : "FALSE"} |
                employeeIDChecking: {employeeIDChecking ? "TRUE" : "FALSE"} |
                hasEmployeeIDError: {formErrors.employeeID ? "TRUE" : "FALSE"}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
