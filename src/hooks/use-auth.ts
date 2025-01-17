"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import {
  SignInRequest,
  SignUpRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
  UserData,
  SignUpWithCompanyRequest,
} from "@/types/auth";
import { auth } from "@/lib/auth";
import { companyService } from "@/services/company.service";
import { useAuthStore } from "@/store/use-auth-store";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { updateAuthState } = useAuthStore();

  const signInMutation = useMutation({
    mutationFn: (data: SignInRequest) => authService.signIn(data),
    onSuccess: (data) => {
      const userData: UserData = {
        pkUser: data.pkUser,
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        roles: data.roles,
        nif: data.nif,
        address: data.address,
        nationality: data.nationality,
        maritalStatus: data.maritalStatus,
      };

      auth.setAccessToken(data.accessToken);
      auth.setUserData(userData);
      updateAuthState();

      const role = data.roles[0];
      const redirectMap: Record<string, string> = {
        ROLE_ADMIN: "/admin",
        ROLE_COMPANY: "/agent",
        ROLE_USER: "/",
      };
      router.push(redirectMap[role] || "/");
    },
    onError: (error) => {
      console.error("Error signing in:", error);
    },
  });

  const signInWithoutRedirectMutation = useMutation({
    mutationFn: (data: SignInRequest) => authService.signIn(data),
    onSuccess: (data) => {
      const userData: UserData = {
        pkUser: data.pkUser,
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        roles: data.roles,
        nif: data.nif,
        address: data.address,
        nationality: data.nationality,
        maritalStatus: data.maritalStatus,
      };

      auth.setAccessToken(data.accessToken);
      auth.setUserData(userData);
      updateAuthState();
    },
    onError: (error) => {
      console.error("Error signing in:", error);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpRequest) => authService.signUp(data),
    onSuccess: () => {
      router.push("/auth/sign-in");
    },
  });

  const signUpWithCompanyMutation = useMutation({
    mutationFn: async (data: SignUpWithCompanyRequest) => {
      // Step 1: Call the signUp service
      const userResponse = await authService.signUp({
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,
        nif: data.nif,
        address: data.address,
        nationality: data.nationality,
        maritalStatus: data.maritalStatus,
        urlDocument: data.urlDocument,
      });

      // Step 2: Use the response from signUp to call create in companyService
      const companyResponse = await companyService.create(userResponse.pkUser, {
        nif: data.nif,
        bankName: data.bankName,
        bankAccountNumber: data.bankAccountNumber,
        iban: data.iban,
      });

      return { userResponse, companyResponse };
    },
    onSuccess: (data) => {
      console.log(data);
      router.push("/auth/sign-in");
    },
    onError: (error) => {
      console.error("Error signing up with company:", error);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      authService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Error signing in:", error);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ChangePasswordRequest }) =>
      authService.changePassword(id, data),
  });

  return {
    signIn: signInMutation.mutateAsync,
    signInWithoutRedirect: signInWithoutRedirectMutation.mutateAsync,
    signUp: signUpMutation.mutateAsync,
    signUpWithCompany: signUpWithCompanyMutation.mutateAsync,
    updateUser: updateUserMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    user: auth.getUserData(),
    isAuthenticated: auth.isAuthenticated(),
    hasRole: auth.hasRole,
    signOut: () => {
      auth.clear();
      updateAuthState(); // Atualiza o estado no Zustand
      router.push("/");
    },
    isLoading: signInMutation.isPending || signUpMutation.isPending,
    error: signInMutation.error || signUpMutation.error,
  };
}
