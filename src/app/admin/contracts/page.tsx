"use client";

import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useContracts } from "@/services/hooks/use-contracts";
import { AlertCircle } from "lucide-react";
import { ContractsDataTable } from "./components/ContractsDataTable";

export default function ContractsPage() {
  const { data, isLoading, isError } = useContracts();

  const dataContracts = data || [];


  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <span>Erro ao carregar os contractos. Tente novamente mais tarde.</span>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <ContractsDataTable data={dataContracts} />
    </div>
  );
}
