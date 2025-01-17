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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
import { useUsers } from "@/services/hooks/use-users";
import { UserResponse } from "@/types/user";

// 👤 Interface para os usuários
interface Role {
  pkRole: string;
  name: string;
}

// 📄 Dados de exemplo para tabela
// const data: UserResponse[] = [
//   {
//     pkUser: "1",
//     username: "joaosilva",
//     fullName: "João Silva",
//     email: "joao.silva@example.com",
//     phone: "+351912345678",
//     password: "********",
//     nif: "123456789",
//     address: "Rua das Flores, 123",
//     nationality: "Portuguesa",
//     maritalStatus: "Solteiro",
//     urlDocument: "https://example.com/doc1.pdf",
//     roles: [{ pkRole: "admin", name: "Administrador" }],
//   },
//   {
//     pkUser: "2",
//     username: "mariaribeiro",
//     fullName: "Maria Ribeiro",
//     email: "maria.ribeiro@example.com",
//     phone: "+351987654321",
//     password: "********",
//     nif: "987654321",
//     address: "Avenida Central, 456",
//     nationality: "Portuguesa",
//     maritalStatus: "Casado",
//     urlDocument: "https://example.com/doc2.pdf",
//     roles: [{ pkRole: "user", name: "Usuário" }],
//   },
// ]

// 📊 Definição das colunas
export const columns: ColumnDef<UserResponse>[] = [
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
    accessorKey: "fullName",
    header: "Nome Completo",
    cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
  },
  {
    accessorKey: "username",
    header: "Nome de Usuário",
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "nif",
    header: "NIF",
    cell: ({ row }) => <div>{row.getValue("nif")}</div>,
  },
  {
    accessorKey: "address",
    header: "Endereço",
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
  {
    accessorKey: "roles",
    header: "Papéis",
    cell: ({ row }) =>
      (row.getValue("roles") as Role[]).map((role) => role.name).join(", "),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.pkUser)}
            >
              Copiar ID do Usuário
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Visualizar detalhes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// 📋 Componente de Tabela
export function UsersDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data } = useUsers();

  const dataUsers = data || [];

  const table = useReactTable<UserResponse>({
    data: dataUsers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  return (
    <>
      <div className="w-full">
        <Input
          placeholder="Filtrar por nome..."
          onChange={(e) =>
            table.getColumn("fullName")?.setFilterValue(e.target.value)
          }
          className="max-w-sm my-4"
        />
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
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} ce{" "}
          {table.getFilteredRowModel().rows.length} linhas(s) selecionadas.
        </div>
        <div className="space-x-2 flex items-center gap-2">
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
    </>
  );
}
