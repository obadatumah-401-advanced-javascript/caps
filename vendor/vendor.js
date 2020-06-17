'use strict';
​
require('dotenv').config();
const faker = require('faker');
const PORT = process.env.PORT
​
const io = require('socket.io-client');
const caps = io.connect(`http://localhost:${PORT}/caps`);
​
caps.on('connect', () => {
    let room = process.env.STORE_NAME;
    caps.emit('join', room);
    caps.on('joined', (joinedRoom) => {
        room = joinedRoom;
​
        setInterval(createOrder, 5000);
​
        function createOrder() {
​
            const order = {
                storeName: process.env.STORE || 'OBADASTORE',
                orderId: faker.random.uuid(),
                customerName: faker.name.findName(),
                address: faker.address.city()
            }
            const message = { event: "pickup", time: new Date(), payload: order };
            
            caps.emit('message', message);
            
        }
​
        caps.on('message', (message) => {
            if (message.event === 'delivered'){
                console.log(`thank you for delivering ${message.payload.orderId}`);
            }
        });
​
    });
​
})
