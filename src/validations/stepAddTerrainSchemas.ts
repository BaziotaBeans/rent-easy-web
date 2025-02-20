import { z } from "zod";
import { scheduleSchema } from "./stepAddPropertySchemas";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_LENGTH_ALLOWED,
  MAX_FILE_SIZE,
} from "@/utils/constant";

export const stepAddTerrainSchemas = [
  z.object({
    title: z.string().min(1, {
      message: "Campo obrigatório.",
    }),
    description: z.string(),
    totalArea: z
      .string()
      .min(1, "Campo obrigatório.")
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
        "Somente arquivos de imagem são aceitos (JPEG, PNG, WEBP)"
      ),
  }),
];
