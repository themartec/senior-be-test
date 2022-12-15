import { IUserEntity } from './../interfaces/user.interface';
import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserRepository from '../database/user/user.repository';

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
			callbackURL: process.env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI as string,
		},
		async (accessToken, refreshToken, profile, doneCb) => {
			try {
				const email = profile.emails?.length && profile.emails[0].value;

				if ( !email ) throw new Error('Not allow empty email');

				const user = await new UserRepository().findOneAndUpdate(
					{ email }, { email, accessToken, refreshToken }, { upsert: true }
				) as IUserEntity;

				return doneCb(null, user);
			} catch (error) {
				return doneCb(error);
			}
		}
	)
);

passport.serializeUser((user, doneCb) => {
	doneCb(null, user);
});

passport.deserializeUser((user: IUserEntity, doneCb) => {
	// googleOAuth2Auth.setCredentials({ access_token: user.accessToken, refresh_token: user.refreshToken });
	return doneCb(null, user);
});

export default passport;
