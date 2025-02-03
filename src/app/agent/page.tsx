"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SearchProperty } from "./components/search-property";
import { PropertyCard } from "./components/property-card";
import { FilterProperty } from "./components/filter-property";
import { AddPropertyDialog } from "./components/add-property-dialog";
import { useAuth } from "@/hooks/use-auth";
import { usePropertiesByCompanyId } from "@/services/hooks/use-property";
import { useAddPropertyDialogDialog } from "@/store/use-add-property-dialog";
import { SkeletonHome } from "./components/skeleton/home";
import { ErrorHandler } from "./components/state-handler/error-handler";
import { EmptyHandler } from "./components/state-handler/empty-handler";
import { usePropertyFilter } from "@/store/use-property-agent-filter";
import { filterAndSortProperties } from "@/utils/filter-agent-properties";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  const { user } = useAuth();

  const { data, isLoading, isError, refetch } = usePropertiesByCompanyId(
    user?.pkUser!
  );

  const { searchTerm, propertyTypes, sortOrder } = usePropertyFilter();

  const { onOpen } = useAddPropertyDialogDialog();

  const isEmpty = !data || data.length === 0;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isLoading || !isClient) return <SkeletonHome />;

  if (isError) return <ErrorHandler onRetry={refetch} />;

  if (isEmpty) return <EmptyHandler onRetry={refetch} />;

  const filteredData = filterAndSortProperties(data, searchTerm, propertyTypes, sortOrder);

  return (
    <>
      <main className="flex flex-col py-10 gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium text-zinc-700">Meus Imóveis</h1>

          <Button
            variant={"ghost"}
            className="text-sm text-primary-base"
            onClick={onOpen}
          >
            <Plus className="w-5 h-5 " /> Adicionar Imóvel
          </Button>
        </div>

        <SearchProperty />

        <FilterProperty />

        <div className="flex flex-col gap-3">
          {filteredData.map((item) => (
            <PropertyCard key={item.property.pkProperty} data={item} />
          ))}
        </div>
      </main>

      <AddPropertyDialog />
    </>
  );
}
