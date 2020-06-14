'use strict';

const events = require('./events');

events.on('pickup',(order) =>{
  setTimeout(function transit(){
    console.log(`DRIVER: picked up ${order.orderID}`);
    events.emit('in-transit',order);
    setTimeout(function delivered(){
      events.emit('delivered',order);
    },3000);
  },1000);

});