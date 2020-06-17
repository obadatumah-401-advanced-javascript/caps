'use strict';


const io = require('socket.io-client');
const caps = io.connect('http://localhost:3000/caps');

caps.emit('join', 'driver');

caps.on('msg', data => { 
  setTimeout(() => {
    console.log(`picked up ${data.payload.orderID}`);
    let event = { event: 'in-transit', time: new Date(), payload: data.payload };
    caps.emit('in-transit', event);
  }, 1000);

  setTimeout(() => {
    console.log(`delivered up ${data.payload.orderID}`);
    let event = { event: 'delivered', time: new Date(), payload: data.payload };
    caps.emit('delivered', event);
  }, 3000);
});