import * as express from "express";
import { check, body } from "express-validator";
import { VideoController } from "../controllers/video.controller";
import handler from "../exceptions/handler";

const router = express.Router();

const WatermarkValidation  = [
    check('options','options not empty!').notEmpty(),
    check('options.type','Type not empty!').if(body('options').exists()).notEmpty(),
    check('options.position','Position not empty!').if(body('options').exists()).notEmpty(),
    check('videoURL','videoURL not empty!').notEmpty(),
    check('options','options invalid!').if(body('options').exists()).isObject(),
    check('options.type','Type invalid!').if(body('options.type').exists()).isIn(['text', 'image']),
    check('options.fontStyle','Font Style invalid!').optional().isObject(),
    check('options.position','Position invalid!').if(body('options.position').exists()).isObject(),
    check('videoURL','videoURL invalid!').if(body('videoURL').exists()).isString(),
]
router.post('/Watermark', WatermarkValidation , handler.catchErrors(VideoController.handleWatermark))

export default router;