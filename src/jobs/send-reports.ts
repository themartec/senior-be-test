import { Job } from './index';

export default class SendReportsJob extends Job {
  async perform(params: Record<string, unknown>): Promise<void> {
    console.log(params);
  }
}