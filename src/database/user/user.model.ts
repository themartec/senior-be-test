import { IUserEntity } from './../../interfaces/user.interface';
import mongoose from 'mongoose';

export const UserTableName = 'users';
const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		accessToken: {
			type: String,
			required: true,
		},
		refreshToken: {
			type: String,
			required: true,
		},
		ga4PropertyID: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.index({ email: 1, refreshToken: 1 });

export type UserDocument = IUserEntity & mongoose.Document;

const UserModel = mongoose.model<UserDocument>(UserTableName, userSchema);

export default UserModel;
