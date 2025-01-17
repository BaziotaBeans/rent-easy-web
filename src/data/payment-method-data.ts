import { PaymentMethodOption } from "@/types/payment-method-option";

export interface PaymentMethodType {
  value: PaymentMethodOption;
  title: string;
  description: string;
}

export const paymentsMethods: PaymentMethodType[] = [
  {
    value: "reference",
    title: "Pagamento com Referência",
    description: "Pague com Referencia em qualquer banco credenciado.",
  },
  {
    value: "multicaixa-express",
    title: "Pagamento Multicaixa Express",
    description: "Pague com multicaixa online ou transferência express.",
  },
];
