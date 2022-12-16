import _ = require('lodash');
import moment = require('moment');
import * as cron from 'node-cron';
import puppeteer from 'puppeteer';
import SubscriberRepository from '../../database/subscriber/subscriber.repository';
import UserRepository from '../../database/user/user.repository';
import { getAnalyticsDataClient } from '../googleapis';
import { getLogger } from '../logger/logger';
import Mailer from '../mail/mailer';

class SendMailCronJob {

	private static chartPage = 'http://localhost:3000/api/analytics/report'; // TODO: correct
	private static defaultExpression = '* * * * *';
	private static tasks: Record<string, cron.ScheduledTask> = {};

	static async loadOldCronJob() {
		const allSubscribers = await new SubscriberRepository().findAll();
		if ( !allSubscribers.length ) return;

		for (const subscriber of allSubscribers) {
			SendMailCronJob.create(subscriber.sourceEmail, subscriber.email);
		}
	}

	static create(fromEmail: string, toEmail: string, expression = SendMailCronJob.defaultExpression) {
		const key = SendMailCronJob.genCacheKey(fromEmail, toEmail);
		if (!SendMailCronJob.tasks[key]) {
			const task = cron.schedule(expression, () => SendMailCronJob.job(fromEmail, toEmail));

			SendMailCronJob.tasks[key] = task;
		}
	}

	static destroy(sourceEmail: string, toEmail: string) {
		const task = SendMailCronJob.tasks[SendMailCronJob.genCacheKey(sourceEmail, toEmail)];

		if (task) task.stop();
	}

	private static async job(fromEmail: string, toEmail: string) {
		try {
			const fileMeta = await SendMailCronJob.exportReport(fromEmail);

			if (!fileMeta) {
				SendMailCronJob.destroy(fromEmail, toEmail);
				return;
			}

			// no need to await
			Mailer.send(fromEmail, toEmail, fileMeta);
		} catch (error) {
			getLogger().error(error);
			throw error;
		}
	}

	private static async exportReport(fromEmail: string): Promise<{ filename: string, filePath: string } | null> {
		try {
			const user = await new UserRepository().findOneByQuery({ email: fromEmail });

			if (!user || !user.ga4PropertyID) return null;

			const { auth: googleOAuth2Auth, client } = getAnalyticsDataClient(fromEmail);
			googleOAuth2Auth.setCredentials({ access_token: user.accessToken, refresh_token: user.refreshToken });

			return SendMailCronJob.generatePDF(fromEmail);
		} catch (error) {
			getLogger().error(error);
			throw error;
		}
	}

	private static async generatePDF(fromEmail: string) {
		try {
			const browser = await puppeteer.launch({ headless: true });
			const page = await browser.newPage();

			await page.goto(SendMailCronJob.chartPage, { waitUntil: 'networkidle0' });

			const filename = `reports_${moment().format('YYYY_MM_DD_HH_mm')}.pdf`;
			const path = `/tmp/${filename}`;

			await page.pdf({
				format: 'A4',
				path,
			});

			await browser.close();
			return { filename, filePath: path };
		} catch (error) {
			getLogger().error(error);
			throw error;
		}
	}

	private static genCacheKey(sourceEmail: string, toEmail: string) {
		return `${sourceEmail}_${toEmail}`;
	}

}

export default SendMailCronJob;
