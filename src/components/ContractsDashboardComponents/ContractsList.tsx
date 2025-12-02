import React, { useState } from "react";
import { useModalStore } from "../../zustand/useModalStore";
import { Notification } from "../../data/types/notificationTypes";
import { formatDate } from "../../data/utils";
import ApiErrorBlock from "../ApiErrorBlock";
import NotFound from "../NotFound";
import SmallLoader from "../SmallLoader";
import { Eye, Trash, Trash2 } from "lucide-react";
import { Contract } from "../../data/types/ContractTypes";
import CopyButton from "../CopyButton";

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
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const renderContent = () => {
    if (isLoading) {
      return <SmallLoader />;
    }
    if (isError) {
      return <ApiErrorBlock />;
    }
    if (data.length <= 0) {
      return <NotFound text="notifications" />;
    }
    return renderList();
  };

  const renderList = () => {
    return (
      <div className="">
        <div className="grid grid-cols-4 font-adron-bold text-sm py-4 px-4 md:px-10 rounded-3xl gap-4">
          <div className=" min-w-[100px] max-w-[200px]">Contract ID</div>
          <div className=" min-w-[100px] max-w-[200px]">Property</div>
          <div className="hidden md:block min-w-[100px] max-w-[200px]">
            Date
          </div>
          <div className=" min-w-[100px] max-w-[200px]">Action</div>
        </div>
        {data.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer grid grid-cols-3 md:grid-cols-4 gap-4 items-center py-4 px-4 md:py-4 md:px-10 even:bg-gray-100 rounded-3xl"
          >
            <div className="text-xs min-w-[100px] flex items-center gap-2">
              <span className="truncate">{item.contractId}</span>
              <CopyButton text={item.contractId} />
            </div>
            <div className="text-xs text-gray-400 truncate min-w-[100px] hover:underline">
              {item.propertyEstate}
            </div>
            <div className="text-xs text-gray-400 truncate min-w-[100px] hidden md:block">
              {formatDate(item.created_at ?? "")}
            </div>
            <div className="flex item-center justify-between gap-2 text-xs min-w-[100px]">
              <div className="flex items-center gap-2 text-cyan-800">
                <Eye size={15} />
                View Transaction
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-2 md:p-6 rounded-3xl">
      {/* List */}
      {renderContent()}
    </div>
  );
};

export default ContractsList;
