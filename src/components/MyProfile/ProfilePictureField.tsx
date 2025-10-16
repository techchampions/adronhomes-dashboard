import React, { useCallback, useRef } from "react";
import { ErrorMessage, useField } from "formik";
import { FaExclamationCircle } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { UserPlus2Icon } from "lucide-react";
import { useToastStore } from "../../zustand/useToastStore";

interface ProfilePictureFieldProps {
  name: string;
  label?: string;
  infoText?: string;
  className?: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  aspectRatio?: string;
  width?: number | string;
  height?: number | string;
}

const ProfilePictureField: React.FC<ProfilePictureFieldProps> = ({
  name,
  label,
  infoText,
  className = "",
  acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp"],
  maxFileSize = 5 * 1024 * 1024, // 5MB
  aspectRatio = "9/16",
  width = 200,
  height = 200,
}) => {
  const { showToast } = useToastStore();
  const [field, meta, helpers] = useField(name);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasError = meta.touched && meta.error;

  const validateFile = useCallback(
    (file: File) => {
      if (!acceptedFileTypes.includes(file.type)) {
        return "Unsupported file format";
      }
      if (file.size > maxFileSize) {
        return `File size too large (max ${maxFileSize / 1024 / 1024}MB)`;
      }
      return null;
    },
    [acceptedFileTypes, maxFileSize]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        helpers.setError(error);
        showToast(error, "error");
        return;
      }
      helpers.setValue(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    helpers.setValue(null);
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`w-fit relative ${className}`}>
      {field.value && (
        <button
          type="button"
          className="absolute p-1 z-50 text-white bg-red-500 rounded-full top-2 right-2"
          onClick={handleRemove}
        >
          <IoTrash size={16} />
        </button>
      )}

      {label && <div className="mb-1 font-medium">{label}</div>}

      {infoText && (
        <div className="flex items-start mb-2 text-xs text-gray-500">
          <span className="flex-1">{infoText}</span>
        </div>
      )}

      <div
        className={`relative border rounded-full overflow-hidden bg-gray-100 ${
          hasError ? "border-red-500" : "border-0"
        }`}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          aspectRatio,
        }}
      >
        <label className="block w-full h-full cursor-pointer">
          <input
            type="file"
            name={name}
            accept={acceptedFileTypes.join(",")}
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />

          {field.value ? (
            <>
              <img
                src={
                  field.value instanceof File
                    ? URL.createObjectURL(field.value)
                    : field.value
                }
                alt="Uploaded preview"
                className="object-cover w-full h-full"
              />
              {/* <button
                type="button"
                className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2"
                onClick={handleRemove}
              >
                <IoTrash size={16} />
              </button> */}
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 rounded-xl">
              <div className="flex flex-col items-center justify-center w-full h-full gap-2 p-4 text-center">
                {/* <div className="text-lg">+</div> */}
                <UserPlus2Icon size={40} />
              </div>
            </div>
          )}
        </label>

        {hasError && (
          <div className="absolute top-2 right-2">
            <FaExclamationCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      <ErrorMessage
        name={name}
        component="p"
        className="mt-1 text-xs text-left text-red-500"
      />
    </div>
  );
};

export default ProfilePictureField;
