import express from 'express';
import path from 'path';
import http from 'http';
import socketIo from 'socket.io';

const app = express();
const server = http.createServer(app);
export const io = socketIo(server, {
  pingInterval: 2000,
});

const port = process.env.PORT || 3231;
import SocketManager from './SocketManager';

io.on('connection', SocketManager);

server.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../../', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../', 'build', 'index.html'));
});
