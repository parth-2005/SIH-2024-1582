const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const http = require('http');
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = socketio(server);

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
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