import express from 'express';
import videoProcessingService from './src/services/video-processing.service';
const app = express();

app.use(express.json());
app.post('/video-processing/merge-videos', async (req, res) => {
  const { links } = req.body;
  const output = await videoProcessingService.mergeVideos(links);
  res.send(output);
})

app.post('/video-processing/add-watermarks', async (req, res) => {
  const { videoLink, watermarks } = req.body;
  const output = await videoProcessingService.addWatermark(videoLink, watermarks);
  res.send(output);
})

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
})

