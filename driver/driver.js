'use strict';


require('dotenv').config();

const PORT = process.env.PORT;

const io = require('socket.io-client');
const caps = io.connect(`http://localhost:${PORT}/caps`);


caps.on('connect', () => {
  let room = process.env.STORE_NAME;
  console.log(room);
  caps.emit('join', room);
  caps.on('joined', (joinedRoom) => {
    room = joinedRoom;

    caps.on('message', (serverMessage) => {
      if (serverMessage.event === 'pickup') {
        setTimeout(function () {
          const payload = serverMessage.payload;
          console.log(`picking up ${payload.orderId}`);
          const message = { event: 'in-transit', time: new Date(), payload: payload };
          caps.emit('message', message);
          setTimeout(function () {
            const message = { event: 'delivered', time: new Date(), payload: payload };
            caps.emit('message', message);
            console.log(`delivered ${payload.orderId}`);
          }, 3000);
        }, 1500);
      }
    });
    
    
  });
});
