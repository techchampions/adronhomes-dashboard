/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  MapPin,
  Loader2,
  X,
  ChevronDown,
  Check,
  AlertCircle,
} from "lucide-react";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface LocationDetails {
  address: string;
  placeId: string;
  lat: number;
  lng: number;
  city?: string;
  state?: string;
  country?: string;
  countryCode?: string;
  zipCode?: string;
  streetNumber?: string;
  route?: string;
  formattedAddress?: string;
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (location: LocationDetails) => void;
  onError?: (error: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  dropdownClassName?: string;
  suggestionClassName?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
  types?: string[];
  searchOptions?: {
    types?: string[];
    componentRestrictions?: {
      country: string | string[];
    };
    bounds?: any;
    location?: any;
    radius?: number;
    strictBounds?: boolean;
  };
  debounce?: number;
  highlightFirstSuggestion?: boolean;
  shouldFetchSuggestions?: boolean;
  clearOnBlur?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
}

// Check if Google Maps API is loaded
const isGoogleMapsLoaded = (): any => {
  return (
    typeof window !== "undefined" &&
    window.google &&
    window.google.maps &&
    window.google.maps.places
  );
};

const LocationAutocomplete2: React.FC<LocationAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  onError,
  placeholder = "Enter a location",
  className = "",
  inputClassName = "",
  dropdownClassName = "",
  suggestionClassName = "",
  error,
  disabled = false,
  required = false,
  label,
  helperText,
  types = ["address"],
  searchOptions = {},
  debounce = 300,
  highlightFirstSuggestion = false,
  shouldFetchSuggestions = true,
  clearOnBlur = false,
  onBlur,
  onFocus,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [internalError, setInternalError] = useState<string>("");
  const [loadingTimeout, setLoadingTimeout] = useState<number | null>(null);

  // Check if Google Maps is loaded
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (isGoogleMapsLoaded()) {
        setIsGoogleLoaded(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkGoogleMaps()) {
      return;
    }

    // If not loaded, check every 100ms for up to 10 seconds
    let attempts = 0;
    const maxAttempts = 100; // 100 * 100ms = 10 seconds

    const interval = setInterval(() => {
      attempts++;
      if (checkGoogleMaps() || attempts >= maxAttempts) {
        clearInterval(interval);
        if (attempts >= maxAttempts) {
          setInternalError(
            "Google Maps failed to load. Please refresh the page."
          );
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Alternative: Use a timeout to show loading state
  useEffect(() => {
    if (!isGoogleLoaded) {
      const timeout = setTimeout(() => {
        if (!isGoogleMapsLoaded()) {
          setInternalError(
            "Google Maps is taking longer than expected to load."
          );
        }
      }, 5000); // Show error after 5 seconds

      setLoadingTimeout(timeout);
    }

    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [isGoogleLoaded, loadingTimeout]);

  const handleSelect = useCallback(
    async (address: string, placeId?: string) => {
      if (!isGoogleLoaded) {
        const errorMsg = "Google Maps is not loaded yet. Please try again.";
        setInternalError(errorMsg);
        if (onError) onError(errorMsg);
        return;
      }

      try {
        setIsGeocoding(true);
        setInternalError("");

        // Get geocode results
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0]);

        // Parse address components
        const addressComponents = results[0].address_components || [];
        const getComponent = (type: string) =>
          addressComponents.find((comp: AddressComponent) =>
            comp.types.includes(type)
          )?.long_name;

        const getComponentShort = (type: string) =>
          addressComponents.find((comp: AddressComponent) =>
            comp.types.includes(type)
          )?.short_name;

        const locationDetails: LocationDetails = {
          address,
          placeId: placeId || results[0].place_id || "",
          lat: latLng.lat,
          lng: latLng.lng,
          city:
            getComponent("locality") ||
            getComponent("sublocality") ||
            getComponent("administrative_area_level_2"),
          state: getComponent("administrative_area_level_1"),
          country: getComponent("country"),
          countryCode: getComponentShort("country"),
          zipCode: getComponent("postal_code"),
          streetNumber: getComponent("street_number"),
          route: getComponent("route"),
          formattedAddress: results[0].formatted_address,
        };

        onChange(address);

        if (onSelect) {
          onSelect(locationDetails);
        }
      } catch (error) {
        console.error("Error selecting location:", error);
        const errorMsg = "Failed to get location details. Please try again.";
        setInternalError(errorMsg);
        if (onError) onError(errorMsg);
      } finally {
        setIsGeocoding(false);
      }
    },
    [isGoogleLoaded, onChange, onSelect, onError]
  );

  const handleChange = (newValue: string) => {
    onChange(newValue);
    setIsTouched(true);
    setInternalError("");
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (clearOnBlur && !value) {
      onChange("");
    }
    if (onBlur) onBlur();
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const clearInput = () => {
    onChange("");
    setInternalError("");
    if (onSelect) {
      onSelect({
        address: "",
        placeId: "",
        lat: 0,
        lng: 0,
      });
    }
  };

  const searchOptionsWithDefaults = {
    types,
    ...searchOptions,
  };

  const displayError = internalError || error;

  // Show loading state while Google Maps is loading
  if (!isGoogleLoaded) {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <div className="flex items-center justify-center p-4 border border-gray-300 rounded-lg bg-gray-50">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">
              {internalError ? internalError : "Loading Google Maps..."}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Helper Text */}
      {helperText && !displayError && (
        <p className="text-sm text-gray-500 mb-1.5">{helperText}</p>
      )}

      <PlacesAutocomplete
        value={value}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={searchOptionsWithDefaults}
        debounce={debounce}
        shouldFetchSuggestions={shouldFetchSuggestions && value.length > 2}
        highlightFirstSuggestion={highlightFirstSuggestion}
      >
        {({
          getInputProps,
          suggestions,
          getSuggestionItemProps,
          loading,
        }: any) => (
          <div className="relative">
            {/* Input Container */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                {loading || isGeocoding ? (
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                ) : (
                  <MapPin className="w-5 h-5 text-gray-400" />
                )}
              </div>

              <input
                {...getInputProps({
                  placeholder,
                  disabled: disabled || !isGoogleLoaded,
                  onFocus: handleFocus,
                  onBlur: handleBlur,
                  className: `
                    w-full pl-10 pr-10 py-3 border rounded-lg
                    bg-white text-gray-900 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:border-transparent
                    transition-all duration-200
                    disabled:bg-gray-100 disabled:cursor-not-allowed
                    disabled:border-gray-200
                    ${isFocused ? "ring-2" : ""}
                    ${
                      displayError && isTouched
                        ? "border-red-500 focus:ring-red-500/20"
                        : suggestions.length > 0 && isFocused
                        ? "border-blue-500 focus:ring-blue-500/20 rounded-b-none"
                        : "border-gray-300 focus:ring-blue-500/20 focus:border-blue-500"
                    }
                    ${inputClassName}
                  `,
                })}
              />

              {/* Clear button */}
              {value && !disabled && !loading && (
                <button
                  type="button"
                  onClick={clearInput}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10"
                  aria-label="Clear input"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                </button>
              )}

              {/* Dropdown arrow */}
              {suggestions.length > 0 && !disabled && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && isFocused && (
              <div
                className={`
                  absolute z-50 w-full mt-[-1px] bg-white border border-gray-200 
                  rounded-b-lg shadow-lg max-h-64 overflow-y-auto
                  ${dropdownClassName}
                `}
              >
                <div className="py-1">
                  {suggestions.map((suggestion: any, index: number) => {
                    const className = `
                      px-4 py-3 cursor-pointer transition-colors
                      flex items-start gap-3
                      ${
                        suggestion.active
                          ? "bg-blue-50 text-blue-700"
                          : "hover:bg-gray-50 text-gray-900"
                      }
                      ${
                        index === suggestions.length - 1
                          ? ""
                          : "border-b border-gray-100"
                      }
                      ${suggestionClassName}
                    `;

                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { className })}
                        key={index}
                        // key={suggestion.placeId || suggestion.description}
                      >
                        <div className="flex-shrink-0" key={index}>
                          {suggestion.active ? (
                            <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                          ) : (
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            <span
                              className={
                                suggestion.active
                                  ? "text-blue-600"
                                  : "text-gray-900"
                              }
                            >
                              {suggestion.formattedSuggestion.mainText}
                            </span>
                          </div>
                          {suggestion.formattedSuggestion.secondaryText && (
                            <div
                              className={`text-sm truncate ${
                                suggestion.active
                                  ? "text-blue-500"
                                  : "text-gray-500"
                              }`}
                            >
                              {suggestion.formattedSuggestion.secondaryText}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No suggestions message */}
            {suggestions.length === 0 &&
              value.length > 2 &&
              !loading &&
              isFocused && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                  <div className="flex items-center gap-3 text-gray-500">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">No locations found</span>
                  </div>
                </div>
              )}
          </div>
        )}
      </PlacesAutocomplete>

      {/* Error Message */}
      {displayError && isTouched && (
        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-red-500">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete2;
