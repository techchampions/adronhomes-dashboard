import React from "react";
import { Contract } from "../../data/types/ContractTypes";
import CopyButton from "../CopyButton";
import { formatDate, formatPrice } from "../../data/utils";
import { Link } from "react-router-dom";
import { useModalStore } from "../../zustand/useModalStore";
interface Props {
  item: Contract;
}
const ContractDetail: React.FC<Props> = ({ item }) => {
  const modal = useModalStore();
  return (
    <div className="w-sm max-w-sm max-h-80 overflow-x-scroll scrollbar-hide">
      <h4 className="text-2xl font-adron-bold">Contract Detail</h4>
      <div className="text-xs divide-y divide-gray-300 space-y-2 mt-4">
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Contract ID:</div>
          <div className="flex items-center gap-2 col-span-2">
            {item.contractId}
            <CopyButton text={item.contractId} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Contract Date:</div>
          <div className="flex items-center gap-2 col-span-2">
            {item.contractDate || "..."}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Property :</div>
          {item.propertyId ? (
            <Link
              to={`/dashboard/properties/${item.propertyId}`}
              onClick={() => modal.closeModal()}
              className="flex items-center gap-2 col-span-2 text-cyan-700 hover:underline"
            >
              {item.propertyEstate || "..."}
            </Link>
          ) : (
            <div className="flex items-center gap-2 col-span-2">
              {item.propertyEstate || "..."}
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Branch:</div>
          <div className="flex items-center gap-2 col-span-2">
            {item.propertyBranch || "..."}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Propert Name:</div>
          <div className="gap-2 col-span-2">{item.propertyName || "..."}</div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Tenor:</div>
          <div className="gap-2 col-span-2">{item.propertyTenor || "..."}</div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Cost:</div>
          <div className="gap-2 col-span-2">
            {formatPrice(Number(item.propertyCost) || 0)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Discount:</div>
          <div className="gap-2 col-span-2">
            {formatPrice(Number(item.propertyDiscount) || 0)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Net Value:</div>
          <div className="gap-2 col-span-2">
            {formatPrice(Number(item.propertyNetValue) || 0)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Customer name:</div>
          <div className="gap-2 col-span-2">
            {item.customerTitle} {item.customerName || "..."}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Email:</div>
          <div className="gap-2 col-span-2">{item.customerEmail || "..."}</div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Phone:</div>
          <div className="gap-2 col-span-2">{item.customerPhone || "..."}</div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Phone(sms):</div>
          <div className="gap-2 col-span-2">
            {item.customerSMSPhone || "..."}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Customer code:</div>
          <div className="flex items-center gap-2 col-span-2">
            {item.customerCode}
            <CopyButton text={item.customerCode} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Date of birth:</div>
          <div className="flex items-center gap-2 col-span-2">
            {item.dateOfBirth}
            <CopyButton text={item.dateOfBirth} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Customer State:</div>
          <div className="gap-2 col-span-2">{item.customerState || "..."}</div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Customer town:</div>
          <div className="gap-2 col-span-2">{item.customerTown || "..."}</div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Customer Address:</div>
          <div className="gap-2 col-span-2">
            {item.customerAddress || "..."}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">First payment:</div>
          <div className="gap-2 col-span-2">
            {item.firstPaymentDate || "..."}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Last payment:</div>
          <div className="gap-2 col-span-2">
            {item.lastPaymentDate || "..."}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="text-gray-500">Full payment:</div>
          <div className="gap-2 col-span-2">
            {formatPrice(Number(item.fullPayment) || 0)} on{" "}
            {item.fullPaymentDate || "..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;
