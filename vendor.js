'use strict';

require('dotenv').config();
const events = require('./events');
const faker = require('faker');

events.on('delivered',(order)=> console.log(`VENDOR: Thank you for delivering ${order.orderID}`));

setInterval(function(){
  const order = {
    storeName : process.env.STORE,
    orderID: faker.random.uuid(),
    customerName:faker.name.findName(),
    address:faker.address.city(),
  };
  events.emit('pickup',order);

},5000);