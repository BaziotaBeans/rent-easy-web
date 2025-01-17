export type Role = "ROLE_ADMIN" | "ROLE_COMPANY" | "ROLE_USER";

export interface UserData {
  pkUser: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  roles: Role[];
  nif: string;
  address: string;
  nationality: string;
  maritalStatus: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  // role: Role[];
  role: Array<string>;
  nif: string;
  address: string;
  nationality: string;
  maritalStatus: string;
  urlDocument?: string;
}

export interface SignUpWithCompanyRequest {
  username: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  // role: Role[];
  role: Array<string>;
  nif: string;
  address: string;
  nationality: string;
  maritalStatus: string;
  urlDocument?: string;

  bankName: string;
  bankAccountNumber: string;
  iban: string;
}

export interface AuthResponse {
  pkUser: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  roles: Role[];
  nif: string;
  address: string;
  nationality: string;
  maritalStatus: string;
  expirationDate: string;
  tokenType: string;
  accessToken: string;
}

export interface CurrentUserLogged {
  pkUser: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  roles: Role[];
  nif: string;
  address: string;
  nationality: string;
  maritalStatus: string;
}

export interface UpdateUserRequest {
  username?: string;
  fullName?: string;
  email?: string;
  role?: Role;
  phone?: string;
  password?: string;
  nif?: string;
  address?: string;
  nationality?: string;
  maritalStatus?: string;
  urlDocument?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
