import Cookies from 'js-cookie';
import { Role, UserData } from '@/types/auth';

const USER_DATA_KEY = 'userData';
const ACCESS_TOKEN_KEY = 'accessToken';

export const auth = {
  setUserData(userData: UserData): void {
    Cookies.set(USER_DATA_KEY, JSON.stringify(userData));
  },

  setAccessToken(token: string): void {
    Cookies.set(ACCESS_TOKEN_KEY, token);
  },

  getUserData(): UserData | null {
    try {
      const data = Cookies.get(USER_DATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  getAccessToken(): string | null {
    return Cookies.get(ACCESS_TOKEN_KEY) || null;
  },

  isAuthenticated(): boolean {
    return !!(this.getAccessToken() && this.getUserData());
  },

  hasRole(role: string): boolean {
    const userData = this.getUserData();
    return userData?.roles.includes(role as Role) || false;
  },

  clear(): void {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(USER_DATA_KEY);
  }
};