import { spawnSync } from "child_process";
import { WatermarkOptions } from "../types/types";
import localConfig from "../config/local.config";
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { URL } from "url";

export class FFmpegService {
	public filtersVideo(inputPath: string, watermarkOptions: Array<WatermarkOptions>, outputPath: string) {
		if(inputPath === "" || outputPath === "" || watermarkOptions.length === 0 || watermarkOptions.length > 10)
			throw new Error(`Params invalid!`);
		
		let validateWatermarkOptions = true;
		for (let i = 0; i < watermarkOptions.length; i++) {
			const element = watermarkOptions[i];
			if(["image", "text"].indexOf(element.type) < 0){
				validateWatermarkOptions = false;
				break;
			}
			if(["image", "text"].indexOf(element.type) < 0){
				validateWatermarkOptions = false;
				break;
			}

			if(element.type === "image"){
				try {
					new URL(element.image);
				} catch (error) {
					validateWatermarkOptions = false;
					break;
				}
			}
			if(element.size == null
				|| element.time == null
				|| element.time.start == null
				|| element.time.end == null
				|| element.position == null
				|| element.position.x == null
				|| element.position.y == null
				)
			{
				validateWatermarkOptions = false;
				break;
			}
		}

		if(!validateWatermarkOptions)
			throw new Error(`Params invalid!`);

		const folderTemp = path.join(localConfig.TEMP_PATH, uuidv4());
		try {
			fs.mkdirSync(folderTemp, { recursive: true });
			let outputPathTemp = "";
			let filters = "";
			let inputArgs = [];	
			for (let i = 0; i < watermarkOptions.length; i++) {
				const element = watermarkOptions[i];
				inputArgs = [];
				if(i === 0) {
					inputArgs.push("-i");
					inputArgs.push(inputPath);
				}
				else {
					inputArgs.push("-i");
					inputArgs.push(outputPathTemp);
				}

				if(i < watermarkOptions.length - 1){
					outputPathTemp = path.join(folderTemp, `v-${i}.mp4`);
				}
				else {
					outputPathTemp = outputPath
				}

				if(element.type === "image"){
					inputArgs.push("-i");
					inputArgs.push(element.image);
					filters = `[1:v]scale=${element.size}:-1[scale];[0:v][scale] overlay=${element?.position.x || '0'}:${element?.position.y || '0'}:enable='between(t,${element.time.start},${element.time.end})'[out]`;
				}
				else if(element.type === "text"){
					const fontfile =  path.join(localConfig.FONT_PATH, `Lato-${element.fontStyle || "Regular"}.ttf`);
					console.log(fontfile)
					filters = `drawtext=fontcolor=${element.color || '#ffffff'}:fontfile=${fontfile}:text=${element.content || '' }:fontsize=${element?.fontSize || '13'}:x=${element?.position.x || '0'}:y=${element?.position.y || '0'}:enable='between(t,${element.time.start},${element.time.end})'[out]`
				}
				const spawn = spawnSync("ffmpeg", [
					'-y',
					...inputArgs,
					'-filter_complex', `${filters}`,
					'-map', '[out]',
					'-preset', 'ultrafast',
					'-f', 'mp4', outputPathTemp
				]);
				if(spawn.status === 1) throw new Error(spawn.stderr.toString());
			}
		} catch (error) {
			throw new Error(error);
		}
		finally {
			const list = fs.readdirSync(folderTemp);
			for(var i = 0; i < list.length; i++) {
				var filename = path.join(folderTemp, list[i]);
				fs.unlinkSync(filename);
			}
			fs.rmdirSync(folderTemp);
		}
		return outputPath;
	}

	public mergeVideo(inputPaths: string[], outputPath: string) {
		try {
			if(inputPaths.length === 0 || outputPath === ""  || inputPaths.length > 10)
				throw new Error(`Params invalid!`);

			let validateWatermarkOptions = true;
			for (let i = 0; i < inputPaths.length; i++) {
				try {
					new URL(inputPaths[i]);
				} catch (error) {
					validateWatermarkOptions = false;
					break;
				}
			}
			if(!validateWatermarkOptions)
				throw new Error(`Params invalid!`);

			const inputArgs = []
			let filters = ""
			let concat = ""
			for (let i = 0; i < inputPaths.length; i++) {
				inputArgs.push("-i");
				inputArgs.push(`"${inputPaths[i]}"`);
				filters += `[${i}:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:-1:-1,setsar=1,fps=30,format=yuv420p[v${i}];`;
				filters += `[${i}:a]aformat=sample_rates=48000:channel_layouts=stereo[a${i}];`;
				concat += `[v${i}][a${i}]`;
			}
			filters += `${concat}concat=n=${inputPaths.length}:v=1:a=1[v][a]`;
			const spawn = spawnSync("ffmpeg", [
				'-y',
				...inputArgs,
				'-filter_complex', `"${filters}"`,
				'-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-c:a', 'aac', '-movflags', '+faststart', outputPath
			], {  shell: true });
			if(spawn.status === 1) throw new Error(spawn.stderr.toString());
		} catch (error) {
			throw new Error(error)
		}
		return outputPath;
	}
}

export default new FFmpegService();