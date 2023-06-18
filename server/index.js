import express, { json, urlencoded } from 'express';
import { Server as SocketServer } from 'socket.io';

import { createServer as createHTTPServer } from 'http';
import cors from 'cors';

import { CLIENT_URL, SERVER_PORT, API_PORT, SERVER_URL } from './config/config.js';

const app = express();
const server = createHTTPServer();

const io = new SocketServer(server, {
  cors: { origin: CLIENT_URL }
});

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: [CLIENT_URL, SERVER_URL] }));

//! ROUTES
import user from './routes/User.js';
import chat from './routes/Chat.js';
import message from './routes/Message.js';

app.use('/api/v1/user', user);
app.use('/api/v1/chat', chat);
app.use('/api/v1/message', message);

io.on('connection', (socket) => {
  console.log(`Client Connected with ID: ${socket.id}`);

  socket.on('disconnect', () => console.log(`Socket ${socket.id} diconnected`));

  socket.on('joinRoom', (roomId) => {
    console.log(`Socket ${socket.id} joined room ${roomId}`);
    socket.join(roomId);
  });

  socket.on('message', ({ roomId, message }) => {
    console.log(`Socket ${socket.id} sended ${message} to room ${roomId}`);
    socket.to(roomId).emit('message', message);
  });
});

server.listen(SERVER_PORT, () => console.log(`Socket Server running in port ${SERVER_PORT}`));
app.listen(API_PORT, () => console.log(`API Server running in port ${API_PORT}`));