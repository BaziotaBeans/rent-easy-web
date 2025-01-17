import { api } from "@/lib/axios";
import { Company, CompanyRequest } from "@/types/company";

export const companyService = {
  async create(userId: string, data: CompanyRequest): Promise<Company> {
    const response = await api.post<Company>(`/company/${userId}`, data);
    return response.data;
  },
};
