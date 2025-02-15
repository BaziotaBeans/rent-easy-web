'use client';

import { useProperties } from "@/services/hooks/use-property";
import { PropertiesDataTable } from "./components/PropertiesDataTable";
import { Skeleton } from "@/components/ui/skeleton"; // Certifique-se de que o caminho esteja correto
import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function PropertiesPage() {
  const { data, isLoading: isLoadingProperties, isError: isErrorProperties } = useProperties();
  const dataProperties = data || [];

  if (isLoadingProperties) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (isErrorProperties) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <span>Erro ao carregar propriedades. Tente novamente mais tarde.</span>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <PropertiesDataTable data={dataProperties} />
    </div>
  );
}
