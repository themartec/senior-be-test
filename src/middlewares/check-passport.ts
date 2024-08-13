import { NextFunction, Request, Response } from 'express';
import { oauth2Client } from '../libs/google-apis';
import User from '../models/User';

export default (req: Request, res: Response, next: NextFunction) => {
  const user: User | undefined = req.user;

  if (!user) {
    res.redirect('/');
    return;
  }

  oauth2Client.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.refreshToken
  });

  res.locals.user = user;
  next();
}