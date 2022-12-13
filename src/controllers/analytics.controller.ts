import { Request, Response, NextFunction } from 'express';
import AnalyticsService from '../services/analytics.service';

class AnalyticsController {

	static async reportHandler(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await new AnalyticsService().runReport();
			res.status(200).json(data);
			next();
		} catch (error) {
			next(error);
		}
	}

}

export default AnalyticsController;
