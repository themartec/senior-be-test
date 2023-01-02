import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';
import Queue from  "../queue/queue";
import { MergeVideoJobPayload } from '../queue/jobs/MergeVideoJob'
import { WatermarkJobPayload } from '../queue/jobs/WatermarkJob'
import { Proccess, WatermarkOptions } from '../types/types';
import process from '../services/proccess.status.services';

export class VideoProcessingController {
	public static addWatermark = async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: 400, errors:  errors.array()});
		}
		const { watermarks, videoUrl} = req.body;
		const proccessId = uuidv4();
		let watermarkOptions: Array<WatermarkOptions> = watermarks as Array<WatermarkOptions>;
		
		const payload: WatermarkJobPayload = { videoUrl: videoUrl, proccessId: proccessId, watermarkOptions: watermarkOptions}
		Queue.dispatch('./jobs/WatermarkJob', payload, {queueName: "watermark-job"});
		await process.set(proccessId, JSON.stringify({status: "processing", data: payload}))
		return res.status(200).json({ processId: proccessId});
	}

	public static mergeVideo = async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors:  errors.array()});
		}
		const { videoUrls } = req.body;
		const proccessId = uuidv4();
		const payload: MergeVideoJobPayload = {videoUrls: videoUrls, proccessId: proccessId }
		await Queue.dispatch("./jobs/MergeVideoJob", payload, {queueName: "merge-video-job"});
		await process.set(proccessId, JSON.stringify({status: "processing", data: payload}))
		return res.status(200).json({ processId: proccessId});
	}

	public static getDetailProcess = async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors:  errors.array()});
		}
		const processingId = req.query.processingId as string;
		let processing: Proccess = await process.get(processingId);
		if(!processing) return res.status(404).json({ error: `${processingId} not found!` });
		return res.status(200).json(processing);
	}
}