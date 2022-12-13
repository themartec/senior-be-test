import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient({
	keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

class AnalyticsService {

	constructor() {
		//
	}

	async runReport() {
		const [response] = await analyticsDataClient.runReport({
			property: `properties/${process.env.GOOGLE_ANALYTICS_PROPERTY_ID}`,
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
