import React, { useState } from "react";
import { useModalStore } from "../../zustand/useModalStore";
import { Notification } from "../../data/types/notificationTypes";
import { formatDate, formatPrice } from "../../data/utils";
import ApiErrorBlock from "../ApiErrorBlock";
import NotFound from "../NotFound";
import SmallLoader from "../SmallLoader";
import { Eye, Trash, Trash2 } from "lucide-react";
import { Contract } from "../../data/types/ContractTypes";
import CopyButton from "../CopyButton";
import { Link } from "react-router-dom";
import Button from "../Button";
import LinkExistingContracts from "./LinkExistingContracts";
import ContractDetail from "./ContractDetail";

// export type NotificationStatus = "All" | "Read" | "Unread";

type Props = {
  data: Contract[];
  isError: boolean;
  isLoading: boolean;
};

const tabs = ["All", "Read", "Unread"] as const;
type Tab = (typeof tabs)[number];

const ContractsList: React.FC<Props> = ({ data, isError, isLoading }) => {
  const { openModal } = useModalStore();

  const renderContent = () => {
    if (isLoading) {
      return <SmallLoader />;
    }
    if (isError) {
      return <ApiErrorBlock />;
    }
    if (data.length <= 0) {
      return <NotFound text="contracts" />;
    }
    return renderList();
  };

  const renderList = () => {
    return (
      <div className="">
        <div className="grid grid-cols-12 font-adron-bold text-sm py-4 px-4 md:px-10 rounded-3xl gap-4">
          <div className="line-clamp-1 col-span-1">S/N</div>
          <div className="line-clamp-1 col-span-2">Contract ID</div>
          <div className="line-clamp-1 col-span-2">Contract Date</div>
          <div className="line-clamp-1 col-span-2">Property</div>
          <div className="line-clamp-1 col-span-2">Contract Net.Val</div>
          <div className="line-clamp-1 col-span-1">Tenure</div>
          <div className="line-clamp-1 col-span-2 min-w-[100px] max-w-[200px]">
            Action
          </div>
        </div>
        {data.map((item, i) => (
          <div
            key={item.id}
            className="cursor-pointer grid grid-cols-12 gap-4 items-center py-4 px-4 md:py-4 md:px-10 even:bg-gray-100 rounded-3xl text-xs"
          >
            <div className=" col-span-1">{i + 1}</div>
            <div className="text-xs col-span-2 flex items-center gap-2">
              <span className="truncate">{item.contractId}</span>
              <CopyButton text={item.contractId} />
            </div>
            <div className=" col-span-2">
              {/* {formatDate(item.contractDate || "")} */}
              {item.contractDate}
            </div>
            {item.propertyId ? (
              <Link
                to={`/dashboard/properties/${item.propertyId}`}
                className="text-xs text-blue-500 truncate col-span-2 hover:underline"
              >
                {item.propertyEstate}
              </Link>
            ) : (
              <div className="text-xs text-gray-400 truncate col-span-2 hover:underline">
                {item.propertyEstate}
              </div>
            )}
            <div className="col-span-2">
              {formatPrice(Number(item.propertyNetValue) || 0)}
            </div>
            <div className="col-span-1">{item.propertyTenor}</div>
            <div className="flex item-center justify-between gap-2 text-xs col-span-2">
              <Link
                to={`/dashboard/my-contracts/${item.contractId}/transactions`}
                className="flex items-center gap-2 text-cyan-800 border rounded-lg text-[8px] text-center p-1 hover:bg-cyan-800 hover:text-white"
              >
                {/* <Eye size={15} /> */}
                Transaction history
              </Link>
              <div
                onClick={() => openModal(<ContractDetail item={item} />)}
                className="text-[8px] text-center border rounded-lg p-1 hover:bg-adron-black hover:text-white"
              >
                Contract detail
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-2 md:p-6 rounded-3xl">
      <div className="flex items-center justify-between w-full">
        <h4 className="text-2xl font-adron-bold pb-4">Contracts</h4>
        <Button
          label="Link Existing Contracts"
          className="!w-fit px-7 bg-gray-700 !rounded-xl"
          onClick={() => openModal(<LinkExistingContracts />)}
        />
      </div>

      {/* List */}
      {renderContent()}
    </div>
  );
};

export default ContractsList;
