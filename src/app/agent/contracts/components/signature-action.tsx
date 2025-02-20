import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

interface SignatureActionProps {
  handleSubmitSignature: () => Promise<void>;
  isLoadingHandleSignatureSubmit: boolean
}
export function SignatureAction({
  handleSubmitSignature,
  isLoadingHandleSignatureSubmit
}: SignatureActionProps) {
  return (
    <div className="flex flex-col gap-2 w-full bg-[#FF6400] rounded-md p-4">
      <div className="flex items-center justify-between text-white">
        <span className="text-sm font-semibold">
          Aguardando assinatura do locatório.
        </span>

        <TriangleAlert className="w-5 h-5" />
      </div>

      <p className="text-sm text-white">
        A assinatura do locatório é obrigatório para a geração e confirmação do
        contracto. após a geração o imóvel será liberado para o locador
        eventualmente o valor será transferido para o locatório.
      </p>

      <div className="flex flex-col gap-2 mt-4">
        <Button
          onClick={handleSubmitSignature}
          variant={"outline"}
          className="text-[#FF6400] hover:text-[#FF6400]"
          loading={isLoadingHandleSignatureSubmit}
        >
          Assinar Agora
        </Button>
        {/* <Button variant={"destructive"}>Cancelar Assinatura</Button> */}
      </div>
    </div>
  );
}
