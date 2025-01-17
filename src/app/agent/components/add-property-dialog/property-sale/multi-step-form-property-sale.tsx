"use client";

import { z } from "zod";
import React, { useState } from "react";
import { toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useCreateProperty } from "@/services/hooks/use-property";
import { appConstant } from "@/utils/constant";
import { useImageFileUpload } from "@/hooks/use-image-file-upload";
import { PropertyRequest } from "@/types/property";
import { useAddPropertyDialogDialog } from "@/store/use-add-property-dialog";
import { usePropertyFilterStore } from "@/store/use-property-filter-store";
import { convertWeekDays } from "@/utils/date-formats";
import { getPropertyType } from "@/utils";
import { stepAddPropertySaleSchemas } from "@/validations/stepAddPropertySaleSchemas";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { StepThree } from "./step-three";
import { StepFour } from "./step-four";
import { StepFive } from "./step-five";
import { StepSix } from "./step-six";

//stepAddPropertySaleSchemas
type StepSchema = z.infer<(typeof stepAddPropertySaleSchemas)[number]>;

const resolver = (step: number) =>
  zodResolver(stepAddPropertySaleSchemas[step]);

export function MultiStepFormPropertySale() {
  const [step, setStep] = useState(0);
  const totalSteps = stepAddPropertySaleSchemas.length;
  const [formData, setFormData] = useState({});
  const { user } = useAuth();
  const { mutateAsync } = useCreateProperty();
  const { handleUpload } = useImageFileUpload();
  const { onClose } = useAddPropertyDialogDialog();
  const { resetFilters, selectedPropertyType } = usePropertyFilterStore();

  const methods = useForm<StepSchema>({
    // resolver: zodResolver(stepAddPropertySchemas[step]),
    resolver: resolver(step),
    defaultValues: {
      title: "",
      description: "",
      room: "",
      bathroom: "",
      suits: "",
      totalArea: "",
      vacancy: "",
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
      conservation: "",
      condominiumFee: "",
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
            suits: updatedData.suits ? parseInt(updatedData.suits) : 0,
            room: updatedData.room ? parseInt(updatedData.room) : 0,
            bathroom: updatedData.bathroom ? parseInt(updatedData.bathroom) : 0,
            vacancy: updatedData.vacancy ? parseInt(updatedData.vacancy) : 0,
            price: parseFloat(updatedData.price),
            totalArea: updatedData.totalArea
              ? parseFloat(updatedData.totalArea)
              : 0,
            buildingArea: 0,
            description: updatedData.description,
            paymentModality: "",
            status: true,
            fkCompany: user!.pkUser,
            fkPropertyType: appConstant.propertyTypeSale,
            images: uploadedURLS,
            propertyStatus: "PUBLISHED",
            schedules: convertWeekDays(updatedData.schedules),
            latitude: updatedData.latitude,
            longitude: updatedData.longitude,
            propertyType: getPropertyType(selectedPropertyType),
            condominiumFee: updatedData.condominiumFee
              ? parseFloat(updatedData.condominiumFee)
              : 0,
            conservation: updatedData.conservation,
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
            {step === 1 && <StepTwo />}
            {step === 2 && <StepThree form={methods} />}
            {step === 3 && <StepFour form={methods} />}
            {step === 4 && <StepFive />}
            {step === 5 && <StepSix form={methods} />}
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
