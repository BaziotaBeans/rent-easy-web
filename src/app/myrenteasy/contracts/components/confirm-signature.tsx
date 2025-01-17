import { ContractResponse } from "@/types/contract";
import Image from "next/image";

interface ConfirmSignatureProps {
  data: ContractResponse
}

export function ConfirmSignature({ data }:ConfirmSignatureProps) {
  return (
    <div className="flex flex-col h-full gap-2 items-center py-10 bg-white">
      <Image
        src="/signatures.png"
        className="w-20 h-20 object-cover"
        alt=""
        width={64}
        height={64}
      />
      <span className="text-xl font-medium text-center max-w-[300px] w-full">
        Para finalizar, basta assinar o contracto!
      </span>

      <span className="text-base text-zinc-500 max-w-[440px] w-full text-center">
        Agora você pode assinar seu documento referente ao contracto, do aluguel
        do imóvel.
      </span>

      <div className="flex flex-col items-center gap-1 my-auto">
        <span className="text-center text-5xl font-alex-brush">
          {data.user.fullName}
        </span>
        <span>-----------------------------------------------</span>
        <span className="text-center text-base text-zinc-500 max-w-[400px] w-full">
          Ao clicar no botãom, será emitido uma assinatura digitalizada relativo ao contracto.
        </span>
      </div>
    </div>
  );
}
