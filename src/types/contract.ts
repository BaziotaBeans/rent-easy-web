export interface ContractSignatureRequest {
  signaturePropertyOwner?: string;
  signaturePropertyCustomer?: string;
}

export interface Contract {
  pkContract: string;
  signaturePropertyOwner: string | null;
  signaturePropertyCustomer: string | null;
  status: boolean;
  user: {
    pkUser: string;
    username: string;
  };
  property: {
    pkProperty: string;
    title: string;
  };
  createdAt: string;
}

export interface ContractPayload {
  id: string;
  data: ContractSignatureRequest;
}

// Interface para Role do usuário
interface Role {
  pkRole: string;
  name: string;
}

// Interface para o Usuário
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
  hibernateLazyInitializer?: object;
}

// Interface para a Empresa
interface CompanyEntity {
  pkCompany: string;
  nif: string;
  bankName: string;
  bankAccountNumber: string;
  status: boolean;
  iban: string;
  user: User;
  createdAt: string;
  hibernateLazyInitializer?: object;
}

// Interface para o Tipo de Propriedade
interface PropertyType {
  pkPropertyType: string;
  designation: string;
  hibernateLazyInitializer?: object;
}

// Interface para a Propriedade
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
  propertyImages: any[]; // Defina uma interface se as imagens tiverem estrutura específica
  propertyStatus: string;
  schedules: any[]; // Defina uma interface se os agendamentos tiverem estrutura específica
  createdAt: string;
  latitude: number;
  longitude: number;
  propertyType: string | null;
  condominiumFee: number;
  conservation: string | null;
  hibernateLazyInitializer?: object;
}

// Interface para o Contrato
export interface ContractResponse {
  pkContract: string;
  property: Property;
  startDate: string;
  endDate: string | null;
  user: User;
  createdAt: string;
  contractStatus: string;
  signaturePropertyOwner: string | null;
  signaturePropertyCustomer: string | null;
}
