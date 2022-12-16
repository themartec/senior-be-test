import * as log4js from 'log4js';
// tslint:disable: object-literal-sort-keys
import { dirname } from 'path';

const appDir = dirname(require.main?.filename || '');
const LOG_DIR = `${process.env.LOG_DIR}` || `${appDir}/logs`;

export const Log4JsConfiguration: log4js.Configuration = {
	appenders: {
		console: {
			type: 'console',
			layout: {
				pattern: '%[%d [%p] %f{1}:%l%] %m',
				type: 'pattern',
			},
		},
		fileError: {
			type: 'file',
			filename: `${LOG_DIR}/error/appsErrors.log`,
			backups: 10,
			maxLogSize: 1 * 100 * 1000, // in bytes
			layout: {
				type: 'pattern',
				pattern: '%d [%p] %f{1}:%l %m%n',
			},
			keepFileExt: true,
		},
		fileErrorDate: {
			type: 'dateFile',
			filename: `${LOG_DIR}/error/appsErrorDate.log`,
			layout: {
				type: 'pattern',
				pattern: '%d [%p] %f{1}:%l %m%n',
			},
			pattern: '.yyyy-MM-dd',
			keepFileExt: true,
			numBackups: 30,
		},
		fileOthers: {
			type: 'file',
			filename: `${LOG_DIR}/others/appsOthers.log`,
			backups: 10,
			maxLogSize: 1 * 100 * 1000, // in bytes
			layout: {
				type: 'pattern',
				pattern: '%d [%p] %f{1}:%l %m%n',
			},
			keepFileExt: true,
		},
		fileErrorFilter: { type: 'logLevelFilter', appender: 'fileError', level: 'ERROR' },
		fileErrorDateFilter: { type: 'logLevelFilter', appender: 'fileErrorDate', level: 'ERROR' },
		fileOthersFilter: { type: 'logLevelFilter', appender: 'fileOthers', level: 'TRACE', maxLevel: 'WARN' },
		// TODO: add configs for connect to slack or SMTP
	},
	categories: {
		default: {
			appenders: ['console', 'fileErrorFilter', 'fileOthersFilter', 'fileErrorDateFilter'],
			level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
			enableCallStack: true,
		},
	},
};
