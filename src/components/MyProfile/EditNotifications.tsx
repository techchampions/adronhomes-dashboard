import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Switch } from "@headlessui/react"; // optional for toggle UI
import { TbCameraPlus } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useGetUser, useUpdateProfile } from "../../data/hooks";
import SmallLoader from "../SmallLoader";
import ApiErrorBlock from "../ApiErrorBlock";
import { useToastStore } from "../../zustand/useToastStore";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";

const NotificationSettings = () => {
  const { mutate: update, isPending } = useUpdateProfile();

  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const { data, isLoading, isError } = useGetUser();
  const userData = data?.user;
  if (isLoading) return <SmallLoader />;
  if (isError) return <ApiErrorBlock />;

  const initialValues = {
    firstName: `${userData?.first_name}`,
    lastName: ` ${userData?.last_name}`,
    email: `${userData?.email}`,
    phone: `${userData?.phone_number}`,
    state: `${userData?.state}`,
    country: `${userData?.country}`,
    lga: `${userData?.lga}`,
    address: `${userData?.address}`,
    password: "",
    passwordConfirmation: "",
    newPropertyNotification: userData?.notification_enabled == 1 ? true : false,
    promoNotification: false,
    profilePicture: null,
  };

  const validationSchema = Yup.object({});

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
    <div className="rounded-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => {
          return (
            <Form className="space-y-6">
              {/* Notification Toggles */}
              <div className="space-y-8 bg-white rounded-3xl pt-5">
                <div className="flex items-center justify-between">
                  <div className="w-[80%]">
                    <p className="text-sm font-medium">
                      New Property Notification
                    </p>
                    <p className="text-xs text-gray-400">
                      Turn on to get notified when there is a new property in
                      the market.
                    </p>
                  </div>
                  <Switch
                    checked={values.newPropertyNotification}
                    onChange={(val) =>
                      setFieldValue("newPropertyNotification", val)
                    }
                    className={`${
                      values.newPropertyNotification
                        ? "bg-adron-green"
                        : "bg-gray-300"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                  >
                    <span
                      className={`${
                        values.newPropertyNotification
                          ? "translate-x-6"
                          : "translate-x-1"
                      } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between">
                  <div className="w-[80%]">
                    <p className="text-sm font-medium">
                      Promotion Notifications
                    </p>
                    <p className="text-xs text-gray-400">
                      Turn on to get notified about our latest promotions.
                    </p>
                  </div>
                  <Switch
                    checked={values.promoNotification}
                    onChange={(val) => setFieldValue("promoNotification", val)}
                    className={`${
                      values.promoNotification
                        ? "bg-adron-green"
                        : "bg-gray-300"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                  >
                    <span
                      className={`${
                        values.promoNotification
                          ? "translate-x-6"
                          : "translate-x-1"
                      } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                    />
                  </Switch>
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

export default NotificationSettings;
