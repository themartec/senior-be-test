import { Request } from 'express';
import { IUserEntity } from './user.interface';

export interface IRequestWithUser extends Request {
	user: IUserEntity;
}
