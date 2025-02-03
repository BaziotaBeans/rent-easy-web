import { BsFiletypeJson } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { SchedulingPaymentResponse } from "@/types/scheduling-payment";

function exportToJSON(data: SchedulingPaymentResponse[]) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "relatorio_agendamentos.json";
  link.click();

  URL.revokeObjectURL(url);
}

export function ExportJSONButton({
  data,
}: {
  data: SchedulingPaymentResponse[];
}) {
  return <Button onClick={() => exportToJSON(data)}><BsFiletypeJson /> Exportar como JSON</Button>;
}
