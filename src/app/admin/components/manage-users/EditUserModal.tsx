// app/admin/components/manage-users/EditUserModal.tsx
"use client";
import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { X, AlertCircle, CheckCircle } from "lucide-react";

interface User {
  id: number;
  fullName: string;
  middleName: string;
  lastName: string;
  extension: string;
  employeeID: string;
  email: string;
  role: string;
  status: string;
  userAccess: string;
  contactNum: string;
  position: string;
  name: string;
}

interface FormErrors {
  fullName?: string;
  lastName?: string;
  email?: string;
  employeeID?: string;
  userAccess?: string;
  newPassword?: string;
  confirmPassword?: string;
  role?: string;
  status?: string;
}

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
}

interface EditUserModalProps {
  theme: string;
  show: boolean;
  user: User | null;
  passwords: { newPassword: string; confirmPassword: string };
  passwordError: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSave: () => void;
  isEditingSelf: boolean;
}

export default function EditUserModal({
  theme,
  show,
  user,
  passwords,
  passwordError,
  onInputChange,
  onPasswordChange,
  onCancel,
  onSave,
  isEditingSelf,
}: EditUserModalProps) {
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
  const [statusValidationMessage, setStatusValidationMessage] = useState("");
  const [statusValidationError, setStatusValidationError] = useState("");

  // Employee ID validation states
  const [employeeIDChecking, setEmployeeIDChecking] = useState(false);
  const [employeeIDExists, setEmployeeIDExists] = useState(false);

  // Store original values for comparison
  const [originalUser, setOriginalUser] = useState<User | null>(null);

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
      return false;
    }

    try {
      const response = await fetch("/admin/api/check-employee-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeID,
          excludeUserId: user?.id, // Exclude current user from check
        }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      return !data.isUnique; // Returns true if employee ID exists
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
  const handleEmployeeIDChange = useCallback(
    async (value: string) => {
      if (validateEmployeeID(value)) {
        setEmployeeIDChecking(true);
        try {
          const exists = await checkEmployeeIDExists(value);
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
    },
    [user?.id],
  );

  const validateRoleSelection = useCallback(async () => {
    if (!user || !originalUser) return;

    const roleMapping: { [key: string]: string } = {
      Admin: "ADMIN",
      "Admin Assistant": "ASSISTANT",
      "Librarian-in-Charge": "LIBRARIAN",
    };

    const newRole = roleMapping[user.userAccess];
    const originalRole = roleMapping[originalUser.userAccess];

    if (!newRole) return;

    // Only validate if role is actually changing
    if (newRole !== originalRole) {
      try {
        const response = await fetch("/admin/api/role-validation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "validateRoleChange",
            role: newRole,
            userId: user.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to validate role change");
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
        setRoleValidationError("Failed to validate role change");
        setRoleValidationMessage("");
      }
    } else {
      // No role change, clear validation messages
      setRoleValidationMessage("");
      setRoleValidationError("");
    }
  }, [user, originalUser]);

  const validateStatusSelection = useCallback(async () => {
    if (!user || !originalUser) return;

    const roleMapping: { [key: string]: string } = {
      Admin: "ADMIN",
      "Admin Assistant": "ASSISTANT",
      "Librarian-in-Charge": "LIBRARIAN",
    };

    const role = roleMapping[user.userAccess];
    const originalStatus = originalUser.status || "ACTIVE";
    const newStatus = user.status || "ACTIVE";

    if (!role) return;

    // Only validate if status is changing from INACTIVE to ACTIVE
    if (originalStatus !== "ACTIVE" && newStatus === "ACTIVE") {
      try {
        const response = await fetch("/admin/api/role-validation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "validateStatusChange",
            role: role,
            status: newStatus,
            userId: user.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to validate status change");
        }

        const data = await response.json();

        if (data.success && data.validation) {
          if (data.validation.isValid) {
            setStatusValidationMessage(data.validation.message);
            setStatusValidationError("");
          } else {
            setStatusValidationError(data.validation.message);
            setStatusValidationMessage("");
          }
        }
      } catch (error) {
        console.error("Status validation error:", error);
        setStatusValidationError("Failed to validate status change");
        setStatusValidationMessage("");
      }
    } else {
      // No problematic status change, clear validation messages
      setStatusValidationMessage("");
      setStatusValidationError("");
    }
  }, [user, originalUser]);

  const validateForm = useCallback(() => {
    if (!user) return;

    const errors: FormErrors = {};

    // Required field validations (only show errors for touched fields)
    if (touchedFields.fullName && !user.fullName.trim()) {
      errors.fullName = "First name is required";
    }

    if (touchedFields.lastName && !user.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (touchedFields.email) {
      if (!user.email.trim()) {
        errors.email = "Email is required";
      } else if (!validateEmail(user.email)) {
        errors.email = "Please enter a valid email address";
      }
    }

    if (touchedFields.employeeID) {
      if (!user.employeeID.trim()) {
        errors.employeeID = "Employee ID is required";
      } else if (!validateEmployeeID(user.employeeID)) {
        errors.employeeID = "Employee ID must be exactly 10 digits";
      } else if (employeeIDExists) {
        errors.employeeID = "Employee ID already exists in database";
      }
    }

    if (touchedFields.userAccess && !user.userAccess) {
      errors.userAccess = "User access level is required";
    }

    // Password validation (only if password is being changed)
    if (passwords.newPassword || passwords.confirmPassword) {
      if (
        touchedFields.newPassword &&
        passwords.newPassword &&
        !Object.values(passwordValidation).every(Boolean)
      ) {
        errors.newPassword = "Password does not meet requirements";
      }

      if (
        touchedFields.confirmPassword &&
        passwords.confirmPassword &&
        !passwordsMatch
      ) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    // Role and status validation errors
    if (roleValidationError) {
      errors.role = roleValidationError;
    }

    if (statusValidationError) {
      errors.status = statusValidationError;
    }

    setFormErrors(errors);

    // Form is valid if no errors
    setIsFormValid(Object.keys(errors).length === 0 && !employeeIDChecking);
  }, [
    user,
    passwords,
    passwordValidation,
    passwordsMatch,
    roleValidationError,
    statusValidationError,
    touchedFields,
    employeeIDExists,
    employeeIDChecking,
  ]);

  // Set original user when modal opens
  useEffect(() => {
    if (show && user) {
      setOriginalUser({ ...user }); // Store original values for comparison
    }
  }, [show, user]);

  // Validate password in real-time
  useEffect(() => {
    if (passwords.newPassword) {
      const validation = validatePassword(passwords.newPassword);
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
  }, [passwords.newPassword]);

  // Check if passwords match
  useEffect(() => {
    setPasswordsMatch(
      passwords.newPassword === passwords.confirmPassword ||
        passwords.confirmPassword === "",
    );
  }, [passwords.newPassword, passwords.confirmPassword]);

  // Validate role selection when role changes
  useEffect(() => {
    if (user && originalUser) {
      validateRoleSelection();
    }
  }, [user?.userAccess, validateRoleSelection]);

  // Validate status selection when status changes
  useEffect(() => {
    if (user && originalUser) {
      validateStatusSelection();
    }
  }, [user?.status, validateStatusSelection]);

  // Check employee ID when it changes (with debounce)
  useEffect(() => {
    if (user && user.employeeID && validateEmployeeID(user.employeeID)) {
      // Debounce the API call
      const timeoutId = setTimeout(() => {
        handleEmployeeIDChange(user.employeeID);
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setEmployeeIDExists(false);
      setEmployeeIDChecking(false);
    }
  }, [user?.employeeID, handleEmployeeIDChange]);

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
      setStatusValidationMessage("");
      setStatusValidationError("");
      setEmployeeIDExists(false);
      setEmployeeIDChecking(false);
    }
  }, [show]);

  // Early return AFTER all hooks
  if (!show || !user) return null;

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
  const automaticPosition = getPositionFromUserAccess(user.userAccess);

  // Check if current user can assign Admin role
  const canAssignAdminRole = currentUserRole === "ADMIN";

  const handleSubmit = () => {
    // Mark all fields as touched on submit attempt
    setTouchedFields({
      fullName: true,
      lastName: true,
      email: true,
      employeeID: true,
      userAccess: true,
      newPassword: true,
      confirmPassword: true,
    });

    if (isFormValid) {
      onSave();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center bg-black/50 backdrop-blur-sm justify-center z-50">
      <div
        className={`p-6 rounded-lg bg-accent border-1 ${
          theme === "light" ? "border-white-50" : "border-white-5"
        } w-full max-w-md relative z-10 max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Sticky Close Button */}
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
                    value={user.fullName}
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
                    value={user.middleName}
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
                    value={user.lastName}
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
                    value={user.extension}
                    onChange={onInputChange}
                    className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
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
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    name="employeeID"
                    value={user.employeeID}
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
                  ) : user.employeeID &&
                    validateEmployeeID(user.employeeID) &&
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
                      value={user.userAccess}
                      onChange={onInputChange}
                      onBlur={() => handleFieldBlur("userAccess")}
                      disabled={isEditingSelf} // Users cannot change their own role
                      className={`w-full p-2 pl-3 bg-accent border rounded-md text-sm h-[45px] pr-8 appearance-none ${
                        touchedFields.userAccess && formErrors.userAccess
                          ? "border-red-500"
                          : "border-[#444]"
                      } ${
                        isEditingSelf
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      }`}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Librarian-in-Charge">
                        Librarian-in-Charge
                      </option>
                      <option value="Admin Assistant">Admin Assistant</option>
                      {/* Only show Admin option if current user is ADMIN */}
                      {canAssignAdminRole && (
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
                  {touchedFields.userAccess && formErrors.userAccess && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.userAccess}
                    </p>
                  )}
                  {isEditingSelf && (
                    <p className="text-xs text-yellow-500 mt-1">
                      💡 Cannot change your own role
                    </p>
                  )}
                </div>
              </div>

              {/* Role Validation Messages */}
              {roleValidationMessage && !isEditingSelf && (
                <div
                  className={`mb-4 p-3 rounded-lg border ${
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

              {roleValidationError && !isEditingSelf && (
                <div
                  className={`mb-4 p-3 rounded-lg border ${
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

              <div className="grid grid-cols-2 gap-4 mb-4">
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
                    Status
                  </label>
                  <div className="relative">
                    <select
                      name="status"
                      value={user.status}
                      onChange={onInputChange}
                      disabled={isEditingSelf} // Users cannot change their own status
                      className={`w-full p-2 pl-3 bg-accent border rounded-md text-sm h-[45px] pr-8 appearance-none ${
                        formErrors.status ? "border-red-500" : "border-[#444]"
                      } ${
                        isEditingSelf
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      }`}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
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
                  {formErrors.status && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.status}
                    </p>
                  )}
                  {isEditingSelf && (
                    <p className="text-xs text-yellow-500 mt-1">
                      💡 Cannot change your own account status
                    </p>
                  )}
                </div>
              </div>

              {/* Status Validation Messages */}
              {statusValidationMessage && !isEditingSelf && (
                <div
                  className={`mb-4 p-3 rounded-lg border ${
                    theme === "light"
                      ? "bg-green-50 border-green-200"
                      : "bg-green-950/20 border-green-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-700 dark:text-green-300">
                      {statusValidationMessage}
                    </span>
                  </div>
                </div>
              )}

              {statusValidationError && !isEditingSelf && (
                <div
                  className={`mb-4 p-3 rounded-lg border ${
                    theme === "light"
                      ? "bg-red-50 border-red-200"
                      : "bg-red-950/20 border-red-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-700 dark:text-red-300">
                      {statusValidationError}
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNum"
                  value={user.contactNum}
                  onChange={onInputChange}
                  placeholder="e.g. +639123456789"
                  className="w-full p-2 pl-3 bg-accent border border-[#444] rounded-md text-sm h-[45px]"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Optional contact information
                </p>
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
                Change Password (Optional)
              </h3>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={onPasswordChange}
                    onBlur={() => handleFieldBlur("newPassword")}
                    className={`w-full p-2 pl-3 bg-accent border rounded-md text-sm h-[45px] ${
                      touchedFields.newPassword && formErrors.newPassword
                        ? "border-red-500"
                        : "border-[#444]"
                    }`}
                  />
                  {touchedFields.newPassword && formErrors.newPassword && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.newPassword}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={onPasswordChange}
                    onBlur={() => handleFieldBlur("confirmPassword")}
                    className={`w-full p-2 pl-3 bg-accent border rounded-md text-sm h-[45px] ${
                      touchedFields.confirmPassword &&
                      formErrors.confirmPassword
                        ? "border-red-500"
                        : "border-[#444]"
                    }`}
                  />
                  {touchedFields.confirmPassword &&
                    formErrors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.confirmPassword}
                      </p>
                    )}
                </div>
              </div>

              {/* Password Requirements */}
              {passwords.newPassword && (
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

              {passwords.newPassword && passwords.confirmPassword && (
                <div
                  className={`mb-4 p-3 rounded-lg border ${
                    passwordsMatch
                      ? theme === "light"
                        ? "bg-green-50 border-green-200"
                        : "bg-green-950/20 border-green-800"
                      : theme === "light"
                        ? "bg-red-50 border-red-200"
                        : "bg-red-950/20 border-red-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {passwordsMatch ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm ${
                        passwordsMatch
                          ? "text-green-700 dark:text-green-300"
                          : "text-red-700 dark:text-red-300"
                      }`}
                    >
                      {passwordsMatch
                        ? "Passwords match"
                        : "Passwords do not match"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
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
                disabled={!isFormValid}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isFormValid
                    ? "bg-gold text-white hover:bg-gold/90"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
              >
                {isEditingSelf ? "Update Profile" : "Update User"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
