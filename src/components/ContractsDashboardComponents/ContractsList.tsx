import React from "react";
import { Link } from "react-router-dom";
import { Contract } from "../../data/types/ContractTypes";
import { formatPrice } from "../../data/utils";
import { useModalStore } from "../../zustand/useModalStore";
import ApiErrorBlock from "../ApiErrorBlock";
import CopyButton from "../CopyButton";
import NotFound from "../NotFound";
import SmallLoader from "../SmallLoader";
import ContractDetail from "./ContractDetail";
import { PaymentModal } from "../payment/PaymentModal"; // Import your payment modal
import { useUserStore } from "../../zustand/UserStore";

// export type NotificationStatus = "All" | "Read" | "Unread";

type Props = {
  data: Contract[];
  isError: boolean;
  isLoading: boolean;
  iscontract?: boolean;
  headerComponent?: React.ReactNode;
};

const tabs = ["All", "Read", "Unread"] as const;
type Tab = (typeof tabs)[number];

const ContractsList: React.FC<Props> = ({
  data,
  isError,
  isLoading,
  iscontract = false,
  headerComponent,
}) => {
  const { openModal,closeModal } = useModalStore();

  const userData=useUserStore()


  const handlePayForContract = (contractId: number) => {
   
    openModal(
      <PaymentModal 
        isOpen={true} 
        onClose={() => {closeModal()}} 
        contractId={contractId}
        userEmail={userData.user?.email || ""} // Pass user email from store or default to empty string
      />
    );
  };

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
      <div className="w-full overflow-x-auto">
        <div className="hidden md:grid grid-cols-12 font-adron-bold text-sm py-4 px-4 md:px-10 rounded-3xl gap-4">
          <div className="line-clamp-1 col-span-1">S/N</div>
          <div className="line-clamp-1 col-span-2">Contract ID</div>
          <div className="line-clamp-1 col-span-2">Contract Date</div>
          <div className="line-clamp-1 col-span-2">Property</div>
          <div className="line-clamp-1 col-span-2">Contract Net.Val</div>
          <div className="line-clamp-1 col-span-1">Tenor</div>
          <div className="line-clamp-1 col-span-2 min-w-[100px] max-w-[200px]">
            Action
          </div>
        </div>
        {data.map((item, i) => (
          <div key={item.id}>
            {/* Desktop View */}
            <div
              className="cursor-pointer hidden md:grid grid-cols-12 gap-4 items-center py-4 px-4 md:py-4 md:px-10 even:bg-gray-100 rounded-3xl text-xs"
            >
              <div className="col-span-1">{i + 1}</div>
              <div className="text-xs col-span-2 flex items-center gap-2">
                <span className="">{item.contractId}</span>
                <CopyButton text={item.contractId} />
              </div>
              <div className="col-span-2">
                {item.contractDate}
              </div>
              {item.propertyId ? (
                <Link
                  to={`/dashboard/properties/${item.propertyId}`}
                  className="text-xs text-blue-500 col-span-2 hover:underline"
                >
                  {item.propertyEstate}
                </Link>
              ) : (
                <div className="text-xs text-gray-400 col-span-2 hover:underline">
                  {item.propertyEstate}
                </div>
              )}
              <div className="col-span-2">
                {formatPrice(Number(item.propertyNetValue) || 0)}
              </div>
              <div className="col-span-1">{item.propertyTenor}</div>
              <div className="flex items-center gap-2 text-xs col-span-2">
                <Link
                  to={`/dashboard/my-contracts/${item.contractId}/transactions`}
                  className="flex items-center gap-2 text-cyan-800 border rounded-lg text-[8px] text-center p-1 hover:bg-cyan-800 hover:text-white"
                >
                  Transaction history
                </Link>
                <div
                  onClick={() => openModal(<ContractDetail item={item} />)}
                  className="text-[8px] text-center border rounded-lg p-1 hover:bg-adron-black hover:text-white cursor-pointer"
                >
                  Contract detail
                </div>
                {/* New Pay Now Button */}
                <button
                  onClick={() => handlePayForContract(item.id)}
                  className="text-[8px] text-center border rounded-lg p-1 bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  Pay Now
                </button>
              </div>
            </div>

            {/* Mobile View */}
            <div className="flex flex-col gap-3 md:hidden p-4 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="font-medium">#{i + 1}</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{item.contractId}</span>
                  <CopyButton text={item.contractId} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-500 text-xs">Date</div>
                  <div>{item.contractDate || "—"}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Tenor</div>
                  <div>{item.propertyTenor || "—"}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-gray-500 text-xs">Property</div>
                  {item.propertyId ? (
                    <Link
                      to={`/dashboard/properties/${item.propertyId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.propertyEstate || "—"}
                    </Link>
                  ) : (
                    <div className="text-gray-400">
                      {item.propertyEstate || "—"}
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <div className="text-gray-500 text-xs">Net Value</div>
                  <div className="font-medium">
                    {formatPrice(Number(item.propertyNetValue) || 0)}
                  </div>
                </div>
              </div>

              {/* Actions – bigger on mobile */}
              <div className="flex flex-wrap gap-2 mt-2">
                <Link
                  to={`/dashboard/my-contracts/${item.contractId}/transactions`}
                  className="
                    flex-1 text-center py-2.5 px-3 
                    text-sm font-medium rounded-lg
                    bg-cyan-50 text-cyan-800 
                    hover:bg-cyan-100 active:bg-cyan-200
                    border border-cyan-200
                  "
                >
                  Transactions
                </Link>
                <button
                  onClick={() => openModal(<ContractDetail item={item} />)}
                  className="
                    flex-1 py-2.5 px-3 text-sm font-medium rounded-lg
                    bg-gray-100 text-gray-800 
                    hover:bg-gray-200 active:bg-gray-300
                    border border-gray-200
                  "
                >
                  Details
                </button>
                {/* New Pay Now Button for Mobile */}
                <button
                  onClick={() => handlePayForContract(item.id)}
                  className="
                    w-full py-2.5 px-3 text-sm font-medium rounded-lg
                    bg-green-600 text-white 
                    hover:bg-green-700 active:bg-green-800
                    border border-green-500
                  "
                >
                  Pay Now
                </button>
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

        {iscontract && <div className="flex ">{headerComponent}</div>}
      </div>

      {/* List */}
      {renderContent()}
    </div>
  );
};

export default ContractsList;