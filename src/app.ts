import * as express from 'express';
import { json } from 'body-parser';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';

import * as Logger from './libs/logger/logger';
import requestLogMiddleware from './middlewares/request.log.middleware';
import errorMiddleware from './middlewares/error.middleware';
import router from './routes';

class App {
	app: express.Application;
	logger: Logger.ILogger;

	constructor() {
		this.app = express();
		this.logger = Logger.getLogger();

		this._init();

		this.app.use(express.static(path.join(__dirname, 'public')));
		this.app.use('/', router);

		this.app.use(errorMiddleware);
	}

	listen(port: number) {
		this.app.listen(port, () => {
			this.logger.info(`App listening on the port ${port}`);
		});
	}

	private _init() {
		this.app.use(requestLogMiddleware);

		this.app.use(json());
		this.app.use(cors());
		this.app.use(cookieParser());
	}

}

export default App;
