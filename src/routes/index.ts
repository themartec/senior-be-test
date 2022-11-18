import 'express-async-errors';
import express, { Router } from 'express';
import { index } from './controller';
import passport from '../libs/passport';

const router: Router = express.Router();

// home page
router.get('/', index);

router.get(
  '/oauth2/google',
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
  '/oauth2/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

export default router;
