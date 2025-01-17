"use client";

import { useParams } from "next/navigation";
import PropertyListing from "@/components/property-listing/property-listing";
import { useProperty } from "@/services/hooks/use-property";

export default function Page() {
  const params = useParams();
  const { id } = params;

  const { data, isLoading } = useProperty(String(id));

  if (isLoading) return <div>Loading...</div>

  return (
    <main className="flex flex-col pb-10">
      <PropertyListing
        data={data!}
      />
    </main>
  );
}
