import * as nodemailer from 'nodemailer';
import { getLogger } from '../logger/logger';

class Mailer {

	private static transporter = nodemailer.createTransport({
		host: process.env.MAILER_HOST,
		port: Number(process.env.MAILER_PORT),
		auth: {
			user: process.env.MAILER_AUTH_USER,
			pass: process.env.MAILER_AUTH_PASS
		},
		secure: true,
	});

	static async send(
		fromEmail: string, email: string, data: { filename: string, filePath: string, contentType?: string }
	) {
		const { filename, filePath, contentType = 'application/pdf' } = data;

		try {
			await Mailer.transporter.sendMail({
				from: fromEmail,
				to: email,
				subject: 'Google Analytics Reports',
				attachments: [{ filename, path: filePath, contentType }],
			});
		} catch (error) {
			getLogger().error(error);
		}
	}

}

export default Mailer;
