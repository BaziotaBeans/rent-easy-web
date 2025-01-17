import { ContractResponse } from "@/types/contract";
import { str1, str2, str3 } from "@/data/contract_data";
import { formatDate } from "@/utils/date-formats";
import { SignatureParticipant } from "./signatures-participant";
import { formatPriceToKwanza } from "@/utils/format-price";

interface ContractContentRentedProps {
  dataContract: ContractResponse;
}

export function ContractContentRented({
  dataContract,
}: ContractContentRentedProps) {
  return (
    <div className="flex flex-col gap-2 px-6 overflow-y-auto">
      <span className="text-sm text-zinc-500">
        Última actualização:{" "}
        {dataContract.endDate
          ? formatDate(dataContract.endDate)
          : formatDate(dataContract.createdAt)}
      </span>
      <span className="text-base text-zinc-800 font-medium">
        CONTRATO DE LOCAÇÃO RESIDENCIAL
      </span>
      <h3 className="text-base text-zinc-800 font-medium">
        Partes contratantes:
      </h3>
      <p className="text-sm text-zinc-500">
        LOCATÓRIO: {dataContract.user.fullName} portador do documento de
        identidade nº {dataContract.user.nif}, doravante denominado simplesmente{" "}
        <span className="font-bold">LOCATÓRIO</span>.
      </p>
      <p className="text-sm text-zinc-500">
        LOCADOR: {dataContract.property.companyEntity.user.fullName} do
        documento de identidade nº{" "}
        {dataContract.property.companyEntity.user.nif}, doravante denominado
        simplesmente <span className="font-bold">LOCADOR</span>.
      </p>
      <h3 className="text-base text-zinc-800 font-medium">
        Objecto do Contracto:
      </h3>
      <p className="text-sm text-zinc-500">
        O LOCADOR, por meio deste instrumento, cede ao LOCATÓRIO, para fins de
        locação residencial, o imóvel situado na província de Luanda, Cacuado
        Sequele Cacuaco, contendo uma casa de tipologia{" "}
        {dataContract.property.room}, com {dataContract.property.room} quartos,{" "}
        {dataContract.property.bathroom} banheiro, {dataContract.property.suits}{" "}
        suíte, cozinha e varanda, doravante denominado simplesmente{" "}
        <span className="font-bold">IMÓVEL</span>,
      </p>
      <h3 className="text-base text-zinc-800 font-medium">Prazo de Locação:</h3>
      <p className="text-sm text-zinc-500">
        O prazo de locação do IMÓVEL terá início em{" "}
        {formatDate(dataContract.startDate)} e término
        {dataContract.endDate
          ? ` em ${formatDate(dataContract.endDate)}`
          : ", aguardando assinatura do Locador."}
      </p>
      <h3 className="text-base text-zinc-800 font-medium">
        Modalidade de pagamento:
      </h3>
      <p className="text-sm text-zinc-500">
        O valor do aluguel mensal do IMÓVEL é estabelecido em{" "}
        {formatPriceToKwanza(dataContract.property.price)}, a ser pago pelo
        LOCATÓRIO semestralmente, até o dia 10 de cada
        {dataContract.property.paymentModality}, através de pagamento por
        referência ou multicaixa express.
      </p>
      <h3 className="text-base text-zinc-800 font-medium">
        Obrigações do LOCATÓRIO:
      </h3>

      {str1.map((item, index) => (
        <li className="ml-3 text-sm text-zinc-500" key={index}>
          {item}
        </li>
      ))}
      <h3 className="text-base text-zinc-800 font-medium">
        Obrigações do LOCADOR:
      </h3>
      {str2.map((item, index) => (
        <li className="ml-3 text-sm text-zinc-500" key={index}>
          {item}
        </li>
      ))}

      <h3 className="text-base text-zinc-800 font-medium">
        Disposições Gerais:
      </h3>

      {str3.map((item, index) => (
        <li className="ml-3 text-sm text-zinc-500" key={index}>
          {item}
        </li>
      ))}

      <div className="flex flex-col mt-4">
        <span className="text-sm text-zinc-600">Local e Data:</span>
        <span className="text-sm text-zinc-600">
          Luanda, Morro Bento, 23 de agosto de 2024.
        </span>
      </div>

      <SignatureParticipant data={dataContract} />
    </div>
  );
}
