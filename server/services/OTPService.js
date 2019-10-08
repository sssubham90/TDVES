const SendOtp = require('sendotp');
const sendOtp = new SendOtp('AuthKey', 'Please use this OTP: {{otp}} AksDai');

module.exports = sendOtp;