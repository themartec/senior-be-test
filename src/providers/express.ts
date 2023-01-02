import * as express from "express";
import * as bodyParser from 'body-parser';
import apiRouter from '../routers/api.router';
import appConfig from '../config/app.config';
import handler from "../exceptions/handler";
import localConfig from "../config/local.config";

class ExpressProvider {
    constructor(private app = express.application) {
        this.app = express()
    }
    public main() {
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        
        this.app.use('/', express.static('public'))
        this.app.use('/storages', express.static(localConfig.STORAGE_PATH))
        this.app.use('/api', apiRouter);
        this.app.set('port', appConfig.PORT || 3000);
        this.app.use(handler.notFound);
        return this.app
    }

    public listen() { 
        this.app.listen(this.app.get('port'), () => {
            console.log(`Express running → PORT ${this.app.get('port')}`);
        });
    }
}

export default new ExpressProvider();