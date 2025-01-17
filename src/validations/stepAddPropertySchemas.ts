import { z } from "zod";

export const MAX_FILE_LENGTH_ALLOWED = 6;
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

export const scheduleSchema = z.object({
  dayOfWeek: z.string().min(1, { message: "Campo obrigatório." }),
  startTime: z.string().min(1, { message: "Campo obrigatório." }),
  endTime: z.string().min(1, { message: "Campo obrigatório." }),
});

export const stepAddPropertySchemas = [
  z.object({
    title: z.string().min(1, {
      message: "Campo obrigatório.",
    }),
    description: z.string(),
    conservation: z.string().min(1, {
      message: "Campo obrigatório.",
    }),
  }),

  z.object({
    room: z
      .string()
      .min(1, "Campo obrigatório.")
      .default("")
      .refine((val) => !isNaN(Number(val)), {
        message: "Por favor digite um campo válido",
      }),
    bathroom: z
      .string()
      .min(1, "Campo obrigatório.")
      .default("")
      .refine((val) => !isNaN(Number(val)), {
        message: "Por favor digite um campo válido",
      }),
    suits: z
      .string()
      .default("")
      .optional()
      .refine((val) => !isNaN(Number(val)), {
        message: "Por favor digite um campo válido",
      }),
    totalArea: z
      .string()
      .default("")
      .optional()
      .refine((val) => !isNaN(Number(val)), {
        message: "Por favor digite um campo válido",
      }),
    vacancy: z
      .string()
      .default("")
      .optional()
      .refine((val) => !isNaN(Number(val)), {
        message: "Por favor digite um campo válido",
      }),
  }),
  z.object({
    address: z.string().min(1, {
      message: "Campo obrigatório.",
    }),
    province: z.string().min(1, {
      message: "Campo obrigatório.",
    }),
    county: z.string().min(1, {
      message: "Campo obrigatório.",
    }),
    latitude: z
      .string()
      .min(1, "Campo obrigatório.")
      .default("")
      .refine((val) => !isNaN(Number(val)), {
        message: "Por favor digite um campo válido",
      }),
    longitude: z
      .string()
      .min(1, "Campo obrigatório.")
      .default("")
      .refine((val) => !isNaN(Number(val)), {
        message: "Por favor digite um campo válido",
      }),
  }),
  z.object({
    schedules: z
      .array(scheduleSchema)
      .min(1, "Pelo menos um item é obrigatório"),
  }),
  z.object({
    price: z
      .string()
      .min(1, "Campo obrigatório.")
      .default("")
      .refine((val) => !isNaN(Number(val)), {
        message: "Por favor digite um campo válido",
      }),
    paymentModality: z
      .string({
        invalid_type_error: "Campo obrigatório.",
        message: "Campo obrigatório.",
      })
      .min(1, {
        message: "Campo obrigatório.",
      }),
    condominiumFee: z
      .string()
      .default("")
      .optional()
      .refine((val) => !isNaN(Number(val)), {
        message: "Por favor digite um campo válido",
      }),
  }),
  z.object({
    files: z
      .custom<FileList>()
      .refine(
        (files) => files?.length > 0,
        "Pelo menos um arquivo é obrigatório"
      )
      .refine(
        (files) => files?.length <= MAX_FILE_LENGTH_ALLOWED,
        `Máximo de ${MAX_FILE_LENGTH_ALLOWED} arquivos é permitido`
      )
      .refine(
        (files) =>
          Array.from(files || []).every((file) => file.size <= MAX_FILE_SIZE),
        "Cada arquivo deve ter no máximo 2MB"
      )
      .refine(
        (files) =>
          Array.from(files || []).every((file) =>
            ACCEPTED_IMAGE_TYPES.includes(file.type)
          ),
        "Somente arquivos de imagem são aceitos (JPEG, PNG, GIF)"
      ),
  }),
];
