import cronJob from 'node-cron';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { config } from "../../config/app";

let transporter = nodemailer.createTransport({
  service: config.mailing.service,
  auth: {
    user: config.mailing.smtp.user,
    pass: config.mailing.smtp.pass,
  },
});

/**
 * Send email every hour
 * @param {string} emails 
 */
export const sendEmail = (emails?: string[]) => {
  // Sending emails every hour
  cronJob.schedule('0 * * * * *', () => {
    let mailOptions = {
      from: 'The Martec Test',
      to: emails ?? config.mailing.recipients,
      subject: "The Martec Test - Scheduled Email",
      html: `<p>Hello there,</p>
      <p>This is an email scheduled from <b>The Martec Test</b></p>
      Kind regards,<br>
      <h4>The Martec Test</h4>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error("Email error application", error.message);
      } else {
          console.log(`${new Date().toLocaleString()} - Email sent successfully: `  + info.response);
      }
    });
  });
}

export default transporter;
