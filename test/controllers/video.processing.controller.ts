import * as request from "supertest";
import express from '../../src/providers/express'
const app = express.main();
describe('Testing /api/merge-video', () => {
	test('Case Error 1: req.body is empty', async () => {
		const res = await request(app).post('/api/merge-video').send({});
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual(
			expect.objectContaining({
				errors: expect.any(Array)
			})
		);
	});
	test('Case Error 2: videoUrls is length = 0', async () => {
		const res = await request(app).post('/api/merge-video').send({videoUrls:[]});
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual(
			expect.objectContaining({
				errors: expect.any(Array)
			})
		);
	});

	test('Case Error 3: videoUrl invalid', async () => {
		const res = await request(app).post('/api/merge-video').send({videoUrls:["//www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4"]});
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual(
			expect.objectContaining({
				errors: expect.any(Array)
			})
		);
	});
});

describe('Testing /api/add-watermark', () => {
	test('Case Error 1: req.body is empty', async () => {
		const res = await request(app).post('/api/add-watermark').send({});
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual(
			expect.objectContaining({
				errors: expect.any(Array)
			})
		);
	});
	test('Case Error 2: watermarks is length = 0', async () => {
		const res = await request(app).post('/api/add-watermark').send({watermarks:[]});
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual(
			expect.objectContaining({
				errors: expect.any(Array)
			})
		);
	});
});

describe('Testing /api/process', () => {
	test('Case Error 1: processsingId is empty', async () => {
		const res = await request(app).get('/api/process');
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual(
			expect.objectContaining({
				errors: expect.any(Array)
			})
		);
	});
});