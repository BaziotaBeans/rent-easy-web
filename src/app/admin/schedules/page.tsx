"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ScheduleDataTable } from "./components/schedule-data-table";
import { useSchedulingPayments } from "@/services/hooks/use-scheduling-payment";
import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function SchedulesPage() {

  const { data, isLoading, isError } = useSchedulingPayments();

  const dataSchedulingPayments = data || [];

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
        <span>Erro ao carregar os agendamentos. Tente novamente mais tarde.</span>
      </Alert>
    );
  }

  return <ScheduleDataTable data={dataSchedulingPayments} />;
}
