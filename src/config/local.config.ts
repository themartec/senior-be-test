import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const localConfig = {
    STORAGE_PATH: path.join(__dirname, '../storages'),
    TEMP_PATH: path.join(__dirname, '../temps'),
    FONT_PATH: path.join(__dirname, '../fonts/lato'),
    STORAGE_URL: `${process.env.APP_URL}/storages`,
}

export default localConfig