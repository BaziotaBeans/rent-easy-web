"use client";

import { AlertComponent } from "@/components/alert";
import { OrderCard } from "./components/order-card";
import { useOrderByUser } from "@/services/hooks/use-order";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { user } = useAuth();

  const { data, isLoading, isError } = useOrderByUser(user?.pkUser!);

  if (!data || data?.length === 0) {
    return (
      <main className="flex flex-col py-10 gap-6 items-center justify-center">
        <h1 className="text-3xl text-zinc-600 font-bold mt-16">Pedidos</h1>
        <p className="text-lg text-zinc-500">Nenhum pedido encontrado.</p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex flex-col py-10 gap-6">
        <h1 className="text-3xl text-zinc-600 font-bold">Pedidos</h1>
        <AlertComponent />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex flex-col py-10 gap-6 items-center justify-center">
        <h1 className="text-3xl text-zinc-600 font-bold">Pedidos</h1>
        <AlertComponent />
        <p className="text-lg text-red-500">
          Erro ao carregar os pedidos. Tente novamente mais tarde.
        </p>
      </main>
    );
  }

  return (
    <main className="flex flex-col py-10 gap-6">
      <h1 className="text-3xl text-zinc-600 font-bold">Pedidos</h1>
      <AlertComponent />
      {data?.map((item) => (
        <OrderCard key={item.pkOrder} data={item} />
      ))}
    </main>
  );
}
