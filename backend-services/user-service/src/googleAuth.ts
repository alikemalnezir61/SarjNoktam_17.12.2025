import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: '/users/auth/google/callback'
},
  (accessToken, refreshToken, profile, done) => {
    // Burada kullanıcı veritabanına kaydedilebilir veya oturum açtırılabilir
    return done(null, profile);
  }
));

export default passport;
