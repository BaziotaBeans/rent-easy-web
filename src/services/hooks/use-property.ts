"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "../property.service";

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: propertyService.create,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
      queryClient.invalidateQueries({
        queryKey: ["properties-with-status-true"],
      });
      queryClient.invalidateQueries({
        queryKey: ["properties-by-company-id"],
      });
      queryClient.invalidateQueries({
        queryKey: ["property-by-id"],
      });
      queryClient.invalidateQueries({
        queryKey: ["property-schedule"],
      });
    },
    onError: (error) => {
      console.error("Erro ao criar imóvel:", error);
    },
  });
}

export function usePropertyDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: propertyService.delete,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
      queryClient.invalidateQueries({
        queryKey: ["properties-with-status-true"],
      });
      queryClient.invalidateQueries({
        queryKey: ["properties-by-company-id"],
      });
      queryClient.invalidateQueries({
        queryKey: ["property-by-id"],
      });
      queryClient.invalidateQueries({
        queryKey: ["property-schedule"],
      });
    },
    onError: (error) => {
      console.error("Erro ao excluir imóvel:", error);
    },
  });
}
export function useProperties() {
  const queryKey = ["properties"];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await propertyService.getAll();
      return response;
    },
    retry: 5,
  });
}

export function usePropertiesWithStatusTrue() {
  const queryKey = ["properties-with-status-true"];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await propertyService.getAllWithStatusTrue();

      return response;
    },
    retry: 5,
  });
}

export function usePropertiesByCompanyId(companyId: string) {
  return useQuery({
    queryKey: ["properties-by-company-id"],
    queryFn: async () => {
      const response = await propertyService.getByCompany(companyId);
      return response;
    },
    enabled: !!companyId,
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ["property-by-id", id],
    queryFn: async () => {
      const response = await propertyService.getById(id);
      return response;
    },
    enabled: !!id,
  });
}

export function usePropertySchedule(id: string) {
  return useQuery({
    queryKey: ["property-schedule", id],
    queryFn: async () => {
      const response = await propertyService.getPropertySchedule(id);
      return response;
    },
    enabled: !!id,
  });
}
