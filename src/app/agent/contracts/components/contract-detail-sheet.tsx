"use client";
import { useState } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignatureAction } from "./signature-action";
import { ContractResponse } from "@/types/contract";
import { useUpdateOwnerSignature } from "@/services/hooks/use-contracts";
import { ContractContentRented } from "@/app/myrenteasy/contracts/components/contract-content-rented";
import { ContractContentSale } from "@/app/myrenteasy/contracts/components/contract-content-sale";
import DownloadRentalContract from "@/app/myrenteasy/contracts/components/pdf/download-rental-contract";
import DownloadSaleContract from "@/app/myrenteasy/contracts/components/pdf/download-sale-contract";

interface ContractDetailSheetProps {
  data: ContractResponse;
  children: React.ReactNode;
}

export function ContractDetailSheet({
  data,
  children,
}: ContractDetailSheetProps) {
  const isAgentSigned = !!data.signaturePropertyOwner;

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const { mutateAsync } = useUpdateOwnerSignature();

  const handleSubmitSignature = async () => {
    setIsLoadingSubmit(true);

    try {
      const formattedData = {
        signaturePropertyOwner: data.property.companyEntity.user.fullName,
      };
      await mutateAsync({ id: data.pkContract, data: formattedData });

      toast.success("Sucesso", {
        description: "Assinatura do agente efetuada com sucesso.",
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
    data.property.fkPropertyTypeEntity.designation === "Arrendamento" ? (
      <ContractContentRented dataContract={data} />
    ) : (
      <ContractContentSale dataContract={data} />
    );

  const renderDownloadContract =
    data.property.fkPropertyTypeEntity.designation === "Arrendamento" ? (
      <DownloadRentalContract contract={data} />
    ) : (
      <DownloadSaleContract contract={data} />
    );

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="sm:max-w-[600px] flex flex-col gap-4 p-0">
        <SheetHeader className="pt-6 px-6">
          <SheetTitle>Detalhes do contracto</SheetTitle>
          <SheetDescription>Descrição de contracto.</SheetDescription>
        </SheetHeader>

        {renderContractContent}

        <SheetFooter className="border-t px-6 py-4">
          {isAgentSigned ? (
            renderDownloadContract
          ) : (
            <SignatureAction
              handleSubmitSignature={handleSubmitSignature}
              isLoadingHandleSignatureSubmit={isLoadingSubmit}
            />
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
