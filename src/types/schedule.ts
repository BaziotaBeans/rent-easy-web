export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface SchedulingPayload {
  pkPropertySchedule: string; // UUID como string
  pkProperty: string; // UUID como string
}

export interface Role {
  pkRole: string;
  name: string;
}

export interface User {
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
}

export interface CompanyEntity {
  pkCompany: string;
  nif: string;
  bankName: string;
  bankAccountNumber: string;
  status: boolean;
  iban: string;
  user: User;
  createdAt: string;
}

export interface PropertyTypeEntity {
  pkPropertyType: string;
  designation: string;
}

export interface Property {
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
  condominiumFee: number;
  conservation: string;
  totalArea: number;
  buildingArea: number;
  description: string;
  paymentModality: string;
  status: boolean;
  companyEntity: CompanyEntity;
  fkCompany: string;
  fkPropertyTypeEntity: PropertyTypeEntity;
  fkPropertyType: string;
  propertyImages: string[];
  propertyStatus: string;
  schedules: any[]; // Se houver detalhes específicos, pode ser ajustado
  createdAt: string;
  latitude: number;
  longitude: number;
  propertyType: string;
}

export interface PropertySchedule {
  pkPropertySchedule: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  property: Property;
}

export interface ScheduleResponse {
  pkScheduling: string;
  propertySchedule: PropertySchedule;
  property: Property;
  user: User;
  note: string | null;
  createdAt: string;
  scheduledDate: string;
}
