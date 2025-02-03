import { FaRegFilePdf } from "react-icons/fa6";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { SchedulingPaymentResponse } from "@/types/scheduling-payment";

function exportToPDF(data: SchedulingPaymentResponse[]) {
  const doc = new jsPDF();

  // Add a title
  doc.text("Relatório de Agendamentos", 14, 10);

  // Prepare table data
  const tableData = data.map((item) => [
    item.user.fullName,
    item.property.title,
    item.scheduledDate,
    item.scheduleDetails.match(/Dia da Semana: (\w+)/)?.[1] || "N/A",
    item.scheduleDetails.match(/Horário: ([\d: -]+)/)?.[1] || "N/A",
    `R$ ${item.totalValue.toFixed(2)}`,
  ]);

  // Add table
  autoTable(doc, {
    head: [["Cliente", "Imóvel", "Data", "Dia da Semana", "Horário", "Valor Pago"]],
    body: tableData,
  });

  // Save the PDF
  doc.save("relatorio_agendamentos.pdf");
}

export function ExportPDFButton({ data }: { data: SchedulingPaymentResponse[] }) {
  return <Button variant={'primary'} onClick={() => exportToPDF(data)}><FaRegFilePdf/> Exportar para PDF</Button>;
}
