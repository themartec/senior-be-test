import ffmpegService from '../../services/ffmpeg.service';
import * as path from 'path';
import * as fs from 'fs';
import localConfig from "../../config/local.config";
import { WatermarkOptions } from 'src/types/types';
import process from '../../services/proccess.status.services';

export type WatermarkJobPayload = {
    watermarkOptions: Array<WatermarkOptions>,
    videoUrl: string,
    proccessId: string,
}

class WatermarkJob {
    async handle(payload: WatermarkJobPayload): Promise<any> {
        console.log(`[WatermarkJob] Job starting...`);
        const filename = `${payload.proccessId}.mp4`;
        if (!fs.existsSync(localConfig.STORAGE_PATH)) {
            fs.mkdirSync(localConfig.STORAGE_PATH);
        }
        const outputPath = path.join(localConfig.STORAGE_PATH, filename);
        try {
            await ffmpegService.filtersVideo(payload.videoUrl, payload.watermarkOptions, outputPath);
            await process.set(payload.proccessId, JSON.stringify({status: "done", url: `${localConfig.STORAGE_URL}/${filename}`}));
        } catch (error) {
            await process.set(payload.proccessId, JSON.stringify({status: "error", error: error.message}));
            throw new Error(error);
        }
        console.log(`[WatermarkJob] Job Done`);
        return outputPath;
    }
}

module.exports = WatermarkJob;
