import {
  Loader,
  Scan,
  Toilet,
  Bath,
  BedDouble,
  CarFront,
  Calendar,
  Clock2,
} from "lucide-react";
import { ImPriceTags } from "react-icons/im";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PropertyStatus } from "./property-status";
import { formatPriceToKwanza } from "@/utils/format-price";
import { ScheduleResponse } from "@/types/schedule";
import { formatDate, showWeekDay } from "@/utils/date-formats";

interface SchedulingDetailSheetProps {
  children: React.ReactNode;
  data: ScheduleResponse
}

export function SchedulingDetailSheet({
  children, data
}: SchedulingDetailSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="sm:max-w-[600px] flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle>Detalhes do agendamento</SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription> */}
        </SheetHeader>
        <Separator />
        <ul className="flex flex-col gap-4">
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
            <span className="text-sm font-medium text-zinc-600">{data.property.totalArea} m²</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <Toilet className="w-4 h-4" /> Suítes
            </span>
            <span className="text-sm font-medium text-zinc-600">{data.property.suits}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <BedDouble className="w-4 h-4" /> Quartos
            </span>
            <span className="text-sm font-medium text-zinc-600">{data.property.room}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <Bath className="w-4 h-4" /> Banheiros
            </span>
            <span className="text-sm font-medium text-zinc-600">{data.property.bathroom}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <CarFront className="w-4 h-4" /> Vagas
            </span>
            <span className="text-sm font-medium text-zinc-600">{data.property.vacancy}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              Modalidade de pagamento
            </span>
            <span className="text-sm font-medium text-zinc-600">{data.property.paymentModality}</span>
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
              {formatDate(data.createdAt)}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <Clock2 className="w-4 h-4" /> Hora de início da visita
            </span>
            <span className="text-sm font-medium text-zinc-600">{data.propertySchedule.startTime}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <Clock2 className="w-4 h-4" /> Hora de termino da visita
            </span>
            <span className="text-sm font-medium text-zinc-600">{data.propertySchedule.endTime}</span>
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
              <ImPriceTags className="mr-2"/> {formatPriceToKwanza(data.property.price)} <span className="text-zinc-400">/mês</span>
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              Taxa de condomínio
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-600">
              -{/* <ImPriceTags /> {formatPriceToKwanza(5000)} */}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              Taxa de visita
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-600">
              -{/* <ImPriceTags /> {formatPriceToKwanza(2000)} */}
            </span>
          </li>
        </ul>

        <Button className="bg-orange-400 font-semibold mt-auto" size={"lg"}>
          Cancelar visita
        </Button>
      </SheetContent>
    </Sheet>
  );
}
