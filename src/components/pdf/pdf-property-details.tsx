'use client';

import { View, Text } from '@react-pdf/renderer';
import { styles } from './styles';
import { PropertyDetails } from '../../types/invoice';

interface PDFPropertyDetailsProps {
  propertyDetails: PropertyDetails;
}

export function PDFPropertyDetails({ propertyDetails }: PDFPropertyDetailsProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Detalhes da propriedade</Text>
      <View style={styles.detailsBox}>
        <View style={styles.row}>
          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.value}>{propertyDetails.type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Endereço:</Text>
          <Text style={styles.value}>{propertyDetails.address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Título:</Text>
          <Text style={styles.value}>{propertyDetails.reference}</Text>
        </View>
      </View>
    </View>
  );
}