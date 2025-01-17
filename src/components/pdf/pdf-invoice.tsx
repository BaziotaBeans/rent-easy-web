"use client";

import { useEffect } from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { Invoice } from "@/types/invoice";
import { styles } from "./styles";
import { registerFonts } from "./fonts";
import { PDFHeader } from "./pdf-header";
import { PDFPropertyDetails } from "./pdf-property-details";
import { PDFPaymentDetails } from "./pdf-payment-details";
import { PDFPartyDetails } from "./pdf-party-details";

interface PDFInvoiceProps {
  invoice: Invoice;
}

export default function PDFInvoice({ invoice }: PDFInvoiceProps) {
  useEffect(() => {
    registerFonts();
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PDFHeader
          invoiceNumber={invoice.invoiceNumber}
          date={invoice.payment.date}
          time={invoice.payment.time}
        />
        <PDFPropertyDetails propertyDetails={invoice.propertyDetails} />
        <PDFPaymentDetails
          payment={invoice.payment}
          transactionType={invoice.transactionType}
        />
        <PDFPartyDetails parties={invoice.parties} />
        <Text style={styles.footer}>
          Esta é uma fatura gerada eletronicamente e não requer assinatura.
        </Text>
      </Page>
    </Document>
  );
}
