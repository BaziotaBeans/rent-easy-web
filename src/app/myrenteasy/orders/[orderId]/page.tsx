"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PropertyResume } from "./components/property-resume";
import { OrderReferenceCard } from "./components/order-reference-card";
import { useOrderById } from "@/services/hooks/use-order";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { orderId } = useParams();

  const { data, isLoading, isError } = useOrderById(String(orderId));

  console.log(data);

  if (isLoading) {
    return (
      <main className="flex flex-col py-10 gap-6">
        <Skeleton className="max-w-80 w-full h-5 rounded-sm" />

        <Skeleton className="max-w-24 w-full h-9 rounded-sm" />

        <div className="flex items-stretch gap-6">
          <Skeleton className="max-w-[380px] w-full h-[486]" />
          <Skeleton className="w-full h-[486]" />
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex flex-col py-10 gap-6">
        <h1 className="text-center text-xl text-zinc-500">
          Pedido não encontrado
        </h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col py-10 gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/myrenteasy/orders">Pedidos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detalhes do pedido</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="md:text-3xl text-2xl text-zinc-600 font-bold">
        Pedido {data?.reference}
      </h1>

      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        <PropertyResume data={data} />
        <OrderReferenceCard data={data}/>
      </div>
    </main>
  );
}
