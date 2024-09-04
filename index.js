const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'grnd'
});

app.use(bodyParser.json());

app.use('/api', require('./routes/grnd_routes'));

app.set('io', io);

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});