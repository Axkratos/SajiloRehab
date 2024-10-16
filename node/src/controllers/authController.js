import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const signRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
  });
};

export const signup = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ status: 'fail', message: 'Passwords do not match' });
  }

  try {
    const newUser = await User.create({ fullName, email, password, role: 'patient' });
    const token = signToken(newUser._id);
    const refreshToken = signRefreshToken(newUser._id);
    res.status(201).json({ status: 'success', token, refreshToken });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'fail', message: 'Please provide email and password!' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
  }

  const token = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  const refreshTokenExpiry = durationToMilliseconds(process.env.JWT_REFRESH_EXPIRES_IN);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false, // Allow HTTP for development
    sameSite: 'none', // Allow some cross-site requests
    maxAge: refreshTokenExpiry// Convert to milliseconds
  });
  res.status(200).json({ status: 'success', token, refreshToken,role: user.role });
};
const durationToMilliseconds = (duration) => {
  const match = duration.match(/^(\d+)([dhms])$/);
  if (!match) {
    throw new Error(`Invalid duration format: ${duration}`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'm':
      return value * 60 * 1000;
    case 's':
      return value * 1000;
    default:
      throw new Error(`Unknown time unit: ${unit}`);
  }
};
export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ status: 'fail', message: 'No refresh token provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newToken = signToken(decoded.id);
    res.status(200).json({ status: 'success', token: newToken });
  } catch (err) {
    res.status(401).json({ status: 'fail', message: 'Invalid refresh token' });
  }
};