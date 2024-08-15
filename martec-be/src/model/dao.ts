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