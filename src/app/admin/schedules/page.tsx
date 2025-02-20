"use client";

import { ScheduleDataTable } from "./components/schedule-data-table";
import { useSchedulingPayments } from "@/services/hooks/use-scheduling-payment";

export default function SchedulesPage() {

  const { data } = useSchedulingPayments();

  const dataSchedulingPayments = data || [];

  return <ScheduleDataTable data={dataSchedulingPayments} />;
}
