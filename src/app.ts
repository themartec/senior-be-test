import * as express from 'express';
import { json } from 'body-parser';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as passport from 'passport';
import * as mongoose from 'mongoose';
import * as session from 'express-session';

import * as Logger from './libs/logger/logger';
import requestLogMiddleware from './middlewares/request.log.middleware';
import errorMiddleware from './middlewares/error.middleware';
import router from './routes';
import mongoConfig from './configs/mongodb';

class App {
	app: express.Application;
	logger: Logger.ILogger;

	constructor() {
		this.app = express();
		this.logger = Logger.getLogger();

		this.app.use(json());
		this.app.use(cookieParser());
		this.app.use(cors());

		this.app.use(session({
			secret: 'changeme',
			resave: false,
			saveUninitialized: false,
			cookie: { secure: true }
		}));
		this.app.use(passport.initialize());
		this.app.use(passport.session());

		this.app.use(express.static(path.join(__dirname, 'public')));

		this.app.use(requestLogMiddleware);
		this.app.use('/', router);

		this.app.set('views', path.join(__dirname, 'views'));
		this.app.set('view engine', 'ejs');

		this.app.use(errorMiddleware);
	}

	async listen(port: number) {
		await this.connectToTheDatabase();
		this._listen(port);
	}

	private _listen(port: number) {
		this.app.listen(port, () => {
			this.logger.info(`App listening on the port ${port}`);
		});
	}

	private connectToTheDatabase(): Promise<void> {
		const connectFunc = (): Promise<void> => new Promise((res, rej) => {
			mongoose.connect(mongoConfig.url, mongoConfig.options);
			mongoose.connection.on('connected', () => {
				this.logger.info('Connect to mongoDB');
				res();
			});
			mongoose.connection.on('error', (error) => {
				rej(error);
			});
		});

		return connectFunc();

		// TODO: retry connection
		// let retryTime = 0;
		// const establishConnection = async (): Promise<void> => {
		// 	try {
		// 		await connectFunc();
		// 	} catch (error) {
		// 		retryTime++;
		// 		this.logger.error(`Error to connect to mongoDB. Retrying...(${retryTime})`);
		// 		await establishConnection();
		// 	}
		// };

		// return establishConnection();
	}

}

export default App;
