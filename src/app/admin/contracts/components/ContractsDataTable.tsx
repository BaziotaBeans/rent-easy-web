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
import { MoreHorizontal } from "lucide-react";

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
import { ContractResponse } from "@/types/contract";
// import { ExportButton } from "./export-excel-button";
// import { ExportPDFButton } from "./export-pdf-button";
// import { ExportJSONButton } from "./export-json-button";

export const columns: ColumnDef<ContractResponse>[] = [
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
    id: "agent",
    accessorKey: "agent",
    header: "Agente",
    cell: ({ row }) => (
      <div>{row.original.property.companyEntity.user.fullName}</div>
    ),
  },
  {
    id: "finalidade",
    accessorKey: "finalidade",
    header: "Finalidade",
    cell: ({ row }) => (
      <div>{row.original.property.fkPropertyTypeEntity.designation}</div>
    ),
  },
  {
    id: "preco",
    accessorFn: (row) => row.property.price,
    header: "Preço",
    cell: ({ row }) => (
      <div>{row.original.property.price.toLocaleString("pt-AO")} AOA</div>
    ),
  },
  {
    id: "dataInicio",
    accessorFn: (row) => row.startDate,
    header: "Data de Início",
    cell: ({ row }) => (
      <div>{new Date(row.original.startDate).toLocaleDateString()}</div>
    ),
  },
  {
    id: "dataFim",
    accessorFn: (row) => row.endDate,
    header: "Data de Fim",
    cell: ({ row }) => (
      <div>
        {row.original.endDate
          ? new Date(row.original.endDate).toLocaleDateString()
          : "Vitalício"}
      </div>
    ),
  },
  {
    id: "status",
    accessorFn: (row) => row.contractStatus,
    header: "Status",
    cell: ({ row }) => {
      const statusMap: Record<string, string> = {
        PENDING: "Pendente",
        ACTIVE: "Ativo",
        CANCELED: "Cancelado",
        COMPLETED: "Concluído",
      };
      return (
        <div>{statusMap[row.original.contractStatus] || "Desconhecido"}</div>
      );
    },
  },
];

export function ContractsDataTable({ data }: { data: ContractResponse[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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

  return (
    <div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-medium">Contratos</h2>
        <p className="text-sm text-zinc-500">
          Total de contratos: {data.length}
        </p>
      </div>

      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filtrar por cliente..."
          value={(table.getColumn("cliente")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("cliente")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* <div className="flex items-center gap-2">
          <ExportButton data={data} />
          <ExportPDFButton data={data} />
          <ExportJSONButton data={data} />
        </div> */}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                <TableCell colSpan={columns.length} className="text-center">
                  Nenhum contrato encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
