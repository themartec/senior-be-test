import { Request, Response } from 'express';
import { WatermarkService } from '../services/watermark.service';
import * as path from 'path'
import Locals from '../providers/locals';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

export class VideoController {
	public static handleWatermark = async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: 400, errors:  errors.array()});
		}      
		const { options, videoURL} = req.body;
		const watermarkService = new WatermarkService();
		const filename = `${uuidv4()}.mp4`;
		const outputPath: string =  path.join(Locals.config().STORAGE_PATH,filename);
		const tempPath: string =  path.join(Locals.config().STORAGE_PATH,'/temps/',filename);
		const url = `${Locals.config().STORAGE_URL}/${filename}`

		const filter: Array<string> = watermarkService.getFilterString(options);
		const newVideo = watermarkService.renderWidthFilters(videoURL, filter, tempPath)
		watermarkService.mergeVideo(newVideo, outputPath)
		fs.unlink(tempPath,() => {
			// TODO handle logs Info
		});
		if(!fs.existsSync(outputPath)) {
			throw new Error('The proccess failed, Try again, please!');
		}
		return res.status(200).json({ status: 400, data:  url});
	}
}   