"use client";

import { z } from "zod";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { useState } from "react";
import { MulticaixaEpxress } from "@/components/svg/multicaixa-express";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmisSVG } from "@/components/svg/emis";
import { SecureSVG } from "@/components/svg/secure";
import { PropertyResponse } from "@/types/property";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateScheduling } from "@/services/hooks/use-scheduling";
import { useCreateSchedulingPayment } from "@/services/hooks/use-scheduling-payment";
import { useAuth } from "@/hooks/use-auth";
import { ScheduleResponse } from "@/types/schedule";
import { generateRandomReference } from "@/utils";

const paymentMulticaixaExpressSchemas = z.object({
  phoneNumber: z
    .string()
    .nonempty("O número de telefone é obrigatório")
    .min(1, "O número de telefone é obrigatório")
    .max(9, "Número de telefone inválido")
    .regex(/^\+?[1-9]\d{1,14}$/, "Número de telefone inválido"),
});

interface PaymentSchedulingProps {
  data: PropertyResponse;
  selectedSchedule: string;
  handleResetDialogState(): void
}

export function PaymentScheduling({
  data,
  selectedSchedule,
  handleResetDialogState,
}: PaymentSchedulingProps) {
  const [loadingForm, setLoadingForm] = useState(false);

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { mutateAsync: createScheduling } = useCreateScheduling();

  const { mutateAsync: createSchedulingPayment } = useCreateSchedulingPayment();

  const form = useForm<z.infer<typeof paymentMulticaixaExpressSchemas>>({
    resolver: zodResolver(paymentMulticaixaExpressSchemas),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof paymentMulticaixaExpressSchemas>
  ) {
    if (!selectedSchedule) return;

    setLoadingForm(true);

    try {
      await createScheduling({
        pkPropertySchedule: selectedSchedule,
        pkProperty: data.property.pkProperty,
      });

      const response = await api.get<ScheduleResponse>("/scheduling/last");

      await createSchedulingPayment({
        userId: user!.pkUser,
        propertyId: response.data.property.pkProperty,
        schedulingId: response.data.pkScheduling,
        paymentMethod: "MULTICAIXA_EXPRESS",
        reference: generateRandomReference(),
        totalValue: 3000,
      });

      toast.success("Sucesso", {
        description: "Visita agendada com sucesso.",
      });

      queryClient.invalidateQueries({
        queryKey: ["property-schedule", data.property.pkProperty],
      });
    } catch (error) {
      toast.error("Erro", {
        description: "Ocorreu um erro ao a visita.",
      });

      console.log(error);
    } finally {
      setLoadingForm(false);
      handleResetDialogState();
    }
  }

  return (
    <div className="flex flex-col py-6 items-center transition-all">
      <MulticaixaEpxress />

      <div className="flex flex-col gap-2">
        <h1 className="text-lg text-zinc-600 font-bold text-center">
          Pague com Multicaixa Express
        </h1>
        <p className="text-sm text-center text-zinc-600 max-w-96 mx-auto">
          Para agendar a sua visita ao imóvel, será necessário realizar o
          pagamento de uma taxa de{" "}
          <span className="font-medium text-primary-base">3.000 Kz</span>.
        </p>

        <p className="text-sm text-center text-zinc-600 max-w-96 mx-auto">
          Digite o seu número de telefone associado a tua conta express para ser
          reflectido o desconto, em caso de dúvida clique aqui.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-4"
          >
            <FormField
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-500">
                    Número de telefone
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o número de telefone"
                      autoComplete="off"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={loadingForm}
              loading={loadingForm}
              className="w-full"
              variant={"primary"}
            >
              Finalizar pagamento
            </Button>
          </form>
        </Form>

        <footer className="flex flex-col gap-2 items-center mt-4">
          <EmisSVG size={100} />
          <p className="text-zinc-500 text-xs text-center mt-2">
            Informação tratada pela EMIS e não será fornecida ao comerciante.
          </p>

          <span className="text-xs flex items-center gap-3 text-zinc-500">
            <SecureSVG size={18} /> Suas informações estão seguras
          </span>
        </footer>
      </div>
    </div>
  );
}
