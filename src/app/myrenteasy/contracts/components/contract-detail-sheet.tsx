"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { ConfirmSignature } from "./confirm-signature";
import { ContractResponse } from "@/types/contract";
import { useUpdateCustomerSignature } from "@/services/hooks/use-contracts";
import { ContractContentRented } from "./contract-content-rented";
import { ContractContentSale } from "./contract-content-sale";
import DownloadRentalContract from "./pdf/download-rental-contract";
import DownloadSaleContract from "./pdf/download-sale-contract";
import { motion } from "framer-motion";

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

    // Delay antes de iniciar o processamento para uma transição mais fluida
    setTimeout(async () => {
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
    }, 1000);
  };

  const renderContractContent =
    dataContract.property.fkPropertyTypeEntity.designation === "Arrendamento" ? (
      <ContractContentRented dataContract={dataContract} />
    ) : (
      <ContractContentSale dataContract={dataContract} />
    );

  const renderDownloadContract =
    dataContract.property.fkPropertyTypeEntity.designation === "Arrendamento" ? (
      <DownloadRentalContract contract={dataContract} />
    ) : (
      <DownloadSaleContract contract={dataContract} />
    );

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      {/* Animação do conteúdo do modal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SheetContent className="sm:max-w-[600px] flex flex-col gap-4 p-0">
          <SheetHeader className="pt-6 px-6">
            <SheetTitle>Detalhes do contrato</SheetTitle>
            <SheetDescription className="sr-only">
              Descrição do contrato.
            </SheetDescription>
          </SheetHeader>

          {isClientSigned ? renderContractContent : <ConfirmSignature data={dataContract} />}

          <SheetFooter className="border-t px-6 py-4">
            {isClientSigned ? (
              renderDownloadContract
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <Button
                  className="w-full font-semibold relative"
                  size={"lg"}
                  variant={"primary"}
                  disabled={isLoadingSubmit}
                  onClick={handleSubmitSignature}
                >
                  {isLoadingSubmit ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5 mr-2" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Confirmar e finalizar assinatura
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Efeito de bolha pulsante enquanto carrega */}
            {isLoadingSubmit && (
              <motion.div
                className="w-5 h-5 bg-primary-base rounded-full mx-auto mt-3"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            )}
          </SheetFooter>
        </SheetContent>
      </motion.div>
    </Sheet>
  );
}
