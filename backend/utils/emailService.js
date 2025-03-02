const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const sendWelcomeEmail = (to, name) => {
  const subject = 'Welcome to CitizenConnect360';
  const text = `Hello ${name},\n\nWelcome to CitizenConnect360! We are excited to have you on board.\n\nBest regards,\nCitizenConnect360 Team`;
  sendEmail(to, subject, text);
};

const sendPasswordResetEmail = (to, resetLink) => {
  const subject = 'Password Reset Request';
  const text = `Hello,\n\nYou requested a password reset. Please use the following link to reset your password:\n${resetLink}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nCitizenConnect360 Team`;
  sendEmail(to, subject, text);
};

module.exports = { sendEmail, sendWelcomeEmail, sendPasswordResetEmail };