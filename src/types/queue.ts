declare module 'express/Queue' {
	import type { ConnectionOptions, WorkerOptions, QueueOptions, JobsOptions } from 'bullmq';

	export type DataForJob<K extends string> = K extends keyof JobsList
		? JobsList[K]
		: Record<string, unknown>;

	export type QueueConfig = {
		connection: ConnectionOptions;
		queue: QueueOptions;
		worker: WorkerOptions;
		jobs: JobsOptions;
	};

	interface QueueContract {
		dispatch<K extends keyof JobsList>(
			job: K,
			payload: DataForJob<K>,
			options?: JobsOptions
		): Promise<string>;
		dispatch<K extends string>(
			job: K,
			payload: DataForJob<K>,
			options?: JobsOptions
		): Promise<string>;
		process(): Promise<void>;
	}

	export interface JobsList {}

	export const Queue: QueueContract;
}