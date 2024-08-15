import {google} from 'googleapis';
import 'dotenv/config'

const googleAuthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);
const drive = google.drive({version: 'v3', auth: googleAuthClient});
const people = google.people({ version: 'v1', auth: googleAuthClient });

export {drive, googleAuthClient, people};