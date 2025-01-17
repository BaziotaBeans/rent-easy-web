"use client";

import { Button } from "@/components/ui/button";
import { FaFilePdf } from "react-icons/fa6";
import { pdf } from "@react-pdf/renderer";
import PDFInvoice from "@/components/pdf/pdf-invoice";
import { Invoice } from "@/types/invoice";

interface DownloadButtonProps {
  invoice: Invoice;
}

export default function DownloadButton({ invoice }: DownloadButtonProps) {
  const handleDownload = async () => {
    const blob = await pdf(<PDFInvoice invoice={invoice} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${invoice.invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleDownload} className="w-full" variant={"primary"}>
      <FaFilePdf /> Baixar PDF
    </Button>
  );
}
