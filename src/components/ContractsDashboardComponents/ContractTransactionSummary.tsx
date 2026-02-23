import React from "react";
import { Transaction } from "../../data/types/ContractTypes";
import { formatPrice } from "../../data/utils";
interface Props {
  item: Transaction;
}
const ContractTransactionSummary: React.FC<Props> = ({ item }) => {
  return (
    <div className="w-sm">
      <h4 className="text-xl font-adron-bold">Transaction Summary</h4>
      <div className="mt-4 space-y-2 divide-y divide-gray-200 text-sm">
        <div className="grid grid-cols-3 pb-2">
          <div className="text-gray-500">Amount:</div>
          <div
            className={`col-span-2 text-end ${
              item.TransactionDRCR === "C" ? "text-red-400" : ""
            }`}
          >
            {formatPrice(item.TransactionAmount || 0)}
          </div>
        </div>
        <div className="grid grid-cols-3 pb-2">
          <div className="text-gray-500">Description:</div>
          <div className={`col-span-2 text-end`}>
            {item.TransactionDescription || "..."}
          </div>
        </div>
        <div className="grid grid-cols-3 pb-2">
          <div className="text-gray-500">Refrence:</div>
          <div className={`col-span-2 text-end`}>
            {item.TransactionReference || "..."}
          </div>
        </div>
        <div className="grid grid-cols-3 pb-2">
          <div className="text-gray-500">Date:</div>
          <div className={`col-span-2 text-end`}>
            {item.TransactionDate || "..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractTransactionSummary;
