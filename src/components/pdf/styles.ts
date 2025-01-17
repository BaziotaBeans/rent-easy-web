'use client';

import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    fontWeight: 500,
  },
  invoiceNumber: {
    fontSize: 12,
    color: '#4b5563',
  },
  dateTime: {
    fontSize: 10,
    color: '#4b5563',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#1f2937',
    fontWeight: 500,
  },
  detailsBox: {
    backgroundColor: '#f9fafb',
    padding: 10,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 80,
    fontWeight: 500,
    fontSize: 10,
  },
  value: {
    flex: 1,
    fontSize: 10,
  },
  grid: {
    flexDirection: 'row',
    gap: 20,
  },
  column: {
    flex: 1,
  },
  status: {
    fontSize: 10,
    padding: '2 6',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'center',
  },
});