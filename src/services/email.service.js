const nodemailer = require('nodemailer');

const config = require('../utils/config');
const logger = require('../utils/logger');

const transport = nodemailer.createTransport(config.email.smtp);

if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  const resetPasswordUrl = `https://foodlert.com/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

const sendOTPEmail = async (emailTo, otp) => {
  const subject = 'Foodlert';
  const text = `Dear user,

  <strong>${otp}</strong/> is your Verification OTP.
  
  Your OTP will expire in ${config.otp.accessExpirationMinutes} min.
  Do not share your otp with anyone.
  
  Regards
  Foodlert Team`;

  await sendEmail(emailTo, subject, text);
};

module.exports = {
  // sendEmail,
  sendResetPasswordEmail,
  sendOTPEmail
};
