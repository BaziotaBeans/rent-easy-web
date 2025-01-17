'use client';

import { View, Text } from '@react-pdf/renderer';
import { styles } from './styles';
import { Parties } from '../../types/invoice';

interface PDFPartyDetailsProps {
  parties: Parties;
}

export function PDFPartyDetails({ parties }: PDFPartyDetailsProps) {
  return (
    <View style={styles.grid}>
      {/* Agent Information */}
      <View style={styles.column}>
        <Text style={styles.sectionTitle}>Detalhes do agente</Text>
        <View style={styles.detailsBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{parties.agent.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>NIF:</Text>
            <Text style={styles.value}>{parties.agent.company}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contacto:</Text>
            <Text style={styles.value}>{parties.agent.contact}</Text>
          </View>
        </View>
      </View>

      {/* Client Information */}
      <View style={styles.column}>
        <Text style={styles.sectionTitle}>Detalhes do cliente</Text>
        <View style={styles.detailsBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{parties.client.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contacto:</Text>
            <Text style={styles.value}>{parties.client.contact}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.value}>{parties.client.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}