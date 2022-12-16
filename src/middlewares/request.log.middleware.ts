import { NextFunction, Request, Response } from 'express';
import TimeUtil from '../utils/time.utils';

function requestLogMiddleware(request: Request, response: Response, next: NextFunction) {
	console.log(`[${TimeUtil.getLogMoment()}] [PID: ${process.pid}] ${request.method} ${request.path}`);
	next();
}

export default requestLogMiddleware;
