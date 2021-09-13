const express = require('express')
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";

io.on('connection', (socket) => {

  console.log('user connected id =', socket.id);
  //console.log('user connected', socket.handshake);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
    io.emit('new-message', msg);
  });
});


server.listen(port, host, () => {
  console.log(`Example - app listening at ${host}:${port}`);
});
    /* проверить работу curl "127.0.0.1:3000/socket.io/?EIO=4&transport=polling"
*/