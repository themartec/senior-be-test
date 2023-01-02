import ffmpegService from '../../services/ffmpeg.service';
import * as path from 'path';
import * as fs from 'fs';
import localConfig from "../../config/local.config";
import process from '../../services/proccess.status.services';

export type MergeVideoJobPayload = {
  videoUrls: string[],
  proccessId: string,
}

class MergeVideoJob  {
    async handle(payload: MergeVideoJobPayload): Promise<any> {
      console.log(`[MergeVideoJob] Job starting...`);
      const filename = `${payload.proccessId}.mp4`;
      if (!fs.existsSync(localConfig.STORAGE_PATH)) {
        fs.mkdirSync(localConfig.STORAGE_PATH);
    }
      const outputPath = path.join(localConfig.STORAGE_PATH, filename);
      try {
        await ffmpegService.mergeVideo(payload.videoUrls, outputPath);
        await process.set(payload.proccessId, JSON.stringify({status: "done", url: `${localConfig.STORAGE_URL}/${filename}`}));
      } catch (error) {
        await process.set(payload.proccessId, JSON.stringify({status: "error", error: error.message}));
        throw new Error(error);
      }
      console.log(`[MergeVideoJob] Job Done`);
      return outputPath;
    }
}

module.exports = MergeVideoJob;