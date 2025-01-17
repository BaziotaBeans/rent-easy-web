"use client";

import { useContractByCompany } from "@/services/hooks/use-contracts";
import { ContractCard } from "./components/contract-card";
import { FilterProperty } from "./components/filter-property";
import { useAuth } from "@/hooks/use-auth";
import { SkeletonContracts } from "../components/skeleton/contracts";

export default function Page() {
  const { user } = useAuth();

  const { data, isLoading } = useContractByCompany(user?.pkUser!);

  if (isLoading) {
    return <SkeletonContracts/>
  }

  return (
    <main className="flex flex-col py-10 gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-zinc-700">Contractos</h1>
          <span className="text-sm text-zinc-600">3 contractos</span>
        </div>
      </div>

      <FilterProperty />

      <div className="grid grid-cols-4 gap-4">
        {data?.map((item) => (
          <ContractCard key={item.pkContract} data={item} />
        ))}
      </div>
    </main>
  );
}
