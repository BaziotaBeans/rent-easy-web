import { api } from "@/lib/axios";
import { SchedulingPaymentRequest, SchedulingPaymentResponse } from "@/types/scheduling-payment";

export const schedulingPaymentService = {
    async create(data: SchedulingPaymentRequest): Promise<SchedulingPaymentResponse> {
        const response = await api.post<SchedulingPaymentResponse>("/scheduling-payments/", data);
        return response.data;
    },
    async getAll() {
        const response = await api.get<SchedulingPaymentResponse[]>("/scheduling-payments/");
        return response.data;
    }
};

//SchedulingPaymentResponse