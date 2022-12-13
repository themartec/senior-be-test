import 'dotenv/config';
import App from './app';

const app = new App();

app.listen(normalizePort(process.env.PORT || '3000'));

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}
