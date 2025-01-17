import { ContractResponse } from "@/types/contract";

interface SignatureParticipantProps {
  data: ContractResponse;
}

export function SignatureParticipant({ data } :SignatureParticipantProps) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-zinc-500">Assinatura do Locatário:</span>
          <span className="text-sm text-zinc-600">
            {data.user.fullName}
          </span>
        </div>
        <span className="text-center text-3xl font-alex-brush">
          {data.signaturePropertyCustomer ? data.signaturePropertyCustomer : '------------'}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-zinc-500">Assinatura do Locador:</span>
          <span className="text-sm text-zinc-600">
            {data.property.companyEntity.user.fullName}
          </span>
        </div>
        <span className="text-center text-3xl font-alex-brush">
        {data.signaturePropertyOwner ? data.signaturePropertyOwner : '------------'}
        </span>
      </div>
    </div>
  );
}
