import { api } from '@/lib/axios';
import { Contract, ContractResponse, ContractSignatureRequest } from '@/types/contract';

export const contractService = {
  async getAll(): Promise<Contract[]> {
    const response = await api.get<Contract[]>('/contracts');
    return response.data;
  },

  async getByUser(userId: string): Promise<ContractResponse[]> {
    const response = await api.get<ContractResponse[]>(`/contracts/user/${userId}`);
    return response.data;
  },

  async getByCompany(companyId: string): Promise<ContractResponse[]> {
    const response = await api.get<ContractResponse[]>(`/contracts/company/${companyId}`);
    return response.data;
  },

  async getById(id: string): Promise<Contract> {
    const response = await api.get<Contract>(`/contracts/${id}`);
    return response.data;
  },

  async updateOwnerSignature(id: string, data: ContractSignatureRequest): Promise<void> {
    await api.patch(`/contracts/${id}/update-owner-signature`, data);
  },

  async updateCustomerSignature(id: string, data: ContractSignatureRequest): Promise<void> {
    await api.patch(`/contracts/${id}/update-customer-signature`, data);
  }
};