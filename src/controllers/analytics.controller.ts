import { IRequestWithUser } from './../interfaces/request.interface';
import { Response, NextFunction } from 'express';
import AnalyticsService from '../services/analytics.service';
import UserRepository from '../database/user/user.repository';

class AnalyticsController {

	static async reportHandler(req: IRequestWithUser, res: Response, next: NextFunction) {
		try {
			const user = await new UserRepository().findOneByQuery({ email: req.user.email });
			res.render('report', { port: process.env.PORT, propertyID: user?.ga4PropertyID });
		} catch (error) {
			next(error);
		}
	}

	static async fetchDataHandler(req: IRequestWithUser, res: Response, next: NextFunction) {
		try {
			const propertyID = req.query.propertyID;
			if ( !propertyID ) {
				res.status(200).json([]);
				return;
			}
			await new AnalyticsService().savePropertyID( req.user.email, propertyID as any );
			const data = await new AnalyticsService().runReports( propertyID as any );

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

}

export default AnalyticsController;
