const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 8080;

app.use(express.static(path.resolve(__dirname, "./public")));

// Socket.io
io.on('connection', (client) => {
    console.log('A new user connected', client.id);

    client.on("user-message", (message) => {
        const timestamp = new Date().toLocaleTimeString();
        io.emit('message', `[${timestamp}] ${message}`);
    });

    client.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});
