'use strict';

require('dotenv').config();
module.exports = (io) => {
  const caps = io.of('/caps');
  caps.on('connection', (socket) => {
    console.log(`welcome to the caps namespace ${socket.id}`);
    let currentRoom = '';
    socket.on('join', (room) => {
      socket.leave(currentRoom);
      socket.join(room);
      currentRoom = room;
      console.log(`${socket.id} room ${room}`);
      io.emit('action', `${socket.id} room ${room}`);
      caps.to(`${socket.id}`).emit('joined', room);

      socket.on('message', (message) => {
        console.log(message);
        caps.to(currentRoom).emit('message', message);
      });
    });
  });
};


