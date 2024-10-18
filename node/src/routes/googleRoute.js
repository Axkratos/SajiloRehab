import express from 'express';
import axios from 'axios';
import { oauth2Client } from '../config/google.js'; // Ensure the path is correct
import User from '../models/userModel.js'; // Ensure the path is correct
import { signToken, signRefreshToken } from '../controllers/authController.js'; // Custom token generation functions

const router = express.Router();

// Google OAuth callback route
router.get('/google/callback', async (req, res) => {
  const code = req.query.code; // Get the authorization code from query parameters

  if (!code) {
    return res.status(400).json({ message: 'No authorization code provided' });
  }

  try {
    // Step 1: Exchange the authorization code for access/refresh tokens
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);

    // Step 2: Fetch user information from Google using the access token
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name } = userRes.data;

    // Step 3: Find or create the user in the database
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName: name,
        email,
        password: 'google_auth', // Dummy password
        role: 'patient', // Default role
      });
    }

    // Step 4: Generate access and refresh tokens using your custom functions
    const accessToken = signToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    // Step 5: Send tokens back in response body
    return res.status(200).json({
      message: 'User authenticated successfully',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Error during Google authentication:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
