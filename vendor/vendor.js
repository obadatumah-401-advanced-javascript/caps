'use strict';

require('dotenv').config();
const faker = require('faker');
const net = require('net');
const socket = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
socket.connect(PORT, HOST, () => {
  console.log('connected to server from vendor');

  socket.on('data', (serverData) => {
    const parsedServerData = JSON.parse(serverData);
    if (parsedServerData.event === 'delivered') {
      console.log(`thank you for delivering ${parsedServerData.payload.orderId}`);
    }
  });
});
setInterval(createOrder, 5000);
function createOrder() {
  const order = {
    storeName: process.env.STORE_NAME,
    orderId: faker.random.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.city()
  }
  const message = JSON.stringify({ event: "pickup", time: new Date(), payload: order });
  socket.write(message);
}



socket.on('error', (e) => {
  console.log('Vendor ERROR', e);
});