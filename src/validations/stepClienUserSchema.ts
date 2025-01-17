import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { z } from "zod";

export const stepClientUserSchemas = [
  z
    .object({
      username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
      email: z.string().email("Endereço de email invalido"),
      password: z
        .string({
          required_error: "Senha obrigatório.",
        })
        // Use the "describe" method to set the label
        // If no label is set, the field name will be used
        // and un-camel-cased
        .describe("Sua senha segura")
        .min(8, {
          message: "A senha deve conter pelo menos 8 caracteres.",
        }),
      confirmPassword: z
        .string({
          required_error: "Senha obrigatório.",
        })
        .min(8, {
          message: "A senha deve conter pelo menos 8 caracteres.",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    }),
  z.object({
    fullName: z.string().min(1, {
      message: "Campo obrigatório.",
    }),
    nif: z.string().length(14, "NIF deve conter 14 caracteres."),
    nationality: z.string({
        required_error: "Por favor selecione o país",
    }),
    maritalStatus: z.string().min(1, { message: "Selecione o estado cívil" }),
    phoneNumber: z
      .string()
      .min(1, "O número de telefone é obrigatório")
      .max(9, "Número de telefone inválido")
      .regex(/^\+?[1-9]\d{1,14}$/, "Número de telefone inválido"),
    address: z.string().min(1, { message: "Endereço é obrigatório" }),
  }),
  z.object({
    file: z
      .custom<FileList>()
      .refine((files) => files?.length === 1, "Arquivo é obrigatório")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        "Tamanho máximo do arquivo é 2MB"
      )
      .refine(
        (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
        "Somente arquivos PDF são aceitos"
      ),
  }),
];

