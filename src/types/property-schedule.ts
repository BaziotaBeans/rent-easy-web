export interface PropertyScheduleResponse {
  pkPropertySchedule: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
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
        urlDocument: string;
        roles: {
          pkRole: string;
          name: string;
        }[];
        hibernateLazyInitializer: Record<string, unknown>;
      };
      createdAt: string;
      hibernateLazyInitializer: Record<string, unknown>;
    };
    fkCompany: string;
    fkPropertyTypeEntity: {
      pkPropertyType: string;
      designation: string;
      hibernateLazyInitializer: Record<string, unknown>;
    };
    fkPropertyType: string;
    propertyImages: unknown[]; // Ajuste caso conheça a estrutura das imagens
    propertyStatus: string;
    schedules: unknown[]; // Ajuste caso conheça a estrutura dos agendamentos
    createdAt: string;
    latitude: number;
    longitude: number;
    hibernateLazyInitializer: Record<string, unknown>;
  };
}
