"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "../payment.service";

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentService.create,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["payment-by-reference"] });
      queryClient.invalidateQueries({ queryKey: ["payment-last"] });
      queryClient.invalidateQueries({ queryKey: ["payments-company-user-associated"] });

      console.log(data);
    },
    onError: (error) => {
      console.error("Erro ao realizar pagamento:", error);
    },
  });
}

export function usePayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await paymentService.getAll();
      return response;
    },
  });
}

export function usePaymentByReference() {
  return useQuery({
    queryKey: ["payment-by-reference"],
    queryFn: async () => {
      const response = await paymentService.getByReference();
      return response;
    },
  });
}

export function useLastPayment() {
  return useQuery({
    queryKey: ["payment-last"],
    queryFn: async () => {
      const response = await paymentService.getLastPayment();
      return response;
    },
  });
}

export function usePaymentsCompanyUserAssociated(userId: string) {
  return useQuery({
    queryKey: ["payments-company-user-associated"],
    queryFn: async () => {
      const response = await paymentService.getCompanyUserAssociated(userId);
      return response;
    },
    enabled:!!userId,
    initialData: []
  });
}
