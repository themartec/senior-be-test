import { Request, Response } from 'express';
import { oauth2Client, analyticsV1Beta } from '../libs/google_apis';
import {
  analyticsdata_v1beta
} from 'googleapis/build/src/apis/analyticsdata/v1beta';
import { GaxiosResponse } from 'gaxios/build/src/common';

export const index = async (req: Request, res: Response) => {
  let data = {};
  let fromDate: string = req.query.from_date as string || '2022-01-01';
  let toDate: string = req.query.to_date as string || '2022-12-31';

  if (req.user) {
    oauth2Client.setCredentials({
      access_token: req.user.accessToken,
      refresh_token: req.user.refreshToken
    });

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

    data = response.data;
  }

  res.render('index', {
    user: req.user,
    title: 'Analytics Data API V1Beta',
    from_date: fromDate,
    to_date: toDate,
    data: data
  });
}