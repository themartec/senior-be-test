import { exec } from 'child_process';

export interface IFFmpegRunner {
  run(command: string): Promise<void>
}

export class FFmpegRunner implements IFFmpegRunner {
  async run(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(command, (err, stderr, stdout) => {
        if (err || stderr) {
          reject(err || stdout)
        }
        resolve();
      })
    })
  }
}

export default new FFmpegRunner();