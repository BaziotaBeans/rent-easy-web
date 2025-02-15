"use client";

import { z } from "zod";
import React, { useState } from "react";
import { toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepAddTerrainSchemas } from "@/validations/stepAddTerrainSchemas";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { appConstant, VISIT_FEE } from "@/utils/constant";
import { useImageFileUpload } from "@/hooks/use-image-file-upload";
import { PropertyRequest } from "@/types/property";
import { usePropertyFilterStore } from "@/store/use-property-filter-store";
import { convertWeekDays } from "@/utils/date-formats";
import { useCreateProperty } from "@/services/hooks/use-property";
import { useAddPropertyDialogDialog } from "@/store/use-add-property-dialog";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { StepThree } from "./step-three";
import { StepFour } from "./step-four";
import { StepFive } from "./step-five";

type StepSchema = z.infer<(typeof stepAddTerrainSchemas)[number]>;

const resolver = (step: number) => zodResolver(stepAddTerrainSchemas[step]);

export function MultiStepFormTerrain() {
  const [step, setStep] = useState(0);
  const totalSteps = stepAddTerrainSchemas.length;
  const [formData, setFormData] = useState({});
  const { user } = useAuth();
  const { mutateAsync } = useCreateProperty();
  const { handleUpload } = useImageFileUpload();
  const { onClose } = useAddPropertyDialogDialog();
  const { resetFilters } = usePropertyFilterStore();
  const methods = useForm<StepSchema>({
    // resolver: zodResolver(stepAddPropertySchemas[step]),
    resolver: resolver(step),
    defaultValues: {
      title: "",
      description: "",
      totalArea: "",
      address: "",
      province: "",
      county: "",
      latitude: "",
      longitude: "",
      schedules: [
        {
          dayOfWeek: "",
          startTime: "",
          endTime: "",
        },
      ],
      price: "",
    },
  });

  const handleNext = async (data: any) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      console.log("Form submitted:", updatedData);
      try {
        const files = updatedData.files;

        const uploadedURLS = await handleUpload(files);

        if (uploadedURLS.length) {
          const formattedData: PropertyRequest = {
            title: updatedData.title,
            province: updatedData.province,
            county: updatedData.county,
            address: updatedData.address,
            suits: 0,
            room: 0,
            bathroom: 0,
            vacancy: 0,
            price: parseFloat(updatedData.price),
            totalArea: parseFloat(updatedData.totalArea),
            buildingArea: 0,
            description: updatedData.description,
            paymentModality: "",
            status: true,
            fkCompany: user!.pkUser,
            fkPropertyType: appConstant.propertyTypeGround,
            images: uploadedURLS,
            propertyStatus: "STANDBY",
            schedules: convertWeekDays(updatedData.schedules),
            latitude: updatedData.latitude,
            longitude: updatedData.longitude,
            propertyType: "Terreno",
            condominiumFee: VISIT_FEE,
            conservation: ""
          };

          await mutateAsync(formattedData);

          toast.success("Sucesso", {
            description: "Imóvel criado com sucesso.",
          });
        } else {
          toast.error("Erro", {
            description: "Ocorreu um erro ao realizar o upload das imagens.",
          });
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("Erro", {
          description: "Ocorreu um erro ao criar o imóvel.",
        });
      } finally {
        methods.reset();
        resetFilters();
        onClose();
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4 h-full pb-4">
      <FormProvider {...methods}>
        <div className="w-full h-full flex flex-col">
          <Progress value={((step + 1) / totalSteps) * 100} className="mb-4" />

          <form
            onSubmit={methods.handleSubmit(handleNext)}
            className="flex flex-col h-full"
          >
            {step === 0 && <StepOne />}
            {step === 1 && <StepTwo form={methods} />}
            {step === 2 && <StepThree form={methods} />}
            {step === 3 && <StepFour />}
            {step === 4 && <StepFive form={methods} />}
            <div className="flex justify-between mt-auto">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 0}
                type="button"
              >
                Voltar
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={methods.formState.isSubmitting}
              >
                {step < totalSteps - 1 ? "Próximo" : "Enviar"}
              </Button>
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
