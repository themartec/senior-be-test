import fs from 'fs';
import 'dotenv/config';
import readline from 'readline';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

type TCredentials = {
  client_id: string;
  client_secret: string;
  redirect_uris: string[];
}

const VIEW_ID = process.env.GA_VIEW_ID || "115032377";
console.log(`Your view id is ${VIEW_ID}`);

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
// The file token.json stores the user's access and refresh tokens, and is created automatically when the authorization flow completes for the first time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
// authorize({
//   client_id: "627911602967-2ot9g5n81rk89844cmfkhkkv9746ab1s.apps.googleusercontent.com",
//   client_secret: "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",
//   redirect_uris: ["http://localhost:3001/oauth2callback"],
// }, getUserReport);

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
export function authorize(credentials: TCredentials, callback?: (client: OAuth2Client, ...args: any) => void): void {
  const { client_secret, client_id, redirect_uris } = credentials;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token as any as string));
    callback && callback(oAuth2Client);
  });
}

export function storeToken(token: string) {
  // Store the token to disk for later program executions
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) return console.error(err);
    console.log('Token stored to', TOKEN_PATH);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client: OAuth2Client, callback?: (client: OAuth2Client, ...args: any) => void) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token!);

      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback && callback(oAuth2Client);
    });
  });
}

/**
 * Number of users between last week and two weeks ago.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
export function getUserReport(auth: OAuth2Client) {
  const service = google.analyticsreporting({ version: 'v4', auth });
  const googleAnalyticsReports: Record<string, any> = {
    resource: {
      reportRequests: [{
        viewId: VIEW_ID,
        dateRanges: [
          {
            startDate: '14daysAgo',
            endDate: '7daysAgo'
          }
        ],
        metrics: [
          {
            expression: 'ga:users'
          }
        ]
      }]
    }
  };

  service.reports.batchGet(googleAnalyticsReports, (err: any, res: any) => {
    if (err) return console.log('The API returned an error: ' + err);
    const reports = res.data.reports;
    if (reports.length) {
      console.log('Reports:');
      reports.forEach((report: any) => {
        console.log('\tMetrics:');
        report.columnHeader.metricHeader.metricHeaderEntries.forEach((metricHeader: any) => console.log('\t\t', metricHeader.name))
        report.data.rows.forEach((row: any) => console.log('\t\t', row.metrics))
      }
      );

    } else {
      console.log('No data found.');
    }
  });
}