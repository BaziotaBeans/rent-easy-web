"use client";

import * as React from "react";
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
import { ArrowUpDown, ChevronDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

// Novo tipo de dados
export type Payment = {
  id: string;
  paymentDate: string;
  reference: string;
  totalValue: number;
  paymentMethod: string;
  property: string;
  payer: string;
};

// Dados de exemplo
const data: Payment[] = [
  {
    id: "18569d7b-8765-4dcf-9699-621846546123",
    paymentDate: "2025-01-01",
    reference: "878245247",
    totalValue: 1200,
    paymentMethod: "Credit Card",
    property: "Apartment A203",
    payer: "John Doe",
  },
  {
    id: "b274d7f8-7458-4fa9-85de-7fcac18f3c11",
    paymentDate: "2025-01-02",
    reference: "982374897",
    totalValue: 850,
    paymentMethod: "Bank Transfer",
    property: "House B102",
    payer: "Jane Smith",
  },
  // Adicione mais itens para teste
];

// Definição das colunas
export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "paymentDate",
    header: "Data de Pagamento",
    cell: ({ row }) => <div>{row.getValue("paymentDate")}</div>,
  },
  {
    accessorKey: "reference",
    header: "Referência",
    cell: ({ row }) => <div>{row.getValue("reference")}</div>,
  },
  {
    accessorKey: "totalValue",
    header: "Valor Total",
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("totalValue"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row }) => <div>{row.getValue("paymentMethod")}</div>,
  },
  {
    accessorKey: "property",
    header: "Imóvel",
    cell: ({ row }) => <div>{row.getValue("property")}</div>,
  },
  {
    accessorKey: "payer",
    header: "Pagante",
    cell: ({ row }) => <div>{row.getValue("payer")}</div>,
  },
];

export function PaymentDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filterInput, setFilterInput] = React.useState("");
  const [selectedColumn, setSelectedColumn] = React.useState<string | null>(
    "reference"
  );

  const table = useReactTable({
    data,
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

  const availableColumns = [
    { key: "paymentDate", label: "Data de Pagamento" },
    { key: "reference", label: "Referência" },
    { key: "totalValue", label: "Valor Total" },
    { key: "paymentMethod", label: "Método de Pagamento" },
    { key: "property", label: "Imóvel" },
    { key: "payer", label: "Pagante" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 justify-between py-4 w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Filtrar por:{" "}
              {selectedColumn
                ? availableColumns.find((col) => col.key === selectedColumn)
                    ?.label
                : "Selecione"}{" "}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {availableColumns.map((col) => (
              <DropdownMenuItem
                key={col.key}
                onClick={() => setSelectedColumn(col.key)}
              >
                {col.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative max-w-lg w-full">
          <Input
            placeholder={`Filtrar por ${
              selectedColumn
                ? availableColumns.find((col) => col.key === selectedColumn)
                    ?.label
                : "campo selecionado"
            }...`}
            value={filterInput}
            onChange={(event) => {
              setFilterInput(event.target.value);
              if (selectedColumn) {
                table
                  .getColumn(selectedColumn)
                  ?.setFilterValue(event.target.value);
              }
            }}
            className=" w-full"
          />
          {filterInput && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilterInput("");
                if (selectedColumn) {
                  table.getColumn(selectedColumn)?.setFilterValue("");
                }
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
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
