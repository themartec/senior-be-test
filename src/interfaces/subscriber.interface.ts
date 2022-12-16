import { IAuditableEntity } from './model.auditable.interface';

export interface ISubscriberData {
	sourceEmail: string;
	email: string;
}

export type ISubscriberEntity = ISubscriberData & IAuditableEntity;
