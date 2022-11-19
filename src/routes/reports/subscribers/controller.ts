import { Request, Response } from 'express';
import { Subscriber } from '../../../models/Subscriber';

export const create = async (req: Request, res: Response) => {
  const { user } = req;

  if (!user) {
    res.redirect('/');
    return;
  }

  const { email } = req.body;

  await Subscriber.upsert(
    {email: email, userId: user.id},
    {
      skipUpdateIfNoValuesChanged: true, // If true, postgres will skip the update if no values would be changed (reduces writes)
      conflictPaths: ['userId', 'email'], // column(s) name that you would like to ON CONFLICT
    }
  );

  res.redirect('/reports');
}

export const destroy = async (req: Request, res: Response) => {
  const { user } = req;

  if (!user) {
    res.redirect('/');
    return;
  }

  const { email } = req.body;

  await Subscriber.delete(
    {email: email, userId: user.id},
  );

  res.redirect('/reports');
}