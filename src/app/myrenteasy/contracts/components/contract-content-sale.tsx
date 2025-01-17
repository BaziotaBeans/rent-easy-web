import { ContractResponse } from "@/types/contract";
import { formatDate } from "@/utils/date-formats";
import { SignatureParticipant } from "./signatures-participant";
import { formatPriceToKwanza } from "@/utils/format-price";

interface ContractContentSaleProps {
  dataContract: ContractResponse;
}

export function ContractContentSale({
  dataContract,
}: ContractContentSaleProps) {
  return (
    <div className="flex flex-col gap-2 px-6 overflow-y-auto">
      <span className="text-sm text-zinc-500">
        Última actualização:{" "}
        {dataContract.endDate
          ? formatDate(dataContract.endDate)
          : formatDate(dataContract.createdAt)}
      </span>

      <span className="text-base text-zinc-800 font-medium">
        CONTRATO DE COMPRA E VENDA DE IMÓVEL
      </span>

      <h3 className="text-base text-zinc-800 font-medium">ENTRE</h3>

      <p className="text-sm text-zinc-500">
        VENDEDOR: {dataContract.property.companyEntity.user.fullName},{" "}
        {dataContract.property.companyEntity.user.nationality},{" "}
        {dataContract.property.companyEntity.user.maritalStatus}, portador do BI
        nº {dataContract.property.companyEntity.nif}, inscrito no NIF sob o nº
        {dataContract.property.companyEntity.nif}, residente e domiciliado à{" "}
        {dataContract.property.companyEntity.user.address}.
      </p>

      <h3 className="text-base text-zinc-800 font-medium">E</h3>

      <p className="text-sm text-zinc-500">
        COMPRADOR: {dataContract.user.fullName},{dataContract.user.nationality},{" "}
        {dataContract.user.maritalStatus}, portador do bilhete de identidade nº{" "}
        {dataContract.user.nif}, inscrito no NIF sob o nº{" "}
        {dataContract.user.nif}, residente e domiciliado à
        {dataContract.user.address}.
      </p>

      <h3 className="text-base text-zinc-800 font-medium">
        OBJETO DO CONTRATO:
      </h3>

      <p className="text-sm text-zinc-500">
        Pelo presente instrumento particular, as partes acima identificadas têm,
        entre si, justo e acordado o seguinte contrato de compra e venda do
        imóvel, que será regido pelas cláusulas seguintes e pelas condições de
        preço, forma de pagamento e termos descritos abaixo.
      </p>

      <h3 className="text-base text-zinc-800 font-medium">
        1. DESCRIÇÃO DO IMÓVEL:
      </h3>

      <p className="text-sm text-zinc-500">
        Imóvel localizado à {dataContract.property.province} -{" "}
        {dataContract.property.county}/{dataContract.property.address}, com área
        total de {dataContract.property.totalArea} m², inscrito na matrícula nº
        [Número da Matrícula] do Registro de Imóveis de
        {dataContract.property.address}.
      </p>

      <h3 className="text-base text-zinc-800 font-medium">2. VALOR:</h3>

      <p className="text-sm text-zinc-500">
        O valor total da venda é de
        {formatPriceToKwanza(dataContract.property.price)}, que foi pago por
        referência.
      </p>

      <h3 className="text-base text-zinc-800 font-medium">
        3. DA POSSE E DA TRANSFERÊNCIA:
      </h3>

      <p className="text-sm text-zinc-500">
        A posse do imóvel será transferida do VENDEDOR para o COMPRADOR na data
        de {formatDate(dataContract.startDate)}, após a quitação integral do
        valor acordado e cumprimento de todas as obrigações contratuais por
        ambas as partes.
      </p>

      <h3 className="text-base text-zinc-800 font-medium">
        4. DAS OBRIGAÇÕES:
      </h3>

      <p className="text-sm text-zinc-500">
        {`a) O VENDEDOR se compromete a entregar o imóvel livre de quaisquer ônus, dívidas ou impedimentos.`}
      </p>
      <p className="text-sm text-zinc-500">
        {`b) O COMPRADOR se compromete a cumprir com o pagamento do valor acordado nas datas e condições estipuladas neste contrato.`}
      </p>
      <h3 className="text-base text-zinc-800 font-medium">
        5. DA DOCUMENTAÇÃO:
      </h3>
      <p className="text-sm text-zinc-500">
        {`Ambas as partes se comprometem a providenciar e apresentar toda a documentação necessária para a efetivação da transferência do imóvel, conforme exigido por lei.`}
      </p>
      <h3 className="text-base text-zinc-800 font-medium">
        6. DISPOSIÇÕES GERAIS:
      </h3>
      <p className="text-sm text-zinc-500">
        {`Este contrato é firmado em caráter irrevogável e irretratável, obrigando não só as partes contratantes, como também seus herdeiros e sucessores.`}
      </p>
      <p className="text-sm text-zinc-500">
        {`Qualquer alteração neste contrato deverá ser feita por escrito, mediante aditamento assinado por ambas as partes.`}
      </p>

      <SignatureParticipant data={dataContract} />
    </div>
  );
}
