import express, { Request, Response, Router } from 'express';
import { ParsedQs } from 'qs';
import googleOAuth2Client from '../libs/google_oauth2_client';
import debug from 'debug';
import { TokenInfo } from 'google-auth-library/build/src/auth/oauth2client';
import { User } from '../models/User';

const router: Router = express.Router();

// home page
router.get('/', async (req: Request, res: Response) => {
  const user = await User.findOneBy({email: 'xxx@gmail.com'});
  console.log(user);
  res.render('index', { title: 'Analytics Reporting API V4' });
});

// oauth2 initial
router.get('/oauth2/google', (req: Request, res: Response) => {
  // generate an url that asks permissions for analytics scopes
  const scopes = [
    'https://www.googleapis.com/auth/analytics'
  ];

  const url = googleOAuth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: scopes
  });

  res.redirect(url)
});

// oauth2 callback
router.get('/oauth2/google/callback', async (req: Request, res: Response) => {
  // exchange authorization code for tokens
  const code: undefined | string | string[] | ParsedQs | ParsedQs[] = req.query.code;

  if (typeof code !== 'string' || !code) {
    res.render(
      'error',
      {
        message: 'Something went wrong with OAuth2 Authorization!',
        error: { status: 500 }
      }
    );
    return;
  }

  try {
    const { tokens } = await googleOAuth2Client.getToken(code);
    googleOAuth2Client.setCredentials(tokens);

    if (!tokens.access_token) {
      res.render(
        'error',
        {
          message: 'Cannot get OAuth2 tokens from code!',
          error: { status: 500 }
        }
      );
      return;
    }

    console.log(tokens);

    // get user email
    const tokenInfo: TokenInfo = await googleOAuth2Client.getTokenInfo(tokens.access_token);

    if (!tokenInfo.email) {
      res.render(
        'error',
        {
          message: 'Cannot get user email address!',
          error: { status: 500 }
        }
      );
      return;
    }

    let user: User | null = await User.findOneBy({email: tokenInfo.email});

    if (!user) {
      // create the user
      user = new User();
      user.email = tokenInfo.email;
      if (tokens.refresh_token) {
        user.refreshToken = tokens.refresh_token;
      }
      await user.save();
    }
  } catch (err) {
    debug.log(err);
    res.status(500);
    res.render(
      'error',
      {
        message: 'Cannot get OAuth2 tokens from code!',
        error: { status: 500 }
      }
    );
  }
});

export default router;
