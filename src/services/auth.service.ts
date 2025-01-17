import { api } from "@/lib/axios";
import {
  AuthResponse,
  SignInRequest,
  SignUpRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
} from "@/types/auth";

export const authService = {
  async signIn(data: SignInRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/signin", data);
    return response.data;
  },

  async signUp(data: SignUpRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/signup", data);
    return response.data;
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<void> {
    await api.patch(`/user/update/${id}`, data);
  },

  async changePassword(id: string, data: ChangePasswordRequest): Promise<void> {
    await api.put(`/user/${id}/change-password`, data);
  },
};
