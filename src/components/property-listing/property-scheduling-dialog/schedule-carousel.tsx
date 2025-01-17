import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

// Interfaces
interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySchedule {
  date: Date;
  timeSlots: TimeSlot[];
}

// Funções utilitárias
const formatDate = (date: Date, formatStr: string): string => {
  const formats: Record<string, string> = {
    weekday: "EEEE",
    monthDay: "d 'de' MMMM",
  };
  return format(date, formats[formatStr], { locale: ptBR });
};

const isSameDay = (date1: Date, date2: Date): boolean =>
  date1.toDateString() === date2.toDateString();

const ScheduleCarousel = ({ schedule }: { schedule: DaySchedule[] }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="w-full">
      <Carousel className="flex items-center gap-2 pb-2 overflow-hidden">
        {schedule.map((day) => (
          <Button
            key={day.date.toString()}
            variant="outline"
            className={`w-28 h-28 ${
              isSameDay(day.date, selectedDate || new Date())
                ? "bg-primary-base/10 ring-2 ring-primary-base"
                : ""
            }`}
            onClick={() => setSelectedDate(day.date)}
          >
            <div className="text-center">
              <div className="font-medium text-base">
                {formatDate(day.date, "weekday")}
              </div>
              <div className="text-sm text-gray-500">
                {formatDate(day.date, "monthDay")}
              </div>
            </div>
          </Button>
        ))}
      </Carousel>
    </div>
  );
};

export default ScheduleCarousel;
