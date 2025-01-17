"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../user.service";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await userService.getAll();
      return response;
    },
  });
}
