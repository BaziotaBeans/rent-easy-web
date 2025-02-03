"use client";

import { useContractByCompany } from "@/services/hooks/use-contracts";
import { ContractCard } from "./components/contract-card";
import { FilterProperty } from "./components/filter-property";
import { useAuth } from "@/hooks/use-auth";
import { SkeletonContracts } from "../components/skeleton/contracts";

export default function Page() {
  const { user } = useAuth();

  const { data, isLoading, isError } = useContractByCompany(user?.pkUser!);

  if (isLoading) {
    return <SkeletonContracts/>
  }

  const contractsData = Array.isArray(data) ? data : [];

  return (
    <main className="flex flex-col py-10 gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-zinc-700">Contractos</h1>
          <span className="text-sm text-zinc-600">{contractsData.length} contractos</span>
        </div>
      </div>

      {/* Mensagem de Erro */}
      {isError && (
        <div className="text-red-500 text-center font-medium">
          Ocorreu um erro ao carregar os contractos. Tente novamente mais tarde.
        </div>
      )}

      {/* <FilterProperty /> */}

      {!isLoading && !isError && contractsData?.length === 0 && (
        <div className="text-zinc-500 text-center font-medium">
          Nenhum contracto encontrado.
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {contractsData?.map((item) => (
          <ContractCard key={item.pkContract} data={item} />
        ))}
      </div>
    </main>
  );
}
