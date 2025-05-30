"use client";

import { Alert } from "@/components/ui/alert";
import { usePayments } from "@/services/hooks/use-payment";
import { PaymentsDataTable } from "./components/payments-data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function PaymentsPage() {
  const {
    data,
    isLoading: isLoadingPayments,
    isError: isErrorPayments,
  } = usePayments();

  const dataPayments = data || [];

  if (isLoadingPayments) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (isErrorPayments) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <span>Erro ao carregar os pagamentos. Tente novamente mais tarde.</span>
      </Alert>
    );
  }

  return (
    <>
      <div className=" flex flex-col">
        <h2 className="text-2xl font-medium">Pagamentos</h2>
        <p className="text-sm text-zinc-500">
          Total de pagamentos dos arrendamentos e compras dos imóveis:{" "}
          {dataPayments.length}
        </p>
      </div>
      <PaymentsDataTable data={dataPayments} />
    </>
  );
}
