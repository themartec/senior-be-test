import { NextFunction, Request, Response } from 'express';
import { getLogger } from '../libs/logger/logger';

function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
	getLogger().error(error);

	const status = 500;
	const message = 'Something went wrong';

	response.status(status).send({
		message,
		status,
	});

}

export default errorMiddleware;
