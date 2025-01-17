import { PaymentMethod } from "./order";

export interface PaymentRequest {
  reference: string;
  totalValue: number;
  paymentMethod: PaymentMethod;
}

export interface Payment {
  pkPayment: string;
  reference: string;
  totalValue: number;
  paymentMethod: PaymentMethod;
  status: boolean;
  createdAt: string;
}

interface Role {
  pkRole: string;
  name: string;
}

interface User {
  pkUser: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  nif: string;
  address: string;
  nationality: string;
  maritalStatus: string;
  urlDocument: string;
  roles: Role[];
  hibernateLazyInitializer: object;
}

interface CompanyEntity {
  pkCompany: string;
  nif: string;
  bankName: string;
  bankAccountNumber: string;
  status: boolean;
  iban: string;
  user: User;
  createdAt: string;
  hibernateLazyInitializer: object;
}

interface PropertyType {
  pkPropertyType: string;
  designation: string;
  hibernateLazyInitializer: object;
}

interface Property {
  pkProperty: string;
  title: string;
  province: string;
  county: string;
  address: string;
  suits: number;
  room: number;
  bathroom: number;
  vacancy: number;
  price: number;
  totalArea: number;
  buildingArea: number;
  description: string;
  paymentModality: string;
  status: boolean;
  companyEntity: CompanyEntity;
  fkCompany: string;
  fkPropertyTypeEntity: PropertyType;
  fkPropertyType: string;
  propertyImages: any[]; // Caso haja uma tipagem para imagens, pode ser substituído
  propertyStatus: string;
  schedules: any[]; // Caso haja uma tipagem para agendamentos, pode ser substituído
  createdAt: string;
  latitude: number;
  longitude: number;
  hibernateLazyInitializer: object;
}

export interface PaymentResponse {
  pkPayment: string;
  property: Property;
  user: User;
  createdAt: string;
  totalValue: number;
  reference: string;
  paymentMethod: string;
}
