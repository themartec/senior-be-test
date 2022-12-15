import { NextFunction, Request, Response } from 'express';
import { IRequestWithUser } from '../interfaces/request.interface';
import { googleOAuth2Auth } from '../libs/googleapis';

function validateAnalyticsRequest(request: IRequestWithUser, response: Response, next: NextFunction) {
	try {
		if ( !request.user ) {
			// Unauthorize
			response.redirect('/');
			return;
		}

		googleOAuth2Auth.setCredentials({
			access_token: request.user.accessToken,
			refresh_token: request.user.refreshToken,
		});

		next();
	} catch (error) {
		next(error);
	}
}

export default validateAnalyticsRequest;
