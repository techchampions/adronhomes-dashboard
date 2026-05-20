import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { formatPrice } from "../../data/utils";
import { useBuyProperty } from "../../hooks/useBuyProperty";
import { useModalStore } from "../../zustand/useModalStore";
import { useUserStore } from "../../zustand/UserStore";
import Button from "../Button";
import CopyButton from "../CopyButton";
import ImageInput from "../FormComponents/ImageInput";
import InputField from "../InputField";
import SelectPaymentMethod from "./SelectPaymentMethod";
import SubscriptionSuccess from "./SubscriptionSuccess";

interface Props {
  payload: RealEstatePayload;
  property?: Property;
}
const BankTransferModal: React.FC<Props> = ({ payload, property }) => {
  const { accounts } = useUserStore();
  const { mutate: subscribe, isPending } = useBuyProperty();
  const modal = useModalStore();
  const propertyAccount = accounts.find((item) => item.type === "property");
  const initialValues = { proof: null as File | null, bank_name: "" };
  const validationSchema = Yup.object().shape({
    bank_name: Yup.string().required("required"),
    proof: Yup.mixed().required("required"),
  });

  const submit = (values: typeof initialValues) => {
    const newPayload = {
      ...payload,
      bank_name: values.bank_name,
      proof: values.proof,
    };
    subscribe(newPayload, {
      onSuccess() {
        modal.openModal(<SubscriptionSuccess />);
      },
    });
  };
  return (
    <div className="w-sm max-h-[75vh] overflow-y-auto scrollbar-hide space-y-10">
      <div className="flex flex-col gap-2">
        <div className="w-full bg-adron-green rounded-2xl flex gap-2 p-3">
          <img src="/bank-transfer-icon.svg" alt="" className="h-6 w-6" />
          {/* <p className="text-sm text-white">Bank Transfer {property?.name}</p> */}
          <p className="text-sm text-white">
            Transfer{" "}
            <span className="font-adron-bold">
              {formatPrice(payload.paid_amount)}
            </span>{" "}
            to the account below to complete your payment.
          </p>
        </div>
        <div className="flex flex-col w-full gap-4 mt-7">
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col">
              <p className="text-md">
                {propertyAccount?.account_number || "..."}
              </p>
              <p className="text-[12px] font-adron-thin text-gray-400">
                Account Number
              </p>
            </div>
            <CopyButton text={propertyAccount?.account_number} />
          </div>
          <div className="flex flex-col">
            <p className="text-md">{propertyAccount?.bank_name || "..."}</p>
            <p className="text-[12px] font-adron-thin text-gray-400">
              Bank Name
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-md">{propertyAccount?.account_name || "..."}</p>
            <p className="text-[12px] font-adron-thin text-gray-400">
              Account Name
            </p>
          </div>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={submit}
      >
        {({ isValid }) => {
          return (
            <Form className="space-y-5">
              <InputField
                label="Bank Account Name"
                name="bank_name"
                placeholder="Fullname"
                className="rounded-xl"
              />
              <ImageInput
                label="Transaction Receipt / Screenshot"
                infoText="upload proof of payment."
                name="proof"
                className="w-full!"
                width={"100%"}
                height={140}
              />
              <div className="grid grid-cols-2 gap-2">
                <Button
                  label="Go Back"
                  onClick={() => {
                    modal.openModal(
                      <SelectPaymentMethod property={property} />
                    );
                  }}
                  icon={<ArrowLeft />}
                  className="rounded-xl bg-gray-700 hover:bg-black!"
                />
                <Button
                  type="submit"
                  isLoading={isPending}
                  disabled={!isValid || isPending}
                  label="Proceed"
                  rightIcon={<ArrowRight />}
                  className="rounded-xl"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BankTransferModal;
