import * as request from "supertest";
import express from '../../src/providers/express'
const app = express.main();
describe('Testing handleWatermark of VideoController', () => {
	test('Case Error 1: req.body is empty should result in a status of 400', async () => {
		const res = await request(app).post('/api/Watermark').send({});
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual(
			expect.objectContaining({
				status: 400,
				errors: expect.any(Array)
			})
		);
	});
	test('Case Error 2: "options" of req.body is empty should result in a status of 400', async () => {
		const data = {
			videoURL: "https://player.vimeo.com/external/181545195.sd.mp4?s=176d502710df829442a83565bb79efbe3c9c0b93&profile_id=164"
		}
		const res = await request(app).post('/api/Watermark').send(data);
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual(
			expect.objectContaining({
				status: 400,
				errors: expect.any(Array)
			})
		);
	});
	test('Case Error 3: "videoURL" of req.body is empty should result in a status of 400', async () => {
		const data = {
			options: {
				type: "text",
				content: "VinhhpText",
				image: "https://www.shutterstock.com/image-vector/internet-design-logoicon-template-600w-1037418430.jpg",
				color: "red",
				time: "00:00:08",
				fontStyle: {
					fontSize: 24
				},
				position: {
					x: "10",
					y: "20+24-max_glyph_a"
				}
			}
		}
		const res = await request(app).post('/api/Watermark').send(data);
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual(
			expect.objectContaining({
				status: 400,
				errors: expect.any(Array)
			})
		);
	});
	test('Case Error 4: "videoURL" of req.body is empty should result in a status of 400', async () => {
		const data = {
			options: {
				type: "text",
				content: "VinhhpText",
				image: "https://www.shutterstock.com/image-vector/internet-design-logoicon-template-600w-1037418430.jpg",
				color: "red",
				time: "00:00:08",
				fontStyle: {
					fontSize: 24
				},
				position: {
					x: "10",
					y: "20+24-max_glyph_a"
				}
			}
		}
		const res = await request(app).post('/api/Watermark').send(data);
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual(
			expect.objectContaining({
				status: 400,
				errors: expect.any(Array)
			})
		);
	});
	test('Case Success 1: Add Watermark Text should result in status 200', async () => {
		const data = {
			options: {
				type: "text",
				content: "test demo",
				image: "https://www.shutterstock.com/image-vector/internet-design-logoicon-template-600w-1037418430.jpg",
				color: "red",
				time: "00:00:08",
				fontStyle: {
					fontSize: 24
				},
				position: {
					x: "10",
					y: "20+24-max_glyph_a"
				}
			},
			videoURL: "https://player.vimeo.com/external/181545195.sd.mp4?s=176d502710df829442a83565bb79efbe3c9c0b93&profile_id=164"
		}
		const res = await request(app).post('/api/Watermark').send(data);
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(
			expect.objectContaining({
				status: 200,
				data: expect.any(String)
			})
		);
	});
	test(' Case Success 2: Add Watermark Image should result in status 200', async () => {
		const data = {
			options: {
				type: "image",
				image: "https://www.shutterstock.com/image-vector/internet-design-logoicon-template-600w-1037418430.jpg",
				size: 50,
				time: 7,
				position: {
					x: "40",
					y: "40"
				}
			},
			videoURL: "https://player.vimeo.com/external/181545195.sd.mp4?s=176d502710df829442a83565bb79efbe3c9c0b93&profile_id=164"
		}
		const res = await request(app).post('/api/Watermark').send(data);
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(
			expect.objectContaining({
				status: 200,
				data: expect.any(String)
			})
		);
	});
});