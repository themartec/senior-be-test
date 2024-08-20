import { NextFunction, Request, Response } from 'express';
import UserRepository from '../database/user/user.repository';

async function validateChartRequest(request: Request, response: Response, next: NextFunction) {
	try {
		const bearerToken = request.headers[ 'authorization' ];

		if ( !bearerToken ) throw new Error('unauthorized');

		const accessToken = bearerToken.replace( 'Bearer ', '' );
		const user = await new UserRepository().findOneByQuery({ accessToken });

		if ( !user ) throw new Error('unauthorized');

		// googleOAuth2Auth.setCredentials({
		// 	access_token: request.user.accessToken,
		// 	refresh_token: request.user.refreshToken,
		// });

		next();
	} catch (error) {
		next(error);
	}
}

export default validateChartRequest;
