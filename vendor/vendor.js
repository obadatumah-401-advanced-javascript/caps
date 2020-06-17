'use strict';

const faker = require('faker');

const io = require('socket.io-client');
const caps = io.connect('http://localhost:3000/caps');

caps.emit('join', 'vendor');


setInterval(() => {
  let data = {
    storeName: process.env.STORE || 'OBADASTORE',
    customerName: faker.name.findName(),
    orderID: faker.random.uuid(),
    address: faker.address.streetAddress(),
  };
  let event = { event: 'pickup', time: new Date(), payload: data };
  caps.emit('pickup', event);
}, 5000);

caps.on('msg',data =>{
  console.log('Thank you',data.payload.orderID);
});