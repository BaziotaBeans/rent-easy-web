import { PropertyResponse } from "@/types/property";
import { Card } from "../ui/card";

interface PropertyDetailProps {
  data: PropertyResponse;
}

export function PropertyDetail({ data }: PropertyDetailProps) {
  return (
    <Card className=" p-6 rounded-lg shadow-none">
      <ul className="flex flex-col gap-4">
        <li className="flex items-center justify-between">
          <span className="text-zinc-500 ">Finalidade</span>
          <span className="text-zinc-700 font-medium">
            {data.property.fkPropertyTypeEntity.designation}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-zinc-500 ">Tipo de imóvel</span>
          <span className="text-zinc-700 font-medium">
            {data.property.propertyType}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-zinc-500 ">Conservação</span>
          <span className="text-zinc-700 font-medium">Usado</span>
        </li>
        {data.property.paymentModality && (
          <li className="flex items-center justify-between">
            <span className="text-zinc-500 ">Modalidade de pagamento</span>
            <span className="text-zinc-700 font-medium">
              {data.property.paymentModality}
            </span>
          </li>
        )}

        <li className="flex items-center justify-between">
          <span className="text-zinc-500 ">Taxa de condomínio</span>
          <span className="text-zinc-700 font-medium">
            {data.property.condominiumFee === 0
              ? "Sem Taxa"
              : data.property.condominiumFee}
          </span>
        </li>
      </ul>
    </Card>
  );
}
