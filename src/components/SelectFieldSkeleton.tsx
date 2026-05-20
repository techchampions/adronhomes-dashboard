import React from "react";

interface SelectFieldSkeletonProps {
  label?: boolean;
  showDropdownPreview?: boolean;
  icon?: boolean;
  className?: string;
  theme?: string;
  errorPreview?: boolean;
}

const SelectFieldSkeleton: React.FC<SelectFieldSkeletonProps> = ({
  label = true,
  showDropdownPreview = false,
  icon = true,
  className = "",
  theme = "light",
  errorPreview = false,
}) => {
  return (
    <div className="w-full text-left">
      {/* Label Skeleton */}
      {label && (
        <div className="mb-2">
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
        </div>
      )}

      {/* Select Field Container Skeleton */}
      <div className="relative">
        <div
          className={`
            w-full relative flex flex-row items-center 
            border rounded-xl py-3 
            ${
              errorPreview
                ? "border-red-300"
                : theme === "dark"
                ? "border-gray-700"
                : "border-gray-200"
            }
            ${errorPreview ? "bg-red-50/50" : "bg-gray-50"}
            ${className}
          `}
        >
          {/* Left Icon Skeleton */}
          {icon && (
            <div className="flex items-center px-3">
              <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse" />
            </div>
          )}

          {/* Selected Value Skeleton */}
          <div className="flex-1 px-5">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Chevron Icon Skeleton */}
          <div className="flex items-center px-3">
            <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
          </div>

          {/* Error Icon Preview Skeleton */}
          {errorPreview && (
            <div className="flex items-center px-3">
              <div className="w-5 h-5 bg-red-300 rounded-full animate-pulse" />
            </div>
          )}
        </div>

        {/* Dropdown Preview Skeleton */}
        {showDropdownPreview && (
          <div className="absolute top-full left-0 right-0 mt-1 z-10">
            <div className="border border-gray-200 rounded-xl bg-white shadow-lg overflow-hidden">
              {/* Dropdown options skeleton */}
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="px-5 py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="h-4 w-full max-w-[180px] bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error Message Skeleton */}
      {errorPreview && (
        <div className="mt-1 ml-2">
          <div className="h-3 w-40 bg-red-200 rounded animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default SelectFieldSkeleton;
