import { NextFunction, Request, Response } from 'express';
import { oauth2Client } from '../libs/google-apis';

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.redirect('/');
    return;
  }

  oauth2Client.setCredentials({
    access_token: req.user.accessToken,
    refresh_token: req.user.refreshToken
  });

  res.locals.user = req.user;
  next();
}