"use client";

import { MAX_FILE_LENGTH_ALLOWED } from "@/validations/stepAddPropertySchemas";
import { HeadingForm } from "../heading-form";
import ImageUpload from "./property-image-upload";
import { formType } from "./step-three";

interface StepFourProps {
  form: formType;
}

export function StepSix({ form }: StepFourProps) {
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
