import express from 'express';
import pkg from 'body-parser';
import { config } from 'dotenv';
import { connection } from './src/utils/mongooseWrapper.js';
import { db } from './src/configs/db.config.js';
import cors from 'cors';
import chatRouter from './src/routes/chat.router.js';

const app = express();
const { json, urlencoded } = pkg;

config();
const port = process.env.APP_PORT || 3001;
const allowedOrigins = [
  process.env.BASE_URL,
  process.env.HOST_IP,
  'http://localhost:8081'
];

app.use(json());
app.use(
  urlencoded({
    extended: true
  })
);

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

app.use('/api/chat', chatRouter);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully.');

  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  process.on('SIGINT', () => {
    connection.close();
    server.close(() => {
      console.log('Server closed.');
      process.exit(1);
    });
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    connection.close();
    process.exit(1);
  });
});
