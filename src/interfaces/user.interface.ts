import { IAuditableEntity } from './model.auditable.interface';

export interface IUserData {
	email: string;
	accessToken: string;
	refreshToken: string;
}

export type IUserEntity = IUserData & IAuditableEntity;
