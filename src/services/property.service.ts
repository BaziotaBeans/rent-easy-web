import { api } from "@/lib/axios";
import { Property, PropertyRequest, PropertyResponse } from "@/types/property";
import { PropertyAllResponse } from "@/types/property-all";
import { PropertyScheduleResponse } from "@/types/property-schedule";

export const propertyService = {
  async create(data: PropertyRequest): Promise<PropertyResponse> {
    const response = await api.post<PropertyResponse>("/property/", data);
    return response.data;
  },

  async getAll(): Promise<PropertyAllResponse[]> {
    const response = await api.get<PropertyAllResponse[]>("/property/");
    return response.data;
  },

  async getAllWithStatusTrue(): Promise<PropertyResponse[]> {
    const response = await api.get<PropertyResponse[]>(
      "/property/with-status-true"
    );
    return response.data;
  },

  async getPropertySchedule(id: string): Promise<PropertyScheduleResponse[]> {
    const response = await api.get<PropertyScheduleResponse[]>(
      `/property/schedule/available/${id}`
    );
    return response.data;
  },

  async getByCompany(companyId: string): Promise<PropertyResponse[]> {
    const response = await api.get<PropertyResponse[]>(
      `/property/company/${companyId}`
    );
    return response.data;
  },

  async getById(id: string): Promise<PropertyResponse> {
    const response = await api.get<PropertyResponse>(`/property/${id}`);
    return response.data;
  },

  async update(id: string, data: Partial<PropertyRequest>): Promise<Property> {
    const response = await api.put<Property>(`/property/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/property/${id}`);
  },

  async updatePropertyStatus(
    id: string,
    data: { propertyStatus: string }
  ): Promise<Property> {
    const response = await api.put<Property>(`/property/${id}/status`, data);
    return response.data;
  },
};
