import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SchedulingDetailSheet } from "./scheduling-detail-sheet";
import { ScheduleResponse } from "@/types/schedule";
import { formatDateToLong } from "@/utils/date-formats";

interface SchedulingCardProps {
  data: ScheduleResponse
}

export function SchedulingCard({ data }:SchedulingCardProps) {
  return (
    <SchedulingDetailSheet data={data}>
      <Card className="flex items-center gap-6 p-4 shadow-none transition-all cursor-pointer hover:bg-zinc-50 hover:border-primary-base hover:bg-primary-base/5">
        <div className="flex flex-col items-center bg-red w-[100px] gap-3">
          <span className="text-zinc-600 ">{data.propertySchedule.startTime}</span>
          <div className="h-12 w-[1.5px] bg-zinc-300 rounded-md" />
          <span className="text-zinc-600 ">{data.propertySchedule.endTime}</span>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-zinc-600 text-lg font-semibold">
          {data.property.title}
          </h2>
          <span className="text-sm text-zinc-500">{data.property.address}</span>
          <span className="text-sm text-zinc-500">Data: {formatDateToLong(data.scheduledDate)}</span>
        </div>

        <span className="ml-auto text-primary-base font-semibold text-base px-4">
          Ver detalhes
        </span>
      </Card>
    </SchedulingDetailSheet>
  );
}
