import { IAuditableEntity } from './model.auditable.interface';

export interface IUserData {
	email: string;
	accessToken: string;
	refreshToken: string;
	ga4PropertyID?: number;
}

export type IUserEntity = IUserData & IAuditableEntity;
