import Button from "../Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { useModalStore } from "../../zustand/useModalStore";
import { useSubscribeFormData } from "../../zustand/subscribeFormData.state";
import { useVerifyMarkerter } from "../../data/hooks";
import Start from "./Start";
import InputPersonalInfo from "./PersonalInfo";

const validationSchema = Yup.object().shape({
  marketerId: Yup.string().required("MarketerID is required"),
});
interface Props {
  property?: Property;
}

const InputMarketerId: React.FC<Props> = ({ property }) => {
  const action = useModalStore();
  const { marketID, setSubscribeFormData } = useSubscribeFormData();
  const [ID, setID] = useState("");
  const initialValues = { marketerId: marketID };
  const { data, isLoading, isError } = useVerifyMarkerter(ID || "");
  const goBack = () => {
    action.openModal(<Start property={property} />);
  };

  const ValidateID = ({ marketerID }: { marketerID: string }) => {
    useEffect(() => {
      if (marketerID && marketerID !== ID) {
        setID(marketerID);
      }
    }, [marketerID]);

    return null;
  };

  const handleProceed = async (values: typeof initialValues) => {
    // setID(values.marketerId);
    // const result = await refetch();
    if (data?.success) {
      setSubscribeFormData({ marketID: values.marketerId });
      action.openModal(<InputPersonalInfo property={property} />);
    }
  };
  return (
    <div className="flex flex-col max-w-xs">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-5">
        <div className="text-2xl font-bold">Input Marketer ID</div>
        <p className="text-gray-400 text-xs w-[80%]"></p>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={handleProceed}
          // onSubmit={(values) => {
          //   setID(values.marketerId);
          //   if (data?.success) {
          //     setSubscribeFormData({ marketID: values.marketerId });
          //     action.openModal(<InputPersonalInfo property={property} />);
          //   }
          // }}
        >
          {({ isValid, values }) => (
            <Form className="flex flex-col justify-between min-h-[220px]">
              <ValidateID marketerID={values.marketerId} />
              <div className="flex flex-col gap-4">
                <InputField
                  name="marketerId"
                  type="text"
                  placeholder="Marketer ID"
                  className="text-2xl font-bold rounded-xl py-3"
                />
                <p className="text-xs text-gray-400 w-full">
                  Please enter the Marketer ID to proceed with the payment. This
                  is required to ensure that the payment is correctly attributed
                  to the right marketer. If you do not have a Marketer ID,
                  please contact your marketer for assistance.
                </p>
              </div>
              <div className="flex justify-center w-full gap-4 mt-4">
                {/* <Button
                  label="Back"
                  icon={<ArrowLeft />}
                  className="bg-black rounded-lg"
                  onClick={goBack}
                /> */}
                <Button
                  label={`${isError ? "Invalid Marketer code" : "Proceed"}`}
                  className={`${
                    isError ? "bg-red-700" : "bg-adron-green"
                  } rounded-lg`}
                  type="submit"
                  loadingText={`${
                    isError
                      ? "Invalid Marketer code"
                      : isLoading
                      ? "Verifying marketer code..."
                      : "Loading..."
                  }`}
                  isLoading={isLoading}
                  disabled={!isValid || isLoading || isError}
                  icon={isError ? <Info /> : null}
                  rightIcon={data?.success ? <ArrowRight /> : null}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InputMarketerId;

// import Button from "../Button";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import InputField from "../InputField";
// import { useModal } from "../../../store/modal.store";
// import { ArrowLeft, ArrowRight, Info } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import Start from "@/components/SubscribeComponents/Start";
// import { Property } from "@/data/types/homepageTypes";
// import InputPersonalInfo from "@/components/SubscribeComponents/PersonalInfo";
// import { useSubscribeFormData } from "../../../store/subscribeFormData.state";
// import { useVerifyMarkerter } from "@/data/hooks";

// const validationSchema = Yup.object().shape({
//   marketerId: Yup.string().required("MarketerID is required"),
// });

// interface Props {
//   property: Property;
// }

// const InputMarketerId: React.FC<Props> = ({ property }) => {
//   const action = useModal();
//   const { marketID, setSubscribeFormData } = useSubscribeFormData();
//   const [ID, setID] = useState(marketID || "");
//   const [verificationAttempted, setVerificationAttempted] = useState(false);

//   const initialValues = { marketerId: marketID || "" };

//   const { data, isLoading, isError, refetch } = useVerifyMarkerter(ID);

//   const goBack = () => {
//     action.openModal(<Start property={property} />);
//   };

//   const handleProceed = async (values: typeof initialValues) => {
//     setID(values.marketerId);
//     setVerificationAttempted(true);

//     try {
//       const result = await refetch();

//       if (result.data?.success) {
//         setSubscribeFormData({ marketID: values.marketerId });
//         action.openModal(<InputPersonalInfo property={property} />);
//       }
//     } catch (error) {
//       console.error("Error verifying marketer:", error);
//     }
//   };

//   // Clear verification state when ID changes
//   useEffect(() => {
//     if (ID && verificationAttempted) {
//       setVerificationAttempted(false);
//     }
//   }, [ID, verificationAttempted]);

//   // Update ID if marketID changes externally
//   useEffect(() => {
//     if (marketID && marketID !== ID) {
//       setID(marketID);
//     }
//   }, [marketID, ID]);

//   const showError =
//     verificationAttempted && (isError || data?.success === false);
//   const showSuccess = verificationAttempted && data?.success === true;

//   const buttonLabel = () => {
//     if (isLoading) return "Validating code...";
//     if (showError) return "Invalid Marketer code";
//     if (showSuccess) return "Proceed";
//     return "Verify Marketer ID";
//   };

//   const buttonIcon = () => {
//     if (isLoading) return null;
//     if (showError) return <Info />;
//     if (showSuccess) return <ArrowRight />;
//     return <ArrowRight />;
//   };

//   return (
//     <div className="flex flex-col max-w-xs w-full">
//       <div
//         className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
//         onClick={goBack}
//       >
//         <ArrowLeft size={20} />
//         <span className="text-sm">Back</span>
//       </div>

//       <div className="flex flex-col mt-5">
//         <div className="text-2xl font-bold">Input Marketer ID</div>
//         <p className="text-gray-400 text-xs w-[80%]"></p>
//       </div>

//       <div className="flex flex-col justify-between mt-7">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           validateOnMount
//           onSubmit={handleProceed}
//         >
//           {({ isValid, values }) => (
//             <Form className="flex flex-col justify-between min-h-[220px]">
//               <div className="flex flex-col gap-4">
//                 <InputField
//                   name="marketerId"
//                   type="text"
//                   placeholder="Marketer ID"
//                   className="text-2xl font-bold rounded-xl py-3"
//                 />
//                 <p className="text-xs text-gray-400 w-full">
//                   Please enter the Marketer ID to proceed with the payment. This
//                   is required to ensure that the payment is correctly attributed
//                   to the right marketer. If you do not have a Marketer ID,
//                   please contact your marketer for assistance.
//                 </p>

//                 {/* Feedback messages */}
//                 {isLoading && (
//                   <div className="text-blue-500 text-sm">
//                     Verifying marketer ID...
//                   </div>
//                 )}
//                 {showError && (
//                   <div className="text-red-500 text-sm">
//                     Invalid marketer ID. Please check and try again.
//                   </div>
//                 )}
//                 {showSuccess && (
//                   <div className="text-green-500 text-sm">
//                     Marketer ID verified successfully!
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-center w-full gap-4 mt-4">
//                 <Button
//                   label={buttonLabel()}
//                   className={`${
//                     showError
//                       ? "bg-red-600 hover:bg-red-700"
//                       : showSuccess
//                       ? "bg-green-600 hover:bg-green-700"
//                       : "bg-adron-green hover:bg-adron-green-dark"
//                   } rounded-lg transition-colors duration-200`}
//                   type="submit"
//                   isLoading={isLoading}
//                   disabled={
//                     !isValid || isLoading || values.marketerId.trim() === ""
//                   }
//                   icon={buttonIcon()}
//                 />
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default InputMarketerId;
