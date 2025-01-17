import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ContractResponse } from "@/types/contract";

// Fonte personalizada para assinaturas
Font.register({
  family: "SignPainter",
  src: "/fonts/SignPainterHouseScript.ttf",
});

// Estilos ajustados para melhor aproveitamento do espaço
const styles = StyleSheet.create({
  page: {
    padding: 25, // Redução da margem
    fontSize: 11, // Redução da fonte geral
    lineHeight: 1.4, // Ajuste do espaçamento de linha
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
    fontSize: 12, // Texto mais compacto
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
    fontSize: 18, // Assinatura levemente menor
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

interface SaleContractProps {
  contract: ContractResponse;
}

export const SaleContract = ({ contract }: SaleContractProps) => {
  const { property, user, startDate, signaturePropertyOwner, signaturePropertyCustomer } = contract;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Contrato de Compra e Venda de Imóvel</Text>

        <Text style={styles.dateText}>
          Última atualização: {format(new Date(contract.createdAt), "dd/MM/yyyy", { locale: ptBR })}
        </Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>ENTRE</Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>VENDEDOR: </Text>
            {property.companyEntity.user.fullName}, {property.companyEntity.user.nationality},{" "}
            {property.companyEntity.user.maritalStatus}, portador do BI nº {property.companyEntity.nif},
            residente em {property.companyEntity.user.address}.
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>COMPRADOR: </Text>
            {user.fullName}, {user.nationality}, {user.maritalStatus}, portador do BI nº {user.nif},
            residente em {user.address}.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.subtitle}>1. Descrição do Imóvel</Text>
          <Text style={styles.text}>
            Imóvel localizado em {property.province} - {property.county}, {property.address}, com área total
            de {property.totalArea} m². {property.description}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>2. Valor</Text>
          <Text style={styles.text}>
            O valor total da venda é de {property.price.toLocaleString("pt-BR")} Kz, pago conforme acordado.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>3. Posse e Transferência</Text>
          <Text style={styles.text}>
            A posse será transferida em {format(new Date(startDate), "dd/MM/yyyy", { locale: ptBR })},
            após a quitação integral e cumprimento das obrigações.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>4. Obrigações</Text>
          <Text style={styles.text}>
            a) O vendedor entrega o imóvel livre de ônus. {"\n"}
            b) O comprador deve cumprir com os pagamentos conforme estipulado.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>5. Documentação</Text>
          <Text style={styles.text}>
            Ambas as partes apresentarão toda a documentação necessária para a efetivação da venda.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>6. Disposições Gerais</Text>
          <Text style={styles.text}>
            Este contrato é irrevogável e irretratável, vinculando as partes e seus sucessores legais.
          </Text>
        </View>

        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <Text>Comprador:</Text>
            <Text style={styles.signature}>
              {signaturePropertyCustomer || user.fullName}
            </Text>
            <View style={styles.signatureLine} />
          </View>

          <View style={styles.signatureBlock}>
            <Text>Vendedor:</Text>
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
