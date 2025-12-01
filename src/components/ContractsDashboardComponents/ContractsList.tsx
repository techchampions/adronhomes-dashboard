import React, { useState } from "react";
import { useModalStore } from "../../zustand/useModalStore";
import { Notification } from "../../data/types/notificationTypes";
import { formatDate } from "../../data/utils";
import ApiErrorBlock from "../ApiErrorBlock";
import NotFound from "../NotFound";
import SmallLoader from "../SmallLoader";
import { Eye, Trash, Trash2 } from "lucide-react";

// export type NotificationStatus = "All" | "Read" | "Unread";

type Props = {
  data: Notification[];
  isError: boolean;
  isLoading: boolean;
};

const tabs = ["All", "Read", "Unread"] as const;
type Tab = (typeof tabs)[number];

const ContractsList: React.FC<Props> = ({ data, isError, isLoading }) => {
  const { openModal } = useModalStore();
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filteredData =
    activeTab === "All"
      ? data
      : data.filter((item) => {
          if (activeTab === "Read") return item.is_read === 1;
          if (activeTab === "Unread") return item.is_read === 0;
          return false;
        });
  const renderContent = () => {
    if (isLoading) {
      return <SmallLoader />;
    }
    if (isError) {
      return <ApiErrorBlock />;
    }
    if (filteredData.length <= 0) {
      return <NotFound text="notifications" />;
    }
    return renderList();
  };

  const renderList = () => {
    return (
      <div className="">
        <div className="grid grid-cols-4 font-adron-bold text-sm p-4 rounded-3xl">
          <div className="">Contract ID</div>
          <div className="">Property</div>
          <div className="">Date</div>
          <div className="">Action</div>
        </div>
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer grid grid-cols-4 items-center p-4 even:bg-gray-100 rounded-3xl"
          >
            <div className="text-xs truncate">{item.title}</div>
            <div className="text-xs text-gray-400 truncate">{item.content}</div>
            <div className="text-xs text-gray-400 truncate">
              {formatDate(item.created_at ?? "")}
            </div>
            <div className="flex item-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-cyan-800">
                <Eye size={15} />
                View
              </div>
              <div
                className="flex items-center gap-2 text-red-800
              "
              >
                <Trash2 size={15} />
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-2 md:p-6 rounded-3xl">
      {/* Tabs & Sort */}
      <div className="flex justify-between items-center mb-4 p-4 md:p-0">
        <div className="flex gap-4 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab ? "text-black" : "text-gray-400"
              } transition`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {renderContent()}
    </div>
  );
};

export default ContractsList;
