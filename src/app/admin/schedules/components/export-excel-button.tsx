import * as XLSX from "xlsx";
import { FaRegFileExcel } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { SchedulingPaymentResponse } from "@/types/scheduling-payment";

function exportToExcel(data: SchedulingPaymentResponse[]) {
    // Prepare the data for export
    const formattedData = data.map((item) => ({
      Cliente: item.user.fullName,
      Imóvel: item.property.title,
      "Data do Agendamento": item.scheduledDate,
      "Dia da Semana":
        item.scheduleDetails.match(/Dia da Semana: (\w+)/)?.[1] || "N/A",
      Horário: item.scheduleDetails.match(/Horário: ([\d: -]+)/)?.[1] || "N/A",
      "Valor Pago": item.totalValue,
    }));
  
    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
  
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");
  
    // Write file
    XLSX.writeFile(workbook, "relatorio_agendamentos.xlsx");
  }
  
  export function ExportButton({ data }: { data: SchedulingPaymentResponse[] }) {
    return (
      <Button variant={'primary'} onClick={() => exportToExcel(data)}><FaRegFileExcel/> Exportar para Excel</Button>
    );
  }