import { spawnSync } from "child_process";
import { WatermarkImageOptions, WatermarkTextOptions } from "src/types";
import Locals from "../providers/locals";

export class WatermarkService {
	private cmd = 'ffmpeg';
	public getFilterString(options: WatermarkTextOptions | WatermarkImageOptions): Array<string> {
		let filters = []
		if(options.time){
			filters = filters.concat(['-t', options.time])
		}
		if(options.type == 'text') {
			const optionsText: WatermarkTextOptions = options;
			const fontFile = Locals.config().FONTS_FILE;
			if(optionsText.content){
				return filters.concat([
					'-filter_complex', `drawtext=fontcolor=${optionsText.color || 'red'}:fontfile=${fontFile}:text=${optionsText.content}:fontsize=${optionsText?.fontStyle?.fontSize || '12'}:x=${optionsText?.position.x || '0'}:y=${optionsText?.position.y || '0'}` 
				]);
			}
		} else if(options.type == 'image') {
			const optionsImage: WatermarkImageOptions = options;
			if(optionsImage.image){
				return filters.concat([
					'-i', optionsImage.image,
					'-filter_complex', `[1][0]scale2ref=w=oh*mdar:h=ih*${(optionsImage.size || 100) / 100}[logo][video];[video][logo] overlay=${optionsImage?.position.x || '0'}:${optionsImage?.position.y || '0'}:format=auto,format=yuv420p`, 
				]);
			}
		}

	}

	public renderWidthFilters(url: string, filters: Array<string>, outputPath: string) {
		try {
			spawnSync(this.cmd, [
				'-y', 
				'-i', url,
				...filters,
				'-preset', 'ultrafast',
				'-f', 'mp4', outputPath
			]);
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
        return outputPath;
    }

	public mergeVideo(url, outputPath){
		try {
			spawnSync(this.cmd, [
				'-y', 
				'-i', Locals.config().INTRO_VIDEO,
				'-i', url,
				'-i', Locals.config().OUTRO_VIDEO,
				'-filter_complex', "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]",
				'-map', '[v]', '-map', '[a]', outputPath
			]);
		} catch (error) {
			throw new Error(error)
		}
        return outputPath;
		
	}
}