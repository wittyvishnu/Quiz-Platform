const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { sendOtpEmail } = require('../utils/email');
const jwt = require('jsonwebtoken');

const otpStore = new Map();           
const passwordResetOtpStore = new Map(); 

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();


const requestOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const otp = generateOtp();
    otpStore.set(email, { otp, verified: false });

    await sendOtpEmail(email, otp);
    return res.json({ message: 'OTP sent to email' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send OTP' });
  }
};


const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const storedOtpData = otpStore.get(email);
  
  if (!storedOtpData || storedOtpData.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  otpStore.set(email, { ...storedOtpData, verified: true });

  return res.json({ 
    message: 'Email verified successfully',
    verified: true
  });
};


const signup = async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    email,
    phone,
    password,
    confirm_password,
    terms_accepted,
    role
  } = req.body;

  if (!terms_accepted) return res.status(400).json({ error: 'Terms must be accepted' });

  if (!first_name || !last_name || !email || !phone || !password || !confirm_password) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const storedOtpData = otpStore.get(email);
  if (!storedOtpData || !storedOtpData.verified) {
    return res.status(400).json({ error: 'Email not verified' });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);

    await User.create({
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      password_hash,
      is_email_verified: true,
      role
    });

    otpStore.delete(email); 

    return res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password ) {
    return res.status(400).json({ error: 'Email and  password  are required' });
  }

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ error: 'No user found' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
  { id: user.id, email: user.email, role: "creator" },
  process.env.JWT_SECRET,
  { expiresIn: '300h' }
);

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        role: "creator",
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// 5. Request password reset OTP
const requestPasswordReset = async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ error: 'Email and role are required' });
  }

  try {
    const user = await User.findByEmail(email);
    if (!user || user.role !== role) {
      return res.status(404).json({ error: `No  account associated with this email` });
    }

    const otp = generateOtp();
    passwordResetOtpStore.set(email, otp);

    await sendOtpEmail(email, otp);
    return res.json({ message: 'OTP sent to your email for password reset' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send OTP' });
  }
};


const resetPassword = async (req, res) => {
  const { email, otp, new_password, confirm_password } = req.body;

  if (!email || !otp || !new_password || !confirm_password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (new_password !== confirm_password) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  const savedOtp = passwordResetOtpStore.get(email);
  if (savedOtp !== otp) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isSamePassword = await bcrypt.compare(new_password, user.password_hash);
    if (isSamePassword) {
      return res.status(400).json({ error: 'New password cannot be the same as the old password' });
    }

    const password_hash = await bcrypt.hash(new_password, 10);
    await User.updatePassword(email, password_hash);

    passwordResetOtpStore.delete(email);

    return res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// 7. Verify JWT token
const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ valid: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ valid: false, error: 'Invalid or expired token' });
  }
};

module.exports = {
  requestOtp,
  verifyOtp,
  signup,
  login,
  requestPasswordReset,
  resetPassword,
  verifyToken
};
