import React from "react";
import { format } from "date-fns";
import { SchedulingPaymentResponse } from "@/types/scheduling-payment";

export function useTableData(data: SchedulingPaymentResponse[] | undefined, selectedDate: Date | undefined) {
  return React.useMemo(() => {
    return data?.filter((payment) => {
      const matchesDate = selectedDate
        ? format(new Date(payment.createdAt), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
        : true;

      return matchesDate;
    });
  }, [data, selectedDate]);
}
