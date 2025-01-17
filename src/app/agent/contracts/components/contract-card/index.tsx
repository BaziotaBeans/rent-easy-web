import { IoIosDocument } from "react-icons/io";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ContractPagePlaceHold } from "./contract-page-placehold";
import { ContractDetailSheet } from "../contract-detail-sheet";
import { ContractResponse } from "@/types/contract";
import { formatUpdatedAt } from "@/utils/date-formats";

//ContractResponse

interface ContractCardProps {
  data: ContractResponse
}

export function ContractCard({ data }:ContractCardProps) {
  const lastUpdatedDate = data.createdAt;

  return (
    <ContractDetailSheet data={data}>
      <Card className="rounded-md bg-zinc-100 p-0 overflow-hidden border-none transition-all hover:scale-105 cursor-pointer">
        <CardHeader className="overflow-hidden p-0 pt-6 h-36 w-full flex items-center justify-end">
          <ContractPagePlaceHold />
        </CardHeader>
        <CardContent className="bg-white p-0 py-4 px-4 gap-1 flex flex-col ">
          <div className="grid grid-cols-[24px_1fr] items-center">
            <IoIosDocument className="fill-zinc-400" />
            <h3 className="flex items-center text-zinc-700 font-medium truncate">
              {data.property.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">
              {formatUpdatedAt(lastUpdatedDate)}
            </span>

            <span className="py-1 px-2 bg-primary-base/10 text-xs rounded-lg font-medium text-primary-base">
              Pendente
            </span>
          </div>
        </CardContent>
      </Card>
    </ContractDetailSheet>
  );
}
