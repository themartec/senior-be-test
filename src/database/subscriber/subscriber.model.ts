import mongoose from 'mongoose';
import { ISubscriberEntity } from '../../interfaces/subscriber.interface';

export const SubscriberTableName = 'subscribers';
const subscriberSchema = new mongoose.Schema(
	{
		sourceEmail: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

subscriberSchema.index({ sourceEmail: 1, email: 1 }, { unique: true });

export type SubscriberDocument = ISubscriberEntity & mongoose.Document;

const SubscriberModel = mongoose.model<SubscriberDocument>(SubscriberTableName, subscriberSchema);

export default SubscriberModel;
