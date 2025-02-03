"use client";

import { useAuth } from "@/hooks/use-auth";
import { SchedulingCard } from "./components/scheduling-card";
import { useSchedulingByUser } from "@/services/hooks/use-scheduling";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // Garantir que o código só execute no lado do cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading, isError } = useSchedulingByUser(user?.pkUser!);

  if (!isClient) {
    return null; // Evita a renderização no servidor
  }

  const schedulingData = Array.isArray(data) ? data : [];

  return (
    <main className="flex flex-col py-10 gap-6">
      <h1 className="text-3xl text-zinc-600 font-bold">Agendamentos</h1>

      {/* Skeleton Loader */}
      {isLoading && (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-lg bg-gray-200" />
          ))}
        </div>
      )}

      {/* Mensagem de Erro */}
      {isError && (
        <div className="text-red-500 text-center font-medium">
          Ocorreu um erro ao carregar os agendamentos. Tente novamente mais tarde.
        </div>
      )}

      {/* Mensagem de Lista Vazia */}
      {!isLoading && !isError && schedulingData?.length === 0 && (
        <div className="text-zinc-500 text-center font-medium">
          Nenhum agendamento encontrado.
        </div>
      )}

      {/* Lista de Agendamentos */}
      {!isLoading && !isError && schedulingData?.map((item) => (
        <SchedulingCard key={item.pkScheduling} data={item} />
      ))}
    </main>
  );
}
