import { UserDAO } from '@/model/dao'

export interface ServiceResponse {
  status: number;
  body: any;
}


export interface RefreshTokenResponse {
  status: number;
  message: string;
  email?: string,
  credentials?: UserDAO
}