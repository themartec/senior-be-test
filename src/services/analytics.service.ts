import UserRepository from '../database/user/user.repository';
import { getAnalyticsDataClient } from '../libs/googleapis';

class AnalyticsService {

	private email: string;

	constructor( userEmail: string ) {
		this.email = userEmail;
	}

	async savePropertyID(propertyID: number) {
		await new UserRepository().update({ email: this.email }, { ga4PropertyID: propertyID });
	}

	async runReports( propertyID: number, timeRange?: { startDate: string, endDate: string }) {
		try {
			const { startDate = '2022-01-01', endDate = 'today' } = timeRange || {};
			const analyticsDataClient = getAnalyticsDataClient( this.email ).client;
			const reportDatum = await analyticsDataClient.properties.batchRunReports({
				property: `properties/${propertyID}`,
				requestBody: {
					requests: [
						{
							dateRanges: [{ startDate, endDate }],
							dimensions: [{ name: 'country' }],
							metrics: [{ name: 'totalUsers' }],
						},
						{
							dateRanges: [{ startDate, endDate }],
							dimensions: [{ name: 'country' }],
							metrics: [{ name: 'activeUsers' }],
						},
					]
				}
			});
			const result = reportDatum.data.reports?.map( rp => {
				const x = rp.dimensionHeaders?.length && rp.dimensionHeaders[0].name || 'x';
				const y = rp.metricHeaders?.length && rp.metricHeaders[0].name || 'y';
				const report = { title: `${x}/${y}`, items: [] };

				if ( !rp.rows?.length ) return report;

				const items = rp.rows.map( row => {
					return {
						[x]: row.dimensionValues?.length && row.dimensionValues[0].value,
						[y]: row.metricValues?.length && row.metricValues[0].value,
					};
				});

				report.items = items as any;
				return report;
			});

			const fakeData = [
				{
					title: 'country_totalUsers',
					items: [
						{'country': 'Japan', 'totalUsers': 2541},
						{'country': 'France', 'totalUsers': 1000},
					]
				},
				{
					title: 'country_activeUsers',
					items: [
						{'country': 'Japan', 'activeUsers': 1500},
						{'country': 'France', 'activeUsers': 800},
					],
				}
			];

			return result;
		} catch (error) {
			// TODO: check errors which related to permission then throw corresponding error.
			throw error;
		}
	}

}

export default AnalyticsService;
