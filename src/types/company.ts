export interface CompanyRequest {
    nif: string;
    bankName: string;
    bankAccountNumber: string;
    iban: string;
  }
  
  export interface Company {
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
      roles: Array<{
        pkRole: string;
        name: string;
      }>;
    };
    createdAt: string;
  }