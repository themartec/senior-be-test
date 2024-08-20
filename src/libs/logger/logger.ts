import * as log4js from 'log4js';
import { Log4JsConfiguration } from './log4js';

let logger: log4js.Logger;

function getLogger() {
	if (!logger) logger = log4js.configure(Log4JsConfiguration).getLogger();
	return logger;
}

type ILogger = log4js.Logger;

export {
	getLogger,
	ILogger,
};
