import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { User } from '../models/User';

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_REDIRECT_URL || ''
  }, async(accessToken, refreshToken, profile, cb) => {
    if (!profile.emails?.length) {
      cb(null);
      return;
    }

    const email = profile.emails[0].value;

    let user: User | null = await User.findOneBy({email: email});

    if (!user) {
      // create the user
      user = new User();
    }

    user.email = email;
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    return cb(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user: User, done) => {
  done(null, user);
});

export default passport;