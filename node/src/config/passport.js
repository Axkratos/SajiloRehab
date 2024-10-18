// passport-config.js
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // Adjust path if necessary

// Function to sign the JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Function to sign the refresh token
const signRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};

export const initializePassport = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists based on email
      let user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        // If user doesn't exist, create a new one
        user = await User.create({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          password: 'google_auth', // Dummy password
          role: 'patient', // Default role
        });
      }

      // Log authenticated user and pass it to done callback
      console.log("Authenticated user: ", user);
      done(null, user); // Pass user object to be serialized
    } catch (error) {
      console.error("Error in Google strategy: ", error);
      done(error, null); // In case of error, pass null user
    }
  }));

  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
