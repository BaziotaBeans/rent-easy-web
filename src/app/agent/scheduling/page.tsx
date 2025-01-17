import { FilterScheduling } from "./components/filter-scheduling";
import { SchedulingCard } from "./components/scheduling-card";

export default function Page() {
  return (
    <main className="flex flex-col py-10 gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-zinc-700">
            Agendamentos
          </h1>
          <span className="text-sm text-zinc-600">3 agendamentos</span>
        </div>
      </div>

      <FilterScheduling/>

      <SchedulingCard/>
      <SchedulingCard/>
      <SchedulingCard/>
    </main>
  );
}
