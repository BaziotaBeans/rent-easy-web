import { Separator } from "@/components/ui/separator";
import { OrderResponse } from "@/types/order";
import { formatPriceToKwanza } from "@/utils/format-price";
import { MapPin, BedDouble, Bath, CarFront } from "lucide-react";

import Link from "next/link";

interface PropertyResumeProps {
  data: OrderResponse;
}

export function PropertyResume({ data }: PropertyResumeProps) {
  return (
    <div className="lg:order-1 order-2 lg:max-w-[380px] w-full flex flex-col gap-4 rounded-xl p-5 bg-zinc-50">
      <div className="flex flex-col gap-1">
        <span className="text-zinc-800 text-base font-semibold">
          {data?.property.title}
        </span>
        <span className="grid grid-cols-[16px_1fr] items-center gap-2 text-xs text-zinc-600">
          <MapPin className="w-4 h-4 " />
          {data?.property.address}
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm">
            <BedDouble className="w-4 h-4" /> {data?.property.room}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Bath className="w-4 h-4" /> {data?.property.bathroom}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CarFront className="w-4 h-4" /> {data?.property.vacancy}
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <h3 className="text-sm text-zinc-600 font-medium">Resumo</h3>
        <ul className="flex flex-col gap-4">
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Tipo de imóvel</span>
            <span className="text-sm text-zinc-500">Apartamento</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Conservação</span>
            <span className="text-sm text-zinc-500">Usado</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Finalidade</span>
            <span className="text-sm text-zinc-500">Usado</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">
              Modalidade de pagamento
            </span>
            <span className="text-sm text-zinc-500">Semestral</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Taxa de condomínio</span>
            <span className="text-sm text-zinc-500">5.000,00 kz</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Status</span>
            <span className="text-sm text-zinc-500">Pronto</span>
          </li>
        </ul>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-600 font-medium">Total</span>
        <span className="text-base text-zinc-600 font-semibold">
          {formatPriceToKwanza(data.totalValue)}
        </span>
      </div>

      <p className="text-xs text-zinc-500">
        Ao clicar no botão acima, você declara concordar com nossos{" "}
        <Link
          href="/terms-of-service"
          target="_blank"
          className="text-primary-base hover:underline hover:underline-offset-2"
        >
          Termos de Serviço
        </Link>
        .
      </p>
    </div>
  );
}
