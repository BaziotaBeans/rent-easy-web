"use client";

import { MAX_FILE_LENGTH_ALLOWED } from "@/utils/constant";
import { HeadingForm } from "../heading-form";
import ImageUpload from "../property-rent/property-image-upload";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { stepAddTerrainSchemas } from "@/validations/stepAddTerrainSchemas";

type StepFiveFormschema = z.infer<(typeof stepAddTerrainSchemas)[number]>;

export type formType = UseFormReturn<StepFiveFormschema>;

interface StepFiveProps {
  form: formType;
}

export function StepFive({ form }: StepFiveProps) {
  const currentFileLength = form.watch("files")?.length || 0;

  const handleImagesChange = (files: File[]) => {
    console.log("Selected files:", files);
    // Handle the files here
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <HeadingForm
          title="Fazer upload de imagens de imóveis"
          description="Você precisa adicionar 6 fotos no máximo para o imóvel."
        />

        <span className="bg-primary-base/10 text-xs font-medium text-primary-base px-2 rounded-sm flex items-center justify-center">
          {currentFileLength}/{MAX_FILE_LENGTH_ALLOWED}
        </span>
      </div>

      <ImageUpload onChange={handleImagesChange} maxImages={6} form={form} />
    </div>
  );
}
