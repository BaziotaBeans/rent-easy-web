"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ContractResponse } from "@/types/contract";

// Fonte personalizada para assinaturas
Font.register({
  family: "SignPainter",
  src: "/fonts/SignPainterHouseScript.ttf",
});

// Estilos ajustados
const styles = StyleSheet.create({
  page: {
    padding: 25, // Margem reduzida
    fontSize: 11, // Fonte menor
    lineHeight: 1.4, // Espaçamento de linha reduzido
    fontFamily: "Times-Roman",
  },
  title: {
    fontSize: 16, // Título menor
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    textDecoration: "underline",
  },
  section: {
    marginBottom: 8, // Espaçamento reduzido
  },
  text: {
    fontSize: 12,
    textAlign: "justify",
  },
  divider: {
    borderBottom: "1px solid #000",
    marginVertical: 5,
  },
  signatureSection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBlock: {
    alignItems: "center",
    width: "45%",
  },
  signature: {
    fontFamily: "SignPainter",
    fontSize: 18, // Fonte menor
    marginBottom: 2,
  },
  signatureLine: {
    borderTop: "1px solid black",
    width: "100%",
    marginTop: 2,
  },
  dateText: {
    fontSize: 12,
    textAlign: "right",
    marginTop: 10,
    marginBottom: 10,
    fontStyle: "italic",
  },
});

interface RentalContractProps {
  contract: ContractResponse;
}

export const RentalContract = ({ contract }: RentalContractProps) => {
  const {
    property,
    user,
    startDate,
    endDate,
    signaturePropertyOwner,
    signaturePropertyCustomer,
  } = contract;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Contrato de Locação Residencial</Text>

        <Text style={styles.dateText}>
          Última atualização:{" "}
          {format(new Date(contract.createdAt), "dd/MM/yyyy", { locale: ptBR })}
        </Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Partes Contratantes</Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>LOCATÁRIO: </Text>
            {user.fullName}, portador do documento de identidade nº {user.nif},
            doravante denominado simplesmente LOCATÁRIO.
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>LOCADOR: </Text>
            {property.companyEntity.user.fullName}, portador do documento de
            identidade nº {property.companyEntity.nif}, doravante denominado
            simplesmente LOCADOR.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.subtitle}>Objeto do Contrato</Text>
          <Text style={styles.text}>
            O LOCADOR cede ao LOCATÁRIO, para fins de locação residencial, o
            imóvel situado em {property.province}, {property.address}, contendo
            uma casa de tipologia {property.room}, com {property.room} quartos,{" "}
            {property.bathroom} banheiro(s), {property.suits} suíte(s), cozinha
            e varanda.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Prazo de Locação</Text>
          <Text style={styles.text}>
            Início em {format(new Date(startDate), "dd/MM/yyyy")} e término em{" "}
            {endDate ? format(new Date(endDate), "dd/MM/yyyy") : "-"}.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Modalidade de Pagamento</Text>
          <Text style={styles.text}>
            O valor do aluguel mensal é de{" "}
            {property.price.toLocaleString("pt-BR")} Kz, pago trimestralmente
            até o dia 10, por referência ou Multicaixa Express.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Obrigações do Locatário</Text>
          <Text style={styles.text}>
            a) Utilizar o imóvel exclusivamente para fins residenciais. {"\n"}
            b) Manter o imóvel em boas condições. {"\n"}
            c) Pagar o aluguel pontualmente, sob pena de multa e juros.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Obrigações do Locador</Text>
          <Text style={styles.text}>
            a) Entregar o imóvel em perfeitas condições de habitabilidade.{" "}
            {"\n"}
            b) Fornecer recibo de pagamento sempre que solicitado.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Disposições Gerais</Text>
          <Text style={styles.text}>
            Este contrato segue as leis da República de Angola. Qualquer
            alteração só terá validade por escrito e assinada por ambas as
            partes. Fica eleito o foro da comarca de {property.county} para
            resolução de eventuais controvérsias.
          </Text>
        </View>

        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <Text>Locatário:</Text>
            <Text style={styles.signature}>
              {signaturePropertyCustomer || user.fullName}
            </Text>
            <View style={styles.signatureLine} />
          </View>

          <View style={styles.signatureBlock}>
            <Text>Locador:</Text>
            {signaturePropertyOwner ? (
              <Text style={styles.signature}>{signaturePropertyOwner}</Text>
            ) : (
              <View style={styles.signatureLine} />
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
