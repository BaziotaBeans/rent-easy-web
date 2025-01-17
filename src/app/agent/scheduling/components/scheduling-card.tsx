import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SchedulingDetailSheet } from "./scheduling-detail-sheet";

export function SchedulingCard() {
  return (
    <SchedulingDetailSheet>
      <Card className="flex items-center gap-6 p-4 shadow-none transition-all cursor-pointer hover:bg-zinc-50 hover:border-primary-base hover:bg-primary-base/5">
        <div className="flex flex-col items-center bg-red w-[100px] gap-3">
          <span className="text-zinc-600 ">9:00 am</span>
          <div className="h-12 w-[1.5px] bg-zinc-300 rounded-md" />
          <span className="text-zinc-600 ">9:30 am</span>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-zinc-600 text-lg font-semibold">
            Apartamento T3 KK
          </h2>
          <span className="text-sm text-zinc-500">Luanda, Belas</span>
          <span className="text-sm text-zinc-500">Data: 23 Out, 2024</span>
        </div>

        <span className="ml-auto text-primary-base font-semibold text-base px-4">
          Ver detalhes
        </span>
      </Card>
    </SchedulingDetailSheet>
  );
}
