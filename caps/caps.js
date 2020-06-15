'use strict';

const net = require('net');
var uuid = require('uuid-random');

const PORT = process.env.PORT || 3000;



const server = net.createServer();
server.listen(PORT, () => console.log(`Server is up on ${PORT}`));

let socketPool = {};

server.on('connection', (socket) => {

  const id = `Socket-${uuid()}`;
  console.log(`client with ID : ${id} is connected!!! `);

  socketPool[id] = socket;

  socket.on('data', (buffer) => dispatchEvent(buffer));

  socket.on('error', (e) => { console.log('SOCKET ERR', e); });

  socket.on('end', (end) => {
    console.log('connection ended', end);
    delete socketPool[id];
  });
});

server.on('error', (e) => {
  console.log('SERVER ERROR', e);
});

function dispatchEvent(buffer) {
  let message = JSON.parse(buffer.toString().trim());
  console.log('Event', message);
  broadcast(message);
}

function broadcast(msg) {
  let payload = JSON.stringify(msg);
  for (let socket in socketPool) {
    socketPool[socket].write(payload);
  }
}