import { CalendarDays, Clock } from "lucide-react";
import { Card } from "../ui/card";
import { PropertyResponse } from "@/types/property";
import { usePropertySchedule } from "@/services/hooks/use-property";
import { DayOfWeek } from "@/types/schedule";
import { formatTime, translateDayOfWeek } from "@/utils";


interface PropertyVisitSchedulesProps {
  data: PropertyResponse;
}

export function PropertyVisitSchedules({ data }: PropertyVisitSchedulesProps) {
  const { data: dataPropertySchedule, isLoading } = usePropertySchedule(
    data.property.pkProperty
  );

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      {Array.isArray(dataPropertySchedule)  && dataPropertySchedule?.map((schedule, index) => (
        <Card className="flex flex-col gap-2 p-4 shadow-none" key={index}>
          <span className="flex items-center gap-2 text-zinc-600">
            <CalendarDays className="w-5 h-5" /> {translateDayOfWeek(schedule.dayOfWeek as DayOfWeek)}
          </span>
          <span className="flex items-center gap-2 text-zinc-600">
            <Clock className="w-5 h-5" /> {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
          </span>
        </Card>
      ))}
    </div>
  );
}
