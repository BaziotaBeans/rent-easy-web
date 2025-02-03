import { PaymentMethod } from "./order";
import { Property, User } from "./schedule";

export interface SchedulingPaymentResponse {
  pkSchedulingPayment: string; // UUID representado como string
  user: User;
  property: Property;
  scheduledDate: string; // ISO 8601 format (e.g., "2025-01-20")
  scheduleDetails: string; // Detalhes do agendamento
  totalValue: number; // Valor total do pagamento
  paymentMethod: string; // Métodos válidos definidos no Enum
  createdAt: string; // ISO 8601 format (e.g., "2025-01-20T15:30:00Z")
  reference?: string; // Referência opcional para o pagamento
}


export interface SchedulingPaymentRequest {
    userId: string;
    propertyId: string;
    schedulingId: string;
    totalValue: number;
    paymentMethod: PaymentMethod;
    reference?: string;
}