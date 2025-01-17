"use client";

import { z } from "zod";
import React, { useState } from "react";
import { toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { stepAgentUserSchemas } from "@/validations/stepAgentUserSchema";
import { Progress } from "@/components/ui/progress";
import { MultiStepFormHeader } from "../../components/multi-step-form-header";
import { MultiStepFormFooter } from "../../components/multi-step-form-footer";
import { StepOne } from "../../components/step-one";
import { StepTwo } from "../../components/step-two";
import { StepThree } from "./step-three";
import { StepFourth } from "./step-fourth";
import { useAuth } from "@/hooks/use-auth";
import { useDocumentFileUpload } from "@/hooks/use-document-file-upload";

enum FormSteps {
  StepOne = 0,
  StepTwo = 1,
  StepThree = 2,
  StepFourth = 3,
}

export function MultiStepForm() {
  const [step, setStep] = useState(0); // Tracks current step
  const totalSteps = stepAgentUserSchemas.length;
  const [formData, setFormData] = useState({});
  const { signUpWithCompany } = useAuth();
  const { handleUpload } = useDocumentFileUpload();

  const methods = useForm({
    resolver: zodResolver(stepAgentUserSchemas[step]),
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
      bankName: "",
      bankAccountNumber: "",
      bankIban: "",
      file: null,
    },
  });

  const handleNext = async (
    // data: z.infer<(typeof stepAgentUserSchemas)[typeof step]>
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
          signUpWithCompany({
            username: updatedData?.username,
            fullName: updatedData?.fullName,
            email: updatedData?.email,
            password: updatedData?.password,
            phone: updatedData?.phoneNumber,
            role: ["company"],
            nif: updatedData?.nif,
            address: updatedData?.address,
            nationality: updatedData?.nationality,
            maritalStatus: updatedData?.maritalStatus,
            urlDocument: uploadedURL,
            bankName: updatedData?.bankName,
            bankAccountNumber: updatedData?.bankAccountNumber,
            iban: updatedData?.bankIban,
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
        toast.error("Erro", {
          description: "Ocorreu um erro ao criar a conta.",
        });
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
            {step === FormSteps.StepOne && <StepOne />}
            {step === FormSteps.StepTwo && <StepTwo />}
            {step === FormSteps.StepThree && <StepThree />}
            {step === FormSteps.StepFourth && <StepFourth form={methods} />}

            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === FormSteps.StepOne}
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
