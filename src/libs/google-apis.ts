import { google } from 'googleapis';
import { GaxiosResponse } from 'gaxios/build/src/common';
import {analyticsdata_v1beta } from 'googleapis/build/src/apis/analyticsdata/v1beta';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

// set auth as a global default
google.options({
  auth: oauth2Client
});

const analyticsV1Beta = google.analyticsdata('v1beta');

export class Analytics {
  static async fetchReports(fromDate: string, toDate: string): Promise<analyticsdata_v1beta.Schema$BatchRunReportsResponse> {
    const response: GaxiosResponse<analyticsdata_v1beta.Schema$BatchRunReportsResponse> = await analyticsV1Beta.properties.batchRunReports({
      property: 'properties/316889724',
      // Request body metadata
      requestBody: {
        // request body parameters
        requests: [
          {
            dateRanges: [{ startDate: fromDate, endDate: toDate }],
            dimensions: [{ name: 'country' }],
            metrics: [{ name: 'activeUsers' }]
          },
          {
            dateRanges: [{ startDate: fromDate, endDate: toDate }],
            dimensions: [{ name: 'week' }],
            metrics: [{ name: 'userEngagementDuration' }, { name: 'activeUsers' }]
          }
        ]
      },
    });

    return response.data;
  }
}

export { oauth2Client };