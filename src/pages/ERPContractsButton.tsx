import { useGetERPContracts, useSyncERPContracts } from "../data/hooks";

export const ERPContractsButton = ({ userId }: { userId: any }) => {
  const page = 1;

  const { data, isFetching } = useGetERPContracts(page);

  const {
    mutate: syncERPContracts,
    isPending: isSyncing,
  } = useSyncERPContracts();


  const contracts = data?.data?.data ?? [];
  const hasContracts = contracts.length > 0;

  const handleClick = () => {
    
    syncERPContracts(userId);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isFetching || isSyncing}
      className="bg-[#79B833] text-white rounded-2xl py-2 px-4 text-xs"
    >
      {isFetching || isSyncing
        ? "Loading..."
        : hasContracts
        ? "Refresh Contracts"
        : "Sync ERP Contracts"}
    </button>
  );
};

