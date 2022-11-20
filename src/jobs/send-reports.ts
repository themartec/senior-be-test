import { Job } from './index';
import { generatePDF } from '../libs/puppeteer';
import User from './../models/User';
import Subscriber from './../models/Subscriber';
import { oauth2Client } from '../libs/google-apis';
import logger from './../libs/logger';
import { Mailer } from '../libs/nodemailer';

export class SendReportsJob extends Job {
  async perform(params: Record<string, unknown>): Promise<void> {
    const users: User[] = await User.find();
    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      // generate access token
      oauth2Client.setCredentials({
        refresh_token: user.refreshToken
      });

      const tokenInfo = await oauth2Client.getAccessToken();

      if (!tokenInfo.token) {
        logger(`Cannot fetch access token for user ${user.email}`);
        continue;
      }

      user.accessToken = tokenInfo.token;
      await user.save();

      const destPath = `/tmp/reports-${user.id}.pdf`;
      // generate pdf of reports
      await generatePDF(`${process.env.HOST}/charts`, user.accessToken, destPath);

      const subscribers: Subscriber[] = user.subscribers;

      if (!subscribers.length) {
        continue;
      }

      const emails: string[] = subscribers.map((subscriber) => subscriber.email);

      await Mailer.sendMail({
        from: `"Fred Foo 👻" <${user.email}>`, // sender address
        to: emails.join(', '), // list of receivers
        subject: 'Google analytics reports ✔', // Subject line
        text: 'Google analytics reports', // plain text body
        html: "<b>Google analytics reports</b>", // html body
        attachments: [
          {
            filename: 'reports.pdf',
            path: destPath,
            contentType: 'application/pdf'
          }
        ],
      })
      logger(`Sent email to ${emails}`);
    }
  }
}