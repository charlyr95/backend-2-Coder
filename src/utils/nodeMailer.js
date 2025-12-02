import nodeMailer from 'nodemailer';
import config from '../config/config.js';

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  }
});

export default transporter;