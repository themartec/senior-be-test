import {google} from 'googleapis';

export const googleOAuth2Auth = new google.auth.OAuth2({
	clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
	clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
	redirectUri: process.env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI as string,
});

export const analyticsDataClient = google.analyticsdata({
	version: 'v1beta',
	auth: googleOAuth2Auth,
});
