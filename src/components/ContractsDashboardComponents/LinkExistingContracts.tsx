import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TbCameraPlus } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SmallLoader from "../SmallLoader";
import ApiErrorBlock from "../ApiErrorBlock";
import { useToastStore } from "../../zustand/useToastStore";
import { useGetUser, useLinkExistingContracts } from "../../data/hooks";
import InputField from "../InputField";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import CustomDateInput from "../CustomDateInput";

const LinkExistingContracts = () => {
  const { showToast } = useToastStore();
  const { closeModal } = useModalStore();

  const { data, isLoading, isError } = useGetUser();
  const { mutate: link, isPending } = useLinkExistingContracts();
  const userData = data?.user;
  if (isLoading) return <SmallLoader />;
  if (isError) return <ApiErrorBlock />;

  const initialValues = {
    customer_code: `${userData?.unique_customer_id || ""}`,
    dob: ``,
  };

  const validationSchema = Yup.object({
    customer_code: Yup.string().required("required"),
    dob: Yup.string().required("required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
    if (values.customer_code) {
      formData.append("customer_code", values.customer_code);
    }
    if (values.dob) {
      formData.append("dob", values.dob);
    }
    link(formData, {
      onSuccess() {
        showToast("Existing contracts link successfully", "success");
        closeModal();
      },
      onError() {
        showToast("Invalid Credentials", "error");
      },
    });
  };

  return (
    <div className="w-xs max-w-sm">
      <h4 className="text-lg font-adron-bold text-left">
        Link your Existing Contracts
      </h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => {
          return (
            <Form className="space-y-4">
              {/* Profile Picture */}
              <div className=" py-5 space-y-4">
                <div className="">
                  <label className="block text-sm text-gray-600 font-medium">
                    Customer code
                  </label>
                  <InputField
                    name="customer_code"
                    placeholder={"Customer code"}
                  />
                </div>
                <CustomDateInput
                  label="Date of Birth"
                  name="dob"
                  maxDate={new Date().toISOString().split("T")[0]} // Today's date in YYYY-MM-DD format
                />{" "}
              </div>

              {/* Save Button */}
              <div className="flex items-center gap-4 justify-center">
                <Button
                  label="Cancel"
                  className="bg-gray-500 text-sm "
                  onClick={closeModal}
                />
                <Button
                  label={isPending ? `Linking...` : `Link Contracts`}
                  className="bg-black text-sm "
                  type="submit"
                  isLoading={isPending}
                  disabled={isPending}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LinkExistingContracts;
