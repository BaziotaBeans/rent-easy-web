import { api } from "@/lib/axios";
import { UserResponse } from "@/types/user";

export const userService = {
  async getAll(): Promise<UserResponse[]> {
    const response = await api.get<UserResponse[]>("/user/findAll");
    return response.data;
  },
};
