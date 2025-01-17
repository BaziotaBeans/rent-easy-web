import { z } from "zod";

export const profileClientUserSchema = z.object({
  fullName: z.string().min(1, {
    message: "Campo obrigatório.",
  }),
  nif: z.string().length(14, "NIF deve conter 14 caracteres."),
  nationality: z.string({
    required_error: "Por favor selecione o país",
  }).min(1, {
    message: "Campo obrigatório.",
  }),
  maritalStatus: z.string().min(1, { message: "Selecione o estado cívil" }),
  phoneNumber: z
    .string()
    .min(1, "O número de telefone é obrigatório")
    .regex(/^\+?[1-9]\d{1,14}$/, "Número de telefone inválido"),
  address: z.string().min(1, { message: "Endereço é obrigatório" }),
});
