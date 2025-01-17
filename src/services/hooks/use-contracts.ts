"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contractService } from "../contract.service";
import { ContractPayload } from "@/types/contract";

export function useContracts() {
  return useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const response = await contractService.getAll();
      return response;
    },
  });
}

export function useContractByUser(userId: string) {
  return useQuery({
    queryKey: ["contract-by-user"],
    queryFn: async () => {
      const response = await contractService.getByUser(userId);
      return response;
    },
  });
}

export function useContractByCompany(companyId: string) {
  return useQuery({
    queryKey: ["contract-by-company"],
    queryFn: async () => {
      const response = await contractService.getByCompany(companyId);
      return response;
    },
  });
}

export function useContractById(id: string) {
  return useQuery({
    queryKey: ["contract-by-id"],
    queryFn: async () => {
      const response = await contractService.getById(id);
      return response;
    },
  });
}

const updateOwnerSignature = async ({
  id,
  data,
}: ContractPayload): Promise<void> => {
  await contractService.updateOwnerSignature(id, data);
};

export function useUpdateOwnerSignature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOwnerSignature,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["contract-by-user"] });
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      queryClient.invalidateQueries({ queryKey: ["contract-by-company"] });
      queryClient.invalidateQueries({ queryKey: ["contract-by-id"] });
      console.log(data);
    },
    onError: (error) => {
      console.error("Erro ao atualizar assinatura do proprietário:", error);
    },
  });
}

const updateCustomerSignature = async ({
  id,
  data,
}: ContractPayload): Promise<void> => {
  await contractService.updateCustomerSignature(id, data);
};

export function useUpdateCustomerSignature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCustomerSignature,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["contract-by-user"] });
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      queryClient.invalidateQueries({ queryKey: ["contract-by-company"] });
      queryClient.invalidateQueries({ queryKey: ["contract-by-id"] });
      console.log(data);
    },
    onError: (error) => {
      console.error("Erro ao atualizar assinatura do cliente:", error);
    },
  });
}
