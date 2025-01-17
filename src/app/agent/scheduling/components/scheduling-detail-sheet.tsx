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
  import { PropertyStatus } from "@/components/property-status";
  import { formatPriceToKwanza } from "@/utils/format-price";
  
  interface SchedulingDetailSheetProps {
    children: React.ReactNode;
  }
  
  export function SchedulingDetailSheet({
    children,
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
                Apartamento T3 KK{" "}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Finalidade</span>
              <span className="text-sm font-medium text-zinc-600">
                Arrendamento{" "}
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
              <span className="text-sm font-medium text-zinc-600">6590 m²</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                <Toilet className="w-4 h-4" /> Suítes
              </span>
              <span className="text-sm font-medium text-zinc-600">2</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                <BedDouble className="w-4 h-4" /> Quartos
              </span>
              <span className="text-sm font-medium text-zinc-600">3</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                <Bath className="w-4 h-4" /> Banheiros
              </span>
              <span className="text-sm font-medium text-zinc-600">2</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                <CarFront className="w-4 h-4" /> Vagas
              </span>
              <span className="text-sm font-medium text-zinc-600">2</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                Modalidade de pagamento
              </span>
              <span className="text-sm font-medium text-zinc-600">Semestral</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                Dia da semana
              </span>
              <span className="text-sm font-medium text-zinc-600">
                Sexta-feira
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Data da visita
              </span>
              <span className="text-sm font-medium text-zinc-600">
                25/10/2024
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                <Clock2 className="w-4 h-4" /> Hora de início da visita
              </span>
              <span className="text-sm font-medium text-zinc-600">10:00:00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                <Clock2 className="w-4 h-4" /> Hora de termino da visita
              </span>
              <span className="text-sm font-medium text-zinc-600">10:30:00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                Cliente
              </span>
              <span className="text-sm font-medium text-zinc-600">
                Maria do Rosário
              </span>
            </li>
            <Separator />
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                Valor de aluguel
              </span>
              <span className="flex items-center text-sm font-medium text-zinc-600">
                <ImPriceTags className="mr-2"/> {formatPriceToKwanza(130000)} <span className="text-zinc-400">/mês</span>
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                Taxa de condomínio
              </span>
              <span className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                <ImPriceTags /> {formatPriceToKwanza(5000)}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                Taxa de visita
              </span>
              <span className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                <ImPriceTags /> {formatPriceToKwanza(2500)}
              </span>
            </li>
          </ul>
  
          {/* <Button className="bg-orange-400 font-semibold mt-auto" size={"lg"}>
            Cancelar visita
          </Button> */}
        </SheetContent>
      </Sheet>
    );
  }
  