// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { AxiosError } from "axios";
// import apiClient from "../data/apiClient";
// import { useToastStore } from "../zustand/useToastStore";
// const sendMaintainaceRequest = async (payload: RequestPaylaod) => {
//   const res = await apiClient.post(`/user/estates/maintenance`, payload, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data;
// };
// export const useSendRequest = () => {
//   const toast = useToastStore();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: sendMaintainaceRequest,
//     onSuccess: (data) => {
//       // Refetch relevant data if needed
//       queryClient.invalidateQueries({
//         queryKey: ["user-maintainance-requests"],
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["estate-community-info"],
//       });
//       if (data.success && data.message) {
//         toast.showToast(data.message, "success");
//       }
//     },
//     onError: (error: AxiosError<ErrorResponse>) => {
//       if (error.response) {
//         toast.showToast(error.response?.data.message, "error");
//       }
//     },
//   });
// };
