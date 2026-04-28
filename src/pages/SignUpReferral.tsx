// SignUpReferral.tsx
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AuthForm from "../components/AuthComponents/AuthForm";
import Button from "../components/Button";
import { useOnboardingStore } from "../zustand/OnboardingStore";
import { verifyReferralLink } from "../data/hooks";

const SignUpReferral = () => {
  const { ref } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setStep } = useOnboardingStore();
  
  // Get referral code from either path param or query param
  const referralCode = ref || searchParams.get("ref") || searchParams.get("referral") || "";
  
  // Construct the full link for verification
   const fullLink = referralCode 
    ? `https://user.adronhomes.com/ref/${referralCode}`
    : "invalidlink";
  
  
  // React Query to verify referral link
  const { 
    data, 
    isLoading, 
    isError,
    error 
  } = useQuery({
    queryKey: ['verifyReferral', referralCode],
    queryFn: () => verifyReferralLink(fullLink),
    enabled: !!referralCode, 
    retry: 1,
    staleTime: 5 * 60 * 1000, 
  });
  
  // Store referral code in localStorage if valid
  if (data?.isValid && referralCode) {
    localStorage.setItem("referralCode", referralCode);
    localStorage.setItem("referrerInfo", JSON.stringify(data.referrerInfo));
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <div className="text-center space-y-6 p-8">
          {/* Loading Animation */}
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin mx-auto border-t-adron-green"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-adron-green rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Verifying Referral Code
            </h2>
            <p className="text-gray-600 animate-pulse">
              Please wait while we validate your referral link...
            </p>
          </div>
          
          {/* Optional: Show the referral code being verified */}
          {referralCode && (
            <p className="text-sm text-gray-500">
              Verifying code: <span className="font-mono font-semibold">{referralCode}</span>
            </p>
          )}
        </div>
      </div>
    );
  }
  
  // Invalid referral code - Show error state with buttons
  if (isError || (data && !data.isValid)) {
    const errorMessage = error?.message || data?.message || "Invalid or expired referral link";
    
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white rounded-2xl  max-w-md w-full p-8 text-center space-y-6">
          {/* Error Icon */}
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          {/* Error Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Invalid Referral Link
            </h2>
            <p className="text-gray-600">
              {errorMessage}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              The referral code <span className="font-mono font-semibold">{referralCode}</span> could not be verified.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              label="Login to Existing Account"
              onClick={() => {
                setStep("login");
                navigate("/login");
              }}
              className="w-full bg-adron-green text-white py-3 rounded-lg hover:bg-adron-green-dark transition-colors"
            />
            
            <Button
              label="Create New Account"
              onClick={() => {
                setStep("signup");
                navigate("/signup");
              }}
              className="w-full bg-white text-adron-green! border-2 border-adron-green py-3 rounded-lg hover:bg-gray-50 transition-colors"
            />
          </div>
          
          {/* Help Text */}
          <p className="text-xs text-gray-400 pt-4">
            Having issues? Please contact support for assistance.
          </p>
        </div>
      </div>
    );
  }
  
  // Valid referral code - Show the signup form
  if (data?.isValid) {
    return (
      // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      //   {/* Optional: Show success banner */}
      //   {data.referrerInfo && (
      //     <div className="bg-green-50 border-b border-green-200 py-3 px-4 text-center">
      //       <p className="text-green-700 text-sm">
      //         ✓ Referred by <span className="font-semibold">{data.referrerInfo.name}</span>
      //       </p>
      //     </div>
      //   )}
        <AuthForm isSignupReferral={true} referralCodeFromUrl={referralCode} />
      // {/* </div> */}
    );
  }
  
  // Fallback for no referral code - Show regular signup
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-yellow-50 border-b border-yellow-200 py-3 px-4 text-center">
        <p className="text-yellow-700 text-sm">
          ⚠️ No referral code detected. You can still sign up, but you won't be linked to a referrer.
        </p>
      </div>
      <AuthForm isSignup={true} />
    </div>
  );
};

export default SignUpReferral;