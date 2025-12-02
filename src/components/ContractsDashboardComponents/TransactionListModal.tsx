import React from "react";
import { formatDate, formatPrice } from "../../data/utils";
import NotFound from "../NotFound";
import ApiErrorBlock from "../ApiErrorBlock";
import SmallLoader from "../SmallLoader";
import { useGetERPContractTransactions } from "../../data/hooks";
import { useParams } from "react-router-dom";

const ContractTransactionList = () => {
  const params = useParams();
  const contractID = params.id;
  const {
    data: res,
    isLoading,
    isError,
  } = useGetERPContractTransactions(Number(contractID));
  const data = res?.data.data;
  const renderList = () => {
    return data?.map((item, i) => (
      <div
        key={item.id}
        className={`cursor-pointer grid grid-cols-9 justify-between items-center p-4 even:bg-gray-100 rounded-3xl`}
      >
        <div className="border rounded-full flex justify-center items-center h-4 w-4 p-2 text-sm">
          {i + 1}
        </div>
        <div className="truncate col-span-2">
          <div className="text-xs text-gray-500">Desc:</div>
          <div className="font-medium text-xs">
            {item.TransactionDescription}
          </div>
        </div>
        <div className="truncate col-span-2">
          <div className="text-gray-500 text-xs">Date:</div>
          <div className="font-medium text-xs">
            {formatDate(item.TransactionDate || "")}
          </div>
        </div>
        <div className="truncate col-span-2">
          <div className="text-gray-500 text-xs">Ref:</div>
          <div className="font-medium text-xs">{item.TransactionReference}</div>
        </div>
        <div className=" col-span-2">
          <div className="text-gray-500 text-xs">Amount:</div>
          <div
            className={`text-sm font-semibold  ${
              item.TransactionDRCR === "C" ? "text-red-400" : "text-green-400"
            }`}
          >
            {formatPrice(item.TransactionAmount || 0)}
          </div>
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

    if (data?.length === 0) {
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
      <h4 className="text-2xl font-adron-bold pb-4">
        Contract Transaction History
      </h4>
      {/* List */}
      <div className="">{renderContent()}</div>
    </div>
  );
};

export default ContractTransactionList;
