"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "../property.service";
import { PropertyAllResponse } from "@/types/property-all";

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

// export function useUpdatePropertyStatus() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       id,
//       propertyStatus,
//     }: {
//       id: string;
//       propertyStatus: string;
//     }) => propertyService.updatePropertyStatus(id, { propertyStatus }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["properties"] });
//       queryClient.invalidateQueries({
//         queryKey: ["properties-with-status-true"],
//       });
//       queryClient.invalidateQueries({ queryKey: ["properties-by-company-id"] });
//       queryClient.invalidateQueries({ queryKey: ["property-by-id"] });
//     },
//     onError: (error) => {
//       console.error("Erro ao atualizar status do imóvel:", error);
//     },
//   });
// }

export function useUpdatePropertyStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, propertyStatus }: { id: string; propertyStatus: string }) =>
      propertyService.updatePropertyStatus(id, { propertyStatus }),

    onSuccess: (data, { id, propertyStatus }) => {
      // Atualiza apenas o item específico na lista de propriedades
      queryClient.setQueryData(["properties"], (oldData: any) => {
        if (!oldData) return oldData;

        return oldData.map((property: PropertyAllResponse) =>
          property.pkProperty === id ? { ...property, propertyStatus } : property
        );
      });

      // Atualiza também a query individual do imóvel
      queryClient.setQueryData(["property-by-id", id], (oldData: any) => ({
        ...oldData,
        propertyStatus,
      }));
    },

    onError: (error) => {
      console.error("Erro ao atualizar status do imóvel:", error);
    },
  });
}

