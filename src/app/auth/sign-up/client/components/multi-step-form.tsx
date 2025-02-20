"use client";

import { z } from "zod";
import React, { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { stepClientUserSchemas } from "@/validations/stepClienUserSchema";
import { Progress } from "@/components/ui/progress";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { StepThree } from "./step-three";
import { MultiStepFormHeader } from "../../components/multi-step-form-header";
import { MultiStepFormFooter } from "../../components/multi-step-form-footer";
import { useAuth } from "@/hooks/use-auth";
import { SignUpRequest } from "@/types/auth";
import { useDocumentFileUpload } from "@/hooks/use-document-file-upload";

type StepSchema = z.infer<(typeof stepClientUserSchemas)[number]>;
export function MultiStepForm() {
  const [step, setStep] = useState(0); // Tracks current step
  const totalSteps = stepClientUserSchemas.length;
  const [formData, setFormData] = useState({});
  const { handleUpload } = useDocumentFileUpload();
  const { signUp } = useAuth();

  const methods = useForm({
    resolver: zodResolver(stepClientUserSchemas[step]),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      nif: "",
      nationality: "",
      maritalStatus: "",
      phoneNumber: "",
      address: "",
      file: null,
    },
  });

  console.log(methods.watch("nationality"));

  const handleNext = async (
    // data: z.infer<(typeof stepClientUserSchemas)[typeof step]>
    data: any
  ) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      console.log("Form submitted:", updatedData);

      try {
        const file = updatedData.file[0];
        console.log("######################");
        console.log(file);
        console.log("######################");
        const uploadedURL = await handleUpload(file);

        if (uploadedURL) {
          await signUp({
            username: updatedData?.username,
            fullName: updatedData?.fullName,
            email: updatedData?.email,
            password: updatedData?.password,
            phone: updatedData?.phoneNumber,
            role: ["user"],
            nif: updatedData?.nif,
            address: updatedData?.address,
            nationality: updatedData?.nationality,
            maritalStatus: updatedData?.maritalStatus,
            urlDocument: uploadedURL,
          });

          toast.success("Sucesso", {
            description: "Conta criada com sucesso.",
          });
        } else {
          console.error("File upload failed.");
          toast.error("Erro", {
            description: "Ocorreu um erro ao realizar o upload do Documento.",
          });
        }
      } catch (error) {
        console.error("An error occurred:", error);

        if (error instanceof AxiosError && error.response?.data) {
          const errorMessage =
            error.response.data?.message || "Erro desconhecido.";

          toast.error("Erro", {
            description: errorMessage,
          });
        } else {
          toast.error("Erro", {
            description: "Ocorreu um erro inesperado ao criar a conta.",
          });
        }
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <MultiStepFormHeader />

      <FormProvider {...methods}>
        <div className="w-full ">
          <Progress value={((step + 1) / totalSteps) * 100} className="mb-4" />
          <form onSubmit={methods.handleSubmit(handleNext)}>
            {step === 0 && <StepOne />}
            {step === 1 && <StepTwo />}
            {step === 2 && <StepThree form={methods} />}
            <div className="flex justify-between mt-4">
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

      <MultiStepFormFooter />
    </div>
  );
}
