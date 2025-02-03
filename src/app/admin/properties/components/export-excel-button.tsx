import * as XLSX from "xlsx";
import { FaRegFileExcel } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { PropertyAllResponse } from "@/types/property-all";
import { showPropertyStatusName } from "@/utils";

function exportToExcel(data: PropertyAllResponse[]) {
  const formattedData = data.map((item) => ({
    Agente: item.companyEntity.user.fullName,
    Imóvel: item.title,
    Endereço: item.address,
    Preço: item.price,
    Tipo: item.propertyType,
    Área: item.totalArea,
    Estado: showPropertyStatusName(item.propertyStatus),
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");

  // Write file
  XLSX.writeFile(workbook, "relatorio_imoveis.xlsx");
}

export function ExportButton({ data }: { data: PropertyAllResponse[] }) {
  return (
    <Button variant={"primary"} onClick={() => exportToExcel(data)}>
      <FaRegFileExcel /> Exportar para Excel
    </Button>
  );
}
