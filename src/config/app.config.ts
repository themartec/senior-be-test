import * as dotenv from 'dotenv';
dotenv.config();

const appConfig = {
    PORT: process.env.APP_PORT || 3000
}

export default appConfig