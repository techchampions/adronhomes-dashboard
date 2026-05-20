// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// // import { useLoadScript } from "@react-google-maps/api";
// import { Loader2, MapPin, X } from "lucide-react";

// interface Location {
//   place_id: string;
//   description: string;
//   structured_formatting: {
//     main_text: string;
//     secondary_text: string;
//   };
//   terms: Array<{ value: string }>;
// }

// interface LocationAutocompleteProps {
//   value: string;
//   onChange: (value: string) => void;
//   onLocationSelect: (location: {
//     address: string;
//     placeId: string;
//     lat: number;
//     lng: number;
//     city?: string;
//     state?: string;
//     country?: string;
//     zipCode?: string;
//   }) => void;
//   placeholder?: string;
//   className?: string;
//   inputClassName?: string;
//   dropdownClassName?: string;
//   error?: string | boolean;
//   disabled?: boolean;
//   required?: boolean;
//   label?: string;
//   types?: string[];
//   countryRestrictions?: string[];
// }

// // Your Google Maps API key (store this in .env.local)
// const GOOGLE_MAPS_API_KEY = "AIzaSyBPIyWllHG8je77s56Pyp69b5mzlghzD9U";

// // const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

// const libraries: "places"[] = ["places"];

// const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
//   value,
//   onChange,
//   onLocationSelect,
//   placeholder = "Enter your location",
//   className = "",
//   inputClassName = "",
//   dropdownClassName = "",
//   error,
//   disabled = false,
//   required = false,
//   label,
//   types = ["address"],
//   countryRestrictions = [],
// }) => {
//   const [predictions, setPredictions] = useState<Location[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isTouched, setIsTouched] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Load Google Maps script
//   // const { isLoaded, loadError } = useLoadScript({
//   //   googleMapsApiKey: GOOGLE_MAPS_API_KEY,
//   //   libraries,
//   // });

//   const autocompleteServiceRef =
//     useRef<google.maps.places.AutocompleteService | null>(null);
//   const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
//     null
//   );

//   // Initialize services once script is loaded
//   // useEffect(() => {
//   //   if (isLoaded && window.google) {
//   //     autocompleteServiceRef.current =
//   //       new window.google.maps.places.AutocompleteService();
//   //     placesServiceRef.current = new window.google.maps.places.PlacesService(
//   //       document.createElement("div")
//   //     );
//   //   }
//   // }, [isLoaded]);

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node) &&
//         inputRef.current &&
//         !inputRef.current.contains(event.target as Node)
//       ) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const fetchPredictions = useCallback(
//     async (input: string) => {
//       if (!autocompleteServiceRef.current || !input.trim()) {
//         setPredictions([]);
//         return;
//       }

//       setIsLoading(true);

//       const request: google.maps.places.AutocompletionRequest = {
//         input,
//         types,
//       };

//       if (countryRestrictions.length > 0) {
//         request.componentRestrictions = {
//           country: countryRestrictions,
//         };
//       }

//       try {
//         const response =
//           await autocompleteServiceRef.current.getPlacePredictions(request);

//         const formattedPredictions: Location[] = (
//           response.predictions || []
//         ).map((prediction) => ({
//           place_id: prediction.place_id,
//           description: prediction.description,
//           structured_formatting: prediction.structured_formatting || {
//             main_text: prediction.description.split(",")[0],
//             secondary_text: prediction.description
//               .split(",")
//               .slice(1)
//               .join(",")
//               .trim(),
//           },
//           terms: prediction.terms || [],
//         }));

//         setPredictions(formattedPredictions);
//         setShowDropdown(true);
//       } catch (error) {
//         console.error("Error fetching predictions:", error);
//         setPredictions([]);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [types, countryRestrictions]
//   );

//   // Debounced input handler
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (value.length > 2) {
//         fetchPredictions(value);
//       } else {
//         setPredictions([]);
//         setShowDropdown(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [value, fetchPredictions]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;
//     onChange(newValue);
//     setIsTouched(true);
//   };

//   const handleSelectLocation = async (location: Location) => {
//     if (!placesServiceRef.current) return;

//     onChange(location.description);
//     setShowDropdown(false);
//     setIsTouched(true);

//     try {
//       const request: google.maps.places.PlaceDetailsRequest = {
//         placeId: location.place_id,
//         fields: [
//           "formatted_address",
//           "geometry",
//           "address_components",
//           "place_id",
//         ],
//       };

//       placesServiceRef.current.getDetails(request, (place, status) => {
//         if (
//           status === window.google.maps.places.PlacesServiceStatus.OK &&
//           place
//         ) {
//           // Parse address components
//           const addressComponents = place.address_components || [];
//           const getComponent = (type: string) =>
//             addressComponents.find((comp) => comp.types.includes(type))
//               ?.long_name;

//           const selectedLocation = {
//             address: place.formatted_address || location.description,
//             placeId: location.place_id,
//             lat: place.geometry?.location?.lat() || 0,
//             lng: place.geometry?.location?.lng() || 0,
//             city: getComponent("locality") || getComponent("sublocality"),
//             state: getComponent("administrative_area_level_1"),
//             country: getComponent("country"),
//             zipCode: getComponent("postal_code"),
//           };

//           onLocationSelect(selectedLocation);
//         }
//       });
//     } catch (error) {
//       console.error("Error fetching place details:", error);
//     }
//   };

//   const clearInput = () => {
//     onChange("");
//     setPredictions([]);
//     setShowDropdown(false);
//     setIsTouched(true);
//     inputRef.current?.focus();
//   };

//   if (loadError) {
//     return (
//       <div className="text-red-500 text-sm">
//         Error loading Google Maps. Please refresh the page.
//       </div>
//     );
//   }

//   if (!isLoaded) {
//     return (
//       <div className="flex items-center justify-center p-4">
//         <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
//         <span className="ml-2 text-sm text-gray-500">Loading maps...</span>
//       </div>
//     );
//   }

//   return (
//     <div className={`relative w-full ${className}`}>
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 mb-1.5">
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}

//       <div className="relative">
//         <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//           <MapPin className="w-5 h-5 text-gray-400" />
//         </div>

//         <input
//           ref={inputRef}
//           type="text"
//           value={value}
//           onChange={handleInputChange}
//           onFocus={() => value.length > 2 && setShowDropdown(true)}
//           placeholder={placeholder}
//           disabled={disabled}
//           className={`
//             w-full pl-10 pr-10 py-3 border rounded-lg
//             focus:outline-none focus:ring-2 focus:border-transparent
//             transition-all duration-200
//             disabled:bg-gray-100 disabled:cursor-not-allowed
//             ${
//               error && isTouched
//                 ? "border-red-500 focus:ring-red-500/20"
//                 : "border-gray-300 focus:ring-blue-500/20 focus:border-blue-500"
//             }
//             ${inputClassName}
//           `}
//         />

//         {value && !disabled && (
//           <button
//             type="button"
//             onClick={clearInput}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2"
//             aria-label="Clear input"
//           >
//             <X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
//           </button>
//         )}

//         {isLoading && (
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//             <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
//           </div>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && isTouched && (
//         <p className="mt-1.5 text-sm text-red-500">{error}</p>
//       )}

//       {/* Dropdown with predictions */}
//       {showDropdown && predictions.length > 0 && (
//         <div
//           ref={dropdownRef}
//           className={`
//             absolute z-50 w-full mt-1 bg-white border border-gray-200
//             rounded-lg shadow-lg overflow-hidden max-h-64 overflow-y-auto
//             ${dropdownClassName}
//           `}
//         >
//           {predictions.map((prediction) => (
//             <button
//               key={prediction.place_id}
//               type="button"
//               onClick={() => handleSelectLocation(prediction)}
//               className="w-full text-left px-4 py-3 hover:bg-gray-50
//                        focus:bg-gray-50 focus:outline-none transition-colors
//                        border-b border-gray-100 last:border-b-0"
//             >
//               <div className="flex items-start gap-3">
//                 <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
//                 <div className="flex-1 min-w-0">
//                   <div className="font-medium text-gray-900 truncate">
//                     {prediction.structured_formatting.main_text}
//                   </div>
//                   <div className="text-sm text-gray-500 truncate">
//                     {prediction.structured_formatting.secondary_text}
//                   </div>
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LocationAutocomplete;
