"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderTimeTag } from "./order-timer-tag";
import { formatPriceToKwanza } from "@/utils/format-price";
import { Button } from "@/components/ui/button";
import { OrderResponse } from "@/types/order";

interface OrderCardProps {
  data: OrderResponse;
}

export function OrderCard({ data }: OrderCardProps) {


  return (
    <Card className=" bg-zinc-50 relative flex flex-col gap-4 py-6 px-4 shadow-none transition-all cursor-pointer hover:bg-zinc-50 hover:border-primary-base hover:bg-primary-base/5">
      <span className="text-base text-zinc-500 font-bold">Pedido #10291</span>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <OrderTimeTag expirationDate={data.expirationDate} />
          <span className="text-zinc-600 font-medium">Pagamento pendente</span>
          <span className="text-zinc-500 text-base">
            {formatPriceToKwanza(data.totalValue)}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant={"primary"} className="px-6" asChild>
            <Link href={`/myrenteasy/orders/${data.pkOrder}`}>Ver detalhes</Link>
          </Button>
          <Button variant={"outline"} className="px-6">
            Cancelar
          </Button>
        </div>
      </div>
    </Card>
  );
}
