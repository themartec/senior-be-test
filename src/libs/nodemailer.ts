import nodemailer from 'nodemailer';

// create reusable transporter object using the default SMTP transport
export const Mailer = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: Number(process.env.MAILER_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS
  },
});
