"use client";

import { api } from "@/lib/axios";
import { Payment, PaymentRequest, PaymentResponse } from "@/types/payment";

export const paymentService = {
  async create(data: PaymentRequest): Promise<Payment> {
    const response = await api.post<Payment>("/payments/", data);
    return response.data;
  },

  async getAll(): Promise<PaymentResponse[]> {
    const response = await api.get<PaymentResponse[]>("/payments/");
    return response.data;
  },

  async getByReference(): Promise<Payment[]> {
    const response = await api.get<Payment[]>("/payments/by-reference");
    return response.data;
  },

  async getLastPayment(): Promise<PaymentResponse> {
    const response = await api.get<PaymentResponse>("/payments/last");
    return response.data;
  },
  async getCompanyUserAssociated(userId: string) {
    const response = await api.get<PaymentResponse[]>(`/payments/company-user-associated/${userId}`);
    return response.data;
},
};
