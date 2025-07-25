import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";
import SelectPaymentMethod from "../DashboardNewPropertyComponent/SelectPaymentMethod";
import { usePaymentBreakDownStore } from "../../zustand/PaymentBreakDownStore";
import { formatDate, formatPrice } from "../../data/utils";
import React from "react";
type Props = {
  goBack: () => void;
  repaymentAmount: number;
  dueDate?: string;
};
const InputAmount: React.FC<Props> = ({ goBack, repaymentAmount, dueDate }) => {
  const { openModal, closeModal } = useModalStore();
  const { setPaymentDetails } = usePaymentBreakDownStore();

  // Validation schema
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError("Amount must be a number")
      .min(
        repaymentAmount,
        `Amount must be greater than ${formatPrice(repaymentAmount)}`
      )
      .required("Amount is required"),
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Make Payment</div>
        <p className="text-gray-400 text-xs w-[80%]">
          Please enter the amount you want to make payment with.{" "}
        </p>
      </div>
      <div className="flex flex-col justify-between mt-10">
        <Formik
          initialValues={{ amount: repaymentAmount }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // resetPaymentDetails();
            setPaymentDetails({
              totalAmount: Number(values.amount),
            });
            openModal(
              <SelectPaymentMethod
                goBack={goBack}
                amount={Number(values.amount)}
                isBuyNow={false}
              />
            );
          }}
        >
          {({ isValid }) => (
            <Form className="flex flex-col justify-between min-h-[350px]">
              <div className="flex flex-col gap-4">
                <InputField
                  name="amount"
                  type="text"
                  placeholder="₦0.00"
                  className="text-2xl font-bold"
                />
                <p className="text-xs text-gray-400 w-[80%]">
                  Please note that excess amount will be deposited into your
                  virtual wallet{" "}
                </p>
                <div className="flex border border-gray-200 rounded-lg p-4 flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <p className="text-xs ">Repayment Amount:</p>
                    <p className="text-sm font-bold">
                      {" "}
                      {formatPrice(repaymentAmount || 0)}{" "}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs ">Due Date:</p>
                    <p className="text-sm font-bold">
                      {" "}
                      {formatDate(dueDate || "")}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full gap-4 mt-4">
                <Button
                  label="Cancel"
                  className="!w-fit px-12 py-2 text-xs bg-transparent font-bold text-shadow-adron-red !text-red-500"
                  onClick={() => closeModal()}
                  type="button"
                />
                <Button
                  label="Continue"
                  className="!w-fit bg-black px-12 py-2 text-xs"
                  type="submit"
                  disabled={!isValid}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InputAmount;
