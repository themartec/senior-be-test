import { Queue, Worker, JobsOptions, Job } from 'bullmq';
import { ioc } from "@adonisjs/fold";
import type { DataForJob, JobsList, QueueConfig } from 'express/Queue';
import queueConfig from "../config/queue.config";
class QueueProvider {
	public queues: Map<string, Queue> = new Map();

	constructor(
		private options: QueueConfig,
	) {
		this.queues.set("default", new Queue('default', {
			connection: this.options.connection,
			...this.options.queue,
		}))
	}

    public dispatch<K extends keyof JobsList | string>(
		job: K,
		payload: DataForJob<K>,
		options: JobsOptions & { queueName?: string } = {},
	) {
		const queueName = options.queueName || 'default';
		
		if (!this.queues.has(queueName)) {
			this.queues.set(queueName, new Queue(queueName, {
				connection: this.options.connection,
				...this.options.queue,
			}))
		}

		return this.queues.get(queueName)!.add(job, payload, {
			...this.options.jobs,
			...options,
		});
	}

	public process({ queueName }: { queueName?: string }) {
		console.log(`Queue [${queueName || 'default'}] processing started...`);

		new Worker(
			queueName || 'default',
			async (job: Job) => {
				let jobHandler;
				try {
					const Job = ioc.use(job.name)
					jobHandler = ioc.make(Job)
				} catch (e) {
					console.error(`Job handler for ${job.name} not found`);
					return;
				}
				try {
					const result = await jobHandler.handle(job.data);
					console.log(`Job ${job.name} finished`);
				} catch (error) {
					console.error(`Job ${job.name} failed`);
					console.error(JSON.stringify(error));
					await job.moveToFailed(error, job.name);
				}
			},
			{
				connection: this.options.connection,
				...this.options.worker,
			}
		);

		return this;
	}
}

export default new QueueProvider(queueConfig);