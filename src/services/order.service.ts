import { api } from "@/lib/axios";
import { Order, OrderRequest, OrderResponse } from "@/types/order";

export const orderService = {
  async create(data: OrderRequest): Promise<Order> {
    const response = await api.post<Order>("/orders/", data);
    return response.data;
  },

  async getAll(): Promise<Order[]> {
    const response = await api.get<Order[]>("/orders");
    return response.data;
  },

  async getById(id: string): Promise<OrderResponse> {
    const response = await api.get<OrderResponse>(`/orders/${id}`);
    return response.data;
  },

  async getByProperty(propertyId: string): Promise<Order[]> {
    const response = await api.get<Order[]>(`/orders/property/${propertyId}`);
    return response.data;
  },

  async getByUser(userId: string): Promise<OrderResponse[]> {
    const response = await api.get<OrderResponse[]>(`/orders/user/${userId}`);
    return response.data;
  },

  async getLast(): Promise<OrderResponse> {
    const response = await api.get<OrderResponse>("/orders/last");
    return response.data;
  },

  async delete(orderId: string): Promise<void> {
    await api.delete(`/orders/${orderId}`);
  },
};
