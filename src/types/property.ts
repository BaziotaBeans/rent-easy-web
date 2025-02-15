import { Company } from "./company";

export type PropertyStatus = "PUBLISHED" | "STANDBY" | "RENTED" | "DENIED";

export interface Schedule {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface PropertyRequest {
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
  fkCompany: string;
  fkPropertyType: string;
  images: string[];
  propertyStatus: PropertyStatus;
  schedules: Schedule[];
  latitude: number;
  longitude: number;
  propertyType: string;
  condominiumFee: number;
  conservation: string;
}

export interface PropertyType {
  pkPropertyType: string;
  designation: string;
}

export interface PropertyImage {
  pkImage: string;
  url: string;
  properties: any[];
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
  totalArea: number;
  buildingArea: number;
  description: string;
  paymentModality: string;
  status: boolean;
  companyEntity: Company;
  fkCompany: string;
  fkPropertyTypeEntity: PropertyType;
  fkPropertyType: string;
  propertyImages: PropertyImage[];
  propertyStatus: PropertyStatus;
  schedules: Schedule[];
  createdAt: string;
  latitude: number;
  longitude: number;
}

// export interface PropertyResponse {
//   property: Property;
//   images: PropertyImage[];
//   schedules: Schedule[] | null;
// }

export interface PropertyResponse {
  property: {
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
    companyEntity: {
      pkCompany: string;
      nif: string;
      bankName: string;
      bankAccountNumber: string;
      status: boolean;
      iban: string;
      user: {
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
        urlDocument: string | null;
        roles: {
          pkRole: string;
          name: string;
        }[];
        hibernateLazyInitializer?: Record<string, unknown>;
      };
      createdAt: string;
      hibernateLazyInitializer?: Record<string, unknown>;
    };
    fkCompany: string;
    fkPropertyTypeEntity: {
      pkPropertyType: string;
      designation: string;
      hibernateLazyInitializer?: Record<string, unknown>;
    };
    fkPropertyType: string;
    propertyImages: Array<unknown>;
    propertyStatus: string;
    schedules: Array<unknown>;
    createdAt: string;
    latitude: number;
    longitude: number;
    propertyType: string | null;
    condominiumFee: number;
    conservation: string | null;
  };
  images: {
    pkImage: string;
    url: string;
    properties: Array<unknown>;
  }[];
  schedules: unknown | null;
}

// export interface Property {
//   id: string;
//   title: string;
//   address: string;
//   price: number;
//   bedrooms: number;
//   bathrooms: number;
//   size: number;
//   type: "Apartment" | "House" | "Villa";
//   images: string[];
//   location: [number, number]; // [latitude, longitude]
// }
