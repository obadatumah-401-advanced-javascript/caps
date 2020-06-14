'use strict';

const events = require('./events');

events.on('pickup',(order)=> logger('pickup',order));
events.on('in-transit',(order)=> logger('in-transit',order));
events.on('delivered',(order)=> logger('delivered',order));

function logger(event,order){
  const eventInfo = {
    event:event,
    time:new Date(),
    payload:{order},
  };

  console.log('Event',eventInfo);
}

require('./vendor');
require('./driver');