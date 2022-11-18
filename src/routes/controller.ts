import { Request, Response } from 'express';

export const index = async (req: Request, res: Response) => {
  res.render('index', { user: req.user, title: 'Analytics Reporting API V4' });
}