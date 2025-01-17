"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../order.service";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderService.create,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["last-order"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders-by-user"],
      });

      console.log(data);
    },
    onError: (error) => {
      console.error("Erro ao criar agendamento:", error);
    },
  });
}

export function useLastOrder() {
  return useQuery({
    queryKey: ["last-order"],
    queryFn: async () => {
      const response = await orderService.getLast();
      return response;
    },
  });
}

export function useOrderByUser(userId: string) {
  return useQuery({
    queryKey: ["orders-by-user"],
    queryFn: async () => {
      const response = await orderService.getByUser(userId);
      return response;
    },
  });
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await orderService.getAll();
      return response;
    },
  });
}

export function useOrderById(id: string) {
  return useQuery({
    queryKey: ["order-by-id"],
    queryFn: async () => {
      const response = await orderService.getById(id);
      return response;
    },
  });
}
