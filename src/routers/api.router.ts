import * as express from "express";
import { check, body } from "express-validator";
import { VideoProcessingController } from "../controllers/video.processing.controller";
import handler from "../exceptions/handler";
import { URL } from "url";

const router = express.Router();

const AddWatermarkValidation = [
    check('videoUrl','videoUrl not empty!').notEmpty(),
    check('videoUrl','videoUrl invalid!').if(body('videoUrl').exists()).isURL(),
    check('watermarks','watermarks not empty!').notEmpty(),
    check('watermarks','watermarks is array and max 10 watermark!').if(body('watermarks').exists()).isArray({ min: 1, max: 10 }),
    check('watermarks.*.type', 'watermarks.*.type not support!').isIn(['text', 'image']),
    check('watermarks.*.image', 'image invalid!').custom(async (image) => {
       if(image){
            try {
                new URL(image);
            } catch (error) {
                throw new Error('image invalid!')
            }
       }
    }),
    check('watermarks.*.size', 'watermarks.*.size not empty!').notEmpty(),
    check('watermarks.*.time', 'watermarks.*.time not empty!').notEmpty(),
    check('watermarks.*.time.start', 'watermarks.*.time.start is number!').isNumeric(),
    check('watermarks.*.time.end', 'watermarks.*.time.end is number!').isNumeric(),
    check('watermarks.*.position', 'watermarks.*.position not empty!').notEmpty(),
    check('watermarks.*.position.x', 'watermarks.*.position.x is number!').isNumeric(),
    check('watermarks.*.position.y', 'watermarks.*.position.y is number!').isNumeric()
]
const MergeVideoValidation = [
    check('videoUrls','videoUrls not empty!').notEmpty(),
    check('videoUrls.*','videoUrl invalid!').if(body('videoUrls.*').exists()).isURL(),
    check('videoUrls','videoUrls is array and max 10 videoUrl!').if(body('videoUrls').exists()).isArray({ min: 1, max: 10 }),
]
const CheckStatusValidation = [
    check('processingId','processingId not empty!').notEmpty(),
]
router.post('/add-watermark', AddWatermarkValidation , handler.catchErrors(VideoProcessingController.addWatermark))
router.post('/merge-video', MergeVideoValidation , handler.catchErrors(VideoProcessingController.mergeVideo))
router.get('/process', CheckStatusValidation , handler.catchErrors(VideoProcessingController.getDetailProcess))

export default router;