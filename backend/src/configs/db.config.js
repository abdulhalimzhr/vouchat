import { config } from 'dotenv';
import { connect, connection } from '../utils/mongooseWrapper.js';

config();
const { MONGO_HOST, MONGO_DB, MONGO_PORT } = process.env;
const url = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Get the default connection
export const db = connection;
