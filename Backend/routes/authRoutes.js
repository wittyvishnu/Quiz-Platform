const express = require('express');
const { requestOtp, signup, login,verifyToken,requestPasswordReset,resetPassword,verifyOtp} = require('../controllers/authController');

const router = express.Router();

router.post('/request-otp', requestOtp);
router.post('/signup', signup);
router.post('/login', login);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.get('/verify-token', verifyToken);
router.post("/verify-otp",verifyOtp)
module.exports = router;
