import React, { useState } from "react";
import DOMPurify from "dompurify";
import { ArrowLeft, ArrowRight, CheckSquare2, Square } from "lucide-react";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { useModalStore } from "../../zustand/useModalStore";
import PaymentSummary from "./PaymentSummary";
import Button from "../Button";
import SelectPaymentMethod from "./SelectPaymentMethod";
interface Props {
  property?: Property;
}
const PropertyTerms: React.FC<Props> = ({ property }) => {
  const modal = useModalStore();
  const sanitizedHTML = DOMPurify.sanitize(
    String(property?.property_agreement)
  );
  const [agreed, setagreed] = useState(false);
  const goBack = () => {
    modal.openModal(<PaymentSummary property={property} />);
  };

  return (
    <div className="w-sm max-h-[75vh] overflow-y-scroll scrollbar-hide">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>
      {/* <div className="bg-black/50 absolute bottom-50 right-10 text-white rounded-full flex items-center justify-center p-2">
        <ArrowDown />
      </div> */}
      <h4 className="2xl font-bold underline underline-offset-4 w-full mt-7 uppercase">
        Property Terms
      </h4>

      <div
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        className="prose  prose-lg
                  max-w-none prose-headings:font-bold [&>*]:text-gray-700 [&>*]:text-xs prose-headings:text-gray-900 [&>h2]:!font-adron-bold [&>h1]:text-3xl [&>h2]:text-2xl [&>h3]:text-xl [&>p]:my-5 [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:text-xs [&>a]:text-blue-600 [&>a]:no-underline [&>a]:border-b-2 [&>a]:border-blue-300 [&>a]:hover:border-blue-600 [&>strong]:text-gray-900 [&>ul]:list-inside [&>ol]:list-inside [&>ul]:list-disc [&>ol]:list-decimal [&>li]:my-1 blockquote:border-l-4 blockquote:border-gray-300 blockquote:pl-4 blockquote:italic [&>img]:rounded-lg [&>img]:shadow-md [&>table]:border [&>table]:border-gray-200 [&>th]:bg-gray-50 [&>th]:p-2 [&>td]:p-2 "
      />

      <section id="terms-bottom" className="">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setagreed(!agreed)}
        >
          <div className="">
            {agreed ? (
              <CheckSquare2 size={20} className="text-adron-green" />
            ) : (
              <Square size={20} className="text-gray-500" />
            )}
          </div>
          <div className="text-xs">
            Yes, I agree with the property terms and policies.
          </div>
        </div>

        <div className="flex justify-between w-full gap-4 mt-4">
          <Button
            label="Proceed"
            className="bg-adron-green rounded-lg"
            onClick={() => {
              if (agreed) {
                modal.openModal(<SelectPaymentMethod property={property} />);
              }
            }}
            disabled={!agreed}
            rightIcon={<ArrowRight />}
          />
        </div>
      </section>
    </div>
  );
};

export default PropertyTerms;
