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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUsers } from "@/services/hooks/use-users";
import { UserResponse } from "@/types/user";

// 👤 Interface para os usuários
interface Role {
  pkRole: string;
  name: string;
}

// 📋 Componente de Tabela
export function UsersDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [roleFilter, setRoleFilter] = React.useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = React.useState(false); // Estado para controlar o Sheet
  const [selectedUser, setSelectedUser] = React.useState<UserResponse | null>(
    null
  ); // Estado para armazenar o usuário selecionado

  const { data } = useUsers();

  const dataUsers = data || [];

  const handleViewDetails = (user: UserResponse) => {
    setSelectedUser(user); // Define o usuário selecionado
    setIsSheetOpen(true); // Abre o Sheet
  };

  // 📊 Definição das colunas
  const columns: ColumnDef<UserResponse>[] = [
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
        (row.getValue("roles") as Role[])
          .map((role) => {
            if (role.name === "ROLE_COMPANY") return "Empresa";
            if (role.name === "ROLE_USER") return "Usuário";
            if (role.name === "ROLE_ADMIN") return "Administrador";
            return role.name;
          })
          .join(", "),
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
              <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                Visualizar detalhes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const filteredData = React.useMemo(() => {
    if (!roleFilter) return dataUsers;
    return dataUsers.filter((user) =>
      user.roles.some((role) => role.name === roleFilter)
    );
  }, [dataUsers, roleFilter]);

  const table = useReactTable<UserResponse>({
    data: filteredData,
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
        <div className="flex gap-4 my-4">
          <Input
            placeholder="Filtrar por nome..."
            onChange={(e) =>
              table.getColumn("fullName")?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Filtrar por Papel <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setRoleFilter("")}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("ROLE_ADMIN")}>
                Administrador
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("ROLE_USER")}>
                Usuário
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("ROLE_COMPANY")}>
                Agente
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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

      {/* Sheet para exibir detalhes do usuário */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Detalhes do Usuário</SheetTitle>
          </SheetHeader>
          {selectedUser && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Nome Completo:</span>{" "}
                <span className="text-sm font-medium">
                  {selectedUser.fullName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Nome de Usuário:</span>{" "}
                <span className="text-sm font-medium">
                  {selectedUser.username}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email:</span>{" "}
                <span className="text-sm font-medium">
                  {selectedUser.email}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Telefone:</span>{" "}
                <span className="text-sm font-medium">
                  {selectedUser.phone}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">NIF:</span>{" "}
                <span className="text-sm font-medium">{selectedUser.nif}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Endereço:</span>{" "}
                <span className="text-sm font-medium">
                  {selectedUser.address}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Papéis:</span>{" "}
                <span className="text-sm font-medium">
                  {selectedUser.roles
                    .map((role) => {
                      if (role.name === "ROLE_COMPANY") return "Empresa";
                      if (role.name === "ROLE_USER") return "Usuário";
                      if (role.name === "ROLE_ADMIN") return "Administrador";
                      return role.name;
                    })
                    .join(", ")}
                </span>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

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
