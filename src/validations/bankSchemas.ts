import { z } from "zod";

export const bankSchemas = z.object({
  bankName: z.string().min(1, { message: "Campo obrigatório" }),
  bankAccountNumber: z.string().min(1, { message: "Campo obrigatório" }),
  bankIban: z.string().min(1, { message: "Campo obrigatório" }),
});
