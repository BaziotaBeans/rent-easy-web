import { z } from "zod";

export const LoginFormSchemaValidation = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  password: z
    .string({
      required_error: "Senha obrigatório.",
    }).min(1, {
      message: "Senha obrigatório.",
    }),
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    // .describe("Sua senha segura")
    // .min(8, {
    //   message: "A senha deve conter pelo menos 8 caracteres.",
    // }),
  keepSigned: z.boolean().default(false),
});
