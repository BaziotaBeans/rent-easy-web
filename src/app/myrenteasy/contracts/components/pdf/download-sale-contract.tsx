"use client";

import { Button } from "@/components/ui/button";
import { FaFilePdf } from "react-icons/fa6";
import { pdf } from "@react-pdf/renderer";
import { ContractResponse } from "@/types/contract";
import { SaleContract } from "./sale-contract";

interface DownloadButtonProps {
  contract: ContractResponse;
}

export default function DownloadSaleContract({
  contract,
}: DownloadButtonProps) {
  const handleDownload = async () => {
    const blob = await pdf(<SaleContract contract={contract} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sale-contract-${contract.createdAt}.pdf`;
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
