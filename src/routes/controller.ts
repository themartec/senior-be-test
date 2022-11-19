import { Request, Response } from 'express';

export const index = async (req: Request, res: Response) => {
  res.render('index', {
    title: 'Analytics Data API V1Beta'
  });
}