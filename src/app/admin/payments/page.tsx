"use client";

import { usePayments } from "@/services/hooks/use-payment";
import { PaymentsDataTable } from "./components/payments-data-table";

export default function PaymentsPage() {
  const {
    data,
    isLoading: isLoadingPayments,
    isError: isErrorPayments,
  } = usePayments();

  const dataPayments = data || [];


  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">Pagamentos</h1>
        <p className="text-sm">
          Lista de pagamentos dos arrendamentos e compras dos imóveis.
        </p>
      </div>
      <PaymentsDataTable data={dataPayments} />
    </>
  );
}
