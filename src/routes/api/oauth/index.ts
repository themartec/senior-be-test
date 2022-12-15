import * as express from 'express';
import passport from '../../../libs/passport';

const router: express.Router = express.Router();

router.get('/google', passport.authenticate(
	'google',
	{
		accessType: 'offline',
		scope: [
			'https://www.googleapis.com/auth/analytics',
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile'
		],
		failureRedirect: '/',
	}
));

router.get('/google/oauthcallback', passport.authenticate(
	'google',
	{
		successRedirect: '/api/analytics/properties',
		failureRedirect: '/',
	}
));

export default router;
