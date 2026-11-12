import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDeletePendingProperty, useGetPropertyPlanByID } from "../../data/hooks";
import { formatDate } from "../../data/utils";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import SelectPaymentMethod from "../DashboardMyPropertyComponents/SelectPaymentMethod";

type PropertyCardProps = {
  id: number;
  createdAt: string;
  user_property_id: number;
  imageUrl: string;
  title: string;
  state: string;
  country: string;
  address: string;
  progress: number;
  raisedAmount: number;
  targetAmount: number;
  units: number;
  status: number;
  payment_method: string;
  payment_type: number;
  subscription_form: number;
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  user_property_id,
  subscription_form,
  createdAt,
  imageUrl,
  title,
  state,
  country,
  address,
  progress,
  raisedAmount,
  targetAmount,
  units,
  status,
  payment_method,
  payment_type,
}) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore();
  const { data, isLoading } = useGetPropertyPlanByID(id);
  const { mutate: deleteProperty, isPending: isDeleting } = useDeletePendingProperty();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const isPendingProperty = Number(status) === 0;
  // const progressPercent = Math.min(
  //   100,
  //   (raisedAmount / targetAmount) * 100
  // ).toFixed(1);
  const handleNavigation = () => {
    navigate(`/dashboard/my-property/${id}`);
  };
  const makePayment = () => {
    if (data?.payment.id) {
      openModal(
        <SelectPaymentMethod
          goBack={closeModal}
          subscription_form={data.plan_properties.property.initial_deposit}
          amount={raisedAmount + subscription_form}
          user_property_id={user_property_id}
          payment_type={payment_type}
          payment_id={data?.payment.id}
        />
      );
    }
  };
  const location = `${address}, ${state} ${country}`;
  // if (units > 1) {
  //   raisedAmount = raisedAmount * units;
  //   targetAmount = targetAmount * units;
  // }

  return (
    <div className="bg-white rounded-3xl p-6 w-full shadow">
      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-2 items-start">
          <img
            src={imageUrl || "/treasure-park-bg.png"}
            alt={title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex flex-col text-xs text-gray-400 items-start gap-1">
            <div className="bg-adron-body rounded-lg px-2 py-1  text-gray-400 text-xs ">
              x {units} units
            </div>
            <div className="">{formatDate(createdAt)}</div>
          </div>
        </div>
        <div className="w-full">
          <h4 className="text-lg md:text-2xl text-adron-black leading-tight w-full line-clamp-2">
            {title}
          </h4>
          <div className="flex items-center text-xs text-gray-400 mt-1">
            <FaMapMarkerAlt className="mr-1 text-gray-400" />
            {location}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-5">
        <div className="w-full h-2.5 bg-adron-green-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-adron-green rounded-3xl"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-600">
            ₦{raisedAmount.toLocaleString()}
          </span>
          <span className="text-black">₦{targetAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Button */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button
          label="View Details"
          className="!w-fit px-4 text-[9px] md:text-xs"
          onClick={handleNavigation}
        />
        {status === 0 &&
          (payment_method === "paystack" ||
            payment_method == "interswitch") && (
            <Button
              label="Make Payment"
              isLoading={isLoading}
              disabled={!data?.payment.id}
              className="!w-fit px-4 text-[9px] md:text-xs !bg-transparent !text-adron-green border-1 border-adron-green"
              onClick={makePayment}
            />
          )}
        {isPendingProperty && (
          <Button
            label="Delete"
            className="!w-fit px-4 text-[9px] md:text-xs !bg-transparent !text-red-600 border border-red-200"
            onClick={() => setConfirmingDelete(true)}
          />
        )}
      </div>
      {confirmingDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6">
            <h4 className="text-lg font-bold text-[#032147]">Delete pending property</h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {title} will be removed from your pending list. This is only available while the property is still pending.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setConfirmingDelete(false)}
                className="h-11 flex-1 rounded-full border border-gray-200 text-sm font-semibold text-gray-600"
              >
                Go back
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() =>
                  deleteProperty(user_property_id, {
                    onSuccess: () => setConfirmingDelete(false),
                  })
                }
                className="h-11 flex-1 rounded-full bg-red-600 text-sm font-semibold text-white disabled:bg-gray-300"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
