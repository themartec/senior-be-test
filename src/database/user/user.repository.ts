import { IUserEntity, IUserData } from './../../interfaces/user.interface';
import { BaseRepository } from '../base';
import UserModel, { UserDocument } from './user.model';

class UserRepository extends BaseRepository<IUserData, IUserEntity, UserDocument> {

	constructor() {
		super(UserModel);
	}

}

export default UserRepository;
