"use client";

import { useSchedulingByCompany } from "@/services/hooks/use-scheduling";
import { FilterScheduling } from "./components/filter-scheduling";
import { SchedulingCard } from "./components/scheduling-card";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { user } = useAuth();

  const { data, isLoading, isError } = useSchedulingByCompany(user?.pkUser!);

  const schedulingData = Array.isArray(data) ? data : [];

  return (
    <main className="flex flex-col py-10 gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-zinc-700">Agendamentos</h1>
          <span className="text-sm text-zinc-600">{schedulingData.length} agendamentos</span>
        </div>
      </div>

      {/* <FilterScheduling /> */}

      {/* Skeleton Loader */}
      {isLoading && (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-full rounded-lg bg-gray-200" />
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
      {!isLoading &&
        !isError &&
        schedulingData?.map((item) => (
          <SchedulingCard key={item.pkScheduling} data={item} />
        ))}
    </main>
  );
}
