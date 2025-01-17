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

interface PropertyTypeEntity {
  pkPropertyType: string;
  designation: string;
  hibernateLazyInitializer: object;
}

export interface PropertyAllResponse {
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
  fkPropertyTypeEntity: PropertyTypeEntity;
  fkPropertyType: string;
  propertyImages: string[];
  propertyStatus: string;
  schedules: any[];
  createdAt: string;
  latitude: number;
  longitude: number;
  conservation: string | null;
  propertyType: string;
  condominiumFee: number;
}
