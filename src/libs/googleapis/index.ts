import { OAuth2Client } from 'google-auth-library';
import { google, analyticsdata_v1beta } from 'googleapis';

const analyticsDataClientMap: {[key: string]: { client: analyticsdata_v1beta.Analyticsdata, auth: OAuth2Client } } = {};

export function getGoogleAuthOAuth() {
	return new google.auth.OAuth2({
		clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
		clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
		redirectUri: process.env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI as string,
	});
}

export function getAnalyticsDataClient( email: string ) {
	if ( analyticsDataClientMap[ email ] ) return analyticsDataClientMap[ email ];

	const googleOAuth2Auth = getGoogleAuthOAuth();
	const analyticsDataClient = google.analyticsdata({
		version: 'v1beta',
		auth: googleOAuth2Auth,
	});
	const result = { client: analyticsDataClient, auth: googleOAuth2Auth };

	analyticsDataClientMap[ email ] = result;
	return result;
}
