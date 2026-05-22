import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InitiatePropertyPurchaseResponse } from "../data/api";
import apiClient from "../data/apiClient";
export const buyProperty = async (
  payload: Partial<BuyPropertyPayload>
): Promise<InitiatePropertyPurchaseResponse> => {
  const response = await apiClient.post("/user/buy-property", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const useBuyProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: buyProperty,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["user-properties-plan"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-data"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-wallet"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-transactions"],
      });
    },
  });
};
