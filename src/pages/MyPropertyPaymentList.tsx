import PaymentList from "../components/DashboardMyPropertyComponents/PaymentList";
import { useParams } from "react-router-dom";
import { useGetUserPropertiesPlanPaymentHistory } from "../data/hooks";
const MyPropertyPaymentList = () => {
  const params = useParams();
  const id = params?.id;
  const { data, isLoading, isError } = useGetUserPropertiesPlanPaymentHistory(
    id ?? ""
  );
  const payments = data?.properties?.data ?? [];
  // const payments: PaymentItem[] = (data?.properties?.data ?? []).map(
  //   (item: PaymentItem) => ({
  //     id: item.id,
  //     plan_id: item.plan_id,
  //     title: item.property.name ?? "Untitled",
  //     date: formatDate(item.due_date),
  //     status: item.status,
  //     amount: item.amount,
  //   })
  // );

  return (
    <div>
      <PaymentList data={payments} isError={isError} isLoading={isLoading} />
    </div>
  );
};

export default MyPropertyPaymentList;
