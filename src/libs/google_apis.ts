import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

// set auth as a global default
google.options({
  auth: oauth2Client
});

const analyticsV1Beta = google.analyticsdata('v1beta');

export { oauth2Client, analyticsV1Beta };