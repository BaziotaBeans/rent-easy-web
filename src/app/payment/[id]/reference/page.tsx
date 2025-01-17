"use client";

import { ExpressSVG } from "@/components/svg/express";
import { ReferencePaymentBox } from "./components/reference-payment-box";
import { useLastOrder } from "@/services/hooks/use-order";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { data, isLoading } = useLastOrder();

  console.log(data);

  if (isLoading) {
    return (
      <main className="h-full flex flex-col gap-8 items-center py-10">
        <Skeleton className="h-[50px] w-[50px] rounded-full"/>
        <Skeleton className="max-w-[500px] w-full rounded-2xl h-[500px]" />
      </main>
    );
  }

  return (
    <main className="h-full flex flex-col gap-8 items-center py-10">
      <ExpressSVG size={52} />

      <ReferencePaymentBox data={data!} />
    </main>
  );
}
