'use client';

import { View, Text } from '@react-pdf/renderer';
import { styles } from './styles';

interface PDFHeaderProps {
  invoiceNumber: string;
  date: string;
  time: string;
}

export function PDFHeader({ invoiceNumber, date, time }: PDFHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Fatura de pagamento</Text>
      <Text style={styles.invoiceNumber}>#{invoiceNumber}</Text>
      <Text style={styles.dateTime}>
        Date: {date} | Time: {time}
      </Text>
    </View>
  );
}