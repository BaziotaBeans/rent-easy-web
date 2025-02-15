"use client";

import React from "react";
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
import { schedulingColumns } from "./columns/scheduling-columns";
import { TableFilters } from "./table/table-filters";
import { TablePagination } from "./table/table-pagination";
import { DataTable } from "./table/table";
import { useAuth } from "@/hooks/use-auth";
import { useSchedulingPaymentsCompanyUserAssociated } from "@/services/hooks/use-scheduling-payment";
import { useTableData } from "./hooks/use-table-data";

export function PaymentSchedulingDataTable() {
  const { user } = useAuth();

  if (!user || !user.pkUser) {
    return <div>Carregando...</div>;
  }

  const { data } = useSchedulingPaymentsCompanyUserAssociated(user.pkUser);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [filterValue, setFilterValue] = React.useState("");

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState({});

  const filteredData = useTableData(data, selectedDate);

  const table = useReactTable({
    data: filteredData || [],
    columns: schedulingColumns,
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
      <TableFilters
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        resetFilters={() => setSelectedDate(undefined)}
      />
      <DataTable table={table} columnsLength={schedulingColumns.length} />
      <TablePagination
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        previousPage={table.previousPage}
        nextPage={table.nextPage}
      />
    </div>
  );
}
