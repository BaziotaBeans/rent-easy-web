import { api } from "@/lib/axios";
import { Schedule } from "@/types/property";
import { ScheduleResponse, SchedulingPayload } from "@/types/schedule";

export const schedulingService = {
  async createScheduling({
    pkPropertySchedule,
    pkProperty,
  }: SchedulingPayload): Promise<any> {
    const response = await api.post(
      `/scheduling/${pkPropertySchedule}/${pkProperty}`
    );
    return response.data;
  },

  async getAll(): Promise<ScheduleResponse[]> {
    const response = await api.get<ScheduleResponse[]>("/scheduling/");
    return response.data;
  },

  async getByUser(userId: string): Promise<ScheduleResponse[]> {
    const response = await api.get<ScheduleResponse[]>(
      `/scheduling/findByUserId/${userId}`
    );
    return response.data;
  },

  async getByCompany(companyId: string): Promise<ScheduleResponse[]> {
    const response = await api.get<ScheduleResponse[]>(
      `/scheduling/findByCompany/${companyId}`
    );
    return response.data;
  },

  async getLast(): Promise<ScheduleResponse> {
    const response = await api.get("/scheduling/last");
    return response.data;
  },

  async delete(schedulingId: string): Promise<void> {
    await api.delete(`/scheduling/${schedulingId}`);
  },
};
