export interface PropertyDetails {
  type: string;
  address: string;
  reference: string;
}

export interface Payment {
  amount: number;
  method: string;
  status: 'Paid' | 'Pending' | 'Failed';
  date: string;
  time: string;
}

export interface Agent {
  name: string;
  contact: string;
  company: string;
}

export interface Client {
  name: string;
  contact: string;
  address: string;
}

export interface Parties {
  agent: Agent;
  client: Client;
}

export interface Invoice {
  invoiceNumber: string;
  propertyDetails: PropertyDetails;
  payment: Payment;
  parties: Parties;
  transactionType: 'Rent' | 'Purchase';
}