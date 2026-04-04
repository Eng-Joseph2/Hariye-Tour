import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
import AuthModel from "../Models/AuthModel.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://hariye-tour-agency.onrender.com/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await AuthModel.findOne({ googleId: profile.id });
        if (!user) {
          user = await AuthModel.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });
        }
        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    },
  ),
);

export default passport;
