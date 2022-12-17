export const mailing = {
  service: "gmail",
  recipients: [
    process.env.EMAIL as string,
  ],
  smtp: {
    user: process.env.SMTP_MAIL_USER,
    pass: process.env.SMTP_MAIL_PASSWORD,
  }
};