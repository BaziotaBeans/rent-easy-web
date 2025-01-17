export type PaymentMethod = 'REFERENCE' | 'MULTICAIXA_EXPRESS';

export interface OrderRequest {
  userId: string;
  propertyId: string;
  entidade: string;
  totalValue: number;
  paymentMethod: PaymentMethod;
}

export interface Order {
  pkOrder: string;
  entidade: string;
  totalValue: number;
  paymentMethod: PaymentMethod;
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

/*********************************************************************
 * ORDER RESPONSE
 * ******************************************************************/
type Role = {
  pkRole: string;
  name: string;
};

type User = {
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
  hibernateLazyInitializer?: Record<string, unknown>;
};

type CompanyEntity = {
  pkCompany: string;
  nif: string;
  bankName: string;
  bankAccountNumber: string;
  status: boolean;
  iban: string;
  user: User;
  createdAt: string;
  hibernateLazyInitializer?: Record<string, unknown>;
};

type PropertyTypeEntity = {
  pkPropertyType: string;
  designation: string;
  hibernateLazyInitializer?: Record<string, unknown>;
};

type Property = {
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
  schedules: string[];
  createdAt: string;
  latitude: number;
  longitude: number;
  hibernateLazyInitializer?: Record<string, unknown>;
};

export type OrderResponse = {
  pkOrder: string;
  user: User;
  reference: string;
  expirationDate: string;
  createdAt: string;
  entidade: string;
  property: Property;
  orderState: string;
  totalValue: number;
  paymentMethod: string;
};