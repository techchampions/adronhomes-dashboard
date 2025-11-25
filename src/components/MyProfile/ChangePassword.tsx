import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TbCameraPlus } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SmallLoader from "../SmallLoader";
import ApiErrorBlock from "../ApiErrorBlock";
import { useToastStore } from "../../zustand/useToastStore";
import { useGetUser, useUpdateProfile } from "../../data/hooks";
import InputField from "../InputField";
import Button from "../Button";
import ProfilePictureField from "./ProfilePictureField";
import { useModalStore } from "../../zustand/useModalStore";

const ChangePassword = () => {
  const { showToast } = useToastStore();
  const { closeModal } = useModalStore();
  const { mutate: update, isPending } = useUpdateProfile();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const initialValues = {
    password: "",
    passwordConfirmation: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
    if (values.password && values.passwordConfirmation) {
      formData.append("password", values.password);
      formData.append("password_confirmation", values.passwordConfirmation);
    }
    update(formData, {
      onSuccess() {
        showToast("Profile updated successfully", "success");
        closeModal();
      },
    });
  };

  return (
    <div className="md:min-w-xs">
      <h4 className="text-2xl font-adron-bold text-center mb-5">
        Change Password
      </h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => {
          return (
            <Form className="space-y-4">
              {/* Profile Picture */}
              <div className="bg-white rounded-3xl space-y-2">
                <div className="grid gap-2 md:gap-4">
                  <InputField
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    autocomplete="new-password"
                    rightIcon={
                      showPassword ? (
                        <FaEyeSlash
                          className="text-gray-500 w-5 h-5 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <FaEye
                          className="text-gray-500 w-5 h-5 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )
                    }
                  />
                  <InputField
                    name="passwordConfirmation"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Confirm Password"
                    rightIcon={
                      showPassword2 ? (
                        <FaEyeSlash
                          className="text-gray-500 w-5 h-5 cursor-pointer"
                          onClick={() => setShowPassword2(!showPassword2)}
                        />
                      ) : (
                        <FaEye
                          className="text-gray-500 w-5 h-5 cursor-pointer"
                          onClick={() => setShowPassword2(!showPassword2)}
                        />
                      )
                    }
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex items-center gap-5 justify-center">
                <Button
                  label="Cancel"
                  className="bg-gray-500 text-sm "
                  onClick={closeModal}
                />
                <Button
                  label={isPending ? `Saving...` : `Save Changes`}
                  className="bg-black text-sm "
                  type="submit"
                  isLoading={isPending}
                  disabled={isPending || !isValid}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ChangePassword;
