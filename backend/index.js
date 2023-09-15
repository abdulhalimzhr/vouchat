import express from 'express';
import pkg from 'body-parser';
import { config } from 'dotenv';
import { connection } from './src/utils/mongooseWrapper.js';
import { db } from './src/configs/db.config.js';
import cors from 'cors';
import chatRouter from './src/routes/chat.router.js';
import { Server } from 'socket.io';
import http from 'http';

const { json, urlencoded } = pkg;

const app = express();
const server = http.createServer(app);
const allowedOrigins = [
  process.env.BASE_URL,
  process.env.HOST_IP,
  'http://localhost:8081',
  'http://192.168.1.154:8080',
  'http://192.168.1.154:8081',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:8080',
  'http://localhost:8081',
  'http://0.0.0.0:3001',
  'http://0.0.0.0:8081',
  '*'
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

config();

const port = process.env.APP_PORT || 3001;

app.use(json());
app.use(
  urlencoded({
    extended: true
  })
);

const corsOptions = {
  origin: function (origin, callback) {
    console.log('origin', origin);
    callback(null, true);
  }
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

app.use('/api/chat', chatRouter);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully.');

  const srv = server.listen(port, '0.0.0.0', () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  process.on('SIGINT', () => {
    connection.close();
    srv.close(() => {
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
