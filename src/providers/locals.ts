import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

class LocalsProvider {
    public static config() {
        return {
            STORAGE_PATH: path.join(__dirname, '../../storages/'),
            STORAGE_URL: `${process.env.APP_URL}/storages`,
            FONTS_FILE : process.env.FONTS_FILE,
            INTRO_VIDEO: process.env.INTRO_VIDEO,
            OUTRO_VIDEO: process.env.OUTRO_VIDEO,
            PORT: 3000
        }
    }
}

export default LocalsProvider;