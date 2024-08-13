import { Request, Response } from 'express';
import { Analytics } from '../../libs/google-apis';
import {analyticsdata_v1beta} from "googleapis/build/src/apis/analyticsdata/v1beta";

export const index = async (req: Request, res: Response) => {
  const fromDate: string = req.query.from_date as string || '2022-01-01';
  const toDate: string = req.query.to_date as string || '2022-12-31';

  const data: analyticsdata_v1beta.Schema$BatchRunReportsResponse = await Analytics.fetchReports(fromDate, toDate);

  res.render('charts', {
    title: 'Analytics Data API V1Beta',
    fromDate: fromDate,
    toDate: toDate,
    data: data,
  });
}