"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SchedulingPaymentRequest } from "@/types/scheduling-payment";
import { schedulingPaymentService } from "../scheduling-payment.service";

const createSchedulingPayment = async (data: SchedulingPaymentRequest) => {
  await schedulingPaymentService.create(data);
};

export function useCreateSchedulingPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedulingPayment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["scheduling-payment"] });
      queryClient.invalidateQueries({ queryKey: ["scheduling-payments"] });
      console.log(data);
    },
    onError: (error) => {
      console.error("Erro ao realizar pagamento:", error);
    },
  });
}

export function useSchedulingPayments() {
  return useQuery({
    queryKey: ["scheduling-payments"],
    queryFn: async () => {
      const response = await schedulingPaymentService.getAll();
      return response;
    },
    // Only fetch if userId is provided.
  });
}
