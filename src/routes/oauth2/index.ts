import 'express-async-errors';
import express, { Request, Response, Router } from 'express';
import passport from '../../libs/passport';

const router: Router = express.Router();

router.get(
  '/google',
  passport.authenticate(
    'google',
    {
      accessType: 'offline',
      scope: [
        'https://www.googleapis.com/auth/analytics',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ],
      failureRedirect: '/'
    }
  )
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    res.redirect('/reports');
  }
);

export default router;
