'use strict';

require('dotenv').config();
const net = require('net');

const client = new net.Socket();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

client.connect(PORT, HOST, () => {
  console.log('connected to server from driver');

  client.on('data', (serverData) => {
    const parsedServerData = JSON.parse(serverData.toString().trim());
    if (parsedServerData.event === 'pickup') {
      setTimeout(function () {
        const payloadD = parsedServerData.payload;
        console.log(`picking up ${payloadD.orderId}`);
        const message = JSON.stringify({ event: 'in-transit', time: new Date(), payload: payloadD });
        client.write(message);
        setTimeout(function () {
          const message = JSON.stringify({ event: 'delivered', time: new Date(), payload: parsedServerData.payload });
          client.write(message);
          console.log(`delivered ${payloadD.orderId}`);
        }, 3000);
      }, 1000);
    }
  });

});
