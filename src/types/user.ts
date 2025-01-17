interface Role {
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

export interface UserResponse {
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
