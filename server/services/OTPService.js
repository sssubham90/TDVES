const SendOtp = require('sendotp');
const sendOtp = new SendOtp('299694AvNkWpxlEzrS5daa170b', 'Please use this OTP: {{otp}} AksDai');

module.exports = sendOtp;