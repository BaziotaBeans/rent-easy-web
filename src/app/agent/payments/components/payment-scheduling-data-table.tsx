"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal, X, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { useSchedulingPaymentsCompanyUserAssociated } from "@/services/hooks/use-scheduling-payment";
import { SchedulingPaymentResponse } from "@/types/scheduling-payment";

export const columns: ColumnDef<SchedulingPaymentResponse>[] = [
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

export function PaymentSchedulingDataTable() {
  const { user } = useAuth();

  if (!user || !user.pkUser) {
    return <div>Carregando...</div>;
  }

  const { data } = useSchedulingPaymentsCompanyUserAssociated(user.pkUser);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );

  const resetFilters = () => {
    setSelectedDate(undefined);
  };

  const availableColumns = [
    { key: "paymentDate", label: "Data de Pagamento" },
    { key: "reference", label: "Referência" },
    { key: "totalValue", label: "Valor Total" },
    { key: "paymentMethod", label: "Método de Pagamento" },
    { key: "property", label: "Imóvel" },
    { key: "payer", label: "Pagante" },
  ];

  const filteredData = React.useMemo(() => {
    return data?.filter((payment) => {
      const matchesDate = selectedDate
        ? format(new Date(payment.createdAt), "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
        : true;

      return matchesDate;
    });
  }, [data, selectedDate]);

  const table = useReactTable({
    data: filteredData || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filtrar por cliente..."
          value={(table.getColumn("cliente")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("cliente")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={resetFilters}>
            <X className="h-4 w-4" />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate
                  ? format(selectedDate, "dd/MM/yyyy")
                  : "Filtrar por data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <span className="text-sm text-muted-foreground">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
