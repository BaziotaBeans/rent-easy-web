import { ColumnDef } from "@tanstack/react-table";
import { SchedulingPaymentResponse } from "@/types/scheduling-payment";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const schedulingColumns: ColumnDef<SchedulingPaymentResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "cliente",
    accessorFn: (row) => row.user.fullName,
    header: "Cliente",
    cell: ({ row }) => <div>{row.original.user.fullName}</div>,
  },
  {
    id: "imovel",
    accessorFn: (row) => row.property.title,
    header: "Imóvel",
    cell: ({ row }) => <div>{row.original.property.title}</div>,
  },
  {
    id: "dataAgendamento",
    accessorFn: (row) => row.scheduledDate,
    header: "Data do Agendamento",
    cell: ({ row }) => <div>{row.original.scheduledDate}</div>,
  },
  {
    id: "diaSemana",
    accessorFn: (row) =>
      row.scheduleDetails.match(/Dia da Semana: (\w+)/)?.[1] || "N/A",
    header: "Dia da Semana",
    cell: ({ row }) => {
      const diasSemana: Record<string, string> = {
        MONDAY: "Segunda-feira",
        TUESDAY: "Terça-feira",
        WEDNESDAY: "Quarta-feira",
        THURSDAY: "Quinta-feira",
        FRIDAY: "Sexta-feira",
        SATURDAY: "Sábado",
        SUNDAY: "Domingo",
      };
      const dia =
        row.original.scheduleDetails.match(/Dia da Semana: (\w+)/)?.[1];
      return <div>{diasSemana[dia || ""] || "N/A"}</div>;
    },
  },
  {
    id: "horario",
    accessorFn: (row) =>
      row.scheduleDetails.match(/Horário: ([\d: -]+)/)?.[1] || "N/A",
    header: "Horário",
    cell: ({ row }) => (
      <div>
        {row.original.scheduleDetails.match(/Horário: ([\d: -]+)/)?.[1] ||
          "N/A"}
      </div>
    ),
  },
  {
    id: "valorPago",
    accessorFn: (row) => row.totalValue,
    header: "Valor Pago",
    cell: ({ row }) => <div>{`R$ ${row.original.totalValue.toFixed(2)}`}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const schedule = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(schedule.pkSchedulingPayment)
              }
            >
              Copiar ID do Pagamento
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
