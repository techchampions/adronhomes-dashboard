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

const EditProfile = () => {
  const { showToast } = useToastStore();
  const { closeModal } = useModalStore();

  const { data, isLoading, isError } = useGetUser();
  const { mutate: update, isPending } = useUpdateProfile();
  const userData = data?.user;
  if (isLoading) return <SmallLoader />;
  if (isError) return <ApiErrorBlock />;

  const initialValues = {
    firstName: `${userData?.first_name}`,
    lastName: ` ${userData?.last_name}`,
    email: `${userData?.email}`,
    phone: `${userData?.phone_number}`,
    state: `${userData?.state || ""}`,
    country: `${userData?.country || ""}`,
    lga: `${userData?.lga || ""}`,
    address: `${userData?.address || ""}`,
    password: "",
    passwordConfirmation: "",
    newPropertyNotification: userData?.notification_enabled == 1 ? true : false,
    promoNotification: false,
    profilePicture: userData?.profile_picture || "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Frist Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    state: Yup.string().required("State is required"),
    lga: Yup.string().required("LGA is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
    if (values.firstName) {
      formData.append("first_name", values.firstName);
    }
    if (values.lastName) {
      formData.append("last_name", values.lastName);
    }
    if (values.phone) {
      formData.append("phone_number", values.phone);
    }
    if (values.country) {
      formData.append("country", values.country);
    }
    if (values.state) {
      formData.append("state", values.state);
    }
    if (values.lga) {
      formData.append("lga", values.lga);
    }
    if (values.address) {
      formData.append("address", values.address);
    }
    if (values.profilePicture && typeof values.profilePicture !== "string") {
      formData.append("profile_picture", values.profilePicture);
    }
    update(formData, {
      onSuccess() {
        showToast("Profile updated successfully", "success");
        closeModal();
      },
    });
  };

  return (
    <div className="md:w-md">
      <h4 className="text-2xl font-adron-bold text-center">Edit Profile</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => {
          return (
            <Form className="space-y-2">
              {/* Profile Picture */}
              <div className="bg-white rounded-3xl py-5 space-y-2">
                {/* <div className="flex items-center gap-4">
                  <label className="cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFieldValue("profilePicture", file);
                        }
                      }}
                    />
                    <img
                      src={
                        values.profilePicture
                          ? URL.createObjectURL(values.profilePicture)
                          : userData?.profile_picture
                          ? userData?.profile_picture
                          : "/user.svg"
                      }
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <TbCameraPlus
                      size={20}
                      className="absolute bottom-0 -right-5 text-gray-500"
                    />
                  </label>
                </div> */}
                <div className="w-full flex justify-center mb-3">
                  <ProfilePictureField
                    name="profilePicture"
                    //   className="flex justify-center"
                    width={120}
                    height={120}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <div className="">
                    <label className="block text-sm text-gray-600 font-medium">
                      First Name
                    </label>
                    <InputField
                      name="firstName"
                      placeholder={initialValues.firstName}
                    />
                  </div>
                  <div className="">
                    <label className="block text-sm text-gray-600 font-medium">
                      Last Name
                    </label>
                    <InputField
                      name="lastName"
                      placeholder={initialValues.lastName}
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">Email</label>
                    <InputField
                      name="email"
                      placeholder={initialValues.email}
                      isReadOnly={true}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 ">
                      Phone
                    </label>
                    <InputField
                      name="phone"
                      placeholder={initialValues.phone}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">State</label>
                    <InputField
                      name="state"
                      placeholder={initialValues.state}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 ">LGA</label>
                    <InputField name="lga" placeholder={initialValues.lga} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 ">
                      Address
                    </label>
                    <InputField
                      name="address"
                      placeholder={initialValues.address}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Country
                    </label>
                    <InputField
                      name="country"
                      placeholder={initialValues.country}
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex items-center gap-4 justify-center">
                <Button
                  label="Cancle"
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

export default EditProfile;
