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

const sendRecoveryEmail = async (to, token) => {
  const recoveryLink = `http://your-frontend-url/recover-password?token=${token}`;
  const mailOptions = {
    from: config.EMAIL_USER,
    to: to,
    subject: 'Password Recovery',
    html: `<p>Click <a href="${recoveryLink}">here</a> to reset your password. This link will expire in ${config.EXPIRE_EMAIL_TOKEN}.</p>`
  };
  await transporter.sendMail(mailOptions);
};

export { sendRecoveryEmail };
export default transporter;