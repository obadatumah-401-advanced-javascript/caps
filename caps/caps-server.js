'use strict';

require('dotenv').config();

const io = require('socket.io')(process.env.PORT);

require('./caps.js')(io);

io.on('connection', (socket) => {
  console.log(`Welcome to the global connection of the caps app ${socket.id}`);
  socket.on('error', (error) => {
    io.emit('error', error);
  });
  socket.on('action', (payload) => {
    io.emit('action', payload);
  });
});