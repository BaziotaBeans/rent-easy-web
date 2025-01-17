"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { paymentMulticaixaExpressSchemas } from "@/validations/payment-multicaixa-express-schemas";
import { TimerLeft } from "./timer-left";
import { OrderResponse } from "@/types/order";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useImperativeHandle,
} from "react";
import { useCreatePayment } from "@/services/hooks/use-payment";
import { PaymentMethod } from "@/utils/enum";

interface PaymentFormProps {
  data: OrderResponse;
  setLoadingForm: Dispatch<SetStateAction<boolean>>;
}

export interface PaymentFormRef {
  submitForm: () => void;
}

export const PaymentForm = forwardRef<PaymentFormRef, PaymentFormProps>(
  ({ data, setLoadingForm }, ref) => {
    const { mutateAsync } = useCreatePayment();

    const router = useRouter();

    const form = useForm<z.infer<typeof paymentMulticaixaExpressSchemas>>({
      resolver: zodResolver(paymentMulticaixaExpressSchemas),
      defaultValues: {
        phoneNumber: "",
      },
    });

    async function onSubmit(
      values: z.infer<typeof paymentMulticaixaExpressSchemas>
    ) {
      setLoadingForm(true);

      try {
        console.log("Dados enviados:", values);

        await mutateAsync({
          totalValue: data.totalValue,
          reference: data.reference,
          paymentMethod: PaymentMethod["multicaixa-express"],
        });

        toast.success("Sucesso", {
          description: "Pagamento realizado com sucesso.",
        });
        router.push("/payment-success");
      } catch (error) {
        toast.success("Erro", {
          description: "Ocorreu um erro ao realizar o pagamento.",
        });
      } finally {
        form.reset();
        setLoadingForm(false);
      }
    }

    // Expor a função submitForm para o componente pai
    useImperativeHandle(ref, () => ({
      submitForm: () => form.handleSubmit(onSubmit)(),
    }));

    return (
      <div className="max-w-80 w-full bg-express rounded-tl-3xl rounded-tr-3xl rounded-bl-xl rounded-br-xl shadow-md pb-8">
        <div className="w-full h-16 flex items-center justify-center">
          <div className="w-20 h-2 rounded-xl bg-express-black" />
        </div>
        <div className="w-full h-2 bg-express-black" />

        <TimerLeft data={data} />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4 px-4"
          >
            <FormField
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Número de telefone
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o número de telefone"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#7e4615] font-medium" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  }
);

PaymentForm.displayName = "PaymentForm";
