import { IWatermark, WatermarkType } from "../services/video-processing.service";
export interface IFFmpegCommandBuilder {
  buildMergeVideoCommand(inputPaths: string[], outputPath?: string): string | undefined;
  buildWatermarkVideoCommand(inputPath: string, watermarks: IWatermark[], outputPath: string): string
}

export class FFmpegCommandBuilder implements IFFmpegCommandBuilder {

  buildMergeVideoCommand(inputPaths: string[], outputPath: string): string {
    const inputArgs = inputPaths.reduce((cmd, path) => cmd += ` -i ${path}`, '')
    return `ffmpeg${inputArgs} -filter_complex concat ${outputPath}`;
  }

  buildWatermarkVideoCommand(inputPath: string, watermarks: IWatermark[], outputPath: string): string {
    const totalWatermarks = watermarks.length;
    if (totalWatermarks === 0) throw new Error('No watermark configured');
    if (totalWatermarks === 1) {
      if (watermarks[0].type === WatermarkType.IMAGE) {
        // ToDo: Each kind of filter has a set of options
        return `ffmpeg -i ${inputPath}-filter_complex "overlay=?" ${outputPath}`;
      }

      if (watermarks[0].type === WatermarkType.TEXT) {
        // ToDo: drawtext options mapping
        return `ffmpeg -i ${inputPath} -filter_complex "drawtext=fontfile=/path/to/font.ttf:text=?" ${outputPath}`;
      }
    }

    // ToDo: Build a single FFmpeg command with filter graph
    return ``;
  }

}

export default new FFmpegCommandBuilder()