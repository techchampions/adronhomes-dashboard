import React, { useState } from "react";
import { useModalStore } from "../../zustand/useModalStore";
import {
  Transaction,
  TransactionStatus,
} from "../../data/types/userTransactionsTypes";
import { formatDate, formatPrice } from "../../data/utils";
import NotFound from "../NotFound";
import ApiErrorBlock from "../ApiErrorBlock";
import SmallLoader from "../SmallLoader";
import TransactionDetail from "../DashboardTransactionComponents/TransactionDetail";
import WalletTransactionDetail from "./WalletTransactionDetail";

type Props = {
  data: Transaction[];
  type: "payment" | "transaction";
  isLoading: boolean;
  isError: boolean;
};

const tabs = ["All", "Completed", "Pending", "Failed"] as const;
type Tab = (typeof tabs)[number];

const WalletHistoryList: React.FC<Props> = ({
  data,
  isLoading,
  isError,
  type,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const { openModal } = useModalStore();

  const renderStatusBadge = (status: TransactionStatus) => {
    const statusMap: Record<
      TransactionStatus,
      { label: string; style: string }
    > = {
      1: {
        label: "Completed",
        style: "bg-green-100 text-green-600 border-green-400",
      },
      2: { label: "Failed", style: "bg-red-100 text-red-600 border-red-400" },
      0: {
        label: "Pending",
        style: "bg-gray-100 text-gray-600 border-gray-400",
      },
    };

    const { label, style } = statusMap[status];

    return (
      <span
        className={`hidden md:block text-xs border py-1 rounded-full w-24 text-center mx-auto font-medium ${style}`}
      >
        {label}
      </span>
    );
  };

  const filteredData =
    activeTab === "All"
      ? data
      : data.filter((item) => {
          if (activeTab === "Failed") return item.status === 2;
          if (activeTab === "Completed") return item.status === 1;
          if (activeTab === "Pending") return item.status === 0;
          return false;
        });
  const renderList = () => {
    return filteredData.map((item) => (
      <div
        key={item.id}
        onClick={() => openModal(<WalletTransactionDetail id={item.id} />)}
        className="cursor-pointer grid grid-cols-2 md:grid-cols-4 justify-between items-center p-4 even:bg-gray-100 rounded-3xl"
      >
        <div>
          <div className="font-medium text-xs md:text-sm truncate">
            {item.description}
          </div>
          <div className="text-xs text-gray-500">
            {formatDate(item.created_at || "")}
          </div>
        </div>
        {renderStatusBadge(item.status || 0)}

        <span
          className={`text-xs hidden md:block text-center capitalize py-1 rounded-2xl w-24 border-1 ${
            item.transaction_type === "credit"
              ? `text-adron-green border-adron-green bg-adron-green-100`
              : `text-red-500 border-red-500 bg-red-100`
          }`}
        >
          {type === "transaction" || item.transaction_type
            ? item.transaction_type
            : "Debit"}
          {/* {item.transaction_type} */}
        </span>
        <div
          className={`text-sm font-semibold text-end ${
            item.transaction_type === "credit"
              ? `text-adron-green`
              : `text-red-500`
          } `}
        >
          {item.transaction_type === "credit" ? `+` : `-`}
          {formatPrice(item.amount || item.amount_paid)}
        </div>
      </div>
    ));
  };
  const renderContent = () => {
    if (isLoading) {
      return <SmallLoader />;
    }

    if (isError) {
      return (
        <div className="text-center py-4">
          <ApiErrorBlock />
        </div>
      );
    }

    if (filteredData.length === 0) {
      return (
        <div className="text-center py-4">
          <NotFound />
        </div>
      );
    }

    return renderList();
  };

  return (
    <div className="bg-white p-2 md:p-6 rounded-3xl">
      {/* Tabs & Sort */}
      <div className="flex justify-between items-center mb-4 p-4 md:p-0">
        <div className="flex gap-1 md:gap-4 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab ? "text-black" : "text-gray-400"
              } transition text-xs`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* <div>
          <button className="border border-gray-300 text-xs px-4 py-1 rounded-3xl flex items-center gap-1">
            Latest
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div> */}
      </div>

      {/* List */}
      <div className="">{renderContent()}</div>
    </div>
  );
};

export default WalletHistoryList;
