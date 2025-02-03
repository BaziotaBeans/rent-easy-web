"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { schedulingService } from "../scheduling.service";
import { SchedulingPayload } from "@/types/schedule";

const createScheduling = async ({
  pkPropertySchedule,
  pkProperty,
}: SchedulingPayload): Promise<void> => {
  await schedulingService.createScheduling({
    pkPropertySchedule,
    pkProperty,
  });
};

export function useCreateScheduling() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createScheduling,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["property-schedule", variables.pkProperty],
      });
      queryClient.invalidateQueries({ queryKey: ["scheduling-by-user"] });
      queryClient.invalidateQueries({ queryKey: ["scheduling-by-company"] });
      queryClient.invalidateQueries({ queryKey: ["scheduling"] });
      queryClient.invalidateQueries({ queryKey: ["last-scheduling"] });
      queryClient.invalidateQueries({ queryKey: ["schedulings"] });
      queryClient.invalidateQueries({ queryKey: ["scheduling-last"] });

      console.log(data);
    },
    onError: (error) => {
      console.error("Erro ao criar agendamento:", error);
    },
  });
}

export function useSchedulings() {
  return useQuery({
    queryKey: ["schedulings"],
    queryFn: async () => {
      const response = await schedulingService.getAll();
      return response;
    },
  });
}

export function useDeleteScheduling() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (schedulingId: string) => {
      await schedulingService.delete(schedulingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduling-by-user"] });
      queryClient.invalidateQueries({ queryKey: ["scheduling-by-company"] });
      queryClient.invalidateQueries({ queryKey: ["scheduling"] });
      queryClient.invalidateQueries({ queryKey: ["last-scheduling"] });
      queryClient.invalidateQueries({ queryKey: ["schedulings"] });
      queryClient.invalidateQueries({ queryKey: ["scheduling-last"] });

      console.log("Agendamento excluído com sucesso.");
    },
    onError: (error) => {
      console.error("Erro ao excluir agendamento:", error);
    },
  });
}

export function useSchedulingByUser(userId: string) {
  return useQuery({
    queryKey: ["scheduling-by-user", userId],
    queryFn: async () => {
      const response = await schedulingService.getByUser(userId);
      return response;
    },
    enabled: !!userId,
  });
}

export function useSchedulingByCompany(companyId: string) {
  return useQuery({
    queryKey: ["scheduling-by-company", companyId],
    queryFn: async () => {
      const response = await schedulingService.getByCompany(companyId);
      return response;
    },
  });
}

export function useSchedulingLast() {
  return useQuery({
    queryKey: ["scheduling-last"],
    queryFn: async () => {
      const response = await schedulingService.getLast();
      return response;
    },
  });
}
