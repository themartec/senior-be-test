import { getAbsolutePath } from "../utils/get-absolute-path";
import ffmpegCommandBuilder from "../lib/ffmpeg-command-builder";
import runner from "../lib/ffmpeg-runner";
import generateOutputFile from "../utils/generate-output-file";


export interface IVideoProcessingService {
  addWatermark(videoLink: string, watermarks: IWatermark[]): Promise<string>;
  mergeVideos(links: string[]): Promise<string>
}

export enum VideoProcessType {
  MERGE_VIDEOS = 1,
  ADD_WATERMARK = 2,
  MAKE_VIDEO_FROM_IMAGE_AND_AUDIO = 3,
  MAKE_VIDEO_FROM_TEXT_AND_AUDIO = 4
}

export enum InputType {
  LOCAL_INPUT_PATH = 1,
  PREVIOUS_OUTPUT = 2,
}

export interface VideoProcessSettings {
  processType: VideoProcessType,
  inputs: string[]
}

export interface IVideoProcessingSteps {
  inputs: string[],
  steps: VideoProcessSettings[]
}

export enum WatermarkType {
  TEXT = 'text',
  IMAGE = 'image'
}

export interface IWatermarkTextSettings {
  text: string,
  position: number,
  size: number,
  time: number,
  color: string,
  fontStyle: string,
}

export interface IWatermarkImageSettings {
  imagePath: string,
  position: number,
  size: number,
  time: number,
}

export interface IWatermark {
  type: WatermarkType,
  settings: IWatermarkTextSettings | IWatermarkImageSettings
}

export class VideoProcessingService implements IVideoProcessingService {
  async addWatermark(videoLink: string, watermarks: IWatermark[]): Promise<string> {
    const outputFile = getAbsolutePath(generateOutputFile());
    await runner.run(ffmpegCommandBuilder.buildWatermarkVideoCommand(getAbsolutePath(videoLink), watermarks, outputFile));
    return outputFile;
  }

  async mergeVideos(paths: string[]): Promise<string> {
    const outputFile = getAbsolutePath(generateOutputFile());
    await runner.run(ffmpegCommandBuilder.buildMergeVideoCommand(paths.map(p => getAbsolutePath(p)), outputFile));
    return outputFile;
  }
}

export default new VideoProcessingService();