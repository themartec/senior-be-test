export interface UserDAO {
  accessToken: string;
  refreshToken: string;
  integrationType?: string;
  email?: string;
  expiredAt: number
}

export interface MetadataRow {
  type: string;
  key: string;
  value: string;
}

export interface StructuredData {
  [type: string]: {
    [key: string]: string;
  };
}

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


declare global {
  namespace Express {
    interface Request {
      currentUser: UserDAO;
    }
  }
}