import { Request, Response } from 'express';
import { Analytics } from '../../libs/google-apis';
import {analyticsdata_v1beta} from "googleapis/build/src/apis/analyticsdata/v1beta";

export const index = async (req: Request, res: Response) => {
  const { user } = req;

  if (!user) {
    res.redirect('/');
    return;
  }

  let fromDate: string = req.query.from_date as string || '2022-01-01';
  let toDate: string = req.query.to_date as string || '2022-12-31';

  const data: analyticsdata_v1beta.Schema$BatchRunReportsResponse = await Analytics.fetchReports(fromDate, toDate);

  res.render('reports', {
    title: 'Analytics Data API V1Beta',
    fromDate: fromDate,
    toDate: toDate,
    data: data,
    subscribers: user.subscribers || []
  });
}