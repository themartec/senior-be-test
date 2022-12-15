import { BetaAnalyticsDataClient } from '@google-analytics/data';
import UserRepository from '../database/user/user.repository';

const analyticsDataClient = new BetaAnalyticsDataClient({
	keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

class AnalyticsService {

	constructor() {
		//
	}

	async savePropertyID(userEmail: string, propertyID: number) {
		await new UserRepository().update({ email: userEmail }, { ga4PropertyID: propertyID });
	}

	async runReport( propertyID: number ) {
		const [response] = await analyticsDataClient.runReport({
			property: `properties/${propertyID}`,
			dateRanges: [
				{
					startDate: '2020-03-31',
					endDate: 'today',
				},
			],
			dimensions: [
				{
					name: 'city',
				},
			],
			metrics: [
				{
					name: 'activeUsers',
				},
			],
		});

		console.log('Report result:');

		if (response.rows) {
			response.rows.forEach(row => {
				console.log(row.dimensionValues && row.dimensionValues[0], row.metricValues && row.metricValues[0]);
			});
		}

		return response;
	}

}

export default AnalyticsService;
