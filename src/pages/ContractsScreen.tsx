// pages/ContractsPage.tsx
import { useState } from "react";
import { useGetERPContracts } from "../data/hooks";
import Pagination from "../components/Pagination";
import ContractsList from "../components/ContractsDashboardComponents/ContractsList";

const ContractsPage = () => {
  const [page, setPage] = useState(1);

  const { data, isError, isLoading } = useGetERPContracts(page);
  const totalPages = data?.data.last_page || 0;

  const contracts = data?.data.data ?? [];
  return (
    <div className="">
      <ContractsList data={contracts} isError={isError} isLoading={isLoading} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        hasPrev={!!data?.data.prev_page_url}
        hasNext={!!data?.data.next_page_url}
      />
    </div>
  );
};

export default ContractsPage;
