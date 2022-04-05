export interface IAuth {
  accessToken: string;
  refreshToken: string;
  email: string;
  password: string;
  roles: string[];
}