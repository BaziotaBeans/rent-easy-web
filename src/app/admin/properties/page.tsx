'use client';

import { useProperties } from "@/services/hooks/use-property";
import { PropertiesDataTable } from "./components/PropertiesDataTable";


export default function PropertiesPage() {
  const { data, isLoading: isLoadingProperties, isError: isErrorProperties } = useProperties();

  const dataProperties = data || [];

  console.log(data);

  return (
    <div className="space-y-6">
      <PropertiesDataTable data={dataProperties}/>
    </div>
  );
}