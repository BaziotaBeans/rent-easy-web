"use client";

import { MulticaixaEpxress } from "@/components/svg/multicaixa-express";
import { PaymentForm, PaymentFormRef } from "./components/payment-form";
import { formatPriceToKwanza } from "@/utils/format-price";
import { Button } from "@/components/ui/button";
import { EmisSVG } from "@/components/svg/emis";
import { SecureSVG } from "@/components/svg/secure";
import { useLastOrder } from "@/services/hooks/use-order";
import { useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { data, isLoading } = useLastOrder();
  const paymentFormRef = useRef<PaymentFormRef>(null); // Criar referência
  const [loadingForm, setLoadingForm] = useState(false);

  if (isLoading) {
    return (
      <main className="h-full py-10">
        <div className="max-w-80 mx-auto flex flex-col items-center gap-6">
          <Skeleton className="w-[100px] h-[100px] rounded-full"/>

          <Skeleton className="w-[320px] h-[64px] rounded-md"/>

          <Skeleton className="w-[320px] h-[500px] rounded-md"/>
        </div>
      </main>
    );
  }

  const handleFinishPurchase = () => {
    paymentFormRef.current?.submitForm(); // Dispara o submit do PaymentForm
  };

  return (
    <main className="h-full py-10">
      <div className="max-w-80 mx-auto flex flex-col items-center gap-6">
        <MulticaixaEpxress />

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-zinc-600 font-bold text-center">
            Pague com Multicaixa Express
          </h1>
          <p className="text-sm text-center text-zinc-600">
            Digite o seu número de telefone associado a tua conta express para
            ser reflectido o desconto, em caso de dúvida clique aqui.
          </p>
        </div>

        <PaymentForm ref={paymentFormRef} data={data!} setLoadingForm={setLoadingForm}/>

        <ul className="w-full flex flex-col gap-2">
          <li className="flex items-center justify-between text-zinc-600">
            <span className="font-bold">Montante</span>
            <span className="font-bold">{formatPriceToKwanza(data!.property.price)}</span>
          </li>
          <li className="flex items-center justify-between text-zinc-600">
            <span className="text-sm">Referência</span>
            <span className="text-sm">{data?.reference}</span>
          </li>
          <li className="flex items-center justify-between text-zinc-600">
            <span className="text-sm">Tipo Item</span>
            <span className="text-sm">{data?.property.fkPropertyTypeEntity.designation}</span>
          </li>
        </ul>

        <Button
          className="w-full font-bold"
          size={"lg"}
          variant={"primary"}
          onClick={handleFinishPurchase} 
          loading={loadingForm}
        >
          Finalizar Compra
        </Button>

        <footer className="flex flex-col gap-4 items-center">
          <EmisSVG size={100} />
          <p className="text-zinc-500 text-xs text-center">
            Informação tratada pela EMIS e não será fornecida ao comerciante.
          </p>

          <span className="text-xs flex items-center gap-3 text-zinc-500">
            <SecureSVG /> Suas informações estão seguras
          </span>
        </footer>
      </div>
    </main>
  );
}
