import { Request, Response, NextFunction } from 'express';
import AnalyticsService from '../services/analytics.service';

class AnalyticsController {

	static async reportHandler(req: Request, res: Response, next: NextFunction) {
		try {
			res.render('report', {port: process.env.PORT});
		} catch (error) {
			next(error);
		}
	}

	static async fetchDataHandler(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await new AnalyticsService().runReport();
			const dummy = [
				{name: 'it1', value: 1},
				{name: 'it2', value: 2},
			];
			res.status(200).json(dummy);
		} catch (error) {
			next(error);
		}
	}

}

export default AnalyticsController;
