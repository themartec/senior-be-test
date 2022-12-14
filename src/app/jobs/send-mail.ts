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

let mailOptions = {
  from: 'The Martec Test',
  to: process.env.EMAIL,
  subject: "The Martec Test - Scheduled Email",
  html: `<p>Hello there,</p>
  <p>This is an email scheduled from <b>The Martec Test</b></p>
  Kind regards,<br>
  <h4>The Martec Test</h4>`
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("Email error application", error.message);
  } else {
    console.log(`${new Date().toLocaleString()} - Email sent successfully:` + info.response);
  }
});

/**
 * Send email every hour
 * @param {string} emails 
 */
export const sendEmail = (emails?: string[]) => {
  // Sending emails every hour
  cronJob.schedule('0 * * * * *', () => {
    let mailOptions = {
      from: 'EMAIL NODE CRON APP',
      to: emails ?? config.mailing.recipients,
      subject: "Scheduled Email",
      html: `<p>Hello there,</p>
      <p> You have an email scheduled from <b>EMAIL NODE CRON APP</b> </p>
      <p>Keep learning👌👌</p>
      Kind regards, <br>
      <h4> EMAIL NODE CRON APP</h4>`
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
