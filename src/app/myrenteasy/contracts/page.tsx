"use client";

import { useContractByUser } from "@/services/hooks/use-contracts";
import { ContractCard } from "./components/contract-card";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { user } = useAuth();

  const { data, isLoading, isError } = useContractByUser(user?.pkUser!);

  const contractsData = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <div className="flex flex-col py-10 gap-6">
        <h1 className="text-3xl text-zinc-600 font-bold">Contractos</h1>

        <Skeleton className="h-[130px] w-full rounded-lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col py-10 gap-6 items-center justify-center">
        <h1 className="text-3xl text-zinc-600 font-bold">Contractos</h1>
        <p className="text-lg text-red-500">
          Erro ao carregar os contractos. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  if (!isLoading && !isError && contractsData.length === 0) {
    return (
      <main className="flex flex-col pt-20 pb-10 gap-6 items-center justify-center">
        <h1 className="text-3xl text-zinc-600 font-bold">Contractos</h1>
        <span className="text-base">Nenhum contracto encontrado.</span>
      </main>
    );
  }

  return (
    <main className="flex flex-col py-10 gap-6">
      <h1 className="text-3xl text-zinc-600 font-bold">Contractos</h1>

      {contractsData?.map((item, index) => (
        <ContractCard key={item.pkContract} data={item} index={index + 1} />
      ))}
    </main>
  );
}
