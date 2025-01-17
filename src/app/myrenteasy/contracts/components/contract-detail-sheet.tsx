"use client";

import { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { str1, str2, str3 } from "@/data/contract_data";
import { SignatureParticipant } from "./signatures-participant";
import { ConfirmSignature } from "./confirm-signature";
import { ContractResponse } from "@/types/contract";
import { useUpdateCustomerSignature } from "@/services/hooks/use-contracts";
import { formatDate } from "@/utils/date-formats";
import { formatPriceToKwanza } from "@/utils/format-price";
import { ContractContentRented } from "./contract-content-rented";
import { ContractContentSale } from "./contract-content-sale";
import DownloadRentalContract from "./pdf/download-rental-contract";
import DownloadSaleContract from "./pdf/download-sale-contract";

interface ContractDetailSheetProps {
  dataContract: ContractResponse;
  children: React.ReactNode;
}

export function ContractDetailSheet({
  children,
  dataContract,
}: ContractDetailSheetProps) {
  const isClientSigned = !!dataContract.signaturePropertyCustomer;

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const { mutateAsync } = useUpdateCustomerSignature();

  const handleSubmitSignature = async () => {
    setIsLoadingSubmit(true);

    try {
      const formattedData = {
        signaturePropertyCustomer: dataContract.user.fullName,
      };
      await mutateAsync({ id: dataContract.pkContract, data: formattedData });

      toast.success("Sucesso", {
        description: "Assinatura do cliente efetuada com sucesso.",
      });
    } catch (error) {
      toast.error("Erro", {
        description: "Erro ao realizar assinatura.",
      });
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  const renderContractContent =
    dataContract.property.fkPropertyTypeEntity.designation ===
    "Arrendamento" ? (
      <ContractContentRented dataContract={dataContract} />
    ) : (
      <ContractContentSale dataContract={dataContract} />
    );

  const renderDownloadContract =
    dataContract.property.fkPropertyTypeEntity.designation ===
    "Arrendamento" ? (
      <DownloadRentalContract contract={dataContract} />
    ) : (
      <DownloadSaleContract contract={dataContract} />
    );

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="sm:max-w-[600px] flex flex-col gap-4 p-0">
        <SheetHeader className="pt-6 px-6">
          <SheetTitle>Detalhes do contracto</SheetTitle>
          <SheetDescription className="sr-only">
            Descrição de contracto.
          </SheetDescription>
        </SheetHeader>

        {isClientSigned ? (
          renderContractContent
        ) : (
          <ConfirmSignature data={dataContract} />
        )}

        <SheetFooter className="border-t px-6 py-4">
          {isClientSigned ? (
            // <Button className="w-full" size={"lg"} variant={"primary"}>
            //   <FaFilePdf /> Baixar PDF
            // </Button>
            renderDownloadContract
          ) : (
            <Button
              className="w-full font-semibold"
              size={"lg"}
              variant={"primary"}
              loading={isLoadingSubmit}
              onClick={handleSubmitSignature}
            >
              <Check /> Confirma e finaliza a assinatura
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
