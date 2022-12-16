import { getAnalyticsDataClient } from './../libs/googleapis';
import { IRequestWithUser } from './../interfaces/request.interface';
import { Response, NextFunction } from 'express';
import AnalyticsService from '../services/analytics.service';
import UserRepository from '../database/user/user.repository';
import SubscriberRepository from '../database/subscriber/subscriber.repository';
import SendMailCronJob from '../libs/cron-job';

class AnalyticsController {

	static async reportHandler(req: IRequestWithUser, res: Response, next: NextFunction) {
		try {
			const user = await new UserRepository().findOneByQuery({ email: req.user.email });
			res.render('report', { port: process.env.PORT, propertyID: user?.ga4PropertyID, email: req.user.email });
		} catch (error) {
			next(error);
		}
	}

	static async fetchDataHandler(req: IRequestWithUser, res: Response, next: NextFunction) {
		try {
			const propertyID = req.query.propertyID;
			if (!propertyID) {
				res.status(200).json([]);
				return;
			}
			const analyticsService = new AnalyticsService(req.user.email);
			await analyticsService.savePropertyID(propertyID as any);
			const data = await analyticsService.runReports(propertyID as any);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async subscribeHandler(req: IRequestWithUser, res: Response, next: NextFunction) {
		try {
			const sourceEmail = req.user.email;
			const { email } = req.body;

			await new SubscriberRepository().findOrCreate(
				{ sourceEmail, email }, { sourceEmail, email }
			);

			SendMailCronJob.create(sourceEmail, email);
			res.status(200).send();
		} catch (error) {
			next(error);
		}
	}

	static async unsubscribeHandler(req: IRequestWithUser, res: Response, next: NextFunction) {
		try {
			const sourceEmail = req.user.email;
			const { email } = req.body.email;

			await new SubscriberRepository().bulkDelete({ sourceEmail, email });

			SendMailCronJob.destroy(sourceEmail, email);
			res.status(200).send();
		} catch (error) {
			next(error);
		}
	}

}

export default AnalyticsController;
