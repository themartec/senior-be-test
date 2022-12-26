import { v4 as uuidv4 } from 'uuid';

export default function generateOutputFile(inputFilenames?: string[]) {
  return `video.${uuidv4()}.mp4`
}