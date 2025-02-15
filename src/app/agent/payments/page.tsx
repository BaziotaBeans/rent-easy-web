"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentsDataTable } from "./components/payment-data-table";
import { PaymentSchedulingDataTable } from "./components/payment-scheduling-data-table";
import { useIsClient } from "@/hooks/use-is-client";

export default function Page() {
  const isClient = useIsClient();

  if (!isClient) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="flex flex-col py-10 gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-zinc-700">Pagamentos</h1>
          {/* <span className="text-sm text-zinc-600">3 pagamentos</span> */}
        </div>
      </div>

      <Tabs defaultValue="payment" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="payment">Pagamentos dos Imóveis</TabsTrigger>
          <TabsTrigger value="payment-scheduling">
            Pagamentos dos Agendamentos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="payment">
          <PaymentsDataTable />
        </TabsContent>
        <TabsContent value="payment-scheduling">
          <PaymentSchedulingDataTable />
        </TabsContent>
      </Tabs>
    </main>
  );
}
