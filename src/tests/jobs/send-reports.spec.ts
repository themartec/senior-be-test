import { init, destroy } from '../../bootstrap';
import User from '../../models/User';
import { UserFactory } from '../factory';
import { oauth2Client } from '../../libs/google-apis';
import { SendReportsJob } from '../../jobs';
import { criticalQueue, defaultQueue } from '../../queue';
import { generatePDF } from '../../libs/puppeteer';
import { Mailer } from '../../libs/nodemailer';

jest.mock('../../libs/google-apis', () => ({
  oauth2Client: {
    setCredentials: jest.fn(),
    getAccessToken: jest.fn().mockReturnValue({
      token: 'new access token'
    })
  }
}));

jest.mock('../../libs/puppeteer', () => ({
  generatePDF: jest.fn()
}));

jest.mock('../../libs/nodemailer', () => ({
  Mailer: {
    sendMail: jest.fn()
  }
}));

describe('', () => {
  let users: User[] = [];

  beforeAll(async () => {
    await init();
  });

  beforeEach(async () => {
    users = await new UserFactory().createMany(2);
    jest.spyOn(oauth2Client, 'setCredentials');
  });

  afterEach(async () => {
    await User.delete({});
  })

  afterAll(async () => {
    await destroy();
    await defaultQueue.close();
    await criticalQueue.close();
  });

  it('send emails to subscribers', async () => {
    await new SendReportsJob().perform();
    expect(await User.count()).toEqual(2);
    expect(oauth2Client.setCredentials).toHaveBeenNthCalledWith(1, { refresh_token: 'refresh token' });
    expect(oauth2Client.setCredentials).toHaveBeenNthCalledWith(2, { refresh_token: 'refresh token' });
    expect(generatePDF).toHaveBeenNthCalledWith(
      1,
      `${process.env.HOST}/charts`,
      'new access token',
      `/tmp/reports-${users[0].id}.pdf`
    );
    expect(generatePDF).toHaveBeenNthCalledWith(
      2,
      `${process.env.HOST}/charts`,
      'new access token',
      `/tmp/reports-${users[1].id}.pdf`
    );
    expect(Mailer.sendMail).toHaveBeenNthCalledWith(1, {
      from: `"Fred Foo 👻" <${users[0].email}>`, // sender address
      to: users[0].subscribers.map((subscriber) => subscriber.email).join(', '), // list of receivers
      subject: 'Google analytics reports ✔', // Subject line
      text: 'Google analytics reports', // plain text body
      html: "<b>Google analytics reports</b>", // html body
      attachments: [
        {
          filename: 'reports.pdf',
          path: `/tmp/reports-${users[0].id}.pdf`,
          contentType: 'application/pdf'
        }
      ],
    });
    expect(Mailer.sendMail).toHaveBeenNthCalledWith(2, {
      from: `"Fred Foo 👻" <${users[1].email}>`, // sender address
      to: users[1].subscribers.map((subscriber) => subscriber.email).join(', '), // list of receivers
      subject: 'Google analytics reports ✔', // Subject line
      text: 'Google analytics reports', // plain text body
      html: "<b>Google analytics reports</b>", // html body
      attachments: [
        {
          filename: 'reports.pdf',
          path: `/tmp/reports-${users[1].id}.pdf`,
          contentType: 'application/pdf'
        }
      ],
    });
  });
});