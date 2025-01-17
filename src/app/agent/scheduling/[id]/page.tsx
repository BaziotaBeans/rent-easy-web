import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Page() {
  return (
    <main className="flex flex-col py-10 gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/agent/scheduling">Agendamentos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detalhes do agendamento</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-zinc-700">
            Detalhes do agendamento
          </h1>
        </div>
      </div>

      <Tabs defaultValue="scheduling" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scheduling">Account</TabsTrigger>
          <TabsTrigger value="payment">Password</TabsTrigger>
        </TabsList>
      </Tabs>
    </main>
  );
}
