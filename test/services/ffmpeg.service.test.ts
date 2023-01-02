import ffmpegService from '../../src/services/ffmpeg.service';
import { WatermarkOptions } from '../../src/types/types';

describe('Testing mergeVideo of ffmpeg.service', () => {
    test('Case 1: inputPaths null', async () => {
		try {
			ffmpegService.mergeVideo([], "");
		} catch (error) {
			expect(error.message).toEqual("Error: Params invalid!");
		}
	});
	test('Case 2: inputPaths not is url', async () => {
		try {
			ffmpegService.mergeVideo(["url", "https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4"], "");
		} catch (error) {
			expect(error.message).toEqual("Error: Params invalid!");
		}
	});
	test('Case 3: inputPaths lenght > 10', async () => {
		try {
			ffmpegService.mergeVideo([
			"https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", //1
			"https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", //2
			"https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", //3
			"https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", //4
			"https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", //5
			"https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", //6
			"https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", //7
			"https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", //8
			"https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", //9
			"https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", //10
			"https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", //11
		], "");
		} catch (error) {
			expect(error.message).toEqual("Error: Params invalid!");
		}
	});
	test('Case 4: outputPath is null', async () => {
		try {
			ffmpegService.mergeVideo(["https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", ""], "");
		} catch (error) {
			expect(error.message).toEqual("Error: Params invalid!");
		}
	});
	test('Case 5: inputPaths lenght = 0', async () => {
		try {
			ffmpegService.mergeVideo([], "");
		} catch (error) {
			expect(error.message).toEqual("Error: Params invalid!");
		}
	});
});
describe('Testing filtersVideo of ffmpeg.service', () => {
    test('Case 1: inputPath is null', async () => {
		try {
			let watermarkOptions: Array<WatermarkOptions> = [];
			watermarkOptions.push(
				{
					"type": "text",
					"content": "Redis connection established",
					"position": {
									"x": 100,
									"y": 300
								},
					"fontSize": 30,
					"size": 10,
					"fontStyle": "Italic",
					"color": "#0040f0",
					"time": {
						"start": 0,
						"end": 2
					}
			  }
			);
			ffmpegService.filtersVideo("", watermarkOptions, "/temps/test.mp4");
		} catch (error) {
			console.log(error)
			expect(error.message).toEqual("Params invalid!");
		}
	});
	test('Case 2: outputPath is null', async () => {
		try {
			let watermarkOptions: Array<WatermarkOptions> = [];
			watermarkOptions.push(
				{
					"type": "text",
					"content": "Redis connection established",
					"position": {
									"x": 100,
									"y": 300
								},
					"fontSize": 30,
					"size": 10,
					"fontStyle": "Italic",
					"color": "#0040f0",
					"time": {
						"start": 0,
						"end": 2
					}
			  }
			);
			ffmpegService.filtersVideo("https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", watermarkOptions, "");
		} catch (error) {
			console.log(error)
			expect(error.message).toEqual("Params invalid!");
		}
	});
	test('Case 3: watermarkOptions is length = 0', async () => {
		try {
			let watermarkOptions: Array<WatermarkOptions> = [];
			ffmpegService.filtersVideo("https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", watermarkOptions, "/temps/test.mp4");
		} catch (error) {
			console.log(error)
			expect(error.message).toEqual("Params invalid!");
		}
	});
});