'use strict';

const io = require('socket.io')(3000);

io.of('/caps').on('connection', (socket) => {
  console.log('Welcome Global Connection', socket.id);
  let currentRoom = '';
  socket.on('join', (room) => {
    socket.leave(currentRoom);
    socket.join(room);
    currentRoom = room;
    console.log('joined room', room);
  });
  socket.on('pickup',data => {
    console.log('Data Picked up');
    io.of('/caps').to('caps').emit('msg',data);
    io.of('/caps').to('driver').emit('msg',data);
  });


  socket.on('in-transit',data => {
    console.log('Data in-transit');
    io.of('/caps').to('caps').emit('msg',data);
  });

  socket.on('delivered',data => {
    console.log('Data delivered');
    io.of('/caps').to('caps').emit('msg',data);
    io.of('/caps').to('vendor').emit('msg',data);
  });
});