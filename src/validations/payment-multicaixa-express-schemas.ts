import { z } from "zod";

export const paymentMulticaixaExpressSchemas = z.object({
  phoneNumber: z
    .string()
    .min(1, "O número de telefone é obrigatório")
    .max(9, "Número de telefone inválido")
    .regex(/^\+?[1-9]\d{1,14}$/, "Número de telefone inválido"),
});
