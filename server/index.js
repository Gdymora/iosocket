const express = require('express')
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const keys = require('./config/keys')
const socketioJwt = require('socketio-jwt');
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose');
require("dotenv").config()
const config = require('./config/db');

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('MongoDb connect')
})

const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";
app.use(express.urlencoded({ limit: '50mb', extended: true, parametrLimit: 1000000 }))
app.use(express.json({ limit: '50mb' }))
app.use(cors())

// other requires
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.use('/api', authRoutes)
/* 
Accept connection and authorize token code
*/

io.use(socketioJwt.authorize({
  secret: keys.jwt,
  handshake: true
}));


io.on('connection', (socket) => {
  console.log('hello!', socket);
  console.log('hello!', socket.encoded_token);
  console.log('hello!', socket.decoded_token.login);
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