"use client";

import { useSchedulings } from "@/services/hooks/use-scheduling";
import { ScheduleDataTable } from "./components/schedule-data-table";
import { useSchedulingPayments } from "@/services/hooks/use-scheduling-payment";
import { ExportButton } from "./components/export-excel-button";

export default function SchedulesPage() {
  // const { data, isLoading: isLoadingSchedulings, isError: isErrorSchedulings } = useSchedulings();

  const { data } = useSchedulingPayments();

  const dataSchedulings = data || [];

  const dataSchedulingPayments = data || [];

  console.log(dataSchedulingPayments);

  return <ScheduleDataTable data={dataSchedulingPayments} />;
}
