"use client";

import { toast } from "sonner";
import {
  Loader,
  Scan,
  Toilet,
  Bath,
  BedDouble,
  CarFront,
  Calendar,
  Clock2,
  ScanHeart,
} from "lucide-react";
import { ImPriceTags } from "react-icons/im";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PropertyStatus } from "./property-status";
import { formatPriceToKwanza } from "@/utils/format-price";
import { ScheduleResponse } from "@/types/schedule";
import { formatDate, showWeekDay } from "@/utils/date-formats";
import { VISIT_FEE } from "@/utils/constant";
import { useDeleteScheduling } from "@/services/hooks/use-scheduling";
import { useState } from "react";

interface SchedulingDetailSheetProps {
  children: React.ReactNode;
  data: ScheduleResponse;
}

export function SchedulingDetailSheet({
  children,
  data,
}: SchedulingDetailSheetProps) {
  const [isLoadingDeleteScheduling, setIsLoadingDeleteScheduling] =
    useState(false);

  const [openSheet, setOpenSheet] = useState(false);

  const { mutateAsync } = useDeleteScheduling();

  const handleDeleteScheduling = async () => {
    setIsLoadingDeleteScheduling(true);

    try {
      await mutateAsync(data.pkScheduling);

      toast.success("Sucesso", {
        description: "Visita cancelada com sucesso.",
      });
    } catch (error) {
      toast.error("Erro", {
        description: "Erro ao realizar o cancelamento.",
      });

      console.log(error);
    } finally {
      setIsLoadingDeleteScheduling(false);
      setOpenSheet(false);
    }
  };

  return (
    <Sheet
      open={openSheet}
      onOpenChange={(value) => {
        setOpenSheet(value);
      }}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="sm:max-w-[600px] flex flex-col gap-4 px-0">
        <SheetHeader className="px-4">
          <SheetTitle>Detalhes do agendamento</SheetTitle>
          <SheetDescription className="sr-only">
            Detalhes do agendamento.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <ul className="flex flex-col gap-4 overflow-y-auto px-4">
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Nome</span>
            <span className="text-sm font-semibold text-zinc-600">
              {data.property.title}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Finalidade</span>
            <span className="text-sm font-medium text-zinc-600">
              {data.property.fkPropertyTypeEntity.designation}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Tipo</span>
            <span className="text-sm font-medium text-zinc-600">
              {data.property.propertyType}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <Loader className="w-4 h-4" /> Status
            </span>
            <span className="text-sm font-medium text-zinc-600">
              <PropertyStatus type="active" />
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <Scan className="w-4 h-4" /> Área Total
            </span>
            <span className="text-sm font-medium text-zinc-600">
              {data.property.totalArea} m²
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <Toilet className="w-4 h-4" /> Suítes
            </span>
            <span className="text-sm font-medium text-zinc-600">
              {data.property.suits}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <BedDouble className="w-4 h-4" /> Quartos
            </span>
            <span className="text-sm font-medium text-zinc-600">
              {data.property.room}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <Bath className="w-4 h-4" /> Banheiros
            </span>
            <span className="text-sm font-medium text-zinc-600">
              {data.property.bathroom}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <CarFront className="w-4 h-4" /> Vagas
            </span>
            <span className="text-sm font-medium text-zinc-600">
              {data.property.vacancy}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              Modalidade de pagamento
            </span>
            <span className="text-sm font-medium text-zinc-600">
              {data.property.paymentModality}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              Dia da semana
            </span>
            <span className="text-sm font-medium text-zinc-600">
              {showWeekDay(data.propertySchedule.dayOfWeek)}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Data da visita
            </span>
            <span className="text-sm font-medium text-zinc-600">
              {formatDate(data.scheduledDate)}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <Clock2 className="w-4 h-4" /> Hora de início da visita
            </span>
            <span className="text-sm font-medium text-zinc-600">
              {data.propertySchedule.startTime}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <Clock2 className="w-4 h-4" /> Hora de termino da visita
            </span>
            <span className="text-sm font-medium text-zinc-600">
              {data.propertySchedule.endTime}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <ScanHeart className="w-4 h-4" /> Conservação
            </span>
            <span className="text-sm font-medium text-zinc-600">
              {data.property.conservation}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              Agente Imobiliário
            </span>
            <span className="text-sm font-medium text-zinc-600">
              {data.property.companyEntity.user.fullName}
            </span>
          </li>
          <Separator />
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              Valor de aluguel
            </span>
            <span className="flex items-center text-sm font-medium text-zinc-600">
              <ImPriceTags className="mr-2" />{" "}
              {formatPriceToKwanza(data.property.price)}{" "}
              <span className="text-zinc-400">/mês</span>
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              Taxa de condomínio
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-600">
              <ImPriceTags />{" "}
              {formatPriceToKwanza(data.property.condominiumFee)}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              Taxa de visita
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-600">
              <ImPriceTags /> {formatPriceToKwanza(VISIT_FEE)}
            </span>
          </li>
        </ul>

        <SheetFooter className="pt-4 px-4 border-t">
          <Button
            className="bg-orange-400 font-semibold w-full hover:bg-orange-500"
            size={"lg"}
            loading={isLoadingDeleteScheduling}
            onClick={handleDeleteScheduling}
            disabled={!data.pkScheduling}
          >
            Cancelar visita
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
