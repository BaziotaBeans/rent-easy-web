"use client";

import * as React from "react";
import { toast } from "sonner";
import { useUpdatePropertyStatus } from "@/services/hooks/use-property";
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
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Calendar as CalendarIcon,
  X,
  Toilet,
  BedDouble,
  Bath,
  Scan,
  Loader,
  CarFront,
  ScanHeart,
} from "lucide-react";
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
import { PropertyAllResponse } from "@/types/property-all";
import { Calendar } from "@/components/ui/calendar"; // Importar o DatePicker do shadcn/ui
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"; // Importar o Sheet do shadcn/ui
import { format } from "date-fns"; // Para formatar datas
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { normalizeStatus, showPropertyStatusName, statusColors } from "@/utils";
import { formatPriceToKwanza } from "@/utils/format-price";
import { Separator } from "@/components/ui/separator";
import { ImPriceTags } from "react-icons/im";
import { VISIT_FEE } from "@/utils/constant";
import { ExportButton } from "./export-excel-button";

export function PropertiesDataTable({ data }: { data: PropertyAllResponse[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  ); // Estado para filtro de data
  const [selectedStatus, setSelectedStatus] = React.useState<string>(""); // Estado para filtro de status
  const [isSheetOpen, setIsSheetOpen] = React.useState(false); // Estado para controlar o Sheet
  const [selectedProperty, setSelectedProperty] =
    React.useState<PropertyAllResponse | null>(null); // Estado para armazenar o imóvel selecionado

  // Função para abrir o Sheet com os detalhes do imóvel
  const handleViewDetails = (property: PropertyAllResponse) => {
    setSelectedProperty(property);
    setIsSheetOpen(true);
  };

  // Função para resetar os filtros
  const resetFilters = () => {
    setSelectedDate(undefined);
    setSelectedStatus("");
  };

  const columns: ColumnDef<PropertyAllResponse>[] = [
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
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "address",
      header: "Endereço",
      cell: ({ row }) => <div>{row.getValue("address")}</div>,
    },
    {
      accessorKey: "province",
      header: "Província",
      cell: ({ row }) => <div>{row.getValue("province")}</div>,
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>{formatPriceToKwanza(row.getValue("price"))}</div>
      ),
    },
    {
      accessorKey: "totalArea",
      header: "Área Total",
      cell: ({ row }) => <div>{row.getValue("totalArea")} m²</div>,
    },
    {
      accessorKey: "propertyStatus",
      header: "Status",
      cell: ({ row }) => {
        const property = row.original;
        const [updating, setUpdating] = React.useState(false);
        const updatePropertyStatus = useUpdatePropertyStatus();

        const handleStatusChange = (newStatus: string) => {
          if (property.propertyStatus === "RENTED") {
            toast.error(
              "Não é possível alterar o status de um imóvel alugado."
            );
            return;
          }

          setUpdating(true);
          updatePropertyStatus.mutate(
            { id: property.pkProperty, propertyStatus: newStatus },
            {
              onSettled: () => setUpdating(false),
              onSuccess: () => toast.success("Status atualizado com sucesso!"),
              onError: () => toast.error("Erro ao atualizar status."),
            }
          );
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              disabled={property.propertyStatus === "RENTED"}
            >
              <Button
                variant="outline"
                size="sm"
                disabled={updating || property.propertyStatus === "RENTED"}
              >
                {updating ? (
                  <Loader className="animate-spin w-4 h-4" />
                ) : (
                  showPropertyStatusName(property.propertyStatus)
                )}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["PUBLISHED", "STANDBY", "DENIED"].map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => handleStatusChange(status)}
                >
                  {showPropertyStatusName(status)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    // {
    //   accessorKey: "propertyStatus",
    //   header: "Status",
    //   cell: ({ row }) => {
    //     const rawStatus: string = row.getValue("propertyStatus");
    //     const status = normalizeStatus(rawStatus);

    //     return (
    //       <span
    //         className={`px-2 py-1 rounded-md text-sm font-medium  ${
    //           statusColors[status] || "bg-gray-100 text-gray-700"
    //         }`}
    //       >
    //         {showPropertyStatusName(status)}
    //       </span>
    //     );
    //   },
    // },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const property = row.original;

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
                  navigator.clipboard.writeText(property.pkProperty)
                }
              >
                Copiar ID do Imóvel
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleViewDetails(property)}>
                Ver detalhes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Função para filtrar os dados por data e status
  const filteredData = React.useMemo(() => {
    return data.filter((property) => {
      const matchesDate = selectedDate
        ? format(new Date(property.createdAt), "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
        : true;
      const matchesStatus = selectedStatus
        ? property.propertyStatus === selectedStatus
        : true;
      return matchesDate && matchesStatus;
    });
  }, [data, selectedDate, selectedStatus]);

  const table = useReactTable({
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className=" flex flex-col">
        <h2 className="text-2xl font-medium">Imóveis</h2>
        <p className="text-sm text-zinc-500">
          Total de imóveis cadastrados: {data.length}
        </p>
      </div>
      {/* Filtros */}
      <div className="flex items-center justify-between gap-4 py-4">
        <Input
          placeholder="Filtrar por título..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex items-center gap-2">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Status: {showPropertyStatusName(selectedStatus) || "Todos"}{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedStatus("")}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("PUBLISHED")}>
                Dispinível
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("RENTED")}>
                Ocupado
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("STANDBY")}>
                Pendente
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("DENIED")}>
                NEGADO
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={resetFilters}>
            <X className="h-4 w-4" />
          </Button>
          <ExportButton data={filteredData} />
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="flex items-center space-x-2">
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

      {/* Sheet para detalhes do imóvel */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Detalhes do Imóvel</SheetTitle>
          </SheetHeader>
          {selectedProperty && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">Título</span>{" "}
                <span className="text-sm font-medium">
                  {selectedProperty.title}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Endereço</span>{" "}
                <span className="text-sm font-medium truncate max-w-48 w-full">
                  {selectedProperty.address}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Município</span>{" "}
                <span className="text-sm font-medium">
                  {selectedProperty.county}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Província</span>{" "}
                <span className="text-sm font-medium">
                  {selectedProperty.province}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tipo</span>{" "}
                <span className="text-sm font-medium">
                  {selectedProperty.propertyType}
                </span>
              </div>

              {selectedProperty.propertyType !== "Terreno" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm flex items-center gap-2">
                      <BedDouble className="w-4 h-4" /> Quartos
                    </span>{" "}
                    <span className="text-sm font-medium">
                      {selectedProperty.room}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm flex items-center gap-2">
                      <Bath className="w-4 h-4" /> Banheiros
                    </span>{" "}
                    <span className="text-sm font-medium">
                      {selectedProperty.bathroom}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm flex items-center gap-2">
                      <Toilet className="w-4 h-4" /> Suítes
                    </span>{" "}
                    <span className="text-sm font-medium">
                      {selectedProperty.suits}
                    </span>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <Scan className="w-4 h-4" /> Área Total
                </span>{" "}
                <span className="text-sm font-medium">
                  {selectedProperty.totalArea}m²
                </span>
              </div>
              {selectedProperty.propertyType !== "Terreno" && (
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2">
                    <CarFront className="w-4 h-4" /> Vagas
                  </span>{" "}
                  <span className="text-sm font-medium">
                    {selectedProperty.vacancy}
                  </span>
                </div>
              )}

              {selectedProperty.propertyType !== "Terreno" && (
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2">
                    <ScanHeart className="w-4 h-4" /> Conservação
                  </span>{" "}
                  <span className="text-sm font-medium">
                    {selectedProperty.conservation ?? "-"}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">Agente</span>{" "}
                <span className="text-sm font-medium">
                  {selectedProperty.companyEntity.user.fullName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  Email do Agente
                </span>{" "}
                <span className="text-sm font-medium truncate max-w-48 w-full">
                  {selectedProperty.companyEntity.user.email}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  Contacto do Agente
                </span>{" "}
                <span className="text-sm font-medium">
                  {selectedProperty.companyEntity.user.phone}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <Loader className="w-4 h-4" /> Status
                </span>{" "}
                <span
                  className={`px-2 py-1 rounded-md text-sm font-medium ${
                    statusColors[selectedProperty.propertyStatus] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {showPropertyStatusName(selectedProperty.propertyStatus)}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  {" "}
                  <ImPriceTags />
                  Preço
                </span>{" "}
                <span className="text-sm font-medium">
                  {formatPriceToKwanza(selectedProperty.price)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  {" "}
                  <ImPriceTags />
                  Taxa de visita
                </span>{" "}
                <span className="text-sm font-medium">
                  {formatPriceToKwanza(VISIT_FEE)}
                </span>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
