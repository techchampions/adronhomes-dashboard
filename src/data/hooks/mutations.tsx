import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import PaymentSuccessfull from "../../components/PaymentSuccessfull";
import { useModalStore } from "../../zustand/useModalStore";
import { useToastStore } from "../../zustand/useToastStore";
import apiClient from "../apiClient";
interface Payload {
  promo_id: number;
  reward_group_id: number;
  property_id: number;
  user_note: string;
}

interface Response {
  success: boolean;
  message: string;
  data: {
    user_id: number;
    promo_id: number;
    property_id: number;
    reward_group_id: number;
    user_note: string;
    status: number;
    updated_at: string;
    created_at: string;
    id: number;
  };
}
interface ErrorResponse {
  message: string;
}
export const useMakeGiftRequest = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const { openModal } = useModalStore();

  return useMutation({
    mutationFn: async (payload: Payload): Promise<Response> => {
      const res = await apiClient.post(`/user/promo/request`, payload);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["property-plan-details"],
      });
      showToast(data.message, "success");
      openModal(<PaymentSuccessfull text={data.message} />);
    },
    onError(error: AxiosError<ErrorResponse>) {
      const errorMsg = error.response?.data.message || "Request Failed";
      showToast(errorMsg, "error");
    },
  });
};
