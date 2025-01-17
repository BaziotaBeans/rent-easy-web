"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { useCountDownTimeToPay } from "@/hooks/use-countdown-time-to-pay";
import { formatPriceToKwanza } from "@/utils/format-price";
import { Button } from "@/components/ui/button";
import { OrderResponse } from "@/types/order";

interface OrderReferenceCardProps {
  data: OrderResponse;
}

export function OrderReferenceCard({ data }: OrderReferenceCardProps) {
  const [copied, setCopied] = useState(false);
  const [_, copy] = useCopyToClipboard();
  const { minute, second, remainingTime } = useCountDownTimeToPay(
    data.expirationDate
  );
  const [progress, setProgress] = useState(100);

  // Tempo total em segundos
  const totalTimeInSeconds = Math.floor(
    (new Date(data.expirationDate).getTime() -
      new Date(data.createdAt).getTime()) /
      1000
  );

  const progressValue = (remainingTime / totalTimeInSeconds) * 100;

  const minutes = String(minute).padStart(2, "0");
  const seconds = String(second).padStart(2, "0");

  const copyText = (reference: string) => {
    setCopied(true);

    const referenceId = reference || "";

    copy(referenceId);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  useEffect(() => {
    setProgress(progressValue > 0 ? progressValue : 0);
  }, [remainingTime]);

  return (
    <div className="flex-1 bg-zinc-50  w-full rounded-2xl p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-2xl font-bold text-zinc-700">
          Pague com Referencia
        </h1>
        <span className="text-sm text-center text-zinc-500">
          Copie o código abaixo para pagar via Referencia em qualquer banco
          habilitado
        </span>
      </div>

      <button
        title="Copiar código de referência"
        className={cn(
          "w-full h-[50px] p-2.5 rounded-[10px] border-2 border-dashed border-zinc-300",
          "justify-center items-center gap-3 flex transition",
          "hover:border-zinc-500 hover:bg-slate-50"
        )}
        onClick={() => copyText(`${data.reference}`)}
      >
        <span className="text-zinc-700 text-base font-bold truncate">
          {data.reference}
        </span>

        <Copy size={24} className="text-primary-base" />
      </button>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-zinc-500">
          O tempo para voce pagar acaba em:
        </span>
        <span className="text-black text-2xl font-bold mt-2">
          {minutes[0]}
          {minutes[1]}:{seconds[0]}
          {seconds[1]}
        </span>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-zinc-700 text-base font-bold">Entidade</span>
          <span className="text-zinc-700 text-base font-bold">
            {data.entidade}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500 text-sm font-medium">Valor total</span>
          <span className="text-zinc-500 text-sm font-medium">
            {formatPriceToKwanza(data.totalValue)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500 text-sm font-medium">Tipo Item</span>
          <span className="text-zinc-500 text-sm font-medium">
            {data.property.fkPropertyTypeEntity.designation}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          variant={"ghost"}
          className="font-medium"
          onClick={() => copyText(`${data.reference}`)}
        >
          Copiar Código
        </Button>
      </div>

      {copied ? (
        <span className="text-center text-base font-medium text-green-600">
          Código de referência copiada com sucesso!
        </span>
      ) : null}
    </div>
  );
}
