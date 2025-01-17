"use client";

import { View, Text } from "@react-pdf/renderer";
import { styles } from "./styles";
import { Payment } from "../../types/invoice";
import { formatPriceToKwanza } from "@/utils/format-price";

interface PDFPaymentDetailsProps {
  payment: Payment;
  transactionType: "Rent" | "Purchase";
}

export function PDFPaymentDetails({
  payment,
  transactionType,
}: PDFPaymentDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return { color: "#166534", backgroundColor: "#dcfce7" };
      case "Pending":
        return { color: "#854d0e", backgroundColor: "#fef9c3" };
      default:
        return { color: "#991b1b", backgroundColor: "#fee2e2" };
    }
  };

  const statusStyle = getStatusColor(payment.status);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Detalhes de pagamento</Text>
      <View style={styles.detailsBox}>
        <View style={styles.row}>
          <Text style={styles.label}>Quantia:</Text>
          <Text style={styles.value}>
            {formatPriceToKwanza(payment.amount)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Método:</Text>
          <Text style={styles.value}>{payment.method}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.value}>
            {transactionType == "Purchase" ? "Compra" : "Arrendamento"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text
            style={{
              ...styles.status,
              color: statusStyle.color,
              backgroundColor: statusStyle.backgroundColor,
            }}
          >
            {/* {payment.status} */}
            Pago
          </Text>
        </View>
      </View>
    </View>
  );
}
