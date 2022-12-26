import ffmpegCommandBuilder from "./ffmpeg-command-builder"

describe('FFmpegCommandBuilder', () => {
  describe('buildMergeVideoCommand', () => {
    it('Case #1 - should return correct command', () => {
      expect(ffmpegCommandBuilder.buildMergeVideoCommand(['video01.mp4', 'video02.mp4'], 'output.mp4').trim()).toBe('ffmpeg -i video01.mp4 -i video02.mp4 -filter_complex concat output.mp4');
    })
  })

})