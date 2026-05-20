import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscribe } from "../data/api";

export const useSubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
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
