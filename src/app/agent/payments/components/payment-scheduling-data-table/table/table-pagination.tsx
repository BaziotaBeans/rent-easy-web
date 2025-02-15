"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type TablePaginationProps = {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
};

export function TablePagination({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
}: TablePaginationProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <span className="text-sm text-muted-foreground">
        Página {pageIndex + 1} de {pageCount}
      </span>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={previousPage} disabled={!canPreviousPage}>
          Anterior
        </Button>
        <Button variant="outline" size="sm" onClick={nextPage} disabled={!canNextPage}>
          Próximo
        </Button>
      </div>
    </div>
  );
}
