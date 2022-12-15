import { IRequestWithUser } from './../interfaces/request.interface';
import { Response, NextFunction } from 'express';
import AnalyticsService from '../services/analytics.service';

class AnalyticsController {

	static async reportHandler(req: IRequestWithUser, res: Response, next: NextFunction) {
		try {
			res.render('report', { port: process.env.PORT, propertyID: '123456' });
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
			const data = await new AnalyticsService().runReport( propertyID as any );
			// TODO: update here
			const dummy = [
				{ name: 'it1', value: 1 },
				{ name: 'it2', value: 2 },
			];
			res.status(200).json(dummy);
		} catch (error) {
			next(error);
		}
	}

}

export default AnalyticsController;
