import { ErrorMessage, Field, useField } from "formik";
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface InputFieldProps {
  type?:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "number"
    | "checkbox"
    | "textarea";
  placeholder?: string;
  label?: string;
  name: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  rows?: number;
  isReadOnly?: boolean;
  disabled?: boolean; // Add disabled prop
  autocomplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  name,
  label,
  icon,
  rightIcon,
  className = "",
  rows = 4,
  isReadOnly = false,
  disabled = false, // Add disabled prop with default false
  autocomplete,
}) => {
  const [field, meta] = useField(name);
  const isTextarea = type === "textarea";
  const hasError = meta.touched && meta.error;

  return (
    <div className="w-full">
      {label && (
        <div className="font-bold text-sm text-gray-700 mb-2">{label}</div>
      )}
      <div
        className={`w-full relative flex ${
          isTextarea ? "flex-col" : "flex-row"
        } border bg-adron-body rounded-full py-2 ${
          hasError ? "border-red-500" : "border-transparent"
        } ${disabled ? "opacity-60 bg-gray-100" : ""} ${
          isReadOnly && "cursor-not-allowed"
        } ${className}`}
      >
        {/* Left Icon */}
        {icon && !isTextarea && (
          <div className="flex items-center px-3">{icon}</div>
        )}

        {/* Field */}
        <Field
          as={isTextarea ? "textarea" : "input"}
          {...field}
          type={isTextarea ? undefined : type}
          placeholder={placeholder}
          rows={isTextarea ? rows : undefined}
          readOnly={isReadOnly}
          disabled={disabled} // Pass disabled prop to Field
          autoComplete={autocomplete}
          className={` text-gray-900 text-sm rounded-lg focus:ring-0 block w-full px-5 outline-none resize-none ${
            isTextarea ? "min-h-[60px]" : ""
          } ${
            disabled || isReadOnly ? "cursor-not-allowed bg-transparent" : ""
          }`}
        />

        {/* Error Icon */}
        {!isTextarea && hasError && !disabled && (
          <div className="flex items-center px-3">
            <FaExclamationCircle className="w-5 h-5 text-red-500" />
          </div>
        )}

        {/* Right Icon */}
        {rightIcon && <div className="flex items-center pr-3">{rightIcon}</div>}
      </div>

      {/* Error Message - Don't show error when disabled */}
      {!disabled && (
        <ErrorMessage
          name={name}
          component="p"
          className="text-red-500 text-xs mt-1 ml-5 text-left"
        />
      )}
    </div>
  );
};

export default InputField;
