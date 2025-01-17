import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: "Senha atual é obrigatória.",
      })
      .describe("Sua senha atual")
      .min(8, {
        message: "A senha atual deve conter pelo menos 8 caracteres.",
      }),
    newPassword: z
      .string({
        required_error: "Nova senha é obrigatória.",
      })
      .describe("Sua nova senha segura")
      .min(8, {
        message: "A nova senha deve conter pelo menos 8 caracteres.",
      }),
    confirmNewPassword: z
      .string({
        required_error: "Confirmação da nova senha é obrigatória.",
      })
      .min(8, {
        message: "A confirmação da nova senha deve conter pelo menos 8 caracteres.",
      }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "A nova senha e a confirmação da nova senha não coincidem.",
    path: ["confirmNewPassword"], // Indica onde o erro será exibido
  });

