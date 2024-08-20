import mongoose from 'mongoose';

const {
	MONGO_HOST,
	MONGO_PORT,
	MONGO_USER,
	MONGO_PASSWORD,
	DB_NAME,
} = process.env;

const options: mongoose.ConnectOptions = {
	authSource: 'admin',
	autoIndex: true,
	connectTimeoutMS: 1000,
	dbName: DB_NAME,
	pass: MONGO_PASSWORD,
	user: MONGO_USER,
	serverSelectionTimeoutMS: 2000,
};

const mongoConfig = {
	options,
	url: `mongodb://${MONGO_HOST}:${MONGO_PORT}`,
};

export default mongoConfig;
